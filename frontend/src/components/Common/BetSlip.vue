<template>
  <div
    v-show="isMobile ? isVisible : true"
    class="betslip-container"
    :class="{ closed: isMobile && isClosed }"
    ref="betslipContainer"
  >
    <div class="betslip-wrapper">
      <!-- Update close button for mobile -->
      <button v-if="isMobile" class="mobile-close-btn" @click="closeBetslip">
        &times;
      </button>

      <!-- Remove swipe-handle only for mobile -->
      <div v-if="!isMobile" class="swipe-handle">
        <div class="handle-indicator"></div>
      </div>

      <div class="betslip-header">
        <div class="betslip-tabs">
          <button 
            :class="['tab', { active: bettingStore.activeMode === 'single' }]"
            @click="bettingStore.setMode('single')"
          >
            Single
          </button>
          <button 
            :class="['tab', { active: bettingStore.activeMode === 'multi' }]"
            @click="bettingStore.setMode('multi')"
          >
            Multi
          </button>
        </div>
        <button
          class="clear-all"
          @click="bettingStore.clearAllBets"
          v-if="bets.length"
        >
          Clear All
        </button>
      </div>

      <div class="betslip-content" :class="{ empty: !bets.length }">
        <div v-if="!bets.length" class="empty-state">
          <i class="icon-ticket"></i>
          <p>Your bet slip is empty</p>
          <span>Select some odds to start betting</span>
        </div>

        <template v-else>
          <!-- Single Mode (including SGM) -->
          <div v-if="bettingStore.activeMode === 'single'" class="single-content">
            <div v-for="bet in groupedBets" :key="bet.id" class="bet-card">
              <div class="bet-header">
                <div class="bet-teams">
                  <span class="team home">{{ bet.homeTeam }}</span>
                  <span class="vs">vs</span>
                  <span class="team away">{{ bet.awayTeam }}</span>
                </div>
                <button class="remove-bet" @click="bettingStore.removeBet(bet.id)">×</button>
              </div>

              <!-- Show multiple selections if it's an SGM bet -->
              <template v-if="bet.selections.length > 1">
                <div v-for="selection in bet.selections" :key="selection.type" class="selection-item">
                  <span class="selection-type">{{ selection.type }}</span>
                  <span class="selection-odds">{{ formatOdds(selection.odds) }}</span>
                </div>
                <div class="total-odds">
                  Total Odds: {{ formatOdds(calculateTotalOdds(bet.selections)) }}
                </div>
              </template>
              <!-- Show single selection for regular bets -->
              <template v-else>
                <div class="selection-item">
                  <span class="selection-type">{{ bet.selections[0]?.type }}</span>
                  <span class="selection-odds">{{ formatOdds(bet.selections[0]?.odds) }}</span>
                </div>
              </template>

              <div class="stake-input">
                <input
                  type="number"
                  v-model="bet.stake"
                  placeholder="Enter stake"
                  @input="updateSingleStake($event, bet.id)"
                />
                <span class="currency">$</span>
              </div>

              <div class="potential-win" v-if="bet.stake">
                Potential Win: ${{ calculatePotentialWin(bet) }}
              </div>
            </div>
          </div>

          <!-- Multi Mode -->
          <div v-else class="multi-bet">
            <div class="bet-list">
              <div v-for="selection in bettingStore.currentSelections" 
                   :key="`${selection.matchId}-${selection.type}`" 
                   class="bet-card">
                <div class="bet-header">
                  <div
                    class="bet-teams"
                    :class="{
                      conflicting: isDuplicateMatch(selection)
                    }"
                  >
                    <span class="team home">{{ selection.homeTeam }}</span>
                    <span class="vs">vs</span>
                    <span class="team away">{{ selection.awayTeam }}</span>
                  </div>
                  <button
                    class="remove-bet"
                    @click="bettingStore.removeSelection(selection.matchId, selection.type)"
                  >
                    &times;
                  </button>
                </div>
                <div class="selection-item">
                  <span class="selection-type">{{ selection.type }}</span>
                  <span class="selection-odds">{{ formatOdds(selection.odds) }}</span>
                </div>
              </div>
            </div>

            <div class="multi-stake-container">
              <div class="stake-header">
                <label>Total Stake</label>
                <button class="clear-stake" @click="clearMultiStake">
                  <i class="icon-close"></i>
                </button>
              </div>
              <div class="stake-input">
                <input
                  type="number"
                  v-model="bettingStore.multiStake"
                  placeholder="Enter stake"
                  @input="updateMultiStake"
                />
                <span class="currency">$</span>
              </div>
            </div>

            <div class="multi-summary">
              <div class="summary-row">
                <span class="summary-label">Total Odds</span>
                <span class="summary-value">{{
                  formatOdds(bettingStore.multiOdds)
                }}</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Potential Win</span>
                <span class="summary-value"
                  >${{ formatOdds(bettingStore.potentialMultiWin) }}</span
                >
              </div>
            </div>

            <!-- Only show conflict warning if not in SGM mode -->
            <div
              v-if="hasConflictingSelections && !bettingStore.isSameGameMulti"
              class="conflict-warning"
            >
              Multiple selections from the same game are not allowed in Multi
              mode
            </div>
          </div>
        </template>
      </div>

      <!-- Place bet wrapper -->
      <div class="place-bet-wrapper" v-if="bets.length">
        <div v-if="betError" class="bet-error">
          {{ betError }}
        </div>
        <button
          class="place-bet-button"
          :disabled="!canPlaceBet || isPlacingBet || hasConflictingSelections"
          @click="placeBet"
        >
          <span v-if="isPlacingBet">Placing Bet...</span>
          <span v-else>
            Place
            {{ bettingStore.activeMode === "multi" ? "Multi" : "Single" }} Bet
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import { useBettingStore } from "../../stores/betting";
import { useNotificationStore } from "../../stores/notification";
import { useAuthStore } from "../../stores/auth";
import type { Bet, Selection } from "../../types";

