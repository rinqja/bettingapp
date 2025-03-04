<template>
  <div class="slot-machine">
    <div class="stats-container">
      <div class="stat-box">
        <span class="stat-label">Bet Amount</span>
        <input type="number" v-model="betAmount" :disabled="isSpinning" />
      </div>
      <div class="stat-box">
        <span class="stat-label">Win Amount</span>
        <span class="stat-value">{{ winAmount.toFixed(2) }}€</span>
      </div>
    </div>

    <div class="slot-grid">
      <div v-for="row in 4" :key="`row-${row}`" class="slot-row">
        <div
          v-for="col in 5"
          :key="`${row}-${col}`"
          class="slot-cell"
          :class="{
            'winning-cell': winningPositions.includes(`${row - 1}-${col - 1}`),
          }"
        >
          <div class="symbol" :class="{ spinning: isSpinning }">
            {{ grid[row - 1][col - 1] }}
          </div>
        </div>
      </div>
    </div>

    <button
      class="spin-button"
      @click="spin"
      :disabled="isSpinning || betAmount <= 0"
    >
      SPIN
    </button>

    <Transition name="modal">
      <div v-if="showWinModal" class="win-modal">
        <div class="modal-content">
          <h2>WIN!</h2>
          <div class="win-amount">{{ winAmount.toFixed(2) }}€</div>
          <div class="multiplier">Matching symbols: {{ lastWinningCount }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const symbols = ["🍎", "🍋", "🍇", "🍑", "💎", "7️⃣", "🎰"];
const multipliers = {
  6: 2, // 6 matching symbols: 2x
  7: 3, // 7 matching symbols: 3x
  8: 5, // 8 matching symbols: 5x
  9: 10, // 9 matching symbols: 10x
  10: 15, // 10+ matching symbols: 15x
};

const grid = ref(
  Array(4)
    .fill(null)
    .map(() => Array(5).fill("🎰"))
);
const isSpinning = ref(false);
const betAmount = ref(1);
const winAmount = ref(0);
const showWinModal = ref(false);
const winningPositions = ref<string[]>([]);
const lastWinningCount = ref(0);

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function checkWinningCombinations() {
  const symbolCounts = new Map();
  const positions = new Map();

  // Count symbols and their positions
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      const symbol = grid.value[row][col];
      if (!symbolCounts.has(symbol)) {
        symbolCounts.set(symbol, 0);
        positions.set(symbol, []);
      }
      symbolCounts.set(symbol, symbolCounts.get(symbol) + 1);
      positions.get(symbol).push(`${row}-${col}`);
    }
  }

  // Find winning combinations
  let maxCount = 0;
  let winningSymbol = null;

  symbolCounts.forEach((count, symbol) => {
    if (count >= 6 && count > maxCount) {
      maxCount = count;
      winningSymbol = symbol;
    }
  });

  if (winningSymbol && maxCount >= 6) {
    winningPositions.value = positions.get(winningSymbol);
    lastWinningCount.value = maxCount;
    return (
      multipliers[Math.min(maxCount, 10) as keyof typeof multipliers] || 15
    );
  }

  return 0;
}

function spin() {
  if (isSpinning.value || betAmount.value <= 0) return;

  isSpinning.value = true;
  showWinModal.value = false;
  winAmount.value = 0;
  winningPositions.value = [];

  // Fill grid with new random symbols
  setTimeout(() => {
    grid.value = grid.value.map((row) => row.map(() => getRandomSymbol()));

    const multiplier = checkWinningCombinations();
    winAmount.value = betAmount.value * multiplier;

    if (multiplier > 0) {
      showWinModal.value = true;
    }

    isSpinning.value = false;
  }, 1000);
}
</script>

<style scoped>
.slot-machine {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

// ...existing code for stats-container, stat-box, etc...

.slot-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 2rem auto;
  background: var(--header);
  padding: 1rem;
  border-radius: 8px;
  width: fit-content;
}

.slot-row {
  display: flex;
  gap: 0.5rem;
}

.slot-cell {
  width: 80px;
  height: 80px;
  background: var(--subheader);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.winning-cell {
  background: var(--active-color);
  animation: pulse 1s infinite;
}

.symbol {
  transition: transform 0.1s;
}

.symbol.spinning {
  animation: spin 0.2s infinite;
}

@keyframes spin {
  0% {
    transform: translateY(-2px);
  }
  50% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(-2px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
