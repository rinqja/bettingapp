import axios from "../utils/axios";
import { useAuthStore } from "./auth";
import { useMatchesStore } from "./matches";
import { SGM_LIMITS } from "../types";
import type { Selection, Bet, PlaceBetResponse } from "../types";
import { defineStore } from "pinia";

const API_URL = import.meta.env.VITE_API_URL;

// Define the store's state interface
interface BettingState {
  balance: number;
  currentSelections: Selection[];
  currentBets: Bet[];
  placedBets: Bet[];
  activeBets: Bet[];
  settledBets: Bet[];
  loading: boolean;
  error: string | null;
  activeMode: "single" | "multi" | "sgm";
  multiStake: number;
  isBetslipExpanded: boolean;
  isBetslipClosed: boolean;
  isMobile: boolean;
}

// Define the store type with its actions
interface BettingStore {
  state: BettingState;
  currentSelections: Selection[];
  currentBets: Bet[];
  activeMode: "single" | "multi" | "sgm";
  multiStake: number;
  isSGM: boolean;
  canPlaceSGMBet: boolean;
  multiOdds: number;
  potentialMultiWin: number;
  isSameGameMulti: boolean;
  addSelection: (matchData: Omit<Selection, "market">) => void;
  setMode: (mode: "single" | "multi" | "sgm") => void;
  updateStake: (betId: string, stake: number) => void;
  updateMultiStake: (stake: number) => void;
  removeBet: (betId: string) => void;
  clearAllBets: () => void;
  fetchUserBets: () => Promise<void>;
  cashoutBet: (betId: string) => Promise<any>;
  placeBet: () => Promise<PlaceBetResponse>;
  addSGMSelection: (matchData: Omit<Selection, "market">) => void;
  placeSGMBet: () => Promise<PlaceBetResponse>;
  selections: Selection[];
  conflictingMatchIds: string[];
  canPlaceBet: boolean;
  hasIncompatibleMarkets: boolean;
  isFromSGMPage: boolean;
  removeSelection: (matchId: string, type: string) => void;
}

