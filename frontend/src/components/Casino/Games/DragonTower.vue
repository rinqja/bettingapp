<template>
  <div class="dragon-tower-game">
    <div class="game-title">
      <span class="dragon-letter">D</span>
      <span class="dragon-letter">R</span>
      <span class="dragon-letter">A</span>
      <span class="dragon-letter">G</span>
      <span class="dragon-letter">O</span>
      <span class="dragon-letter">N</span>
      <span class="dragon-letter space"></span>
      <span class="dragon-letter">T</span>
      <span class="dragon-letter">O</span>
      <span class="dragon-letter">W</span>
      <span class="dragon-letter">E</span>
      <span class="dragon-letter">R</span>
    </div>
    <div class="game-header">
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Next Profit</span>
          <span class="stat-value"
            >{{ dragonTowerStore.currentProfit.toFixed(2) }}€</span
          >
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="stat-label">Multiplier</span>
          <span class="stat-value"
            >{{ dragonTowerStore.currentMultiplier }}x</span
          >
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="stat-label">Dragons Per Row</span>
          <span class="stat-value">{{ dragonTowerStore.dragonsPerRow }}</span>
        </div>
      </div>
    </div>

    <div class="tower-wrapper" ref="towerWrapperRef">
      <div class="dragon-decoration">
        <div
          class="fire-left"
          :class="{ 'show-fire': showFireAnimation }"
        ></div>
        <div
          class="fire-right"
          :class="{ 'show-fire': showFireAnimation }"
        ></div>
      </div>
      <div class="tower-container">
        <div
          v-for="(row, rowIndex) in reversedRows"
          :key="rowIndex"
          class="tower-row"
          :class="{
            'active-row': isActiveRow(rowIndex),
            'completed-row': isCompletedRow(rowIndex),
            'highlight-row':
              isActiveRow(rowIndex) && dragonTowerStore.isGameActive,
          }"
        >
          <div
            v-for="(tile, tileIndex) in row.tiles.slice(
              0,
              DIFFICULTY_CONFIGS[dragonTowerStore.difficulty].columns
            )"
            :key="tileIndex"
            class="tile"
            :class="{
              revealed: tile.revealed,
              dragon: tile.revealed && tile.isDragon,
              'dragon-clicked':
                tile.revealed &&
                tile.isDragon &&
                9 - rowIndex === dragonTowerStore.currentRow,
              'dragon-revealed':
                tile.revealed &&
                tile.isDragon &&
                9 - rowIndex !== dragonTowerStore.currentRow,
              safe: tile.revealed && !tile.isDragon,
              'revealed-dragon':
                !tile.revealed &&
                tile.isDragon &&
                !dragonTowerStore.isGameActive,
            }"
            @click="handleTileClick(9 - rowIndex, tileIndex)"
          >
            <span
              v-if="tile.revealed && !tile.isDragon"
              class="safe-emoji glow-effect"
              >🥚</span
            >
            <span v-if="tile.revealed && tile.isDragon" class="dragon-emoji"
              >🐉</span
            >
            <span
              v-if="
                !tile.revealed &&
                tile.isDragon &&
                !dragonTowerStore.isGameActive
              "
              class="revealed-dragon-emoji"
              >��</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="game-controls">
      <div class="bet-controls">
        <label class="control-label">Bet Amount</label>
        <div class="bet-input-container">
          <input
            type="number"
            v-model="dragonTowerStore.betAmount"
            :disabled="dragonTowerStore.isGameActive"
            min="1"
            step="1"
            class="bet-amount-input"
          />
          <div class="quick-amounts">
            <button
              v-for="amount in [1, 5, 10, 25]"
              :key="amount"
              @click="setBetAmount(amount)"
              class="quick-amount-btn"
              :disabled="dragonTowerStore.isGameActive"
            >
              {{ amount }}
            </button>
          </div>
        </div>
      </div>

      <div class="difficulty-controls">
        <label>Difficulty</label>
        <select
          v-model="dragonTowerStore.difficulty"
          :disabled="dragonTowerStore.isGameActive"
          class="difficulty-select"
        >
          <option value="EASY">Easy (4 rows, 1 dragon per row)</option>
          <option value="MEDIUM">Medium (3 rows, 1 dragon per row)</option>
          <option value="HARD">Hard (2 rows, 1 dragon per row)</option>
          <option value="EXPERT">Expert (3 rows, 2 dragons per row)</option>
          <option value="MASTER">Master (4 rows, 3 dragons per row)</option>
        </select>
      </div>

      <div class="action-buttons">
        <button
          v-if="!dragonTowerStore.isGameActive"
          class="main-btn"
          @click="handleGameAction"
          :disabled="dragonTowerStore.loading"
        >
          {{ gameActionText }}
        </button>
        <button
          v-else
          class="cashout-btn"
          @click="handleCashout"
          :disabled="!dragonTowerStore.canCashout || dragonTowerStore.loading"
        >
          Cashout ({{ dragonTowerStore.currentMultiplier }}x)
        </button>
        <button
          class="clear-btn"
          @click="dragonTowerStore.resetTower"
          :disabled="dragonTowerStore.isGameActive"
        >
          Clear
        </button>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showWinModal" class="win-modal">
        <div class="modal-content">
          <h2>WIN!</h2>
          <div class="win-amount">
            {{
              (
                dragonTowerStore.betAmount * dragonTowerStore.currentMultiplier
              ).toFixed(2)
            }}€
          </div>
          <div class="multiplier">
            x{{ dragonTowerStore.currentMultiplier }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import {
  useDragonTowerStore,
  DIFFICULTY_CONFIGS,
} from "../../../stores/casino/dragonTower";
import { storeToRefs } from "pinia";
import dragonImage from "../../../assets/img/header/dragotower.jpg";
import fireImage from "../../../assets/img/header/fire.gif";

const dragonTowerStore = useDragonTowerStore();
const { loading, isGameActive, currentMultiplier, currentProfit } =
  storeToRefs(dragonTowerStore);

const reversedRows = computed(() => [...dragonTowerStore.rows].reverse());

const showWinModal = ref(false);
const showFireAnimation = ref(false);
const towerWrapperRef = ref<HTMLElement | null>(null);

// Watch for wins
watch(currentProfit, (newProfit) => {
  if (newProfit > 0 && !isGameActive.value) {
    showWinModal.value = true;
    setTimeout(() => {
      showWinModal.value = false;
    }, 3000);
  }
});

const gameActionText = computed(() => {
  if (loading.value) return "Processing...";
  return "Play";
});

const handleGameAction = async () => {
  await dragonTowerStore.startGame();
  towerWrapperRef.value?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const handleTileClick = (rowIndex: number, tileIndex: number) => {
  // Only allow clicking tiles in the current active row
  if (
    dragonTowerStore.isGameActive &&
    !dragonTowerStore.loading &&
    rowIndex === dragonTowerStore.currentRow
  ) {
    dragonTowerStore.revealTile(rowIndex, tileIndex);
  }
};

const setBetAmount = (amount: number) => {
  if (!isGameActive.value) {
    dragonTowerStore.betAmount = amount;
  }
};

const isActiveRow = (rowIndex: number) => {
  return 9 - rowIndex === dragonTowerStore.currentRow;
};

const isCompletedRow = (rowIndex: number) => {
  return 9 - rowIndex < dragonTowerStore.currentRow;
};

// Add this after the existing watch
watch(
  () => dragonTowerStore.difficulty,
  (newDifficulty) => {
    if (!dragonTowerStore.isGameActive) {
      const config = DIFFICULTY_CONFIGS[newDifficulty];
      dragonTowerStore.maxColumns = config.columns;
      dragonTowerStore.dragonsPerRow = config.dragonsPerRow;
      dragonTowerStore.baseMultiplier = config.baseMultiplier;
    }
  }
);

const handleCashout = async () => {
  showFireAnimation.value = true;
  await dragonTowerStore.cashout();
  setTimeout(() => {
    showFireAnimation.value = false;
  }, 2000); // Fire animation duration
};
</script>

<style scoped>
.dragon-tower-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(145deg, #1a0f2e, #2d1810);
  border-radius: 16px;
  border: 2px solid #ffd700;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 165, 0, 0.2),
    inset 0 0 30px rgba(255, 69, 0, 0.1);
}

.game-title {
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.3rem;
  perspective: 1000px;
}

.dragon-letter {
  font-family: "Cinzel", serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 165, 0, 0.8), 0 0 20px rgba(255, 69, 0, 0.5),
    2px 2px 2px rgba(0, 0, 0, 0.4);
  transform-style: preserve-3d;
  animation: dragonFloat 3s ease-in-out infinite;
}

.dragon-letter:nth-child(even) {
  animation-delay: -1.5s;
}

.space {
  width: 1rem;
}

@keyframes dragonFloat {
  0%,
  100% {
    transform: translateY(0) rotateX(0);
    color: #ffd700;
  }
  50% {
    transform: translateY(-5px) rotateX(10deg);
    color: #ff8c00;
  }
}

@media (max-width: 768px) {
  .dragon-letter {
    font-size: 2rem;
  }
  .space {
    width: 0.8rem;
  }
}

@media (max-width: 480px) {
  .dragon-letter {
    font-size: 1.5rem;
  }
  .space {
    width: 0.5rem;
  }
  .game-title {
    gap: 0.2rem;
    margin-bottom: 1.5rem;
  }
}

.game-header {
  margin-bottom: 1rem;
}

.stats-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #2a1f3d, #3d2018);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 0 15px rgba(255, 165, 0, 0.2);
  border: 1px solid #ffd700;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0; /* Prevent overflow */
}

.divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.stat-value {
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: bold;
  color: var(--white);
}

@media (max-width: 480px) {
  .stats-container {
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .stat-item {
    padding: 0 0.25rem;
  }

  .stat-label {
    font-size: 0.7rem;
    color: white;
  }
}

.tower-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 100px; /* Space for the dragon */
  background: url("../../../assets/img/header/backdrago.webp") no-repeat center
    center;
  background-size: cover;
  border-radius: 16px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.3);
}

.dragon-decoration {
  position: absolute;
  top: -40px; /* Moved higher up */
  left: 50%;
  transform: translateX(-50%);
  width: 400px; /* Increased size */
  height: 200px; /* Increased size */
  background: url("../../../../src/assets/img/header/dragotower.svg") no-repeat
    center center;
  background-size: contain;
  z-index: 1;
  pointer-events: none; /* Allows clicking through the decoration */
  animation: floatDragon 4s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.5)) /* Orange glow */
    drop-shadow(0 0 20px rgba(255, 69, 0, 0.3)); /* Secondary glow */
}

.fire-left,
.fire-right {
  position: absolute;
  width: 60px;
  height: 100px;
  bottom: 20px;
  background: url("../../../../src/assets/img/header/fire.gif") no-repeat center
    center;
  background-size: cover;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  visibility: hidden;
}

