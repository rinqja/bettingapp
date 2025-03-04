import { defineStore } from "pinia";
import axios from '../../utils/axios';
import { useAuthStore } from "../auth";

const API_URL = import.meta.env.VITE_API_URL;

interface WheelState {
  reels: string[][];
  betAmount: number;
  isSpinning: boolean;
  lastWin: number;
  totalWin: number;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  winningLines: number[];
  multiplier: number;
}

export const useWheelStore = defineStore("wheel", {
  state: (): WheelState => ({
    reels: Array(3)
      .fill([])
      .map(() => []),
    betAmount: 1,
    isSpinning: false,
    lastWin: 0,
    totalWin: 0,
    loading: false,
    error: null,
    currentGameId: null,
    winningLines: [],
    multiplier: 1,
  }),

  actions: {
    async spin() {
      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Please login to play";
        return;
      }

      if (this.isSpinning) return;

      const currentBalance = authStore.userBalance;
      if (currentBalance < this.betAmount) {
        this.error = "Insufficient balance";
        return;
      }

      this.isSpinning = true;
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post(
          `${API_URL}/casino/wheel/spin`,
          {
            betAmount: this.betAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          this.currentGameId = response.data.gameId;
          this.reels = response.data.reels;
          this.lastWin = response.data.winAmount;
          this.totalWin += response.data.winAmount;
          this.winningLines = response.data.winningLines;
          this.multiplier = response.data.multiplier;
          authStore.updateBalance(response.data.newBalance);
        }
      } catch (error: any) {
        console.error("[WHEEL] Error spinning:", error);
        this.error = error.response?.data?.message || "Failed to spin";
      } finally {
        this.isSpinning = false;
        this.loading = false;
      }
    },

    setBetAmount(amount: number) {
      if (!this.isSpinning) {
        this.betAmount = amount;
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
    },
  },
});
