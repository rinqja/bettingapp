<template>
  <div class="slot-game">
    <!-- Add paytable button -->
    <button class="paytable-button" @click="newSlotsStore.showPaytable = true">
      <span class="icon">ⓘ</span>
      Paytable
    </button>

    <div class="game-title">
      <span class="title-decoration">⭐</span>
      <h1>Lucky Stars Slot</h1>
      <span class="title-decoration">⭐</span>
    </div>

    <div class="stats-container">
      <div class="stat-box">
        <span class="stat-label">Bet Amount</span>
        <input
          type="number"
          v-model="newSlotsStore.betAmount"
          :disabled="newSlotsStore.isSpinning || newSlotsStore.isFreeSpinMode"
          min="1"
          step="1"
        />
      </div>
      <div class="stat-box">
        <span class="stat-label">Win Amount</span>
        <span class="stat-value">{{ newSlotsStore.winAmount.toFixed(2) }}€</span>
      </div>
      <div v-if="newSlotsStore.freeSpinsRemaining > 0" class="stat-box free-spins">
        <span class="stat-label">Free Spins</span>
        <span class="stat-value">{{ newSlotsStore.freeSpinsRemaining }}</span>
      </div>
    </div>

    <div class="slot-machine-frame">
      <div class="frame-decoration top"></div>
      <div class="slot-grid">
        <div
          v-for="(cell, index) in 20"
          :key="index"
          class="slot-cell"
          :class="{
            'winning-cell': newSlotsStore.winningPositions.includes(
              `${Math.floor(index / 5)}-${index % 5}`
            ),
            'active-column': newSlotsStore.isSpinning && newSlotsStore.currentColumn === index % 5,
          }"
          :data-col="index % 5"
        >
          <div
            class="symbol"
            :class="{
              spinning: newSlotsStore.isSpinning && newSlotsStore.currentColumn === index % 5,
              revealed: newSlotsStore.revealedColumns[index % 5],
            }"
          >
            {{ newSlotsStore.grid[Math.floor(index / 5)][index % 5] }}
          </div>
        </div>
      </div>
      <div class="frame-decoration bottom"></div>
    </div>

    <div class="control-panel">
      <button
        class="spin-button"
        @click="newSlotsStore.spin()"
        :disabled="!newSlotsStore.canSpin"
      >
        <span class="button-glow"></span>
        {{ spinButtonText }}
      </button>
    </div>

    <Transition name="fade">
      <div v-if="newSlotsStore.showWinModal" class="win-modal">
        <div class="modal-content">
          <template v-if="newSlotsStore.freeSpinsRemaining === 5">
            <h2>BONUS WIN!</h2>
            <div class="bonus-win">5 Free Spins Awarded! 🎲</div>
          </template>
          <template v-else>
            <h2>WIN!</h2>
            <div class="win-amount">{{ newSlotsStore.winAmount.toFixed(2) }}€</div>
            <div
              v-for="(win, index) in newSlotsStore.winCombinations"
              :key="index"
              class="win-combination"
            >
              <div class="symbol-group">
                <span class="win-symbol">{{ win.symbol }}</span>
                <span class="match-count">× {{ win.count }}</span>
              </div>
              <div class="win-multiplier">x{{ win.multiplier }}</div>
            </div>
            <div class="total-multiplier">Total: x{{ newSlotsStore.currentMultiplier }}</div>
          </template>
        </div>
      </div>
    </Transition>

    <!-- Paytable modal -->
    <Transition name="fade">
      <div
        v-if="newSlotsStore.showPaytable"
        class="paytable-modal"
        @click="newSlotsStore.showPaytable = false"
      >
        <div class="paytable-content" @click.stop>
          <button class="close-button" @click="newSlotsStore.showPaytable = false">×</button>
          <h2>Paytable</h2>
          <div class="paytable-grid">
            <div class="paytable-row bonus-row">
              <div class="symbol-container">🎲</div>
              <div class="bonus-info">
                <h3>Bonus Symbol</h3>
                <p>Get 4 or more columns with 🎲 to win 5 Free Spins!</p>
              </div>
            </div>
            <div
              v-for="config in newSlotsStore.symbols.filter(s => !s.isBonus)"
              :key="config.symbol"
              class="paytable-row"
            >
              <div class="symbol-container">{{ config.symbol }}</div>
              <div class="multipliers">
                <div
                  v-for="matches in [7, 8, 9, 10, 11, 12]"
                  :key="matches"
                  class="multiplier-item"
                >
                  <span class="matches">{{ matches }}×</span>
                  <span class="value">{{ calculateMultiplier(config.multiplier, matches) }}×</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNewSlotsStore } from "../../../stores/casino/newSlots";

const newSlotsStore = useNewSlotsStore();

const spinButtonText = computed(() => {
  if (newSlotsStore.isSpinning) return "SPINNING...";
  if (newSlotsStore.isFreeSpinMode) return `FREE SPIN (${newSlotsStore.freeSpinsRemaining})`;
  return "SPIN";
});

