import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Symbol {
  id: number;
  name: string;
  image: string;
  value: number;
}

interface GameState {
  balance: number;
  betAmount: number;
  lastWin: number;
  totalWin: number;
  isSpinning: boolean;
  symbols: Symbol[];
  reels: Symbol[][];
  winningLines: number[];
  multiplier: number;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  canCashout: boolean;
}

const getInitialReels = (symbols: Symbol[]): Symbol[][] => {
  return Array(3).fill(null).map(() => 
    Array(3).fill(null).map(() => 
      ({ ...symbols[Math.floor(Math.random() * symbols.length)] })
    )
  );
};

export const useHalloweenSlotsStore = defineStore('halloweenSlots', {
  state: (): GameState => {
    const symbols = [
      { id: 1, name: 'Pumpkin', image: '/img/pumpkin.png', value: 5 },
      { id: 2, name: 'Ghost', image: '/img/ghost.png', value: 10 },
      { id: 3, name: 'Hand', image: '/img/hand.png', value: 15 },
      { id: 4, name: 'Bats', image: '/img/bats.png', value: 20 },
      { id: 5, name: 'Hat', image: '/img/hat.png', value: 25 }
    ];
    
    return {
      balance: 0,
      betAmount: 1,
      lastWin: 0,
      totalWin: 0,
      isSpinning: false,
      loading: false,
      error: null,
      currentGameId: null,
      canCashout: false,
      multiplier: 1,
      symbols,
      reels: getInitialReels(symbols),
      winningLines: []
    };
  },

  getters: {
    canSpin: (state): boolean => {
      const authStore = useAuthStore();
      return authStore.userBalance >= state.betAmount && !state.isSpinning;
    },

    currentPayout: (state): number => {
      return state.lastWin * state.multiplier;
    },

    formattedBet: (state): string => {
      return `${state.betAmount.toFixed(2)}€`;
    },

    formattedLastWin: (state): string => {
      return `${state.lastWin.toFixed(2)}€`;
    }
  },

  actions: {
    async startGame() {
      const authStore = useAuthStore();
      
      if (!authStore.token) {
        this.error = 'Please login to play';
        return;
      }

      if (authStore.userBalance < this.betAmount) {
        this.error = 'Insufficient balance';
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          `${API_URL}/casino/halloween-slots/start`,
          { betAmount: this.betAmount },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          this.currentGameId = response.data.gameId;
          authStore.updateBalance(response.data.newBalance);
          this.isSpinning = true;
          await this.spin();
        }
      } catch (error: any) {
        console.error('[HALLOWEEN-SLOTS] Error starting game:', error);
        this.error = error.response?.data?.message || 'Failed to start game';
      } finally {
        this.loading = false;
      }
    },

    async spin() {
      const authStore = useAuthStore();
      
      if (!this.currentGameId) {
        console.error('[HALLOWEEN-SLOTS] No active game');
        return;
      }

      try {
        // Simulate spinning animation
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate random results
        this.reels = this.reels.map(() => 
          Array(3).fill(null).map(() => 
            this.symbols[Math.floor(Math.random() * this.symbols.length)]
          )
        );

        // Send spin results to server
        const response = await axios.post(
          `${API_URL}/casino/halloween-slots/spin`,
          {
            gameId: this.currentGameId,
            reels: this.reels,
            betAmount: this.betAmount
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          // Update balance and game state with server response
          authStore.updateBalance(response.data.newBalance);
          this.lastWin = response.data.winAmount;
          this.winningLines = response.data.winningLines || [];
          this.multiplier = response.data.multiplier || 1;
          
          if (this.lastWin > 0) {
            this.totalWin += this.lastWin;
          }
        }

      } catch (error: any) {
        console.error('[HALLOWEEN-SLOTS] Error during spin:', error);
        this.error = error.response?.data?.message || 'Failed to process spin';
      } finally {
        this.isSpinning = false;
      }
    },

    calculateWins() {
      let totalWin = 0;
      const winningLines: number[] = [];

      // Check horizontal lines
      for (let row = 0; row < 3; row++) {
        const symbols = this.reels.map(reel => reel[row]);
        const firstSymbol = symbols[0];
        
        if (symbols.every(symbol => symbol.id === firstSymbol.id)) {
          const baseValue = firstSymbol.value;
          const matchCount = symbols.length;
          const winAmount = baseValue * matchCount * this.betAmount;
          totalWin += winAmount;
          winningLines.push(row);
        }
      }

      this.lastWin = totalWin;
      this.winningLines = winningLines;
      this.isSpinning = false;

      // Always process the result, whether win or loss
      this.processResult(totalWin);
    },

    async processResult(winAmount: number) {
      const authStore = useAuthStore();
      
      try {
        const response = await axios.post(
          `${API_URL}/casino/halloween-slots/spin`,
          {
            gameId: this.currentGameId,
            winAmount
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          // Always update balance from server response
          authStore.updateBalance(response.data.newBalance);
          
          if (winAmount > 0) {
            this.totalWin += winAmount;
          }
        }
      } catch (error: any) {
        console.error('[HALLOWEEN-SLOTS] Error processing result:', error);
        this.error = error.response?.data?.message || 'Failed to process result';
      }
    },

    resetGame() {
      this.isSpinning = false;
      this.lastWin = 0;
      this.totalWin = 0;
      this.error = null;
      this.currentGameId = null;
      this.winningLines = [];
      this.multiplier = 1;
      this.reels = [[], [], []];
    },

    increaseBet() {
      const maxBet = 100; // Set your maximum bet limit
      if (this.betAmount < maxBet) {
        this.betAmount = Math.min(this.betAmount + 1, maxBet);
      }
    },

    decreaseBet() {
      const minBet = 1; // Set your minimum bet limit
      if (this.betAmount > minBet) {
        this.betAmount = Math.max(this.betAmount - 1, minBet);
      }
    }
  }
}); 