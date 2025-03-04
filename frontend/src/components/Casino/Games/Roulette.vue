<template>
  <div class="roulette-game">
    <!-- Result overlay when spinning ends -->
    <Transition name="fade">
      <div
        v-if="showResult"
        class="result-overlay"
        :class="getNumberClass(rouletteStore.lastNumber)"
      >
        <div class="result-content">
          <div class="result-number">
            <div
              class="number-circle"
              :class="getNumberClass(rouletteStore.lastNumber)"
            >
              {{ rouletteStore.lastNumber }}
            </div>
          </div>
          <div class="result-details">
            <div class="result-text">
              {{ getResultText(rouletteStore.lastNumber) }}
            </div>
            <div class="result-win" v-if="lastWinAmount > 0">
              <span class="win-label">WIN</span>
              <span class="win-amount">+{{ lastWinAmount }}€</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="game-header">
      <div class="stats-container">
        <div class="stat">
          <span class="stat-label">Total Bet:</span>
          <span class="stat-value">{{ rouletteStore.totalBet }}€</span>
        </div>
        <div class="stat">
          <span class="stat-label">Potential Win:</span>
          <span class="stat-value">{{ rouletteStore.potentialWin }}€</span>
        </div>
      </div>
    </div>

    <div class="roulette-container">
      <!-- Wheel Section -->
      <div class="wheel-section">
        <div class="wheel-container" ref="wheelContainer">
          <RouletteWheel
            :numbers="wheelNumbers"
            :is-spinning="rouletteStore.isSpinning"
            :target-number="rouletteStore.lastNumber"
          />
        </div>

        <div class="history-container">
          <h3 class="history-title">PREVIOUS NUMBERS</h3>
          <div class="history-bar">
            <div
              v-for="(number, index) in rouletteStore.history"
              :key="index"
              class="history-item"
            >
              <div class="history-number" :class="getNumberClass(number)">
                {{ number }}
              </div>
              <div class="history-details">
                <span class="history-color">{{ getNumberColor(number) }}</span>
                <span class="history-parity">{{
                  number % 2 === 0 ? "EVEN" : "ODD"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="controls-section">
        <div class="bet-controls">
          <div class="bet-amount-controls">
            <button
              v-for="amount in [1, 5, 10, 25, 50, 100]"
              :key="amount"
              class="chip-btn"
              :class="[
                `chip-${amount}`,
                { active: rouletteStore.betAmount === amount },
              ]"
              @click="rouletteStore.betAmount = amount"
            >
              <div class="chip-inner">
                <div class="chip-stripes"></div>
                <span class="chip-amount">{{ amount }}€</span>
              </div>
            </button>
          </div>
          <div class="action-buttons">
            <button
              class="clear-btn"
              @click="rouletteStore.resetGame"
              :disabled="rouletteStore.loading"
            >
              Clear
            </button>
            <button
              class="spin-btn"
              @click="handleSpin"
              :disabled="!canPlay || rouletteStore.loading"
            >
              Spin
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Betting Grid Section -->
    <div class="betting-grid-container">
      <div class="betting-grid">
        <!-- Zero -->
        <div class="number zero" @click="placeBet('straight', [0])">
          0
          <div
            v-if="getBetOnNumber(0)"
            class="casino-chip"
            :class="chipClass(getBetOnNumber(0))"
          >
            <div class="chip-inner">
              <div class="chip-stripes"></div>
              <span class="chip-amount">{{ getBetOnNumber(0) }}€</span>
            </div>
          </div>
        </div>

        <!-- Numbers 1-36 -->
        <div
          v-for="n in 36"
          :key="n"
          class="number"
          :class="getNumberClass(n)"
          @click="placeBet('straight', [n])"
        >
          {{ n }}
          <div
            v-if="getBetOnNumber(n)"
            class="casino-chip"
            :class="chipClass(getBetOnNumber(n))"
          >
            <div class="chip-inner">
              <div class="chip-stripes"></div>
              <span class="chip-amount">{{ getBetOnNumber(n) }}€</span>
            </div>
          </div>
        </div>

        <!-- Outside bets -->
        <div class="outside-bets">
          <!-- First row (1-18, Even, Red, Black, Odd, 19-36) -->
          <div class="bet-row">
            <div
              class="bet-box"
              @click="
                placeBet(
                  '1to18',
                  [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18,
                  ]
                )
              "
            >
              1-18
              <div
                v-if="getBetOnType('1to18')"
                class="casino-chip"
                :class="chipClass(getBetOnType('1to18'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("1to18") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box"
              @click="
                placeBet(
                  'even',
                  [
                    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
                    34, 36,
                  ]
                )
              "
            >
              EVEN
              <div
                v-if="getBetOnType('even')"
                class="casino-chip"
                :class="chipClass(getBetOnType('even'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("even") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box red"
              @click="
                placeBet(
                  'red',
                  [
                    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32,
                    34, 36,
                  ]
                )
              "
            >
              RED
              <div
                v-if="getBetOnType('red')"
                class="casino-chip"
                :class="chipClass(getBetOnType('red'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("red") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box black"
              @click="
                placeBet(
                  'black',
                  [
                    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31,
                    33, 35,
                  ]
                )
              "
            >
              BLACK
              <div
                v-if="getBetOnType('black')"
                class="casino-chip"
                :class="chipClass(getBetOnType('black'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("black") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box"
              @click="
                placeBet(
                  'odd',
                  [
                    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31,
                    33, 35,
                  ]
                )
              "
            >
              ODD
              <div
                v-if="getBetOnType('odd')"
                class="casino-chip"
                :class="chipClass(getBetOnType('odd'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("odd") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box"
              @click="
                placeBet(
                  '19to36',
                  [
                    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
                    34, 35, 36,
                  ]
                )
              "
            >
              19-36
              <div
                v-if="getBetOnType('19to36')"
                class="casino-chip"
                :class="chipClass(getBetOnType('19to36'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("19to36") }}€</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Dozens -->
          <div class="bet-row">
            <div
              class="bet-box dozen"
              @click="
                placeBet('1st12', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
              "
            >
              1st 12
              <div
                v-if="getBetOnType('1st12')"
                class="casino-chip"
                :class="chipClass(getBetOnType('1st12'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("1st12") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box dozen"
              @click="
                placeBet(
                  '2nd12',
                  [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                )
              "
            >
              2nd 12
              <div
                v-if="getBetOnType('2nd12')"
                class="casino-chip"
                :class="chipClass(getBetOnType('2nd12'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("2nd12") }}€</span>
                </div>
              </div>
            </div>
            <div
              class="bet-box dozen"
              @click="
                placeBet(
                  '3rd12',
                  [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
                )
              "
            >
              3rd 12
              <div
                v-if="getBetOnType('3rd12')"
                class="casino-chip"
                :class="chipClass(getBetOnType('3rd12'))"
              >
                <div class="chip-inner">
                  <div class="chip-stripes"></div>
                  <span class="chip-amount">{{ getBetOnType("3rd12") }}€</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouletteStore } from "../../../stores/casino/roulette";
import { FortuneWheel } from "vue3-fortune-wheel";
import type { Data } from "vue3-fortune-wheel";
import RouletteWheel from "./RouletteWheel.vue";

const rouletteStore = useRouletteStore();
const targetValue = ref(0);

// European roulette wheel numbers in order
const wheelNumbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

interface WheelData extends Data {
  id: number;
  value: string;
  text: string;
  color: string;
  bgColor: string;
  textColor: string;
}

const wheelData = computed<WheelData[]>(() => {
  return wheelNumbers.map((number) => ({
    id: number,
    value: number.toString(),
    text: number.toString(),
    color: getNumberColor(number),
    bgColor: getNumberColor(number),
    textColor: "#FFFFFF",
  }));
});

const getNumberColor = (number: number) => {
  if (number === 0) return "#0EA94A"; // Green for zero
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  return redNumbers.includes(number) ? "#DD3333" : "#222222";
};

const getNumberClass = (number: number) => {
  if (number === 0) return "green";
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  return redNumbers.includes(number) ? "red" : "black";
};

const canPlay = computed(() => {
  const canPlayState =
    rouletteStore.currentBets.length > 0 && !rouletteStore.isGameActive;
  console.log("[ROULETTE-DEBUG] Can play state:", {
    currentBetsLength: rouletteStore.currentBets.length,
    isGameActive: rouletteStore.isGameActive,
    loading: rouletteStore.loading,
    canPlay: canPlayState,
  });
  return canPlayState;
});

const placeBet = (type: string, numbers: number[]) => {
  if (!rouletteStore.isGameActive) {
    rouletteStore.addBet(type, numbers, rouletteStore.betAmount);
  }
};

const getBetOnNumber = (number: number): number | null => {
  const bet = rouletteStore.currentBets.find(
    (bet) => bet.type === "straight" && bet.numbers.includes(number)
  );
  return bet ? bet.amount : null;
};

const getBetOnType = (type: string): number | null => {
  const bet = rouletteStore.currentBets.find((bet) => bet.type === type);
  return bet ? bet.amount : null;
};

// Add responsive wheel size
const wheelSize = computed(() => {
  return window.innerWidth < 768 ? 280 : 400;
});

const chipClass = (amount: number) => {
  const classes = ["casino-chip"];
  if (amount <= 1) classes.push("chip-1");
  else if (amount <= 5) classes.push("chip-5");
  else if (amount <= 10) classes.push("chip-10");
  else if (amount <= 25) classes.push("chip-25");
  else if (amount <= 50) classes.push("chip-50");
  else classes.push("chip-100");
  return classes;
};

const showResult = ref(false);
const lastWinAmount = ref(0);

const getResultText = (number: number | null) => {
  if (number === null) return "";
  const texts = [];
  if (number === 0) return "ZERO";
  if (number <= 18) texts.push("1-18");
  else texts.push("19-36");
  if (number % 2 === 0) texts.push("EVEN");
  else texts.push("ODD");
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  texts.push(redNumbers.includes(number) ? "RED" : "BLACK");
  return texts.join(" • ");
};

const wheelContainer = ref<HTMLElement | null>(null);

// Add new function to handle spin with scroll
const handleSpin = async () => {
  console.log("[ROULETTE-DEBUG] Spin button clicked");

  // First scroll to wheel
  if (wheelContainer.value) {
    wheelContainer.value.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  // Then spin after a short delay
  setTimeout(() => {
    rouletteStore.spinWheel();
  }, 500); // Wait for scroll to complete
};
</script>

<style scoped>
.roulette-game {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.game-header {
  background: var(--header);
  border-radius: 8px;
  padding: 1rem;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  color: var(--textcolor);
  font-size: 0.875rem;
}

.stat-value {
  color: var(--white);
  font-size: 1.25rem;
  font-weight: bold;
}

.roulette-container {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.wheel-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.controls-section {
  background: var(--header);
  border-radius: 8px;
  padding: 1rem;
}

.bet-controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bet-amount-controls {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  padding: 1rem;
}

.chip-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  margin: 0 auto;
  position: relative;
}

.chip-btn:hover {
  transform: translateY(-5px);
}

.chip-btn.active {
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.chip-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(255, 255, 255, 0.5);
  position: relative;
}

.chip-stripes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.1) 3px,
    rgba(255, 255, 255, 0.1) 6px
  );
}

.chip-amount {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Chip colors based on amount */
.chip-1 {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  box-shadow: 0 4px 8px rgba(74, 144, 226, 0.3);
}

.chip-5 {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}

.chip-10 {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 4px 8px rgba(46, 204, 113, 0.3);
}

.chip-25 {
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  box-shadow: 0 4px 8px rgba(241, 196, 15, 0.3);
}

.chip-50 {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  box-shadow: 0 4px 8px rgba(155, 89, 182, 0.3);
}

.chip-100 {
  background: linear-gradient(135deg, #34495e, #2c3e50);
  box-shadow: 0 4px 8px rgba(52, 73, 94, 0.3);
}

/* Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .chip-btn {
    width: 50px;
    height: 50px;
  }

  .chip-amount {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .chip-btn {
    width: 40px;
    height: 40px;
  }

  .chip-amount {
    font-size: 0.9rem;
  }

  .bet-amount-controls {
    gap: 0.5rem;
    padding: 0.5rem;
  }
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
}

.clear-btn,
.spin-btn {
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn {
  background: var(--subheader);
  border: 1px solid var(--border);
  color: var(--white);
}

.spin-btn {
  background: var(--active-color);
  border: 1px solid var(--active-color);
  color: var(--white);
}

.spin-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .roulette-game {
    padding: 0.5rem;
  }

  .roulette-container {
    flex-direction: column;
    gap: 1rem;
  }

  .wheel-section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .controls-section {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    padding: 0.5rem;
  }

  .bet-controls {
    gap: 0.5rem;
  }

  .bet-amount-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .bet-amount-btn {
    padding: 0.5rem 0.25rem;
    font-size: 0.9rem;
    min-height: 35px;
  }

  .action-buttons {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .clear-btn,
  .spin-btn {
    padding: 0.5rem;
    font-size: 0.9rem;
    min-height: 35px;
  }

  .betting-grid-container {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding: 0.5rem;
  }

  .betting-grid {
    min-width: 500px; /* Smaller minimum width */
    margin: 0 auto;
  }

  .number {
    font-size: 0.9rem;
  }

  .bet-box {
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  .dozen {
    padding: 1rem;
  }

  /* Adjust chips for better touch targets */
  .casino-chip {
    width: 28px;
    height: 28px;
  }

  .chip-amount {
    font-size: 0.7rem;
  }
}

/* Small mobile adjustments */
@media (max-width: 480px) {
  .betting-grid {
    min-width: 450px; /* Even smaller for very small devices */
  }

  .bet-box {
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .dozen {
    padding: 0.75rem;
  }

  .number {
    font-size: 0.8rem;
  }

  .casino-chip {
    width: 25px;
    height: 25px;
  }

  .chip-amount {
    font-size: 0.65rem;
  }

  .controls-section {
    max-width: 280px;
  }

  .bet-amount-btn {
    padding: 0.4rem 0.2rem;
    font-size: 0.8rem;
    min-height: 32px;
  }

  .clear-btn,
  .spin-btn {
    padding: 0.4rem;
    font-size: 0.8rem;
    min-height: 32px;
  }
}

/* Landscape mode specific */
@media screen and (max-width: 768px) and (orientation: landscape) {
  .roulette-container {
    flex-direction: row;
    align-items: flex-start;
  }

  .wheel-section {
    flex: 0 0 auto;
    width: 40%;
  }

  .controls-section {
    flex: 1;
    margin: 0;
  }

  .betting-grid-container {
    margin-top: 1rem;
  }
}

.betting-grid-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 2rem;
  background: var(--header);
  border-radius: 8px;
  padding: 1rem;
}

.betting-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2px;
  max-width: 900px;
  margin: 0 auto;
  background: var(--border);
  padding: 2px;
}

.number {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--subheader);
  color: var(--white);
  font-weight: bold;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
}

.number:hover {
  background: var(--active-hover);
}

.number.red {
  background: #dd3333;
}

.number.black {
  background: #222222;
}

.zero {
  grid-column: span 12;
  aspect-ratio: 12/1;
  background: #0ea94a;
}

.outside-bets {
  grid-column: span 12;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bet-row {
  display: flex;
  gap: 2px;
}

.bet-box {
  flex: 1;
  padding: 1rem;
  background: var(--subheader);
  color: var(--white);
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;
}

.bet-box:hover {
  background: var(--active-hover);
}

.bet-box.red {
  color: #dd3333;
}

.bet-box.black {
  color: #222222;
}

.dozen {
  padding: 1.5rem;
}

.casino-chip {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  z-index: 2;
  animation: chipDrop 0.3s ease-out;
}

.chip-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed rgba(255, 255, 255, 0.5);
}

.chip-stripes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.1) 3px,
    rgba(255, 255, 255, 0.1) 6px
  );
}