.fire-left.show-fire,
.fire-right.show-fire {
  opacity: 1;
  visibility: visible;
}

.fire-left {
  left: -40px;
  transform: rotate(-15deg);
}

.fire-right {
  right: -40px;
  transform: rotate(15deg);
}

@keyframes floatDragon {
  0% {
    transform: translateX(-50%) translateY(0) scale(1);
    filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.5))
      drop-shadow(0 0 20px rgba(255, 69, 0, 0.3));
  }
  50% {
    transform: translateX(-50%) translateY(-10px) scale(1.05);
    filter: drop-shadow(0 0 15px rgba(255, 165, 0, 0.7))
      drop-shadow(0 0 25px rgba(255, 69, 0, 0.5));
  }
  100% {
    transform: translateX(-50%) translateY(0) scale(1);
    filter: drop-shadow(0 0 10px rgba(255, 165, 0, 0.5))
      drop-shadow(0 0 20px rgba(255, 69, 0, 0.3));
  }
}

.tower-container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tower-row {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
}

.tile {
  flex: 1;
  aspect-ratio: 1;
  min-width: 40px;
  max-width: 80px;
  background: #767171;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  opacity: 0.3;
}

/* Unrevealed tile hover effect */
.tile:not(.revealed):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-color: var(--active-color);
}

/* Safe tile with diamond */
.tile.safe {
  background: linear-gradient(145deg, #2ecc71 0%, #27ae60 100%);
  border-color: #2ecc71;
  box-shadow: 0 0 15px rgba(46, 204, 113, 0.3);
  position: relative;
  overflow: visible; /* Allow glow to extend outside tile */
}

.safe-emoji,
.dragon-emoji,
.revealed-dragon-emoji {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
}

/* Add new styles for the glowing effect */
.glow-effect {
  animation: glow 2s ease-in-out infinite;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))
      drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9))
      drop-shadow(0 0 20px rgba(255, 215, 0, 0.7))
      drop-shadow(0 0 25px rgba(255, 215, 0, 0.5));
  }
  100% {
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.7))
      drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  }
}