const bettingStore = useBettingStore();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();

const bets = computed(() => {
  if (bettingStore.activeMode === 'multi') {
    const multiBet = bettingStore.currentBets.find(b => b.id === 'multi');
    return multiBet ? [multiBet] : [];
  }
  return bettingStore.currentBets;
});

const getBetCount = (mode: string) => {
  if (!bets.value) return 0;

  if (mode === "multi" && bets.value.length > 1) {
    return 1;
  }
  return mode === "single" ? bets.value.length : 0;
};

const formatOdds = (odds: number) => (odds || 0).toFixed(2);

const calculateSingleWin = (bet: any) => {
  return (
    bet.stake *
    bet.selections.reduce((total: number, s: any) => total * s.odds, 1)
  ).toFixed(2);
};

const updateSingleStake = (event: Event, betId: string) => {
  const value = (event.target as HTMLInputElement).value;
  bettingStore.updateStake(betId, Number(value));
};

const updateMultiStake = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  bettingStore.updateMultiStake(Number(value));
};

// Update the hasConflictingSelections computed property
const hasConflictingSelections = computed(() => {
  // Don't show conflicts in SGM mode
  if (bettingStore.isSameGameMulti) {
    return false;
  }

  // Only check for conflicts in multi mode
  if (bettingStore.activeMode === "multi") {
    const matchIds = new Set();
    let hasConflict = false;

    bets.value?.forEach((bet) => {
      bet.selections.forEach((selection: any) => {
        if (matchIds.has(selection.matchId)) {
          hasConflict = true;
        }
        matchIds.add(selection.matchId);
      });
    });

    return hasConflict;
  }

  return false;
});

// Update isDuplicateMatch method
const isDuplicateMatch = (selection: any) => {
  if (bettingStore.isSameGameMulti) {
    return false;
  }

  if (bettingStore.activeMode !== "multi") return false;

  // Count how many selections are from the same match
  const matchSelections = bettingStore.currentSelections.filter(
    s => s.matchId === selection.matchId
  );

  return matchSelections.length > 1;
};

// Update canPlaceBet computed property
const canPlaceBet = computed(() => {
  if (!bets.value) return false;

  if (bettingStore.isSGM) {
    return bettingStore.canPlaceSGMBet;
  }

  if (bettingStore.activeMode === "single") {
    return bets.value.some((bet) => bet.stake > 0);
  } else {
    // For multi mode, check:
    // 1. Has more than one selection
    // 2. Has stake
    // 3. No conflicting selections from same match
    return (
      bets.value.length > 0 &&
      bettingStore.multiStake > 0 &&
      !hasConflictingSelections.value
    );
  }
});

const isPlacingBet = ref(false);
const betError = ref("");

