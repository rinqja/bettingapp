import { defineStore } from 'pinia';
import axios from '../../utils/axios';

import { useAuthStore } from '../auth';
import { useNotification } from '@kyvg/vue3-notification';

const API_URL = import.meta.env.VITE_API_URL;

interface Bet {
  type: string;
  numbers: number[];
  amount: number;
}

interface RouletteState {
  betAmount: number;
  currentBets: Bet[];
  isGameActive: boolean;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  lastNumber: number | null;
  history: number[];
  totalBet: number;
  potentialWin: number;
  spinDuration: number;
  isSpinning: boolean;
  data: {
    items: any[];
    targetIndex: number;
  };
}

export const useRouletteStore = defineStore('roulette', {
  state: (): RouletteState => ({
    betAmount: 1,
    currentBets: [],
    isGameActive: false,
    loading: false,
    error: null,
    currentGameId: null,
    lastNumber: null,
    history: [],
    totalBet: 0,
    potentialWin: 0,
    spinDuration: 4000,
    isSpinning: false,
    data: {
      items: [],
      targetIndex: 0
    }
  }),

  actions: {
    initializeWheel(items: any[]) {
      this.data.items = items;
    },

    async startGame() {
      const authStore = useAuthStore();
      
      try {
        console.log('[ROULETTE-FRONTEND] Starting game:', {
          currentBalance: authStore.userBalance,
          totalBet: this.totalBet
        });

        const response = await axios.post(
          `${API_URL}/casino/roulette/start`,
          { totalBet: this.totalBet },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          const newBalance = typeof response.data.newBalance === 'object' 
            ? Number(response.data.newBalance.balance) 
            : Number(response.data.newBalance);

          console.log('[ROULETTE-FRONTEND] Game started:', {
            previousBalance: authStore.userBalance,
            newBalance: newBalance,
            totalBet: this.totalBet,
            response: response.data
          });

          if (!isNaN(newBalance)) {
            authStore.updateBalance(newBalance);
          } else {
            console.error('[ROULETTE-FRONTEND] Invalid balance received:', response.data.newBalance);
          }
          
          this.currentGameId = response.data.gameId;
          this.isGameActive = true;
        }
      } catch (error: any) {
        console.error('[ROULETTE-FRONTEND] Error starting game:', error);
        this.error = error.response?.data?.message || 'Failed to start game';
      }
    },

    async spinWheel() {
      console.log('[ROULETTE-DEBUG] Store spinWheel called');
      const authStore = useAuthStore();
      
      try {
        if (!this.currentGameId) {
          console.log('[ROULETTE-DEBUG] No game ID, starting new game');
          await this.startGame();
        }

        if (this.currentGameId) {
          console.log('[ROULETTE-DEBUG] Starting spin with gameId:', this.currentGameId);
          
          // Generate result first but don't show it
          const number = Math.floor(Math.random() * 37);
          this.lastNumber = number;
          
          // Start spinning animation
          this.isSpinning = true;
          
          // Initial slow spin (acceleration phase)
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Full speed spinning
          
          // Deceleration phase before showing final result
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Calculate and process win after spin completes
          const winAmount = this.calculateWinAmount(number);
          console.log('[ROULETTE-DEBUG] Spin result:', {
            number,
            winAmount,
            currentBalance: authStore.userBalance
          });
          
          if (winAmount > 0) {
            await this.processPayout(winAmount);
          }
          
          // Add to history
          this.addToHistory({
            number,
            color: this.getNumberColor(number),
            timestamp: new Date()
          });
          
          // Show notification after spin completes
          setTimeout(() => {
            this.showResultNotification(winAmount);
          }, 500);
          
          // Reset spinning state
          this.isSpinning = false;
        }
      } catch (error) {
        console.error('[ROULETTE-DEBUG] Error during spin:', error);
        this.isSpinning = false;
      } finally {
        // Reset game state after everything is complete
        setTimeout(() => {
          this.resetGame();
        }, 1500);
      }
    },

    calculateWinAmount(number: number): number {
      let totalWin = 0;
      
      this.currentBets.forEach(bet => {
        if (bet.numbers.includes(number)) {
          const multiplier = this.getBetMultiplier(bet.type);
          totalWin += bet.amount * multiplier;
        }
      });

      return totalWin;
    },

    addBet(type: string, numbers: number[], amount: number) {
      if (this.isGameActive || this.loading) return;

      // Check for existing bet of same type
      const existingBetIndex = this.currentBets.findIndex(
        bet => bet.type === type && JSON.stringify(bet.numbers) === JSON.stringify(numbers)
      );

      if (existingBetIndex !== -1) {
        // Update existing bet amount
        this.currentBets[existingBetIndex].amount += amount;
      } else {
        // Add new bet
        this.currentBets.push({ type, numbers, amount });
      }

      this.calculatePotentialWin();
      this.totalBet = this.calculateTotalBet();
    },

    removeBet(index: number) {
      if (this.isGameActive || this.loading) return;
      
      this.currentBets.splice(index, 1);
      this.calculatePotentialWin();
      this.totalBet = this.calculateTotalBet();
    },

    calculateTotalBet(): number {
      return this.currentBets.reduce((total, bet) => total + bet.amount, 0);
    },

    calculatePotentialWin() {
      this.potentialWin = this.currentBets.reduce((total, bet) => {
        const multiplier = this.getBetMultiplier(bet.type);
        return total + (bet.amount * multiplier);
      }, 0);
    },

    getBetMultiplier(betType: string): number {
      const multipliers: Record<string, number> = {
        'straight': 35,
        'split': 17,
        'street': 11,
        'corner': 8,
        'line': 5,
        'column': 2,
        'dozen': 2,
        'red': 1,
        'black': 1,
        'even': 1,
        'odd': 1,
        '1to18': 1,
        '19to36': 1
      };
      return multipliers[betType] || 0;
    },

    resetGame() {
      console.log('[ROULETTE-DEBUG] Resetting game state:', {
        currentBets: this.currentBets,
        currentGameId: this.currentGameId,
        isGameActive: this.isGameActive
      });
      
      this.currentBets = [];
      this.currentGameId = null;
      this.potentialWin = 0;
      this.totalBet = 0;
      this.isGameActive = false;
    },

    showResultNotification(winAmount: number) {
      const { notify } = useNotification();
      
      if (winAmount > 0) {
        notify({
          title: 'Winner!',
          text: `Congratulations! You won ${winAmount.toFixed(2)} €!`,
          type: 'success',
          duration: 3000
        });
      } else {
        notify({
          title: 'Better luck next time!',
          text: 'Try again for another chance to win!',
          type: 'error',
          duration: 3000
        });
      }
    },

    async processPayout(amount: number) {
      const authStore = useAuthStore();
      
      try {
        console.log('[ROULETTE-FRONTEND] Processing win:', {
          currentBalance: authStore.userBalance,
          gameId: this.currentGameId,
          winAmount: amount
        });

        if (!this.currentGameId) {
          console.error('[ROULETTE-FRONTEND] No game ID found when processing win');
          return;
        }

        const response = await axios.post(
          `${API_URL}/casino/roulette/processWin`,
          {
            gameId: this.currentGameId,
            winAmount: Number(amount)
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          const newBalance = typeof response.data.newBalance === 'object' 
            ? Number(response.data.newBalance.balance) 
            : Number(response.data.newBalance);
          
          console.log('[ROULETTE-FRONTEND] Win processed:', {
            previousBalance: authStore.userBalance,
            winAmount: amount,
            newBalance: newBalance,
            response: response.data
          });

          if (!isNaN(newBalance)) {
            authStore.updateBalance(newBalance);
          } else {
            console.error('[ROULETTE-FRONTEND] Invalid balance received:', response.data.newBalance);
          }
        }
      } catch (error: any) {
        console.error('[ROULETTE-FRONTEND] Error processing win:', error);
        this.error = error.response?.data?.message || 'Failed to process win';
      }
    },

    addToHistory(result: { number: number; color: string; timestamp: Date }) {
      this.history.unshift(result.number);
    },

    getNumberColor(number: number): string {
      if (number === 0) return 'green';
      const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      return redNumbers.includes(number) ? 'red' : 'black';
    }
  }
}); 