.chip-amount {
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  z-index: 1;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* Chip colors based on amount */
.chip-1 {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  box-shadow: 0 3px 6px rgba(74, 144, 226, 0.3);
}

.chip-5 {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 3px 6px rgba(231, 76, 60, 0.3);
}

.chip-10 {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  box-shadow: 0 3px 6px rgba(46, 204, 113, 0.3);
}

.chip-25 {
  background: linear-gradient(135deg, #f1c40f, #f39c12);
  box-shadow: 0 3px 6px rgba(241, 196, 15, 0.3);
}

.chip-50 {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  box-shadow: 0 3px 6px rgba(155, 89, 182, 0.3);
}

.chip-100 {
  background: linear-gradient(135deg, #34495e, #2c3e50);
  box-shadow: 0 3px 6px rgba(52, 73, 94, 0.3);
}

@keyframes chipDrop {
  0% {
    transform: translate(-50%, -150%) scale(1.2);
    opacity: 0;
  }
  70% {
    transform: translate(-50%, -40%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}

.result-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.result-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  animation: resultPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.result-number {
  position: relative;
}

.number-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;
  border: 4px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.number-circle::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
}

.number-circle.red {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
}

.number-circle.black {
  background: linear-gradient(135deg, #34495e, #2c3e50);
}

.number-circle.green {
  background: linear-gradient(135deg, #27ae60, #219a52);
}

.result-details {
  text-align: center;
  color: white;
}

.result-text {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.result-win {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.win-label {
  font-size: 1.25rem;
  color: #f1c40f;
  font-weight: bold;
  letter-spacing: 2px;
}

.win-amount {
  font-size: 2rem;
  font-weight: bold;
  color: #2ecc71;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@keyframes resultPop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .number-circle {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }

  .result-text {
    font-size: 1.25rem;
  }

  .win-label {
    font-size: 1rem;
  }

  .win-amount {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .number-circle {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  .result-text {
    font-size: 1rem;
  }

  .win-amount {
    font-size: 1.5rem;
  }
}

.history-container {
  background: var(--header);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.history-title {
  text-align: center;
  color: var(--textcolor);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.history-bar {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 0.5rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--active-color) var(--subheader);
}

.history-bar::-webkit-scrollbar {
  height: 4px;
}

.history-bar::-webkit-scrollbar-track {
  background: var(--subheader);
  border-radius: 2px;
}

.history-bar::-webkit-scrollbar-thumb {
  background: var(--active-color);
  border-radius: 2px;
}

.history-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
  animation: slideIn 0.3s ease-out;
}

.history-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.125rem;
  color: white;
  position: relative;
  transition: transform 0.2s ease;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.history-number::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
  pointer-events: none;
}

.history-number.red {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.history-number.black {
  background: linear-gradient(135deg, #34495e, #2c3e50);
  box-shadow: 0 2px 8px rgba(52, 73, 94, 0.3);
}

.history-number.green {
  background: linear-gradient(135deg, #27ae60, #219a52);
  box-shadow: 0 2px 8px rgba(39, 174, 96, 0.3);
}

.history-number:hover {
  transform: scale(1.1);
}

.history-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.history-color,
.history-parity {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--textcolor);
  opacity: 0.7;
  letter-spacing: 1px;
}

@keyframes slideIn {
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Mobile Styles */
@media (max-width: 768px) {
  .history-container {
    padding: 0.75rem;
    margin-top: 1rem;
  }

  .history-number {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .history-color,
  .history-parity {
    font-size: 0.5rem;
  }
}

@media (max-width: 480px) {
  .history-title {
    font-size: 0.75rem;
  }

  .history-bar {
    gap: 0.75rem;
  }

  .history-number {
    width: 30px;
    height: 30px;
    font-size: 0.875rem;
  }
}

.wheel-container {
  position: relative;
  will-change: transform;
  scroll-margin-top: 20px; /* Add space for better scrolling position */
}

.wheel-pointer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 40px;
  background: var(--active-color);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 10;
}

.wheel-center {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-circle {
  width: 60%;
  height: 60%;
  background: var(--header);
  border-radius: 50%;
  border: 4px solid var(--border);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.center-circle::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
  border-radius: 50%;
}

/* Add smooth transitions for hover effects */
.bet-box,
.number {
  transition: all 0.2s ease;
}

.bet-box:hover,
.number:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Enhance the wheel appearance */
:deep(.fortune-wheel) {
  border: 8px solid var(--border);
  box-shadow: 0 0 0 4px var(--header), 0 8px 24px rgba(0, 0, 0, 0.3);
  background: var(--header);
}

:deep(.wheel-item) {
  transition: all 0.2s ease;
}

:deep(.wheel-item:hover) {
  filter: brightness(1.2);
}

/* Mobile grid layout modifications */
@media (max-width: 768px) {
  .betting-grid-container {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 70vh;
    padding: 0.75rem;
  }

  .betting-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    min-width: unset;
    width: 66%;
    gap: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08),
      inset 0 2px 4px rgba(255, 255, 255, 0.1);
  }

  /* Zero position */
  .zero {
    grid-column: 1 / -1;
    aspect-ratio: 3/1;
    margin-bottom: 4px;
  }

  /* Numbers layout - 3 columns */
  .number:not(.zero) {
    aspect-ratio: 1;
  }

  /* First column: 1, 4, 7, etc. */
  .number:nth-child(3n + 1):not(.zero) {
    grid-column: 3;
  }

  /* Second column: 2, 5, 8, etc. */
  .number:nth-child(3n + 2) {
    grid-column: 1;
  }

  /* Third column: 3, 6, 9, etc. */
  .number:nth-child(3n + 3) {
    grid-column: 2;
  }

  /* Outside bets */
  .outside-bets {
    grid-column: 1 / -1;
    margin-top: 4px;
  }

  .bet-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 4px;
  }

  .bet-box {
    height: 44px;
    padding: 0.5rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dozen {
    grid-column: span 2;
  }

  /* Adjust chip sizes */
  .casino-chip {
    width: 24px;
    height: 24px;
  }

  .chip-amount {
    font-size: 0.7rem;
  }
}

/* Small mobile further adjustments */
@media (max-width: 480px) {
  .betting-grid-container {
    padding: 0.5rem;
  }

  .bet-box {
    height: 40px;
    font-size: 0.8rem;
  }

  .casino-chip {
    width: 20px;
    height: 20px;
  }

  .chip-amount {
    font-size: 0.65rem;
  }
}
</style>