/* Dragon tile styling */
.tile.dragon {
  background: linear-gradient(145deg, #ff4444 0%, #cc0000 100%);
  border-color: #ff4444;
  box-shadow: 0 0 15px rgba(255, 68, 68, 0.3);
}

/* Dragon tile that was clicked (causing loss) */
.tile.dragon-clicked {
  background: linear-gradient(145deg, #ff4444 0%, #cc0000 100%);
  border-color: #ff4444;
  box-shadow: 0 0 15px rgba(255, 68, 68, 0.3);
}

/* Other revealed dragon tiles */
.tile.dragon-revealed {
  background: linear-gradient(
    145deg,
    rgba(255, 68, 68, 0.5),
    rgba(204, 0, 0, 0.5)
  );
  border-color: rgba(255, 68, 68, 0.5);
  opacity: 0.6;
}

/* Dragons revealed after game end */
.revealed-dragon {
  background: rgba(255, 68, 68, 0.3);
  border-color: rgba(255, 68, 68, 0.3);
}

.revealed-dragon-emoji {
  opacity: 0.5;
}

/* Active row highlighting */
.active-row .tile:not(.revealed) {
  border-color: var(--active-color);
  box-shadow: 0 0 10px rgba(var(--active-color-rgb), 0.2);
}

/* Completed row styling */
.completed-row .tile:not(.revealed) {
  opacity: 0.7;
  filter: brightness(0.8);
}

.safe-emoji {
  filter: drop-shadow(0 0 8px rgba(45, 113, 117, 0.6));
}

.dragon-emoji {
  filter: drop-shadow(0 0 8px rgba(139, 51, 70, 0.6));
}

.game-controls {
  margin-top: 2rem;
}

.bet-controls {
  background: linear-gradient(145deg, #2a1f3d, #3d2018);
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid #ffd700;
  box-shadow: inset 0 0 15px rgba(255, 165, 0, 0.2);
}

.control-label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.bet-input-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bet-amount-input {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(145deg, #1a0f2e, #2d1810);
  border: 1px solid #8b0000;
  border-radius: 8px;
  color: var(--white);
  font-size: 1.1rem;
  text-align: center;
  color: #ffd700;
}

.bet-amount-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quick-amounts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.quick-amount-btn {
  padding: 0.75rem;
  background: linear-gradient(145deg, #2a1f3d, #3d2018);
  border: 1px solid #8b0000;
  border-radius: 8px;
  color: #ffd700;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.quick-amount-btn:hover:not(:disabled) {
  background: linear-gradient(145deg, #3d2018, #2a1f3d);
  border-color: #ffd700;
  box-shadow: 0 0 15px rgba(255, 165, 0, 0.4);
}

.quick-amount-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.main-btn,
.cashout-btn,
.clear-btn {
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.main-btn {
  background: linear-gradient(145deg, #8b0000, #5c0000);
  border: 1px solid #ffd700;
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.4);
}

.main-btn:hover:not(:disabled) {
  background: linear-gradient(145deg, #a00000, #6c0000);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
}

.cashout-btn {
  background: linear-gradient(145deg, #1e8c1e, #156315);
  border: 1px solid #ffd700;
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 255, 0, 0.5);
}

.clear-btn {
  background: linear-gradient(145deg, #2a1f3d, #3d2018);
  border: 1px solid #8b0000;
  color: #ffd700;
}

.clear-btn:hover:not(:disabled) {
  background: var(--header);
  color: var(--white);
}

.main-btn:disabled,
.cashout-btn:disabled,
.clear-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.win-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(145deg, #1a0f2e, #2d1810);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 200px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 165, 0, 0.3);
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border: 2px solid #ffd700;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.win-modal h2 {
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
}

.win-amount,
.multiplier {
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 165, 0, 0.5);
}

.difficulty-controls {
  margin-bottom: 1rem;
  background: linear-gradient(145deg, #2a1f3d, #3d2018);
  border: 1px solid #ffd700;
  box-shadow: inset 0 0 15px rgba(255, 165, 0, 0.2);
}

.difficulty-select {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(145deg, #1a0f2e, #2d1810);
  border: 1px solid #8b0000;
  border-radius: 8px;
  color: #ffd700;
  font-size: 1rem;
  cursor: pointer;
}

.difficulty-select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.difficulty-select option {
  background: var(--header);
  color: var(--white);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .tower-container {
    padding: 0 1rem;
  }

  .tile {
    min-width: 30px;
    max-width: 60px;
  }

  .tile.revealed.dragon::after {
    font-size: 1.2rem;
  }

  .action-buttons {
    grid-template-columns: 1fr;
  }

  .bet-controls {
    padding: 1rem;
  }

  .glow-effect {
    animation: glow 2s ease-in-out infinite;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))
      drop-shadow(0 0 6px rgba(255, 215, 0, 0.5));
  }
}

/* Update the media queries */
@media (max-width: 768px) {
  .dragon-tower-game {
    padding: 1rem;
    margin: 0.5rem;
  }

  .stats-container {
    display: flex;
    flex-direction: row; /* Keep horizontal */
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: nowrap; /* Prevent wrapping */
  }

  .stat-box {
    padding: 0.5rem;
    min-width: 0; /* Allow shrinking */
  }

  .stat-label {
    font-size: 0.8rem;
    white-space: nowrap; /* Prevent text wrapping */
  }

  .stat-value {
    font-size: 1rem;
  }

  .tower-container {
    padding: 0;
    margin-top: 1rem;
  }

  .tower-row {
    gap: 0.25rem;
  }

  .tile {
    min-width: 40px;
    max-width: 50px;
  }

  .safe-emoji,
  .dragon-emoji,
  .revealed-dragon-emoji {
    font-size: 1.2rem;
  }

  .bet-controls {
    padding: 1rem;
  }

  .bet-input-container {
    gap: 0.5rem;
  }

  .quick-amounts {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.25rem;
  }

  .quick-amount-btn {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .action-buttons {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .main-btn,
  .cashout-btn,
  .clear-btn {
    padding: 0.75rem;
    font-size: 1rem;
  }

  .modal-content {
    width: 80%;
    max-width: 280px;
    padding: 1.5rem;
  }

  .dragon-decoration {
    width: 300px;
    height: 150px;
    top: -30px;
  }

  .tower-wrapper {
    padding-top: 80px;
  }

  .fire-left,
  .fire-right {
    width: 40px;
    height: 70px;
    bottom: 15px;
  }

  .fire-left {
    left: -25px;
  }

  .fire-right {
    right: -25px;
  }
}

@media (max-width: 480px) {
  .dragon-tower-game {
    padding: 0.5rem;
  }

  .tower-container {
    margin-top: 0.5rem;
  }

  .tile {
    min-width: 35px;
    max-width: 45px;
  }

  .safe-emoji,
  .dragon-emoji,
  .revealed-dragon-emoji {
    font-size: 1rem;
  }

  .bet-amount-input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  .difficulty-select {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .stat-box {
    padding: 0.4rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .stat-value {
    font-size: 0.9rem;
  }

  .quick-amount-btn {
    padding: 0.4rem;
    font-size: 0.8rem;
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-content h2 {
    font-size: 1.2rem;
  }

  .win-amount {
    font-size: 1.1rem;
  }

  .stats-container {
    gap: 0.25rem; /* Even smaller gap for very small screens */
  }

  .dragon-decoration {
    width: 250px;
    height: 125px;
    top: -25px;
  }

  .tower-wrapper {
    padding-top: 60px;
    padding-bottom: 40px;
  }

  .fire-left,
  .fire-right {
    width: 30px;
    height: 50px;
    bottom: 10px;
  }

  .fire-left {
    left: -20px;
  }

  .fire-right {
    right: -20px;
  }
}

/* Add new portrait orientation specific styles */
@media (max-height: 700px) and (orientation: landscape) {
  .tower-container {
    max-height: 60vh;
    overflow-y: auto;
  }

  .tile {
    min-width: 35px;
    max-width: 45px;
  }

  .stats-container {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .game-controls {
    margin-top: 1rem;
  }
}

.highlight-row {
  position: relative;
  animation: pulseRow 2s infinite;
}

.highlight-row::before {
  content: "";
  position: absolute;
  inset: -4px;
  border: 2px solid #ffd700;
  border-radius: 12px;
  animation: borderGlow 2s infinite;
  pointer-events: none;
}

@keyframes pulseRow {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

@keyframes borderGlow {
  0%,
  100% {
    border-color: #ffd700;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
  50% {
    border-color: #ff8c00;
    box-shadow: 0 0 20px rgba(255, 140, 0, 0.7);
  }
}
</style>
