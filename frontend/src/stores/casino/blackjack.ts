import { defineStore } from "pinia";
import axios from '../../utils/axios';
import { useAuthStore } from "../auth";

const API_URL = import.meta.env.VITE_API_URL;

// Types and Interfaces
export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type CardValue = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

interface Card {
  suit: Suit;
  value: CardValue;
  hidden: boolean;
}

interface Hand {
  cards: Card[];
  value: number;
  isSplit: boolean;
  canHit: boolean;
  isDoubled: boolean;
  bet: number;
}

interface BlackjackState {
  betAmount: number;
  playerHands: Hand[];
  dealerHand: Hand;
  deck: Card[];
  currentHandIndex: number;
  isGameActive: boolean;
  loading: boolean;
  error: string | null;
  gameStatus: 'betting' | 'playing' | 'dealerTurn' | 'complete';
  currentGameId: string | null;
  lastWinAmount: number;
  canSplit: boolean;
  canDouble: boolean;
  insuranceAvailable: boolean;
  insuranceBet: number;
  isDealing: boolean;
  dealingIndex: number;
  initialDealComplete: boolean;
}

export const useBlackjackStore = defineStore("blackjack", {
  state: (): BlackjackState => ({
    betAmount: 1,
    playerHands: [],
    dealerHand: { cards: [], value: 0, isSplit: false, canHit: true, isDoubled: false, bet: 0 },
    deck: [],
    currentHandIndex: 0,
    isGameActive: false,
    loading: false,
    error: null,
    gameStatus: 'betting',
    currentGameId: null,
    lastWinAmount: 0,
    canSplit: false,
    canDouble: true,
    insuranceAvailable: false,
    insuranceBet: 0,
    isDealing: false,
    dealingIndex: 0,
    initialDealComplete: false,
  }),

  actions: {
    initializeDeck() {
      const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
      const values: CardValue[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
      const deck: Card[] = [];

      for (const suit of suits) {
        for (const value of values) {
          deck.push({ suit, value, hidden: false });
        }
      }

      // Shuffle deck using Fisher-Yates algorithm
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }

      this.deck = deck;
    },

    calculateHandValue(hand: Hand): number {
      let value = 0;
      let aces = 0;

      for (const card of hand.cards) {
        if (card.hidden) continue;

        if (card.value === "A") {
          aces += 1;
        } else if (["K", "Q", "J"].includes(card.value)) {
          value += 10;
        } else {
          value += parseInt(card.value);
        }
      }

      // Add aces
      for (let i = 0; i < aces; i++) {
        if (value + 11 <= 21) {
          value += 11;
        } else {
          value += 1;
        }
      }

      return value;
    },

    async startGame() {
      const authStore = useAuthStore();
      const currentBalance = authStore.userBalance;
      
      console.log('[BLACKJACK-STORE][startGame] Initial state:', {
        currentBalance,
        betAmount: this.betAmount,
        timestamp: new Date().toISOString()
      });

      if (this.betAmount <= 0) {
        this.error = "Invalid bet amount";
        return;
      }

      if (!authStore.token) {
        this.error = "Please login to play";
        return;
      }

      if (currentBalance < this.betAmount) {
        this.error = "Insufficient balance";
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        // Deduct initial bet immediately
        const response = await axios.post(
          `${API_URL}/casino/blackjack/deductBet`,
          { 
            betAmount: this.betAmount,
            action: 'initial'
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          console.log('[BLACKJACK-STORE][startGame] Initial bet deducted:', {
            oldBalance: currentBalance,
            newBalance: response.data.newBalance,
            betAmount: this.betAmount,
            timestamp: new Date().toISOString()
          });

          authStore.updateBalance(response.data.newBalance);
          this.currentGameId = response.data.gameId;
          this.isGameActive = true;
          this.gameStatus = 'playing';
          
          this.initializeDeck();
          await this.dealInitialCards();

          // Check if player has enough balance for double/split
          this.checkAvailableActions();
        }
      } catch (error: any) {
        console.error("[BLACKJACK-STORE][startGame] Error:", error);
        this.error = error.response?.data?.message || "Failed to start game";
      } finally {
        this.loading = false;
      }
    },

    checkAvailableActions() {
      const authStore = useAuthStore();
      const currentBalance = authStore.userBalance;
      const currentHand = this.playerHands[this.currentHandIndex];
      
      if (!currentHand) return;

      // Check for split possibility (needs enough balance for another bet)
      this.canSplit = currentHand.cards.length === 2 && 
        !currentHand.isSplit &&
        this.getCardValue(currentHand.cards[0]) === this.getCardValue(currentHand.cards[1]) &&
        currentBalance >= currentHand.bet;

      // Check for double down (needs enough balance for another bet)
      this.canDouble = currentHand.cards.length === 2 && 
        !currentHand.isDoubled &&
        currentBalance >= currentHand.bet;

      console.log('[BLACKJACK-STORE] Available actions:', {
        canSplit: this.canSplit,
        canDouble: this.canDouble,
        currentBalance,
        betAmount: currentHand.bet,
        timestamp: new Date().toISOString()
      });
    },

    async dealInitialCards() {
      this.isDealing = true;
      this.dealingIndex = 0;
      
      // Create initial player hand
      const playerHand: Hand = {
        cards: [],
        value: 0,
        isSplit: false,
        canHit: true,
        isDoubled: false,
        bet: this.betAmount
      };

      this.playerHands = [playerHand];

      // Deal cards in sequence with delays
      // First card to player
      await this.dealNextCard('player');
      await new Promise(resolve => setTimeout(resolve, 500));

      // First card to dealer
      await this.dealNextCard('dealer');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Second card to player
      await this.dealNextCard('player');
      await new Promise(resolve => setTimeout(resolve, 500));

      // Second card to dealer (hidden)
      const dealerCard = this.drawCard();
      dealerCard.hidden = true;
      this.dealerHand.cards.push(dealerCard);
      this.dealerHand.value = this.calculateHandValue(this.dealerHand);
      await new Promise(resolve => setTimeout(resolve, 500));

      this.isDealing = false;
      this.initialDealComplete = true;
      this.checkInitialState();
    },

    async dealNextCard(target: 'player' | 'dealer') {
      const card = this.drawCard();
      if (target === 'player') {
        this.playerHands[this.currentHandIndex].cards.push(card);
        this.playerHands[this.currentHandIndex].value = 
          this.calculateHandValue(this.playerHands[this.currentHandIndex]);
      } else {
        this.dealerHand.cards.push(card);
        this.dealerHand.value = this.calculateHandValue(this.dealerHand);
      }
      this.dealingIndex++;
    },

    drawCard(): Card {
      if (this.deck.length === 0) {
        this.initializeDeck();
      }
      return this.deck.pop()!;
    },

    checkInitialState() {
      const currentHand = this.playerHands[this.currentHandIndex];
      if (!currentHand) return;
      
      // Check for split possibility
      this.canSplit = currentHand.cards.length === 2 && 
        !currentHand.isSplit &&
        this.getCardValue(currentHand.cards[0]) === this.getCardValue(currentHand.cards[1]);

      // Check for double down
      this.canDouble = currentHand.cards.length === 2 && !currentHand.isDoubled;

      // Check for dealer blackjack only if dealer has cards
      if (this.dealerHand.cards.length > 0) {
        const firstCard = this.dealerHand.cards[0];
        if (firstCard && (firstCard.value === "A" || this.getCardValue(firstCard) === 10)) {
          const dealerHasBlackjack = this.calculateHandValue({
            ...this.dealerHand,
            cards: this.dealerHand.cards.map(card => ({ ...card, hidden: false }))
          }) === 21;

          if (dealerHasBlackjack) {
            this.revealDealerCard();
            this.endRound();
          }
        }
      }

      // Check for player blackjack
      if (currentHand && this.calculateHandValue(currentHand) === 21) {
        this.stand();
      }
    },

    getCardValue(card: Card): number {
      if (["K", "Q", "J"].includes(card.value)) return 10;
      if (card.value === "A") return 11;
      return parseInt(card.value);
    },

    async hit() {
      if (!this.isGameActive || this.gameStatus !== 'playing') return;
      
      const currentHand = this.playerHands[this.currentHandIndex];
      if (!currentHand.canHit) return;

      this.isDealing = true;
      const newCard = this.drawCard();
      currentHand.cards.push(newCard);
      currentHand.value = this.calculateHandValue(currentHand);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      this.isDealing = false;

      // Check for bust or 21
      if (currentHand.value >= 21) {
        currentHand.canHit = false;
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (currentHand.value === 21) {
          // Automatically stand when hitting 21
          console.log('[BLACKJACK-STORE][hit] Player hit 21, automatically standing');
          if (this.currentHandIndex === this.playerHands.length - 1) {
            await this.dealerPlay();
          } else {
            this.moveToNextHand();
          }
        } else if (currentHand.value > 21) {
          // Bust
          if (this.currentHandIndex === this.playerHands.length - 1) {
            await this.dealerPlay();
          } else {
            this.moveToNextHand();
          }
        }
      }

      this.canDouble = false;
    },

    async stand() {
      // Only ends the current hand, no balance changes
      if (!this.isGameActive || this.gameStatus !== 'playing') return;
      
      const currentHand = this.playerHands[this.currentHandIndex];
      currentHand.canHit = false;
    
      if (this.currentHandIndex === this.playerHands.length - 1) {
        await this.dealerPlay();
      } else {
        this.moveToNextHand();
      }
    },

    async double() {
      if (!this.canDouble || !this.isGameActive || this.gameStatus !== 'playing') return;

      const authStore = useAuthStore();
      const currentHand = this.playerHands[this.currentHandIndex];
      const doubleAmount = currentHand.bet;

      try {
        // Deduct double bet amount
        const response = await axios.post(
          `${API_URL}/casino/blackjack/deductBet`,
          { 
            betAmount: doubleAmount,
            action: 'double',
            gameId: this.currentGameId
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          console.log('[BLACKJACK-STORE][double] Double bet deducted:', {
            oldBalance: authStore.userBalance,
            newBalance: response.data.newBalance,
            doubleAmount,
            timestamp: new Date().toISOString()
          });

          authStore.updateBalance(response.data.newBalance);
          currentHand.bet *= 2;
          currentHand.isDoubled = true;

          // Deal one card and end turn
          await this.hit();
          if (currentHand.value <= 21) {
            await this.stand();
          }
        }
      } catch (error: any) {
        console.error('[BLACKJACK-STORE][double] Error:', error);
        this.error = error.response?.data?.message || 'Failed to double down';
      }
    },

    async split() {
      if (!this.canSplit || !this.isGameActive || this.gameStatus !== 'playing') return;

      const authStore = useAuthStore();
      const currentHand = this.playerHands[this.currentHandIndex];
      const splitAmount = currentHand.bet;

      try {
        // Deduct split bet amount
        const response = await axios.post(
          `${API_URL}/casino/blackjack/deductBet`,
          { 
            betAmount: splitAmount,
            action: 'split',
            gameId: this.currentGameId
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          console.log('[BLACKJACK-STORE][split] Split bet deducted:', {
            oldBalance: authStore.userBalance,
            newBalance: response.data.newBalance,
            splitAmount,
            timestamp: new Date().toISOString()
          });

          authStore.updateBalance(response.data.newBalance);
          
          // Create new hand with second card
          const newHand: Hand = {
            cards: [currentHand.cards.pop()!],
            value: 0,
            bet: splitAmount,
            isSplit: true,
            canHit: true,
            isDoubled: false
          };

          // Add new card to each hand
          const firstNewCard = this.drawCard();
          const secondNewCard = this.drawCard();

          currentHand.cards.push(firstNewCard);
          newHand.cards.push(secondNewCard);

          currentHand.isSplit = true;
          currentHand.value = this.calculateHandValue(currentHand);
          newHand.value = this.calculateHandValue(newHand);

          this.playerHands.push(newHand);
          this.checkAvailableActions();
        }
      } catch (error: any) {
        console.error('[BLACKJACK-STORE][split] Error:', error);
        this.error = error.response?.data?.message || 'Failed to split hand';
      }
    },
    moveToNextHand() {
      if (this.currentHandIndex < this.playerHands.length - 1) {
        this.currentHandIndex++;
        this.checkHandForOptions();
      } else {
        // Only proceed to dealer play if all hands are complete
        this.gameStatus = 'dealerTurn';
        this.dealerPlay();
      }
    },

    revealDealerCard() {
      this.dealerHand.cards = this.dealerHand.cards.map(card => ({
        ...card,
        hidden: false
      }));
      this.dealerHand.value = this.calculateHandValue(this.dealerHand);
    },

    async dealerPlay() {
      // Reveal dealer's hidden card
      this.revealDealerCard();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Only continue hitting if any player hand is not bust
      const hasValidHand = this.playerHands.some(hand => hand.value <= 21);
      
      if (hasValidHand) {
        while (this.dealerHand.value < 17 || 
               (this.dealerHand.value === 17 && this.hasSoftAce(this.dealerHand))) {
          this.isDealing = true;
          const newCard = this.drawCard();
          this.dealerHand.cards.push(newCard);
          this.dealerHand.value = this.calculateHandValue(this.dealerHand);
          await new Promise(resolve => setTimeout(resolve, 800));
          this.isDealing = false;
        }
      }

      await this.endRound();
    },

    hasSoftAce(hand: Hand): boolean {
      let hasAce = false;
      let totalWithoutAce = 0;

      for (const card of hand.cards) {
        if (card.value === "A") {
          hasAce = true;
        } else if (["K", "Q", "J"].includes(card.value)) {
          totalWithoutAce += 10;
        } else {
          totalWithoutAce += parseInt(card.value);
        }
      }

      return hasAce && totalWithoutAce + 11 <= 21;
    },

    async endRound() {
      const authStore = useAuthStore();
      let totalWin = 0;

      console.log('[BLACKJACK-STORE][endRound] Starting round end:', {
        currentBalance: authStore.userBalance,
        betAmount: this.betAmount,
        timestamp: new Date().toISOString()
      });

      // Calculate results for all hands
      for (const hand of this.playerHands) {
        const playerValue = hand.value;
        const dealerValue = this.dealerHand.value;
        let winAmount = 0;

        console.log('[BLACKJACK-STORE][endRound] Processing hand:', {
          playerValue,
          dealerValue,
          handBet: hand.bet,
          timestamp: new Date().toISOString()
        });

        if (playerValue > 21) {
          // Loss - bet was already deducted, so winAmount is 0
          winAmount = 0;
        } else if (dealerValue > 21 || playerValue > dealerValue) {
          // Win - return bet plus win amount
          winAmount = hand.bet * 2; // Original bet plus winning amount
          if (playerValue === 21 && hand.cards.length === 2 && !hand.isSplit) {
            // Blackjack pays 3:2
            winAmount = hand.bet * 2.5; // Original bet plus 1.5x win
          }
        } else if (playerValue === dealerValue) {
          // Push - return original bet
          winAmount = hand.bet;
        } else {
          // Loss - bet was already deducted, so winAmount is 0
          winAmount = 0;
        }

        console.log('[BLACKJACK-STORE][endRound] Hand result:', {
          playerValue,
          dealerValue,
          handBet: hand.bet,
          winAmount,
          totalWinBefore: totalWin,
          totalWinAfter: totalWin + winAmount,
          timestamp: new Date().toISOString()
        });

        totalWin += winAmount;
      }

      console.log('[BLACKJACK-STORE][endRound] Final calculation:', {
        totalBet: this.betAmount,
        totalWin,
        timestamp: new Date().toISOString()
      });

      try {
        const response = await axios.post(
          `${API_URL}/casino/blackjack/processWin`,
          {
            gameId: this.currentGameId,
            winAmount: totalWin // This is now the total amount to add to balance
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        console.log('[BLACKJACK-STORE][endRound] Process win response:', {
          success: response.data.success,
          oldBalance: authStore.userBalance,
          newBalance: response.data.newBalance,
          winAmount: totalWin,
          timestamp: new Date().toISOString()
        });

        if (response.data.success) {
          authStore.updateBalance(response.data.newBalance);
          this.lastWinAmount = totalWin > 0 ? totalWin - this.betAmount : -this.betAmount;
        }
      } catch (error: any) {
        console.error('[BLACKJACK-STORE][endRound] Error:', error);
        this.error = error.response?.data?.message || 'Failed to process game result';
      }

      this.gameStatus = 'complete';
      this.isGameActive = false;
    },

    checkHandForOptions() {
      const currentHand = this.playerHands[this.currentHandIndex];
      if (!currentHand) return;

      // If hand value is 21, automatically proceed to dealer
      if (currentHand.value === 21) {
        console.log('[BLACKJACK-STORE] Hand value is 21, proceeding to dealer');
        currentHand.canHit = false;
        this.dealerPlay();
        return;
      }

      // Check for split possibility
      this.canSplit = currentHand.cards.length === 2 && 
        !currentHand.isSplit &&
        this.getCardValue(currentHand.cards[0]) === this.getCardValue(currentHand.cards[1]);

      // Check for double down
      this.canDouble = currentHand.cards.length === 2 && !currentHand.isDoubled;

      // Update hand state
      currentHand.canHit = currentHand.value < 21;
    }
  }
}); 