// Helper function for paytable calculations
function calculateMultiplier(baseMultiplier: number, matches: number): string {
  if (matches < 7) return "0.0";

  const countMultiplier = {
    7: 1,
    8: 1.5,
    9: 2,
    10: 3,
    11: 4,
    12: 5,
  }[matches] || 5;

  return (baseMultiplier * countMultiplier).toFixed(1);
}
</script>

<style scoped>
.slot-game {
  max-width: 800px;
  width: 95%;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  background: linear-gradient(45deg, #2b3dbb, #4657e8);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(70, 87, 232, 0.3),
    inset 0 0 80px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.game-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.game-title h1 {
  color: white;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  margin: 0;
}

.title-decoration {
  font-size: 2rem;
  animation: starTwinkle 1.5s infinite alternate;
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.stat-box {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 8px;
  min-width: 120px;
  flex: 1;
  max-width: 200px;
}

.stat-label {
  color: white;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
}

.slot-machine-frame {
  position: relative;
  padding: 2rem;
  background: linear-gradient(135deg, #1a237e, #283593);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.frame-decoration {
  height: 20px;
  background: linear-gradient(90deg, #4a148c, #7b1fa2, #4a148c);
  position: absolute;
  left: 0;
  right: 0;
}

.frame-decoration.top {
  top: 0;
  border-radius: 20px 20px 0 0;
}

.frame-decoration.bottom {
  bottom: 0;
  border-radius: 0 0 20px 20px;
}

.slot-grid {
  margin: 2rem auto;
  background: linear-gradient(to bottom, #3347d1, #2636b3);
  padding: 1rem;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  aspect-ratio: 1.25;
}

.slot-row {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.slot-cell {
  aspect-ratio: 1;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #4c63ff, #3347d1);
  border-radius: 8px;
  display: grid;
  place-items: center;
  font-size: clamp(1.5rem, 4vw, 2rem);
  border: 2px solid #6b78ff;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.slot-cell::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
}

.winning-cell {
  background: linear-gradient(135deg, #00c9ff, #00a2ff);
  animation: pulse 1.5s infinite;
  border-color: #92e8ff;
}

.winning-cell::after {
  content: "";
  position: absolute;
  top: -100%;
  left: -100%;
  width: 300%;
  height: 300%;
  background: linear-gradient(
    45deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 45%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.1) 55%,
    transparent 100%
  );
  animation: shine 2s infinite;
}

.symbol {
  transition: transform 0.3s ease-out, filter 0.3s ease-out;
  backface-visibility: hidden;
  transform-origin: center center;
  opacity: 0;
  transform: scale(0.5);
  transition: all 0.3s ease;
}

.symbol.revealed {
  opacity: 1;
  transform: scale(1);
}

.symbol.spinning {
  animation: spinSymbol 0.15s linear infinite;
  filter: blur(1px);
}

.control-panel {
  margin-top: 2rem;
  padding: 1rem;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.1)
  );
  border-radius: 12px;
}

.spin-button {
  background: linear-gradient(to bottom, #00c9ff, #00a2ff);
  color: white;
  border: none;
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1.5rem, 4vw, 3rem);
  font-size: clamp(1rem, 3vw, 1.2rem);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 15px rgba(0, 201, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.button-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  animation: buttonGlow 3s infinite;
}

.spin-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spin-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 201, 255, 0.4);
}

.win-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(
    135deg,
    rgba(43, 61, 187, 0.95),
    rgba(70, 87, 232, 0.95)
  );
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  animation: dropIn 0.5s ease-out, fadeOut 0.5s ease-out forwards;
  animation-delay: 0s, 2.5s; /* Start fade out 0.5s before modal closes */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.win-modal .win-amount {
  font-size: 2rem;
  color: gold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  margin: 1rem 0;
}

.win-modal .matches {
  font-size: 1.2rem;
  color: #fff;
  margin: 0.5rem 0;
}

.win-modal .multiplier {
  font-size: 1.5rem;
  color: #00ff88;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

input {
  background: var(--header);
  border: 1px solid var(--border);
  color: white !important;
  padding: 0.5rem;
  border-radius: 4px;
  width: 100px;
  text-align: center;
  background: rgba(0, 0, 0, 0.2) !important;
}

.win-modal .win-combination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.win-modal .symbol-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.win-modal .win-symbol {
  font-size: 1.5rem;
}

.win-modal .match-count {
  color: #fff;
  font-size: 1.2rem;
}

.win-modal .win-multiplier {
  color: #00ff88;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
}

.win-modal .total-multiplier {
  margin-top: 1rem;
  font-size: 1.5rem;
  color: gold;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  font-weight: bold;
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

@keyframes spinSymbol {
  0% {
    transform: translateY(-100%);
    opacity: 0.5;
  }
  100% {
    transform: translateY(100%);
    opacity: 0.5;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1) hue-rotate(0deg);
  }
  50% {
    transform: scale(1.05) rotate(2deg);
    filter: brightness(1.3) hue-rotate(-10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    filter: brightness(1) hue-rotate(0deg);
  }
}

@keyframes dropIn {
  0% {
    transform: translate(-50%, -150%);
    opacity: 0;
  }
  70% {
    transform: translate(-50%, -45%);
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinning-column {
  animation: columnShake 0.1s linear infinite;
}

@keyframes columnShake {
  0% {
    transform: translateX(-1px);
  }
  10% {
    transform: translateX(1px);
  }
  25% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1px);
  }
  75% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-1px);
  }
}

.active-column {
  box-shadow: 0 0 15px #00c9ff;
  border: 2px solid #00c9ff;
  animation: columnPulse 0.5s ease-in-out infinite;
}

@keyframes columnPulse {
  0% {
    box-shadow: 0 0 15px #00c9ff;
  }
  50% {
    box-shadow: 0 0 25px #92e8ff;
  }
  100% {
    box-shadow: 0 0 15px #00c9ff;
  }
}

@keyframes spinReveal {
  0% {
    transform: translateY(-100%) scale(0.5);
    opacity: 0;
  }
  50% {
    transform: translateY(0) scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes starTwinkle {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@keyframes buttonGlow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes shine {
  0% {
    transform: rotate(0deg) translate(-50%, -50%);
  }
  100% {
    transform: rotate(360deg) translate(-50%, -50%);
  }
}

@media (max-width: 480px) {
  .slot-game {
    padding: 0.5rem;
  }

  .game-title {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .title-decoration {
    font-size: 1.5rem;
  }

  .stats-container {
    gap: 0.5rem;
  }

  .stat-box {
    padding: 0.75rem;
    min-width: 100px;
  }

  .slot-machine-frame {
    padding: 1rem;
  }

  .frame-decoration {
    height: 12px;
  }

  .control-panel {
    margin-top: 1rem;
    padding: 0.5rem;
  }

  .slot-grid {
    padding: 0.5rem;
    gap: 0.25rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .slot-game {
    padding: 1rem;
  }

  .slot-cell {
    width: 15vw;
    height: 15vw;
  }
}

@media (orientation: landscape) and (max-height: 600px) {
  .slot-game {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .game-title {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .stats-container {
    order: 2;
    width: auto;
  }

  .slot-machine-frame {
    order: 1;
    flex: 1;
  }

  .control-panel {
    order: 3;
    margin-top: 0;
  }
}

.paytable-button {
  position: fixed;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #4657e8, #2b3dbb);
  border: none;
  padding: 1rem;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.paytable-button .icon {
  font-size: 1.5rem;
}

.paytable-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.paytable-content {
  background: linear-gradient(135deg, #2b3dbb, #4657e8);
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: white;
}

.paytable-content h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  line-height: 1;
}

.paytable-grid {
  display: grid;
  gap: 1rem;
  margin: 2rem 0;
}

.paytable-row {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  padding: 1rem;
  border-radius: 8px;
  align-items: center;
  transition: transform 0.2s ease;
}

.paytable-row:hover {
  transform: translateX(5px);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.08)
  );
}

.symbol-container {
  font-size: 2.5rem;
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.symbol-container:hover {
  transform: scale(1.1);
}

.multipliers {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
}

.multiplier-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.matches {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.value {
  font-size: 1.1rem;
  color: #00ff88;
  font-weight: bold;
}

.paytable-info {
  margin-top: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
}

.paytable-info p {
  margin: 0.5rem 0;
}

.rarity-info {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.rarity-info p {
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .paytable-button {
    position: fixed;
    left: 10px;
    top: auto;
    bottom: 20px;
    transform: none;
    padding: 0.5rem;
    font-size: 0.8rem;
  }

  .paytable-button .icon {
    font-size: 1.2rem;
  }

  .paytable-content {
    padding: 1rem;
  }

  .paytable-row {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .symbol-container {
    margin: 0 auto;
    margin-bottom: 1rem;
  }

  .multipliers {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .multipliers {
    grid-template-columns: repeat(2, 1fr);
  }

  .multiplier-item {
    padding: 0.25rem;
  }
}

.free-spins-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #ff9900, #ff6600);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  animation: pulse 1s infinite;
  z-index: 10;
}

.bonus-row {
  background: linear-gradient(135deg, #ff9900, #ff6600) !important;
}

.bonus-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bonus-win {
  font-size: 1.5rem;
  color: #ff9900;
  text-shadow: 0 0 10px rgba(255, 153, 0, 0.5);
  margin: 1rem 0;
  animation: bounceIn 0.5s ease-out;
}

.free-spins {
  background: linear-gradient(135deg, #ff9900, #ff6600);
  animation: pulse 1s infinite;
}

.free-spins .stat-label {
  color: white;
}

.free-spins .stat-value {
  color: white;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
</style>
