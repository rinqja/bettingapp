<template>
  <div class="mines-game">
    <div class="game-header">
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Next Profit</span>
          <span class="stat-value"
            >{{ minesStore.currentProfit.toFixed(2) }}€</span
          >
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="stat-label">Multiplier</span>
          <span class="stat-value">{{ minesStore.currentMultiplier }}x</span>
        </div>
        <div class="divider"></div>
        <div class="stat-item">
          <span class="stat-label">Mines</span>
          <span class="stat-value">{{ minesStore.minesCount }}</span>
        </div>
      </div>
    </div>

    <div class="mines-grid" ref="minesGridRef">
      <button
        v-for="(tile, index) in minesStore.tiles"
        :key="index"
        :class="[
          'tile',
          { revealed: tile.revealed },
          { mine: tile.revealed && tile.isMine },
          { diamond: tile.revealed && !tile.isMine },
          { 'tile-hover': minesStore.isGameActive && !tile.revealed },
        ]"
        @click="handleTileClick(index)"
        :disabled="
          !minesStore.isGameActive || minesStore.loading || tile.revealed
        "
      >
        <div class="tile-content">
          <div class="tile-front">
            <i class="fas fa-question"></i>
          </div>
          <div class="tile-back">
            <template v-if="tile.revealed">
              <i v-if="tile.isMine">💥</i>
              <i v-else>💵</i>
              <!-- You can try any of these alternatives:
                                     💵 (Dollar Bill)
                                     💸 (Money with Wings)
                                     🤑 (Money Face)
                                     💲 (Heavy Dollar Sign)
                                     💰 (Money Bag)
                                     💎 (Gem)
                                     🏆 (Trophy)
                                     💶 (Euro Note)
                                     -->
            </template>
          </div>
        </div>
      </button>
    </div>

    <div class="game-controls">
      <div class="bet-controls">
        <label>Bet Amount</label>
        <div class="bet-input">
          <input
            type="number"
            v-model="minesStore.betAmount"
            :disabled="minesStore.isGameActive"
            min="1"
            step="1"
          />
          <div class="quick-amounts">
            <button @click="setBetAmount(1)">1</button>
            <button @click="setBetAmount(5)">5</button>
            <button @click="setBetAmount(10)">10</button>
            <button @click="setBetAmount(25)">25</button>
          </div>
        </div>

        <label>Mines Count</label>
        <div class="mines-input">
          <input
            type="number"
            v-model="minesCount"
            :disabled="minesStore.isGameActive"
            min="1"
            max="24"
            step="1"
          />
          <div class="input-error" v-if="minesError">{{ minesError }}</div>
          <div class="quick-mines">
            <button @click="setMinesCount(3)">3</button>
            <button @click="setMinesCount(5)">5</button>
            <button @click="setMinesCount(10)">10</button>
            <button @click="setMinesCount(15)">15</button>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button
          v-if="!minesStore.isGameActive"
          class="main-btn"
          @click="handleGameAction"
          :disabled="minesStore.loading"
        >
          {{ gameActionText }}
        </button>
        <button
          v-else
          class="cashout-btn"
          @click="minesStore.cashout"
          :disabled="!minesStore.canCashout || minesStore.loading"
        >
          Cashout ({{ minesStore.currentMultiplier }}x)
        </button>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showWinModal" class="win-modal">
        <div class="modal-content">
          <h2>WIN!</h2>
          <div class="win-amount">
            {{
              (minesStore.betAmount * minesStore.currentMultiplier).toFixed(2)
            }}€
          </div>
          <div class="multiplier">x{{ minesStore.currentMultiplier }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useMinesStore } from "../../../stores/casino/mines";
import { storeToRefs } from "pinia";

const minesStore = useMinesStore();
const { loading, isGameActive, currentMultiplier, currentProfit } =
  storeToRefs(minesStore);

const showWinModal = ref(false);

// Add new ref for local mines count control
const minesCount = ref(minesStore.minesCount);
const minesError = ref("");

const minesGridRef = ref<HTMLElement | null>(null);

// Watch for wins
watch(currentProfit, (newProfit) => {
  if (newProfit > 0 && !isGameActive.value) {
    showWinModal.value = true;
    setTimeout(() => {
      showWinModal.value = false;
    }, 3000);
  }
});

// Watch for mines count changes
watch(minesCount, (newValue) => {
  const value = Number(newValue);
  if (value < 1) {
    minesError.value = "Minimum mines count is 1";
    minesCount.value = 1;
    minesStore.minesCount = 1;
  } else if (value > 24) {
    minesError.value = "Maximum mines count is 24";
    minesCount.value = 24;
    minesStore.minesCount = 24;
  } else {
    minesError.value = "";
    minesStore.minesCount = value;
  }
});

const gameActionText = computed(() => {
  if (loading.value) return "Processing...";
  return "Play";
});

const handleGameAction = async () => {
  await minesStore.startGame();
  minesGridRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
};

