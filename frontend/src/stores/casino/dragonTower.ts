import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Tile {
  revealed: boolean;
  isDragon: boolean;
}

interface Row {
  tiles: Tile[];
  revealed: boolean;
}

interface DifficultyConfig {
  name: string;
  columns: number;
  dragonsPerRow: number;
  baseMultiplier: number;
  dragonChance?: number; // Optional for Easy mode
}

export const DIFFICULTY_CONFIGS: Record<string, DifficultyConfig> = {
  EASY: {
    name: 'Easy',
    columns: 4,
    dragonsPerRow: 1,
    baseMultiplier: 0.3,
    dragonChance: 0.25
  },
  MEDIUM: {
    name: 'Medium',
    columns: 3,
    dragonsPerRow: 1,
    baseMultiplier: 0.5,
    dragonChance: 0.33
  },
  HARD: {
    name: 'Hard',
    columns: 2,
    dragonsPerRow: 1,
    baseMultiplier: 0.8,
    dragonChance: 0.5
  },
  EXPERT: {
    name: 'Expert',
    columns: 3,
    dragonsPerRow: 2,
    baseMultiplier: 1.0,
    dragonChance: 0.66
  },
  MASTER: {
    name: 'Master',
    columns: 4,
    dragonsPerRow: 3,
    baseMultiplier: 1.2,
    dragonChance: 0.75
  }
};

interface DragonTowerState {
  rows: Row[];
  betAmount: number;
  dragonsPerRow: number;
  currentMultiplier: number;
  currentProfit: number;
  isGameActive: boolean;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  canCashout: boolean;
  currentRow: number;
  maxColumns: number;
  difficulty: string;
  baseMultiplier: number;
}

export const useDragonTowerStore = defineStore('dragonTower', {
  state: (): DragonTowerState => {
    const defaultConfig = DIFFICULTY_CONFIGS['EASY'];
    return {
      rows: Array(10).fill(null).map(() => ({
        tiles: Array(4).fill(null).map(() => ({
          revealed: false,
          isDragon: false
        })),
        revealed: false
      })),
      betAmount: 1,
      dragonsPerRow: 1,
      currentMultiplier: 1,
      currentProfit: 0,
      isGameActive: false,
      loading: false,
      error: null,
      currentGameId: null,
      canCashout: false,
      currentRow: 0,
      maxColumns: defaultConfig.columns,
      difficulty: 'EASY',
      baseMultiplier: defaultConfig.baseMultiplier
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
          `${API_URL}/casino/dragonTower/start`,
          { betAmount: this.betAmount },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          this.currentGameId = response.data.gameId;
          this.isGameActive = true;
          this.canCashout = true;
          this.currentRow = 0;
          authStore.updateBalance(response.data.newBalance);
          this.resetTower();
          this.generateDragons();
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to start game';
      } finally {
        this.loading = false;
      }
    },

    generateDragons() {
      const config = DIFFICULTY_CONFIGS[this.difficulty];
      
      this.rows.forEach((row, rowIndex) => {
        if (rowIndex < 10) {
          // Reset dragon positions for this row
          row.tiles.forEach(tile => {
            tile.isDragon = false;
          });

          // Create array of available positions
          const positions = Array.from({ length: config.columns }, (_, i) => i);
          
          // Place the required number of dragons
          for (let i = 0; i < config.dragonsPerRow; i++) {
            if (positions.length > 0) {
              // Randomly select a position from remaining positions
              const randomIndex = Math.floor(Math.random() * positions.length);
              const position = positions[randomIndex];
              
              // Place dragon and remove the used position
              row.tiles[position].isDragon = true;
              positions.splice(randomIndex, 1);
            }
          }
        }
      });

      // Debug log to verify dragon placement
      console.log('[DRAGON-TOWER] Dragon positions:', 
        this.rows.map((row, i) => ({
          row: i,
          dragons: row.tiles.filter(t => t.isDragon).length
        }))
      );
    },

    calculateMultiplier(column: number): number {
      const config = DIFFICULTY_CONFIGS[this.difficulty];
      const multiplier = 1 + (column * config.baseMultiplier);
      return Number(multiplier.toFixed(2));
    },

    async revealTile(columnIndex: number, tileIndex: number) {
      if (!this.isGameActive || this.loading || columnIndex !== this.currentRow) return;

      const column = this.rows[columnIndex];
      const tile = column.tiles[tileIndex];

      if (tile.revealed) return;

      tile.revealed = true;
      column.revealed = true;

      if (tile.isDragon) {
        // Game over - hit dragon
        this.revealAllDragons();
        await this.processLoss();
        this.endGame(true);
      } else {
        // Safe tile - continue game
        this.currentRow++;
        this.currentMultiplier = this.calculateMultiplier(this.currentRow);
        this.currentProfit = this.betAmount * (this.currentMultiplier - 1);
        
        if (this.currentRow >= 10) { // Always climb 10 rows
          // Reached the top - auto cashout
          await this.cashout();
        }
      }
    },
    async processLoss() {
        const authStore = useAuthStore();
        
        try {
          await axios.post(
            `${API_URL}/casino/dragonTower/processLoss`,
            {
              gameId: this.currentGameId
            },
            {
              headers: {
                Authorization: `Bearer ${authStore.token}`
              }
            }
          );
        } catch (error: any) {
          console.error('[DRAGON-TOWER] Error processing loss:', error);
        }
      },
    revealAllDragons() {
      this.rows.forEach(column => {
        column.tiles.forEach(tile => {
          if (tile.isDragon) {
            tile.revealed = true;
          }
        });
      });
    },

    async cashout() {
      if (!this.isGameActive || !this.canCashout) return;

      const authStore = useAuthStore();
      const winAmount = this.betAmount * this.currentMultiplier;

      this.loading = true;

      try {
        const response = await axios.post(
          `${API_URL}/casino/dragonTower/processWin`,
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
          this.revealAllDragons();
          authStore.updateBalance(response.data.newBalance);
          this.endGame(false);
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to process win';
      } finally {
        this.loading = false;
      }
    },

    endGame(hitDragon: boolean) {
      this.isGameActive = false;
      this.canCashout = false;
      
      if (hitDragon) {
        this.currentMultiplier = 1;
        this.currentProfit = 0;
      }
    },

    resetTower() {
      const config = DIFFICULTY_CONFIGS[this.difficulty];
      this.rows = Array(10).fill(null).map(() => ({
        tiles: Array(config.columns).fill(null).map(() => ({
          revealed: false,
          isDragon: false
        })),
        revealed: false
      }));
      this.currentRow = 0;
      this.currentMultiplier = 1;
      this.currentProfit = 0;
    },

    setDifficulty(difficulty: string) {
      if (!this.isGameActive && DIFFICULTY_CONFIGS[difficulty]) {
        const config = DIFFICULTY_CONFIGS[difficulty];
        this.difficulty = difficulty;
        this.maxColumns = config.columns;
        this.dragonsPerRow = config.dragonsPerRow;
        this.baseMultiplier = config.baseMultiplier;
        this.resetTower();
      }
    }
  }
}); 