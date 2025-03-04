import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Symbol {
  id: number;
  name: string;
  symbol: string;
  value: number;
  isBonus?: boolean;
  weight?: number;
  multiplier?: number;
}

interface WinCombination {
  symbol: string;
  count: number;
  positions: string[];
  multiplier: number;
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
  freeSpinsRemaining: number;
  grid: string[][];
  finalGrid: string[][];
  winAmount: number;
  showWinModal: boolean;
  winningPositions: string[];
  matchCount: number;
  currentMultiplier: number;
  currentColumn: number;
  revealedColumns: boolean[];
  winCombinations: WinCombination[];
  showPaytable: boolean;
}

export const useNewSlotsStore = defineStore('newSlots', {
  state: (): GameState => {
    const symbols = [
      { id: 1, name: 'Bonus', symbol: '🎲', value: 0, isBonus: true, weight: 1 },
      { id: 2, name: 'Super Star', symbol: '💫', value: 50, weight: 3, multiplier: 50 },
      { id: 3, name: 'Golden Star', symbol: '⭐', value: 25, weight: 5, multiplier: 25 },
      { id: 4, name: 'Glowing Star', symbol: '🌟', value: 15, weight: 7, multiplier: 15 },
      { id: 5, name: 'Comet', symbol: '☄️', value: 10, weight: 10, multiplier: 10 },
      { id: 6, name: 'Sun', symbol: '🌞', value: 8, weight: 12, multiplier: 8 },
      { id: 7, name: 'Moon', symbol: '🌙', value: 6, weight: 15, multiplier: 6 },
      { id: 8, name: 'Lightning', symbol: '⚡', value: 5, weight: 18, multiplier: 5 },
      { id: 9, name: 'Sparkles', symbol: '✨', value: 4, weight: 20, multiplier: 4 },
      { id: 10, name: 'Earth', symbol: '🌎', value: 3, weight: 22, multiplier: 3 },
      { id: 11, name: 'Earth Alt', symbol: '🌍', value: 3, weight: 22, multiplier: 3 }
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
      reels: [],
      winningLines: [],
      freeSpinsRemaining: 0,
      grid: Array(4).fill(null).map(() => Array(5).fill("🎰")),
      finalGrid: [],
      winAmount: 0,
      showWinModal: false,
      winningPositions: [],
      matchCount: 0,
      currentMultiplier: 0,
      currentColumn: -1,
      revealedColumns: Array(5).fill(false),
      winCombinations: [],
      showPaytable: false
    };
  },

  getters: {
    canSpin: (state): boolean => {
      const authStore = useAuthStore();
      return (authStore.userBalance >= state.betAmount || state.freeSpinsRemaining > 0) && !state.isSpinning;
    },

    isFreeSpinMode: (state): boolean => {
      return state.freeSpinsRemaining > 0;
    },

    weightedSymbols: (state) => {
      return state.symbols.reduce((acc, config) => {
        return acc.concat(Array(config.weight).fill(config.symbol));
      }, [] as string[]);
    }
  },

  actions: {
    async startGame() {
      const authStore = useAuthStore();
      console.log('[NEW-SLOTS] Starting game with bet:', this.betAmount);
      console.log('[NEW-SLOTS] Current balance:', authStore.userBalance);
      
      if (!authStore.token) {
        this.error = 'Please login to play';
        return;
      }

      try {
        const response = await axios.post(
          `${API_URL}/casino/new-slots/start`,
          { betAmount: this.betAmount },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          console.log('[NEW-SLOTS] Game started successfully:', response.data);
          this.currentGameId = response.data.gameId;
          authStore.updateBalance(response.data.newBalance);
          console.log('[NEW-SLOTS] Balance after bet:', response.data.newBalance);
          this.isSpinning = true;
          return response.data;
        }
      } catch (error: any) {
        console.error('[NEW-SLOTS] Error starting game:', error);
        this.error = error.response?.data?.message || 'Failed to start game';
        throw error;
      }
    },

    getRandomSymbol() {
      const randomIndex = Math.floor(Math.random() * this.weightedSymbols.length);
      return this.weightedSymbols[randomIndex];
    },

    getSymbolMultiplier(symbol: string, count: number) {
      if (count < 7) return 0;

      const symbolConfig = this.symbols.find(config => config.symbol === symbol);
      const baseMultiplier = symbolConfig?.multiplier || 1;

      const countMultiplier = {
        7: 1,
        8: 1.5,
        9: 2,
        10: 3,
        11: 4,
        12: 5
      }[Math.min(count, 12)] || 5;

      return baseMultiplier * countMultiplier;
    },

    checkWins() {
      const counts = new Map<string, { count: number; positions: string[] }>();
      this.winCombinations = [];
      let totalMultiplier = 0;

      // Check for bonus symbols
      const bonusPositions: string[] = [];
      const bonusColumns = new Set<number>();

      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
          if (this.grid[row][col] === "🎲") {
            bonusPositions.push(`${row}-${col}`);
            bonusColumns.add(col);
          }
        }
      }

      // Trigger free spins
      if (bonusColumns.size >= 4 && !this.freeSpinsRemaining) {
        this.freeSpinsRemaining = 5;
        this.winningPositions.push(...bonusPositions);
        this.showWinModal = true;
      }

      // Count symbols
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 5; col++) {
          const symbol = this.grid[row][col];
          if (!counts.has(symbol)) {
            counts.set(symbol, { count: 0, positions: [] });
          }
          const data = counts.get(symbol)!;
          data.count++;
          data.positions.push(`${row}-${col}`);
        }
      }

      // Find winning combinations
      counts.forEach((data, symbol) => {
        if (data.count >= 7 && !this.symbols.find(s => s.symbol === symbol)?.isBonus) {
          const multiplier = this.getSymbolMultiplier(symbol, data.count);
          this.winCombinations.push({
            symbol,
            count: data.count,
            positions: data.positions,
            multiplier
          });
          totalMultiplier += multiplier;
        }
      });

      this.winningPositions = this.winCombinations.flatMap(win => win.positions);
      this.matchCount = this.winCombinations.reduce((total, win) => total + win.count, 0);
      this.currentMultiplier = totalMultiplier;

      return totalMultiplier;
    },

    async spin() {
      if (!this.canSpin) return;

      try {
        console.log('[NEW-SLOTS] Starting spin...');
        this.showWinModal = false;
        this.winAmount = 0;
        this.winningPositions = [];
        this.revealedColumns = Array(5).fill(false);

        await this.startGame();

        // Generate final grid
        this.finalGrid = Array(4)
          .fill(null)
          .map(() => Array(5).fill(null).map(() => this.getRandomSymbol()));

        // Reveal columns
        for (let col = 0; col < 5; col++) {
          await new Promise(resolve => {
            setTimeout(() => {
              this.currentColumn = col;

              setTimeout(() => {
                for (let row = 0; row < 4; row++) {
                  this.grid[row][col] = this.finalGrid[row][col];
                }
                this.revealedColumns[col] = true;

                if (col === 4) {
                  const multiplier = this.checkWins();
                  this.winAmount = this.betAmount * multiplier;

                  if (multiplier > 0 || this.freeSpinsRemaining === 5) {
                    this.showWinModal = true;
                    setTimeout(() => {
                      this.showWinModal = false;
                    }, 3000);
                  }

                  this.currentColumn = -1;
                  this.isSpinning = false;
                  this.processResult(this.winAmount);
                }
                resolve(null);
              }, 800);
            }, col * 1000);
          });
        }

      } catch (error) {
        console.error('[NEW-SLOTS] Error during spin:', error);
        this.error = error.message || 'Failed to spin';
        throw error;
      }
    },

    calculateWins() {
      console.log('[NEW-SLOTS] Calculating wins...');
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
          console.log('[NEW-SLOTS] Win on line:', row, 'Amount:', winAmount);
        }
      }

      console.log('[NEW-SLOTS] Total win:', totalWin);
      this.lastWin = totalWin;
      this.winningLines = winningLines;
      this.isSpinning = false;

      // Always process the result
      this.processResult(totalWin);
    },

    async processResult(winAmount: number) {
      const authStore = useAuthStore();
      console.log('[NEW-SLOTS] Processing result. Win amount:', winAmount);
      
      try {
        const response = await axios.post(
          `${API_URL}/casino/new-slots/spin`,
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
          console.log('[NEW-SLOTS] Result processed. New balance:', response.data.newBalance);
          authStore.updateBalance(response.data.newBalance);
          
          if (winAmount > 0) {
            this.totalWin += winAmount;
            console.log('[NEW-SLOTS] Total wins updated:', this.totalWin);
          }
        }
      } catch (error: any) {
        console.error('[NEW-SLOTS] Error processing result:', error);
        this.error = error.response?.data?.message || 'Failed to process result';
        throw error;
      }
    },

    increaseBet() {
      const maxBet = 100;
      if (this.betAmount < maxBet) {
        this.betAmount = Math.min(this.betAmount + 1, maxBet);
      }
    },

    decreaseBet() {
      const minBet = 1;
      if (this.betAmount > minBet) {
        this.betAmount = Math.max(this.betAmount - 1, minBet);
      }
    }
  }
}); 