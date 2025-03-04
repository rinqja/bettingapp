<template>
  <MainLayout>
    <Header />
    <div class="slots-page">
      <nav class="game-nav">
        <router-link to="/casino" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to Casino
        </router-link>
        <button class="paytable-button" @click="showPaytable = true">
          <span class="icon">📋</span>
          Paytable
        </button>
      </nav>

      <!-- Add Paytable Modal -->
      <Transition name="modal">
        <div
          v-if="showPaytable"
          class="modal-overlay"
          @click="showPaytable = false"
        >
          <div class="modal-content" @click.stop>
            <button class="close-button" @click="showPaytable = false">
              ×
            </button>
            <h2>Paytable</h2>
            
            <!-- Symbol Values Section -->
            <div class="paytable-section">
              <h3>Symbol Values</h3>
              <div class="paytable-grid">
                <div v-for="(symbol, name) in SYMBOLS" :key="name" class="paytable-row">
                  <div class="symbol-info">
                    <span class="paytable-symbol">{{ symbol.emoji }}</span>
                    <span class="symbol-name">{{ symbol.name }}</span>
                  </div>
                  <div class="prize-info">
                    <div class="base-value">Base Value: {{ symbol.value }}x</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Match Multipliers Section -->
            <div class="paytable-section">
              <h3>Match Multipliers</h3>
              <div class="multiplier-grid">
                <div class="multiplier-row">
                  <span>5 Matching Symbols:</span>
                  <span class="multiplier-value">10x</span>
                </div>
                <div class="multiplier-row">
                  <span>4 Matching Symbols:</span>
                  <span class="multiplier-value">5x</span>
                </div>
                <div class="multiplier-row">
                  <span>3 Matching Symbols:</span>
                  <span class="multiplier-value">2x</span>
                </div>
              </div>
            </div>

            <!-- Payline Patterns Section -->
            <div class="paytable-section">
              <h3>Winning Patterns</h3>
              <div class="patterns-grid">
                <div v-for="(pattern, index) in PAYLINE_PATTERNS" :key="index" class="pattern-row">
                  <div class="pattern-number">Line {{ index + 1 }}</div>
                  <div class="pattern-visual">
                    <div v-for="(position, colIndex) in pattern" :key="colIndex" 
                         class="pattern-column">
                      <div v-for="row in 3" :key="row" 
                           :class="['pattern-cell', { active: position === row - 1 }]">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Win Calculation Example -->
            <div class="paytable-section">
              <h3>Win Calculation Example</h3>
              <p class="calculation-example">
                Win = Bet Amount × Symbol Value × Match Multiplier<br>
                Example: 1€ bet with 5 matching 7️⃣ symbols<br>
                1€ × 100 (Seven value) × 10 (5-match multiplier) = 1000€
              </p>
            </div>
          </div>
        </div>
      </Transition>

      <div class="game-container">
        <h1>Slots</h1>
        <div class="game-wrapper">
          <SlotsGame />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from "../../Layouts/MainLayout.vue";
import SlotsGame from "../../components/Casino/Games/Slots.vue";
import Header from "../../components/Header/Header.vue";
import { SYMBOLS } from '../../constants/slots';

const showPaytable = ref(false);
const betAmount = ref(1);
</script>

<style scoped>
.slots-page {
  padding: 2rem;
  min-height: calc(100vh - 60px);
  background: var(--background);
}

.game-nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.back-link {
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--active-color);
}

.paytable-button {
  padding: 10px 20px;
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  color: var(--white);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.paytable-button:hover {
  background: var(--active-color);
  border-color: var(--active-color);
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
}

.game-wrapper {
  background: var(--header);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.modal-content h2 {
  color: var(--white);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.paytable-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.paytable-row {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.paytable-row:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.symbol-group {
  display: flex;
  gap: 0.5rem;
}

.paytable-symbol {
  font-size: 1.5rem;
}

.prize-info {
  text-align: right;
  color: var(--white);
}

.multiplier {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--active-color);
}

.prize-example {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.paytable-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}

.paytable-section h3 {
  color: var(--active-color);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.multiplier-grid {
  display: grid;
  gap: 0.5rem;
}

.multiplier-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: var(--white);
}

.multiplier-value {
  color: var(--active-color);
  font-weight: bold;
}

.patterns-grid {
  display: grid;
  gap: 1rem;
}

.pattern-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.pattern-number {
  min-width: 80px;
}

.pattern-visual {
  display: flex;
  gap: 2px;
}

.pattern-column {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pattern-cell {
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.pattern-cell.active {
  background: var(--active-color);
}

.calculation-example {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  line-height: 1.6;
  color: var(--white);
}

.symbol-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.symbol-name {
  color: var(--white);
}

@media (max-width: 768px) {
  .game-wrapper {
    padding: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .game-nav {
    padding: 0 0.5rem;
    gap: 1rem;
  }

  .paytable-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  .modal-content {
    padding: 1.5rem;
    width: 95%;
  }

  .paytable-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .paytable-row {
    padding: 0.75rem;
  }

  .modal-content h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .pattern-cell {
    width: 15px;
    height: 15px;
  }

  .pattern-number {
    min-width: 60px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .game-nav {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .paytable-button {
    padding: 10px 16px;
  }
}
</style>