const placeBet = async () => {
  if (!canPlaceBet.value) return;

  // Validate bet before making API call
  const validation = bettingStore.validateBet();
  if (!validation.valid) {
    betError.value = validation.message || "Invalid bet";
    return;
  }

  try {
    isPlacingBet.value = true;
    betError.value = "";

    if (bettingStore.isSGM) {
      await bettingStore.placeSGMBet();
    } else {
      await bettingStore.placeBet();
    }

    // Show success notification
    notificationStore.show({
      type: "success",
      title: "Bet Placed Successfully",
      message:
        bettingStore.activeMode === "multi"
          ? "Your multi bet has been placed successfully!"
          : "Your single bet has been placed successfully!",
      duration: 5000,
      position: "top-right",
    });
  } catch (error: any) {
    betError.value = error.response?.data?.message || "Failed to place bet";

    // Show error notification
    notificationStore.show({
      type: "error",
      title: "Bet Placement Failed",
      message:
        error.response?.data?.message ||
        "Failed to place bet. Please try again.",
      duration: 5000,
      position: "top-right",
    });
  } finally {
    isPlacingBet.value = false;
  }
};

const clearMultiStake = () => {
  bettingStore.updateMultiStake(0);
};

const isVisible = ref(false);
const isClosed = ref(false);
const isMobile = ref(false);
const touchStart = ref(0);
const betslipContainer = ref<HTMLElement | null>(null);

const clearSingleStake = (betId: string) => {
  bettingStore.updateStake(betId, 0);
};

const handleTouchStart = (e: TouchEvent) => {
  touchStart.value = e.touches[0].clientY;
};

const handleTouchMove = (e: TouchEvent) => {
  if (!betslipContainer.value) return;

  const touchMove = e.touches[0].clientY;
  const delta = touchStart.value - touchMove;

  // Only handle swipe up to expand
  if (delta > 50 && !isExpanded.value) {
    isExpanded.value = true;
    isClosed.value = false;
  }
  // Only collapse if explicitly swiped down when expanded
  else if (delta < -50 && isExpanded.value) {
    isExpanded.value = false;
  }
};

const getTotalSingleStake = computed(() => {
  if (!bets.value) return 0;
  return bets.value.reduce((total, bet) => total + (bet.stake || 0), 0);
});

const getTotalSinglePotentialWin = computed(() => {
  if (!bets.value) return 0;
  return bets.value.reduce((total, bet) => {
    const betWin =
      bet.stake * bet.selections.reduce((odds, s) => odds * s.odds, 1);
    return total + (betWin || 0);
  }, 0);
});

const isSingleMode = computed(() => bettingStore.activeMode === "single");

// Add check for mobile devices
const checkMobile = () => {
  isMobile.value = window.innerWidth < 992;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});

const openBetslip = () => {
  if (isMobile.value) {
    isVisible.value = true;
    isClosed.value = false;
  }
};

const closeBetslip = () => {
  if (isMobile.value) {
    isClosed.value = true;
    setTimeout(() => {
      isVisible.value = false;
      isClosed.value = false;
    }, 300);
  }
};

// Update exposed methods
defineExpose({
  isVisible,
  isClosed,
  isMobile,
  openBetslip,
  closeBetslip,
});

// Group selections from the same match into one bet
const groupedBets = computed(() => {
  if (!bettingStore.currentBets) return [];
  
  // If coming from SGM page, group all selections into one bet
  if (bettingStore.isSGM) {
    return [{
      id: bettingStore.currentSelections[0]?.matchId,
      homeTeam: bettingStore.currentSelections[0]?.homeTeam,
      awayTeam: bettingStore.currentSelections[0]?.awayTeam,
      selections: bettingStore.currentSelections,
      stake: bettingStore.multiStake,
      totalOdds: calculateTotalOdds(bettingStore.currentSelections)
    }];
  }
  
  return bettingStore.currentBets;
});

const calculateTotalOdds = (selections: any[]) => {
  return selections.reduce((total, selection) => total * selection.odds, 1);
};

const calculatePotentialWin = (bet: any) => {
  const totalOdds = calculateTotalOdds(bet.selections);
  return (bet.stake * totalOdds).toFixed(2);
};

const removeSelection = (selection: any) => {
  const betId = `${selection.matchId}-${selection.type}`;
  console.log(betId);
  bettingStore.removeBet(betId);
};
</script>

