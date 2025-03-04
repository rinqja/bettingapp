import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Tile {
  revealed: boolean;
  isMine: boolean;
}

interface MinesState {
  tiles: Tile[];
  betAmount: number;
  minesCount: number;
  currentMultiplier: number;
  currentProfit: number;
  isGameActive: boolean;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  canCashout: boolean;
  minePositions: number[];
  revealedCount: number;
}

export const useMinesStore = defineStore('mines', {
  state: (): MinesState => ({
    tiles: Array(25).fill(null).map(() => ({
      revealed: false,
      isMine: false
    })),
    betAmount: 1,
    minesCount: 5,
    currentMultiplier: 1,
    currentProfit: 0,
    isGameActive: false,
    loading: false,
    error: null,
    currentGameId: null,
    canCashout: false,
    minePositions: [],
    revealedCount: 0
  }),

  actions: {
    async startGame() {
      const authStore = useAuthStore();
      
      if (!authStore.token) {
        this.error = 'Please login to play';
        return;
      }

      const currentBalance = authStore.userBalance;
      if (currentBalance < this.betAmount) {
        this.error = 'Insufficient balance';
        return;
      }

      console.log('[MINES] Starting new game', {
        betAmount: this.betAmount,
        minesCount: this.minesCount,
        currentBalance
      });

      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          `${API_URL}/casino/mines/start`,
          {
            betAmount: this.betAmount
          },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          console.log('[MINES] Game started successfully', {
            gameId: response.data.gameId,
            previousBalance: currentBalance,
            newBalance: response.data.newBalance,
            betAmount: this.betAmount
          });
          
          this.currentGameId = response.data.gameId;
          this.isGameActive = true;
          this.canCashout = true;
          this.revealedCount = 0;
          authStore.updateBalance(response.data.newBalance);
          this.generateMines();
          this.resetTiles();
        }
      } catch (error: any) {
        console.error('[MINES] Error starting game:', error);
        this.error = error.response?.data?.message || 'Failed to start game';
      } finally {
        this.loading = false;
      }
    },

    generateMines() {
      this.minePositions = [];
      while (this.minePositions.length < this.minesCount) {
        const position = Math.floor(Math.random() * 25);
        if (!this.minePositions.includes(position)) {
          this.minePositions.push(position);
        }
      }
      console.log('[MINES] Generated mine positions:', this.minePositions);
    },

    calculateMultiplier() {
      // Base multiplier calculation
      const safeSquares = 25 - this.minesCount;
      const revealed = this.revealedCount;
      
      if (revealed === 0) return 1;
      
      // This is a simple multiplier formula, can be adjusted
      const baseMultiplier = 1 + (revealed * 0.2);
      const riskMultiplier = 1 + (this.minesCount * 0.1);
      const finalMultiplier = baseMultiplier * riskMultiplier;
      
      return Number(finalMultiplier.toFixed(2));
    },

    async revealTile(index: number) {
      if (!this.isGameActive || this.loading || this.tiles[index].revealed) return;

      const isMine = this.minePositions.includes(index);
      
      // First reveal the clicked tile
      this.tiles[index].revealed = true;
      this.tiles[index].isMine = isMine;

      if (isMine) {
        console.log('[MINES] Hit mine at position:', index);
        
        // Reset multiplier and profit when hitting a mine
        this.currentMultiplier = 1;
        this.currentProfit = 0;
        
        // When hitting a mine, reveal all other tiles but keep already revealed tiles
        for (let i = 0; i < 25; i++) {
          if (!this.tiles[i].revealed) {
            this.tiles[i].revealed = true;
            this.tiles[i].isMine = this.minePositions.includes(i);
          }
        }

        console.log('[MINES] Game Over - Revealed all tiles:', {
          minePositions: this.minePositions,
          revealedTiles: this.tiles.filter(t => t.revealed).length,
          currentMultiplier: this.currentMultiplier,
          currentProfit: this.currentProfit
        });

        this.endGame(true);
      } else {
        this.revealedCount++;
        this.currentMultiplier = this.calculateMultiplier();
        this.currentProfit = this.betAmount * (this.currentMultiplier - 1);
        
        console.log('[MINES] Revealed safe tile:', {
          position: index,
          revealedCount: this.revealedCount,
          newMultiplier: this.currentMultiplier,
          currentProfit: this.currentProfit
        });

        // Check if all safe tiles are revealed
        if (this.revealedCount === (25 - this.minesCount)) {
          console.log('[MINES] All safe tiles revealed - Auto cashout');
          this.cashout();
        }
      }
    },

    async cashout() {
      if (!this.isGameActive || !this.canCashout) return;

      const authStore = useAuthStore();
      const winAmount = this.betAmount * this.currentMultiplier;
      
      console.log('[MINES] Processing cashout:', {
        gameId: this.currentGameId,
        betAmount: this.betAmount,
        multiplier: this.currentMultiplier,
        winAmount
      });

      this.loading = true;

      try {
        const response = await axios.post(
          `${API_URL}/casino/mines/cashout`,
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
          console.log('[MINES] Cashout successful', {
            previousBalance: authStore.userBalance,
            winAmount,
            newBalance: response.data.newBalance,
            profit: winAmount - this.betAmount
          });
          authStore.updateBalance(response.data.newBalance);
          this.endGame(false);
        }
      } catch (error: any) {
        console.error('[MINES] Error processing cashout:', error);
        this.error = error.response?.data?.message || 'Failed to process cashout';
      } finally {
        this.loading = false;
      }
    },

    endGame(hitMine: boolean) {
      this.isGameActive = false;
      this.canCashout = false;
      
      if (hitMine) {
        console.log('[MINES] Game over - Hit mine', {
          revealedTiles: this.tiles.filter(t => t.revealed).length,
          minePositions: this.minePositions
        });
      } else {
        console.log('[MINES] Game over - Successful cashout');
      }
    },

    resetTiles() {
      this.tiles = Array(25).fill(null).map(() => ({
        revealed: false,
        isMine: false
      }));
      this.revealedCount = 0;
    },

    resetGame() {
      this.isGameActive = false;
      this.canCashout = false;
      this.currentMultiplier = 1;
      this.currentProfit = 0;
      this.error = null;
      this.currentGameId = null;
      this.minePositions = [];
      this.revealedCount = 0;
      this.resetTiles();
    }
  }
}); 