const handleTileClick = (index: number) => {
  if (minesStore.isGameActive && !minesStore.loading) {
    const tile = document.querySelectorAll(".tile")[index];
    tile.style.setProperty("--index", index.toString());
    minesStore.revealTile(index);
  }
};

const setBetAmount = (amount: number) => {
  if (!isGameActive.value) {
    minesStore.betAmount = amount;
  }
};

function setMinesCount(count: number) {
  if (!isGameActive.value) {
    minesCount.value = Math.min(Math.max(count, 1), 24);
  }
}
</script>

<style scoped>
.mines-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--header);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.game-header {
  margin-bottom: 1rem;
}

.stats-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--subheader);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
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

.mines-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--subheader);
  border-radius: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  perspective: 1000px;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tile {
  position: relative;
  aspect-ratio: 1;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
}

.tile-content {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.tile-front,
.tile-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.3rem;
}

.tile-front {
  background: linear-gradient(145deg, var(--pointbox) 0%, var(--header) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
}

.tile-back {
  transform: rotateY(180deg);
  box-sizing: border-box; /* Add this to include borders in element size */
}

.tile.revealed {
  transform: rotateY(180deg);
}

.tile.mine .tile-back {
  background: linear-gradient(145deg, #dc3545 0%, #9e1c28 100%);
  border: 1px solid rgba(220, 53, 69, 0.5);
  font-size: 1.5rem; /* Make emoji bigger */
  color: #fff;
  transform: rotateY(180deg) scale(1); /* Add scale to maintain size */
}

.tile.mine .tile-back i {
  animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  display: block;
}

.tile.diamond .tile-back {
  background: linear-gradient(
    145deg,
    rgba(21, 227, 21, 0.8),
    rgba(19, 233, 19, 0.6)
  );
  border: 1px solid rgba(32, 233, 32, 0.8); /* Changed from 2px to 1px */
  font-size: 1.5rem; /* Reduced from 2.5rem */
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(32, 233, 32, 0.8), 0 0 45px rgba(32, 233, 32, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.6);
  transform: rotateY(180deg) scale(1); /* Add scale to maintain size */
}

.tile.diamond .tile-back::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine-effect 3s linear infinite;
}

@keyframes shine-effect {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

.tile.diamond .tile-back i {
  animation: shine 0.4s ease-in-out;
  display: block;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)); /* Add glow effect */
  z-index: 2; /* Ensure emoji stays on top */
}

.bomb-icon {
  color: #fff;
  animation: shake 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.gem-icon {
  color: #fff;
  animation: shine 0.4s ease-in-out;
}

.tile-hover:not(:disabled):hover {
  filter: brightness(1.2);
  /* Remove translateZ transform */
}

.tile-hover:not(:disabled):hover .tile-front {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

@keyframes shine {
  0% {
    opacity: 0;
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.7));
  }
  100% {
    opacity: 1;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  }
}

/* Reveal animation for game over */
.tile.revealed {
  animation: reveal 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes reveal {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(180deg);
  }
}

/* Stagger the reveal animation for each tile */
.mines-grid .tile.revealed {
  animation-delay: calc(var(--index) * 20ms);
}

.game-controls {
  margin-top: 2rem;
}

.bet-controls {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  color: var(--white);
  gap: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.bet-input,
.mines-input {
  margin-bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.02)
  );
  padding: 1.25rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.bet-input input,
.mines-input input {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--white);
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  text-align: center;
}

.bet-input input:focus,
.mines-input input:focus {
  outline: none;
  border-color: var(--active-color);
  box-shadow: 0 0 0 2px rgba(var(--active-color-rgb), 0.2);
}

.bet-input input:disabled,
.mines-input input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.quick-amounts,
.quick-mines {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.quick-amounts button,
.quick-mines button {
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.quick-amounts button:hover,
.quick-mines button:hover {
  background: var(--active-color);
  border-color: var(--active-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--active-color-rgb), 0.2);
}

.quick-amounts button::before,
.quick-mines button::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.quick-amounts button:hover::before,
.quick-mines button:hover::before {
  left: 100%;
}

@media (max-width: 768px) {
  .bet-controls {
    padding: 0 1rem;
  }

  .quick-amounts,
  .quick-mines {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .quick-amounts button,
  .quick-mines button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .quick-amounts,
  .quick-mines {
    grid-template-columns: repeat(2, 1fr);
  }
}

.main-btn,
.cashout-btn {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.main-btn {
  background: var(--active-color);
  color: var(--white);
}

.cashout-btn {
  background: #20e920;
  color: var(--white);
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
  background: var(--header);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  width: 200px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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

@media (max-width: 768px) {
  .mines-grid {
    gap: 8px;
    padding: 1rem;
    max-width: 100%;
  }

  .tile-front,
  .tile-back {
    font-size: 1rem;
  }
}

.input-error {
  color: #ff4444;
  font-size: 0.8rem;
  margin: -0.5rem 0 0.5rem;
  text-align: center;
  min-height: 1.2rem;
}

.mines-input input {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