<style scoped>
.remove-bet {
  color: #00ff00;
  width: 14px;
  height: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  font-size: 20px;
}

.remove-bet i,
.remove-bet span {
  font-weight: bold;
  line-height: 1;
}

.single-summary {
  background: var(--signbet);
  padding: 1.2rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

/* Reuse the same styles as multi-summary */
.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
}

.summary-row:not(:last-child) {
  border-bottom: 1px solid var(--leftpreborder);
  margin-bottom: 0.5rem;
}

.summary-label {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.summary-value {
  color: var(--active-color);
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .single-summary {
    padding: 1rem;
    margin-top: 1rem;
  }
}

.betslip-container {
  background: var(--subheader);
  border-radius: 8px;
  overflow: hidden;
  top: var(--total-top-offset);
  height: calc(100vh - var(--total-top-offset) - 3rem);
  display: flex;

  flex-direction: column;
}

.betslip-header {
  background: var(--header);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--active-color);
}

.betslip-tabs {
  display: flex;
  gap: 1rem;
}

.tab {
  background: none;
  border: none;
  color: var(--textcolor);
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.tab.active {
  color: var(--active-color);
}

.tab .bet-count {
  position: absolute;
  top: -8px;
  right: -28px;
  background: var(--active-color);
  color: var(--black);
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.clear-all {
  color: var(--button-one);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 0.9rem;
  transition: color 0.3s ease;
  text-transform: capitalize;
}

.clear-all:hover {
  color: var(--active-color);
}

.betslip-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: var(--textcolor);
  text-align: center;
}

.empty-state i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--active-color);
}

.bet-card {
  background: var(--signbet);
  border: 1px solid var(--leftpreborder);
  border-radius: 6px;
  padding: 0.8rem;
  margin-bottom: 0.8rem;
}

