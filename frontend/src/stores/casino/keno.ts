import { defineStore } from "pinia";
import axios from '../../utils/axios';
import { useAuthStore } from "../auth";

const API_URL = import.meta.env.VITE_API_URL;

interface KenoState {
  betAmount: number;
  selectedNumbers: number[];
  drawnNumbers: number[];
  matches: number[];
  winAmount: number;
  isGameActive: boolean;
  loading: boolean;
  error: string | null;
  currentMultiplier: number;
  currentGameId: string | null;
  currentDrawingNumber: number | null;
  profit: number;
  showResults: boolean;
  gameSelectedNumbers: number[];
}

export const useKenoStore = defineStore("keno", {
  state: (): KenoState => ({
    betAmount: 1,
    selectedNumbers: [],
    drawnNumbers: [],
    matches: [],
    winAmount: 0,
    isGameActive: false,
    loading: false,
    error: null,
    currentMultiplier: 1,
    currentGameId: null,
    currentDrawingNumber: null,
    profit: 0,
    showResults: false,
    gameSelectedNumbers: [],
  }),

  actions: {
    async startGame() {
      if (this.selectedNumbers.length === 0) {
        this.error = "Please select numbers first";
        return;
      }

      const authStore = useAuthStore();

      if (!authStore.token) {
        this.error = "Please login to play";
        return;
      }

      const currentBalance = authStore.userBalance;
      console.log("[KENO] Starting new game", {
        betAmount: this.betAmount,
        selectedNumbers: this.selectedNumbers,
        currentBalance,
      });

      // Validate balance
      if (currentBalance < this.betAmount) {
        this.error = "Insufficient balance";
        return;
      }

      this.loading = true;
      this.error = null;

      // Store current selected numbers when game starts
      this.gameSelectedNumbers = [...this.selectedNumbers];

      // Only clear previous game states when starting a new valid game
      if (!this.error && this.betAmount > 0) {
        this.drawnNumbers = [];
        this.matches = [];
        this.showResults = false;
        this.winAmount = 0;
        this.currentMultiplier = 1;
      }

      try {
        // Clear previous results before starting new game
        this.drawnNumbers = [];
        this.matches = [];

        const response = await axios.post(
          `${API_URL}/casino/keno/start`,
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
          // Update balance after bet is placed
          const newBalance = currentBalance - this.betAmount;
          console.log("[KENO] Game started successfully", {
            gameId: response.data.gameId,
            previousBalance: currentBalance,
            deductedAmount: this.betAmount,
            newBalance,
            betAmount: this.betAmount,
          });

          this.currentGameId = response.data.gameId;
          this.isGameActive = true;
          authStore.updateBalance(newBalance);

          // Draw numbers and calculate winnings
          await this.drawNumbers();
          await this.calculateWinnings();
        }
      } catch (error: any) {
        console.error("[KENO] Error starting game:", {
          error: error.response?.data || error,
          betAmount: this.betAmount,
          selectedNumbers: this.selectedNumbers,
        });
        this.error = error.response?.data?.message || "Failed to start game";
      } finally {
        this.loading = false;
      }
    },

    async drawNumbers() {
      this.showResults = true;
      const numbers = new Set<number>();
      while (numbers.size < 10) {
        const newNumber = Math.floor(Math.random() * 40) + 1;
        // Only add numbers that haven't been previously drawn in this game
        if (!this.drawnNumbers.includes(newNumber)) {
          numbers.add(newNumber);
        }
      }

      // Draw numbers one by one with animation delay
      for (const number of Array.from(numbers)) {
        this.currentDrawingNumber = number;
        await new Promise((resolve) => setTimeout(resolve, 100)); // Reduced from 800ms
        this.drawnNumbers.push(number);

        // Check if it's a match and add to matches array
        if (this.selectedNumbers.includes(number)) {
          await new Promise((resolve) => setTimeout(resolve, 50)); // Reduced from 200ms
          this.matches.push(number);
        }
      }

      this.currentDrawingNumber = null;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Reduced from 1000ms
    },

    async calculateWinnings() {
      const matchCount = this.matches.length;
      const selectionCount = this.selectedNumbers.length;
      const authStore = useAuthStore();
      const currentBalance = authStore.userBalance;

      // Multiplier table based on selections and matches
      const multiplierTable = {
        10: { 10: 1000, 9: 400, 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        9: { 9: 400, 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        8: { 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        7: { 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        6: { 6: 5, 5: 2, 4: 1, 3: 0.5 },
        5: { 5: 2, 4: 1, 3: 0.5 },
        4: { 4: 1, 3: 0.5 },
        3: { 3: 0.5 },
        2: { 2: 0.5 },
        1: { 1: 0.5 },
      };

      const multipliers =
        multiplierTable[selectionCount as keyof typeof multiplierTable] || {};
      this.currentMultiplier =
        multipliers[matchCount as keyof typeof multipliers] || 0;
      this.winAmount = this.betAmount * this.currentMultiplier;
      this.profit = this.winAmount - this.betAmount; // Calculate profit

      console.log("[KENO] Game Result:", {
        selectedNumbers: this.selectedNumbers,
        drawnNumbers: this.drawnNumbers,
        matches: this.matches,
        matchCount,
        multiplier: this.currentMultiplier,
        betAmount: this.betAmount,
        winAmount: this.winAmount,
      });

      // If there's a win, process it immediately
      if (this.winAmount > 0) {
        this.loading = true;
        this.error = null;

        console.log("[KENO] Processing win...", {
          gameId: this.currentGameId,
          winAmount: this.winAmount,
          currentBalance,
        });

        try {
          const response = await axios.post(
            `${API_URL}/casino/keno/cashout`,
            {
              gameId: this.currentGameId,
              winAmount: this.winAmount,
            },
            {
              headers: {
                Authorization: `Bearer ${authStore.token}`,
              },
            }
          );

          if (response.data.success) {
            const newBalance = currentBalance + this.winAmount;
            console.log("[KENO] Win processed successfully!", {
              previousBalance: currentBalance,
              winAmount: this.winAmount,
              newBalance,
              profit: this.winAmount,
            });
            authStore.updateBalance(newBalance);
          }
        } catch (error: any) {
          console.error("[KENO] Error processing win:", {
            error: error.response?.data || error,
            gameId: this.currentGameId,
            winAmount: this.winAmount,
          });
          this.error = error.response?.data?.message || "Failed to process win";
        } finally {
          this.loading = false;
          // End the game but keep drawn states visible
          this.isGameActive = false;
          this.currentDrawingNumber = null;
        }
      } else {
        console.log("[KENO] No win this round", {
          selectedNumbers: this.selectedNumbers,
          drawnNumbers: this.drawnNumbers,
          matches: this.matches,
          betAmount: this.betAmount,
          currentBalance,
        });
        this.isGameActive = false;
        this.currentDrawingNumber = null;
      }
    },

    selectNumber(number: number) {
      const index = this.selectedNumbers.indexOf(number);
      if (index === -1 && this.selectedNumbers.length < 10) {
        this.selectedNumbers.push(number);
      } else if (index !== -1) {
        this.selectedNumbers.splice(index, 1);
      }
    },

    clearSelections() {
      this.selectedNumbers = [];
      this.drawnNumbers = [];
      this.matches = [];
      this.isGameActive = false;
      this.error = null;
    },

    resetGame() {
      this.isGameActive = false;
      this.showResults = false;
      this.winAmount = 0;
      this.currentMultiplier = 1;
      this.error = null;
      this.currentGameId = null;
      this.currentDrawingNumber = null;
      this.profit = 0;
      // Don't clear drawnNumbers and matches here
    },
  },

  getters: {
    canPlay: (state) => {
      return (
        state.selectedNumbers.length > 0 &&
        state.selectedNumbers.length <= 10 &&
        !state.isGameActive
      );
    },

    potentialWins: (state) => {
      const selections = state.selectedNumbers.length;
      if (selections === 0) return [];

      const multiplierTable = {
        10: { 10: 1000, 9: 400, 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        9: { 9: 400, 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        8: { 8: 50, 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        7: { 7: 10, 6: 5, 5: 2, 4: 1, 3: 0.5 },
        6: { 6: 5, 5: 2, 4: 1, 3: 0.5 },
        5: { 5: 2, 4: 1, 3: 0.5 },
        4: { 4: 1, 3: 0.5 },
        3: { 3: 0.5 },
        2: { 2: 0.5 },
        1: { 1: 0.5 },
      };

      const possibleWins = [];
      const currentMultipliers =
        multiplierTable[selections as keyof typeof multiplierTable] || {};

      for (const [matches, multiplier] of Object.entries(currentMultipliers)) {
        possibleWins.push({
          count: parseInt(matches),
          amount: state.betAmount * multiplier,
        });
      }

      return possibleWins.sort((a, b) => b.count - a.count);
    },
  },
});
