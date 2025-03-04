import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';

const API_URL = import.meta.env.VITE_API_URL;

interface Symbol {
  name: string;
  value: number;
  image: string;
}

interface SlotPenState {
  credits: number;
  spend: number;
  win: number;
  resultData: Symbol[] | false;
  canLock: boolean;
  wasLocked: boolean;
  isSpinning: boolean;
  error: string | null;
  currentGameId: string | null;
}

export const useSlotPenStore = defineStore('slotPen', {
  state: (): SlotPenState => ({
    credits: 6,
    spend: 6,
    win: 0,
    resultData: false,
    canLock: true,
    wasLocked: false,
    isSpinning: false,
    error: null,
    currentGameId: null
  }),

  actions: {
    async spin() {
      const authStore = useAuthStore();
      
      if (!authStore.token) {
        this.error = 'Please login to play';
        return;
      }

      if (this.isSpinning) return;

      if (this.credits <= 0) {
        this.error = 'Insufficient credits';
        return;
      }

      this.isSpinning = true;
      this.error = null;

      try {
        const response = await axios.post(
          `${API_URL}/casino/slotpen/spin`,
          {
            betAmount: 0.5
          },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`
            }
          }
        );

        if (response.data.success) {
          this.credits -= 0.5;
          this.currentGameId = response.data.gameId;
          return response.data;
        }
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Failed to spin';
      } finally {
        this.isSpinning = false;
      }
    },

    insertCoin() {
      this.credits += 0.5;
      this.spend += 0.5;
    },

    takeWin() {
      if (this.win > 0) {
        this.credits += this.win;
        this.win = 0;
      }
    },

    addResult(result: Symbol, wasLocked: boolean) {
      if (!this.resultData) {
        this.resultData = [];
      }
      if (wasLocked) this.wasLocked = wasLocked;
      this.resultData.push(result);
    },

    checkWin() {
      if (!this.resultData || this.resultData.length !== 3) return;

      const [v1, v2, v3] = this.resultData;
      
      if (v1.name === v2.name && v2.name === v3.name) {
        this.win += v1.value;
        this.wasLocked = true;
      }

      this.resultData = false;
      
      if (this.wasLocked) {
        this.wasLocked = false;
        this.canLock = false;
      } else {
        this.canLock = true;
      }
    },

    reset() {
      this.credits = 6;
      this.spend = 6;
      this.win = 0;
      this.resultData = false;
      this.canLock = true;
      this.wasLocked = false;
      this.isSpinning = false;
      this.error = null;
      this.currentGameId = null;
    }
  }
}); 