.bet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.bet-teams {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.team {
  color: var(--white);
  font-size: 12px;
  transition: color 0.3s ease;
}

.vs {
  color: var(--textcolor);
  font-size: 0.8rem;
  margin: 0 0.3rem;
}

.selection-item {
  background: var(--body-color);
  border: 1px solid var(--leftpreborder);
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.selection-type {
  color: var(--white);
  font-size: 0.9rem;
  margin-right: 0.5rem;
}

.selection-odds {
  color: var(--active-color);
  font-weight: bold;
  font-size: 0.9rem;
}

.stake-container {
  background: var(--signbet);
  border-radius: 6px;
  padding: 0.8rem;
  margin-top: 0.5rem;
}

.stake-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.stake-header label {
  color: var(--textcolor);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stake-input {
  position: relative;
  width: 100%;
}

.stake-input input {
  width: 100%;
  background: var(--body-color);
  border: 2px solid var(--leftpreborder);
  color: var(--white);
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 1rem;
  text-align: right;
  padding-right: 2rem;
  transition: all 0.3s ease;
}

.stake-input input:hover {
  border-color: var(--active-color);
}

.stake-input input:focus {
  border-color: var(--active-color);
  outline: none;
  box-shadow: 0 0 0 2px var(--preactive);
}

.stake-input .currency {
  position: absolute;
  right: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--active-color);
  font-weight: bold;
}

.potential-win {
  text-align: right;
  color: var(--active-color);
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.8rem;
}

/* Multi bet specific overrides */
.multi-bet .bet-card {
  padding: 0.8rem;
}

.multi-bet .selection-item {
  margin-bottom: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .bet-card {
    padding: 0.7rem;
  }

  .bet-teams {
    font-size: 0.85rem;
  }

  .selection-item {
    padding: 0.4rem 0.6rem;
  }

  .stake-container {
    padding: 0.7rem;
  }
}

@media (max-width: 480px) {
  .bet-teams {
    font-size: 0.8rem;
  }

  .selection-type,
  .selection-odds {
    font-size: 0.85rem;
  }
}

.place-bet-button {
  width: 100%;
  background: var(--active-color);
  color: var(--black);
  border: none;
  padding: 1rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.place-bet-button:hover:not(:disabled) {
  background: var(--active-two);
  transform: translateY(-1px);
}

.place-bet-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Update mobile styles */
@media (max-width: 991px) {
  .betslip-container {
    position: fixed;
    bottom: 60px;
    left: 0;
    right: 0;
    margin: 0;
    height: calc(100vh - 120px);
    background: var(--subheader);
    z-index: 2;
    transform: translateY(100%);
    transition: transform 0.3s ease;
    border-radius: 0;
    display: flex;
    flex-direction: column;
  }

  .betslip-container:not(.closed) {
    transform: translateY(0);
  }

  .betslip-container.closed {
    transform: translateY(100%);
  }

  .betslip-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .betslip-content {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding: 1rem;
    padding-bottom: calc(80px + 1rem);
  }

  .place-bet-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: var(--body-color);
    border-top: 1px solid var(--leftpreborder);
    z-index: 1001;
  }

  /* Safe area support */
  @supports (padding: max(0px)) {
    .betslip-container {
      height: calc(100vh - 120px - env(safe-area-inset-bottom));
      bottom: calc(60px + env(safe-area-inset-bottom));
    }

    .betslip-content {
      padding-bottom: calc(80px + 1rem + env(safe-area-inset-bottom));
    }

    .place-bet-wrapper {
      padding-bottom: max(1rem, env(safe-area-inset-bottom));
    }
  }

  .conflict-warning {
    margin: 0.8rem 0;
  }

  .mobile-close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    color: red;
    font-size: 24px;
    padding: 8px;
    cursor: pointer;
    z-index: 1002;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    font-weight: bold;
    line-height: 1;
  }

  .mobile-close-btn:hover {
    opacity: 0.8;
  }

  /* Adjust header padding to accommodate close button */
  .betslip-header {
    padding-right: 48px;
  }

  .clear-all {
    font-size: 0.85rem;
    padding: 4px 8px;
  }
}

.swipe-handle {
  display: none;
  height: 20px;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: grab;
}

.handle-indicator {
  width: 40px;
  height: 4px;
  background: var(--leftpreborder);
  border-radius: 2px;
}

.stake-container {
  background: var(--signbet);
  border-radius: 6px;
}

/* Improved clear button */
.clear-stake {
  background: none;
  border: none;
  color: var(--textcolor);
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-stake:hover {
  color: var(--button-one);
  background: var(--body-color);
}

.clear-stake i {
  font-size: 1.1rem;
}

/* Multi bet specific input styles */
.multi-stake-container {
  background: var(--signbet);
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
}

.multi-bet .stake-input input {
  background: var(--body-color);
  font-weight: 500;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stake-input input {
    font-size: 1.1rem;
    padding: 1rem;
    padding-right: 2.2rem;
  }

  .stake-input .currency {
    font-size: 1.1rem;
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .stake-container,
  .multi-stake-container {
    padding: 0.7rem;
  }

  .stake-input input {
    padding: 0.9rem;
    padding-right: 2rem;
  }
}

.multi-summary {
  background: var(--signbet);
  padding: 1.2rem;
  border-radius: 6px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
}

.summary-row:not(:last-child) {
  border-bottom: 1px solid var(--leftpreborder);
  margin-bottom: 0.5rem;
}

.summary-label {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.summary-value {
  color: var(--active-color);
  font-weight: 600;
  font-size: 1.1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .multi-summary {
    padding: 1rem;
    margin-top: 1rem;
  }
}
.betslip-content .bet-list {
  max-height: 800px; /* Set a fixed height for the bet-list */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  padding-right: 10px; /* Add padding to prevent scrollbar overlap */
  scrollbar-width: thin; /* Makes the scrollbar thinner (for Firefox) */
  scrollbar-color: #6c757d #6c657d; /* Customize scrollbar width (for modern browsers) */
}

.betslip-content .bet-list::-webkit-scrollbar {
  width: 8px; /* Set width of scrollbar for WebKit browsers */
}

.betslip-content .bet-list::-webkit-scrollbar-thumb {
  background-color: #ccc; /* Style the scrollbar thumb */
  border-radius: 4px;
}

.betslip-content .bet-list::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; /* Add hover effect on scrollbar thumb */
}
.bet-error {
  color: var(--button-one);
  text-align: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.bet-teams.conflicting {
  color: var(--button-one) !important;
}

.bet-teams.conflicting .team,
.bet-teams.conflicting .vs {
  color: var(--button-one) !important;
}

.conflict-warning {
  color: var(--button-one);
  background: var(--signbet);
  padding: 0.8rem;
  border-radius: 4px;
  margin: 1rem 0;
  font-size: 0.9rem;
  text-align: center;
}
</style>
