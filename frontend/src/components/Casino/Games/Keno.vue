<template>
  <div class="keno-game">
    <div class="game-header">
      <div class="stats-container">
        <div class="stat-box">
          <span class="stat-label">Selected</span>
          <span class="stat-value"
            >{{ kenoStore.selectedNumbers.length }}/10</span
          >
        </div>
        <div class="stat-box">
          <span class="stat-label">Matches</span>
          <span class="stat-value">{{ kenoStore.matches.length }}</span>
        </div>
        <div class="stat-box">
          <span class="stat-label">Win Amount</span>
          <span class="stat-value">{{ kenoStore.winAmount.toFixed(2) }}€</span>
        </div>
      </div>
    </div>

    <div class="potential-wins">
      <h3>Potential Wins</h3>
      <div class="win-table">
        <div
          v-for="win in kenoStore.potentialWins"
          :key="win.count"
          class="win-row"
        >
          <span>{{ win.count }} matches</span>
          <span class="win-value">{{ formatAmount(win.amount) }}</span>
        </div>
      </div>
    </div>

    <div class="keno-grid">
      <button
        v-for="n in 40"
        :key="n"
        :class="[
          'number-tile',
          { selected: kenoStore.selectedNumbers.includes(n) },
          { 'drawn-match': kenoStore.matches.includes(n) },
          {
            'drawn-miss':
              kenoStore.drawnNumbers.includes(n) &&
              !kenoStore.matches.includes(n),
          },
          { drawing: kenoStore.currentDrawingNumber === n },
        ]"
        @click="handleNumberSelect(n)"
        :disabled="kenoStore.isGameActive || kenoStore.loading"
      >
        {{ n }}
      </button>
    </div>

    <div class="game-controls">
      <div class="bet-controls">
        <label>Bet Amount</label>
        <div class="bet-input">
          <input
            type="number"
            v-model="kenoStore.betAmount"
            :disabled="kenoStore.isGameActive"
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
      </div>

      <div class="action-buttons">
        <button
          class="clear-btn"
          @click="handleClear"
          :disabled="kenoStore.loading"
        >
          Clear
        </button>
        <button
          class="main-btn"
          @click="handleGameAction"
          :disabled="!canPlay || kenoStore.loading || kenoStore.isGameActive"
        >
          {{ gameActionText }}
        </button>
      </div>
    </div>

    <Transition name="modal">
      <div v-if="showWinModal" class="win-modal">
        <div class="modal-content">
          <h2>WIN!</h2>
          <div class="win-amount">{{ kenoStore.profit.toFixed(2) }}€</div>
          <div class="multiplier">x{{ currentMultiplier }}</div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useKenoStore } from "../../../stores/casino";
import { storeToRefs } from "pinia";

const kenoStore = useKenoStore();
const { loading, isGameActive, currentMultiplier, winAmount } =
  storeToRefs(kenoStore);

const showWinModal = ref(false);

// Watch for wins
watch(winAmount, (newWinAmount) => {
  if (newWinAmount > 0) {
    showWinModal.value = true;
    // Hide modal after 3 seconds
    setTimeout(() => {
      showWinModal.value = false;
    }, 3000);
  }
});

const canPlay = computed(() => {
  return (
    kenoStore.selectedNumbers.length > 0 &&
    kenoStore.selectedNumbers.length <= 10 &&
    !kenoStore.isGameActive
  );
});

const gameActionText = computed(() => {
  if (loading.value) return "Processing...";
  return "Play";
});

const handleGameAction = async () => {
  await kenoStore.startGame();
};

const handleNumberSelect = (number: number) => {
  if (!isGameActive.value && !loading.value) {
    kenoStore.selectNumber(number);
  }
};

const setBetAmount = (amount: number) => {
  if (!isGameActive.value) {
    kenoStore.betAmount = amount;
  }
};

const formatAmount = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

const handleClear = () => {
  kenoStore.clearSelections();
};
</script>
<style scoped>
.keno-game {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--header);
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.stats-container {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--subheader);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  gap: 0.5rem;
  max-width: 600px;
  margin: 0 auto 1rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0.5rem;
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

.divider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
}

.potential-wins {
  background: var(--subheader);
  border-radius: 12px;
  padding: 0.75rem;
  margin: 1rem 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.potential-wins h3 {
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  color: white;
}

.win-table {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  font-size: 0.9rem;
}

.win-row {
  padding: 0.5rem;
  height: 32px;
  font-size: 0.85rem;
  background: rgba(0, 0, 0, 0.2);
  color: white;
}

.keno-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 12px;
  margin: 2rem 0;
  padding: 1.5rem;
  background: var(--subheader);
  border-radius: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.number-tile {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, var(--pointbox) 0%, var(--header) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--white);
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: perspective(1000px) rotateX(10deg) rotateY(0deg);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22),
    inset 0 -2px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}

.number-tile:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 20px 15px rgba(0, 0, 0, 0.25),
    inset 0 -3px 6px rgba(0, 0, 0, 0.3);
}