export const useBettingStore = defineStore("betting", {
  state: (): BettingState => ({
    balance: 0,
    currentSelections: [] as Selection[],
    currentBets: [] as Bet[],
    placedBets: [] as Bet[],
    activeBets: [] as Bet[],
    settledBets: [] as Bet[],
    loading: false,
    error: null,
    activeMode: "single",
    multiStake: 0,
    isBetslipExpanded: true,
    isBetslipClosed: false,
    isMobile: false,
  }),

  getters: {
    multiOdds(): number {
      return this.currentSelections.reduce(
        (total, selection) => total * selection.odds,
        1
      );
    },
    potentialMultiWin(): number {
      return this.multiStake * this.multiOdds;
    },
    selections(): Selection[] {
      return this.currentSelections;
    },

    conflictingMatchIds(): string[] {
      const matchCounts = this.currentBets.reduce((acc, bet) => {
        const matchId = bet.selections[0]?.matchId;
        if (matchId) {
          acc[matchId] = (acc[matchId] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(matchCounts)
        .filter(([_, count]) => count > 1)
        .map(([matchId]) => matchId);
    },

    canPlaceBet(): boolean {
      if (this.activeMode === "multi") {
        return (
          this.currentBets.length > 1 &&
          this.multiStake > 0 &&
          this.conflictingMatchIds.length === 0
        );
      }
      return this.currentBets.some((bet) => (bet.stake || 0) > 0);
    },

    isSGM(): boolean {
      return this.activeMode === "sgm";
    },

    sgmOdds(): number {
      if (!this.isSGM) return 0;
      return this.currentSelections.reduce(
        (total, selection) => total * selection.odds,
        1
      );
    },

    potentialSGMWin(): number {
      if (!this.isSGM) return 0;
      return this.multiStake * this.sgmOdds;
    },

    canPlaceSGMBet(): boolean {
      if (!this.isSGM) return false;
      return (
        this.currentSelections.length >= 2 &&
        this.multiStake > 0 &&
        !this.hasIncompatibleMarkets
      );
    },

    hasIncompatibleMarkets(): boolean {
      const markets = this.currentSelections.map((s) => s.market);
      return SGM_LIMITS.incompatibleMarkets.some((incompatiblePair) =>
        incompatiblePair.every((market) => markets.includes(market))
      );
    },

    isFromSGMPage(): boolean {
      if (!this.currentSelections.length) return false;
      const firstMatchId = this.currentSelections[0]?.matchId;
      return this.currentSelections.every((s) => s.matchId === firstMatchId);
    },

    isSameGameMulti(): boolean {
      return this.activeMode === "sgm" && this.isFromSGMPage;
    },
  },

  actions: {
    addSelection(matchData: Omit<Selection, "market">) {
      console.log("=== Starting addSelection ===");
      console.log("Current mode:", this.activeMode);
      console.log("Initial matchData:", matchData);

      const selection: Selection = {
        ...matchData,
        market: this.getMarketType(matchData.type),
        selection: matchData.type.split("_")[1] || matchData.type,
      };

      // Check if selection already exists
      const existingSelectionIndex = this.currentSelections.findIndex(
        (s) => s.matchId === selection.matchId && s.type === selection.type
      );

      // If selection exists, remove it and its corresponding bet
      if (existingSelectionIndex !== -1) {
        console.log("Removing existing selection");
        this.currentSelections.splice(existingSelectionIndex, 1);
        const betId = `${selection.matchId}-${selection.type}`;
        this.removeBet(betId);
        return;
      }

      // Check if there's already a selection from this match
      const existingMatchSelections = this.currentSelections.filter(
        (s) => s.matchId === selection.matchId
      );

      if (this.activeMode === "multi" && existingMatchSelections.length > 0) {
        console.log(
          "Blocking addition in multi mode - Already has selection from this match"
        );
        return;
      }

      // Add new selection
      this.currentSelections.push(selection);
      console.log(
        "Added new selection - Current selections:",
        this.currentSelections
      );

      // Update bets based on mode
      if (this.activeMode === "single") {
        // In single mode, always create a new separate bet
        this.currentBets.push({
          id: `${selection.matchId}-${selection.type}`,
          selections: [selection],
          amount: 0,
          totalOdds: selection.odds,
          potentialWin: 0,
          stake: 0,
          homeTeam: selection.homeTeam,
          awayTeam: selection.awayTeam,
        });
      } else {
        // In multi mode, update or create the multi bet with all valid selections
        const validSelections = this.currentSelections.filter((s) => {
          // Count selections for this match
          const matchSelections = this.currentSelections.filter(
            (ms) => ms.matchId === s.matchId
          );
          // Only include if it's the only selection for this match
          return matchSelections.length === 1;
        });

        const existingMultiBet = this.currentBets.find((b) => b.id === "multi");
        if (existingMultiBet) {
          existingMultiBet.selections = validSelections;
          existingMultiBet.totalOdds = validSelections.reduce(
            (total, s) => total * s.odds,
            1
          );
        } else {
          this.currentBets.push({
            id: "multi",
            selections: validSelections,
            amount: 0,
            totalOdds: validSelections.reduce((total, s) => total * s.odds, 1),
            potentialWin: 0,
            stake: 0,
            homeTeam: selection.homeTeam,
            awayTeam: selection.awayTeam,
          });
        }
      }

      console.log("Final bets state:", this.currentBets);
      console.log("Final selections state:", this.currentSelections);
      console.log("=== Finished addSelection ===");
    },

    setMode(mode: "single" | "multi" | "sgm") {
      console.log("=== Setting Mode ===");
      console.log("Previous mode:", this.activeMode);
      console.log("New mode:", mode);
      console.log("Current selections before:", this.currentSelections);
      console.log("Current bets before:", this.currentBets);

      this.activeMode = mode;

      if (mode === "multi") {
        // Reset bets when switching to multi mode
        this.currentBets = [];
        if (this.currentSelections.length > 0) {
          console.log("Creating new multi bet from existing selections");
          this.currentBets.push({
            id: "multi",
            selections: [...this.currentSelections],
            amount: 0,
            totalOdds: this.currentSelections.reduce(
              (total, s) => total * s.odds,
              1
            ),
            potentialWin: 0,
            stake: 0,
            homeTeam: this.currentSelections[0].homeTeam,
            awayTeam: this.currentSelections[0].awayTeam,
          });
        }
      } else if (mode === "single") {
        // Convert to single bets
        console.log("Converting to single bets");
        this.currentBets = this.currentSelections.map((selection) => ({
          id: `${selection.matchId}-${selection.type}`,
          selections: [selection],
          amount: 0,
          totalOdds: selection.odds,
          potentialWin: 0,
          stake: 0,
          homeTeam: selection.homeTeam,
          awayTeam: selection.awayTeam,
        }));
      }

      this.multiStake = 0;
      console.log("After mode change - selections:", this.currentSelections);
      console.log("After mode change - bets:", this.currentBets);
      console.log("=== Finished Setting Mode ===");
    },

    updateStake(betId: string, stake: number) {
      const bet = this.currentBets.find((b) => b.id === betId);
      if (bet) {
        bet.stake = stake;
        bet.potentialWin = stake * bet.totalOdds;
      }
    },

    updateMultiStake(stake: number) {
      this.multiStake = stake;
    },

    removeBet(betId: string) {
      console.log("Removing bet:", betId);
      const index = this.currentBets.findIndex((b) => b.id === betId);
      if (index !== -1) {
        const bet = this.currentBets[index];

        // Remove all selections associated with this bet
        bet.selections.forEach((selection) => {
          const selectionIndex = this.currentSelections.findIndex(
            (s) => s.matchId === selection.matchId && s.type === selection.type
          );
          if (selectionIndex !== -1) {
            this.currentSelections.splice(selectionIndex, 1);
          }
        });

        // Remove the bet
        this.currentBets.splice(index, 1);
      }
    },

    clearAllBets() {
      this.currentBets = [];
      this.currentSelections = [];
      this.multiStake = 0;
    },

    expandBetslip() {
      this.isBetslipExpanded = true;
      this.isBetslipClosed = false;
    },

    collapseBetslip() {
      this.isBetslipExpanded = false;
    },

    closeBetslip() {
      this.isBetslipClosed = true;
      this.isBetslipExpanded = false;
    },

    reopenBetslip() {
      this.isBetslipClosed = false;
      this.isBetslipExpanded = false;
    },

    setMobileState(isMobile: boolean) {
      this.isMobile = isMobile;
    },

    validateBet(): { valid: boolean; message?: string } {
      // Check if user is trying to place a bet
      if (!this.currentBets.length) {
        return { valid: false, message: "No bets selected" };
      }

      // Validate based on bet mode
      if (this.activeMode === "single") {
        // Check if any single bet has a stake
        const hasStake = this.currentBets.some((bet) => (bet.stake || 0) > 0);
        if (!hasStake) {
          return { valid: false, message: "Please enter a stake amount" };
        }
      } else if (this.activeMode === "multi") {
        // Validate multi bet
        if (this.currentBets.length < 2) {
          return {
            valid: false,
            message: "Multi bet requires at least 2 selections",
          };
        }
        if (this.multiStake <= 0) {
          return { valid: false, message: "Please enter a stake amount" };
        }
        if (this.conflictingMatchIds.length > 0) {
          return {
            valid: false,
            message:
              "Cannot place multi bet with multiple selections from the same match",
          };
        }
      } else if (this.isSGM) {
        // Validate SGM bet
        if (this.currentSelections.length < 2) {
          return {
            valid: false,
            message: "SGM requires at least 2 selections",
          };
        }
        if (this.multiStake <= 0) {
          return { valid: false, message: "Please enter a stake amount" };
        }
        if (this.hasIncompatibleMarkets) {
          return {
            valid: false,
            message: "Some markets cannot be combined in an SGM",
          };
        }
      }

      return { valid: true };
    },

    async placeBet(): Promise<PlaceBetResponse> {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        console.log("Starting bet placement. Mode:", this.activeMode);
        console.log("Current selections:", this.currentSelections);
        console.log("Current bets:", this.currentBets);

        let payload;

        if (this.activeMode === "multi") {
          console.log("Preparing multiple bet payload");
          console.log("Multi stake:", this.multiStake);
          console.log("Multi odds:", this.multiOdds);

          // For multiple bets, use all current selections
          const selections = this.currentSelections.map((selection) => ({
            matchId: selection.matchId,
            selection: selection.selection || selection.type || "1",
            type: selection.type || selection.selection || "1",
            odds: selection.odds,
            sportKey: selection.sportKey,
            event: `${selection.homeTeam} vs ${selection.awayTeam}`,
            market:
              selection.market ||
              this.getMarketType(selection.type || selection.selection || "1"),
            sport: selection.sportKey.split(":")[0],
            homeTeam: selection.homeTeam,
            awayTeam: selection.awayTeam,
          }));

          console.log("Processed selections for multi bet:", selections);

          payload = {
            betType: "multiple",
            amount: this.multiStake,
            totalOdds: this.multiOdds,
            potentialWin: this.multiStake * this.multiOdds,
            selections: selections,
          };
        } else {
          console.log("Preparing single bet payload");

          // For single bets, filter bets with stakes
          const betsWithStakes = this.currentBets.filter(
            (bet) => bet.stake > 0
          );
          console.log("Bets with stakes:", betsWithStakes);

          const selections = betsWithStakes.flatMap((bet) =>
            bet.selections.map((selection) => ({
              matchId: selection.matchId,
              selection: selection.selection || selection.type || "1",
              type: selection.type || selection.selection || "1",
              odds: selection.odds,
              sportKey: selection.sportKey,
              event: `${selection.homeTeam} vs ${selection.awayTeam}`,
              market:
                selection.market ||
                this.getMarketType(
                  selection.type || selection.selection || "1"
                ),
              sport: selection.sportKey.split(":")[0],
              homeTeam: selection.homeTeam,
              awayTeam: selection.awayTeam,
            }))
          );

          console.log("Processed selections for single bets:", selections);

          const totalStake = betsWithStakes.reduce(
            (sum, bet) => sum + (bet.stake || 0),
            0
          );
          const totalOdds = betsWithStakes[0]?.totalOdds || 0;

          payload = {
            betType: "single",
            amount: totalStake,
            totalOdds: totalOdds,
            potentialWin: totalStake * totalOdds,
            selections: selections,
          };
        }

        console.log("Final payload being sent:", payload);

        const response = await axios.post<PlaceBetResponse>(
          `${API_URL}/bets/place`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response from server:", response.data);

        if (response.data.success) {
          authStore.updateBalance(response.data.newBalance);

          if (this.activeMode === "single") {
            // Remove only the bets that were placed (had stakes)
            const betsWithStakes = this.currentBets.filter(
              (bet) => bet.stake > 0
            );
            betsWithStakes.forEach((bet) => {
              this.removeBet(bet.id);
            });
          } else {
            // For multi mode, clear everything
            this.clearAllBets();
          }
        }

        return response.data;
      } catch (error: any) {
        console.error("Bet placement error:", error.response?.data || error);
        this.error = error.response?.data?.message || "Failed to place bet";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    getMarketType(selectionType: string): string {
      if (selectionType === "home") return "Match Winner";
      if (selectionType === "away") return "Match Winner";
      if (selectionType === "draw") return "Match Winner";
      // Add more market types as needed
      return "Match Winner"; // Default
    },

    async fetchUserBets() {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        if (!authStore.token) {
          console.log("No auth token found");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/bets/user`,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
            params: {
              populate: "selections",
            },
          }
        );

        const data = response.data;
        console.log("Raw bets data:", data);

        // Transform the data to include formatted selections
        this.placedBets = Array.isArray(data)
          ? data.map((bet) => ({
              ...bet,
              selections: bet.selections.map((selection) => ({
                ...selection,
                // Extract selection type from market or type field
                selection:
                  selection.type?.split("_")[1] ||
                  selection.market?.split("_")[1] ||
                  selection.type ||
                  "unknown",
                // Ensure we have the event teams split correctly
                homeTeam:
                  selection.event?.split(" vs ")[0] || selection.homeTeam,
                awayTeam:
                  selection.event?.split(" vs ")[1] || selection.awayTeam,
              })),
            }))
          : [];

        console.log("Transformed placed bets:", this.placedBets);

        // Filter bets into active and settled
        this.activeBets = this.placedBets.filter((bet) =>
          ["pending"].includes(bet.status || "")
        );
        console.log(
          "Active bets with transformed selections:",
          this.activeBets
        );

        this.settledBets = this.placedBets.filter((bet) =>
          ["won", "lost", "cancelled", "cashed_out"].includes(bet.status || "")
        );
        console.log(
          "Settled bets with transformed selections:",
          this.settledBets
        );
      } catch (err: any) {
        console.error("Fetch error:", err.response?.data || err);
        this.error = err.response?.data?.message || "Failed to fetch bets";
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    },

    async settleBets() {
      const authStore = useAuthStore();

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/bets/settle`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to settle bets");
        }

        const data = await response.json();
        console.log("Settled bets:", data);

        // Refresh user bets after settlement
        await this.fetchUserBets();

        return data;
      } catch (error) {
        console.error("Error settling bets:", error);
        throw error;
      }
    },

    // Method to check and update bet statuses
    async checkBetStatuses() {
      const matchesStore = useMatchesStore();

      try {
        // First check for new match results
        const updatedMatches = await matchesStore.checkMatchResults();

        if (updatedMatches && updatedMatches.length > 0) {
          // If we have updated matches, trigger bet settlement
          await this.settleBets();
        }
      } catch (error) {
        console.error("Error checking bet statuses:", error);
      }
    },

    isBetSelected(matchId: string, type: string): boolean {
      return this.currentSelections.some(
        (selection) => selection.matchId === matchId && selection.type === type
      );
    },

    async cashoutBet(betId: string) {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        console.log("Initiating cashout for bet:", betId);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/bets/${betId}/cashout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Cashout response:", response.data);

        if (response.data.success) {
          // Update local state with the cashed out bet
          const updatedBet = {
            ...response.data.bet,
            cashoutAmount: response.data.cashoutAmount,
          };

          console.log("Updated bet with cashout amount:", updatedBet);

          // Update the bets lists
          this.placedBets = this.placedBets.map((bet) =>
            bet._id === betId ? updatedBet : bet
          );

          // Move bet from active to settled
          this.activeBets = this.activeBets.filter((bet) => bet._id !== betId);
          this.settledBets.unshift(updatedBet);

          // Update user balance
          authStore.updateBalance(response.data.newBalance);

          return response.data;
        } else {
          throw new Error(response.data.message || "Failed to cash out bet");
        }
      } catch (err: any) {
        console.error("Cashout error:", err.response?.data || err);
        this.error = err.response?.data?.message || "Failed to cash out bet";
        throw new Error(this.error);
      } finally {
        this.loading = false;
      }
    },

    updateBalance(newBalance: number) {
      this.balance = newBalance;
    },

    clearBetSlip() {
      this.currentBets = [];
      this.multiStake = 0;
    },

    addSGMSelection(matchData: Omit<Selection, "market">) {
      const selection: Selection = {
        ...matchData,
        market: this.getMarketType(matchData.type),
      };

      // For SGM, we allow multiple selections from same match
      // but not from the same market type
      const existingIndex = this.currentSelections.findIndex(
        (s) => s.matchId === selection.matchId && s.type === selection.type
      );

      if (existingIndex !== -1) {
        this.currentSelections.splice(existingIndex, 1);
      } else {
        this.currentSelections.push(selection);
      }

      // For SGM, we create a single bet with multiple selections
      this.currentBets = [
        {
          id: selection.matchId,
          betType: "sgm",
          selections: this.currentSelections,
          amount: 0,
          totalOdds: this.sgmOdds,
          potentialWin: 0,
          stake: this.multiStake,
          homeTeam: selection.homeTeam,
          awayTeam: selection.awayTeam,
        },
      ];
    },

    addRegularSelection(selection: Selection) {
      const existingIndex = this.currentSelections.findIndex(
        (s) => s.matchId === selection.matchId && s.type === selection.type
      );

      if (existingIndex !== -1) {
        this.currentSelections.splice(existingIndex, 1);
      } else {
        this.currentSelections.push(selection);
      }

      this.currentBets = this.currentSelections.map(
        (s): Bet => ({
          id: s.matchId,
          betType: this.activeMode === "multi" ? "multiple" : "single",
          selections: [s],
          amount: 0,
          totalOdds: s.odds,
          potentialWin: 0,
          stake: 0,
          homeTeam: s.homeTeam,
          awayTeam: s.awayTeam,
        })
      );
    },
    async placeSGMBet(): Promise<PlaceBetResponse> {
      const authStore = useAuthStore();
      this.loading = true;
      this.error = null;

      try {
        const payload = {
          betType: "sgm",
          amount: this.multiStake,
          totalOdds: this.sgmOdds,
          potentialWin: this.potentialSGMWin,
          isSGM: true,
          selections: this.currentSelections.map((selection) => ({
            matchId: selection.matchId,
            selection: selection.selection || selection.type,
            odds: selection.odds,
            sportKey: selection.sportKey,
            event: `${selection.homeTeam} vs ${selection.awayTeam}`,
            market: selection.market,
            sport: selection.sportKey.split(":")[0],
            homeTeam: selection.homeTeam,
            awayTeam: selection.awayTeam,
            commenceTime: selection.commenceTime,
          })),
        };

        const response = await axios.post<PlaceBetResponse>(
          `${API_URL}/bets/place`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          authStore.updateBalance(response.data.newBalance);
          this.clearBetSlip();
        }

        return response.data;
      } catch (error: any) {
        console.error(
          "SGM bet placement error:",
          error.response?.data || error
        );
        this.error = error.response?.data?.message || "Failed to place SGM bet";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    removeSelection(matchId: string, type: string) {
      console.log("=== Removing Selection ===");
      console.log("Removing selection:", { matchId, type });

      // Find and remove the selection
      const selectionIndex = this.currentSelections.findIndex(
        (s) => s.matchId === matchId && s.type === type
      );

      if (selectionIndex !== -1) {
        this.currentSelections.splice(selectionIndex, 1);
        console.log(
          "Selection removed, remaining selections:",
          this.currentSelections
        );

        // Update multi bet if in multi mode
        if (this.activeMode === "multi") {
          const existingMultiBet = this.currentBets.find(
            (b) => b.id === "multi"
          );
          if (existingMultiBet) {
            existingMultiBet.selections = [...this.currentSelections];
            existingMultiBet.totalOdds = this.currentSelections.reduce(
              (total, s) => total * s.odds,
              1
            );
          }
        }
      }
    },
  },
}) as unknown as () => BettingStore;