.number-tile:active {
  transform: perspective(1000px) rotateX(15deg) rotateY(0deg) translateZ(-5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), 0 8px 6px rgba(0, 0, 0, 0.2),
    inset 0 -1px 3px rgba(0, 0, 0, 0.2);
}
.number-tile:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.number-tile:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.number-tile.selected {
  background: linear-gradient(
    145deg,
    #7b1fa2 0%,
    #4a148c 100%
  ); /* Purple gradient */
  color: var(--white);
  transform: perspective(1000px) rotateX(10deg) rotateY(0deg);
  box-shadow: 0 5px 15px rgba(123, 31, 162, 0.3),
    /* Purple glow */ 0 15px 12px rgba(0, 0, 0, 0.22),
    inset 0 -2px 5px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(123, 31, 162, 0.5); /* Purple border */
}

.number-tile.selected:hover {
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4), 0 20px 15px rgba(0, 0, 0, 0.25),
    inset 0 -3px 6px rgba(0, 0, 0, 0.3);
}

.number-tile.drawing {
  color: var(--white);
  animation: drawing 0.1s ease infinite;
  transform: perspective(1000px) rotateX(10deg) rotateY(0deg);
}

@keyframes drawing {
  0% {
    transform: perspective(1000px) rotateX(10deg) rotateY(0deg) scale(1);
  }

  100% {
    transform: perspective(1000px) rotateX(10deg) rotateY(0deg) scale(1);
  }
}

/* Update existing animations to be more distinct */
.number-tile.drawn-match {
  animation: none;
  background: linear-gradient(145deg, #20e920 0%, #1ab91a 100%);
  transform: perspective(1000px) rotateX(10deg) rotateY(0deg);
  box-shadow: 0 0 20px rgba(32, 233, 32, 0.4);
  transition: all 0.3s ease;
}

.number-tile.drawn-miss {
  animation: none;
  background: linear-gradient(145deg, var(--danger) 0%, #a81c1c 100%);
  transform: perspective(1000px) rotateX(10deg) rotateY(0deg);
  box-shadow: 0 0 20px rgba(220, 53, 69, 0.4);
  transition: all 0.3s ease;
}

.game-controls {
  margin-top: 2rem;
}

.bet-controls {
  margin-bottom: 1.5rem;
  background: var(--subheader);
  color: var(--white);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bet-controls label {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
}

.bet-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bet-input input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: var(--header);
  color: var(--white);
  font-size: 1.1rem;
  text-align: center;
}

.quick-amounts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.quick-amounts button {
  padding: 0.75rem;
  background: var(--header);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-amounts button:hover {
  background: var(--active-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-top: 1rem;
}

.clear-btn,
.main-btn {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.clear-btn {
  background: var(--danger);
  color: white;
}

.main-btn {
  background: var(--active-color);
  color: white;
}

.clear-btn:hover,
.main-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.clear-btn:disabled,
.main-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.input-group {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0.5rem;
}

.input-group input {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: var(--subheader);
  color: var(--white);
}

.button-group {
  display: flex;
  gap: 1rem;
}

.clear-button {
  background: var(--danger);
  flex: 0 0 auto;
  width: auto;
  min-width: 120px;
}

.action-button {
  flex: 1;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  background: var(--active-color);
  color: var(--white);
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
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

.modal-content h2 {
  color: var(--success);
  font-size: 2rem; /* Reduced from 3rem */
  margin: 0 0 0.5rem 0; /* Reduced margin */
  text-shadow: 0 0 10px rgba(32, 233, 32, 0.5);
}

.win-amount {
  font-size: 1.8rem; /* Reduced from 2.5rem */
  font-weight: bold;
  color: var(--white);
  margin-bottom: 0.3rem; /* Reduced margin */
}

.multiplier {
  font-size: 1.2rem; /* Reduced from 1.5rem */
  color: var(--text-secondary);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
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
  .keno-game {
    padding: 1rem;
    margin: 0.5rem;
  }

  .stats-container {
    padding: 0.5rem;
    gap: 0.25rem;
  }

  .stat-box {
    padding: 0.25rem;
  }

  .stat-label {
    font-size: 0.7rem;
  }

  .win-table {
    grid-template-columns: repeat(2, 1fr);
  }

  .win-row {
    height: 28px;
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
  }

  .keno-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: 8px;
    padding: 1rem;
  }

  .number-tile {
    font-size: 1rem;
  }

  .game-controls {
    margin-top: 1rem;
  }

  .bet-controls {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .bet-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .bet-input input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  .quick-amounts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  .quick-amounts button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .win-modal .modal-content {
    width: 80%;
    max-width: 300px;
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    padding: 0.4rem;
    gap: 0.2rem;
  }

  .stat-box {
    padding: 0.2rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }

  .win-table {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
  }

  .win-row {
    height: 24px;
    font-size: 0.75rem;
  }

  .potential-wins {
    padding: 0.5rem;
  }

  .potential-wins h3 {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .keno-game {
    padding: 0.75rem;
  }

  .keno-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 6px;
    padding: 0.75rem;
  }

  .win-table {
    grid-template-columns: 1fr;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .win-modal .modal-content {
    padding: 1rem;
  }
}
</style>
