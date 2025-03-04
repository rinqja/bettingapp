<template>
  <MainLayout>
    <Header />
    <div class="wheel-page">
      <nav class="game-nav">
        <router-link to="/casino" class="back-link">
          <i class="fas fa-arrow-left"></i> Back to Casino
        </router-link>
        <button class="paytable-button" @click="showPaytable = true">
          <span class="icon">📋</span>
          Paytable
        </button>
      </nav>

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
            <div class="paytable-grid">
              <div
                v-for="(combo, index) in paytableConfig"
                :key="index"
                class="paytable-row"
              >
                <div class="symbol-group">
                  <span v-for="n in 3" :key="n" class="paytable-symbol">{{
                    combo.symbol
                  }}</span>
                </div>
                <div class="prize-info">
                  <div class="multiplier">{{ combo.multiplier }}x</div>
                  <div class="prize-example">
                    Win {{ (combo.multiplier * betAmount).toFixed(2) }}€
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="game-container">
        <div class="game-wrapper">
          <h1>Wheel of Fortune</h1>
          <WheelGame />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from "../../Layouts/MainLayout.vue";
import WheelGame from "../../components/Casino/Games/WheelGame.vue";
import Header from "../../components/Header/Header.vue";

const showPaytable = ref(false);
const betAmount = ref(1);
const paytableConfig = [
    { symbol: "7️⃣", multiplier: 50, name: "SEVEN" },
    { symbol: "🎰", multiplier: 25, name: "BAR" },
    { symbol: "🔔", multiplier: 15, name: "BELL" },
    { symbol: "🍒", multiplier: 10, name: "CHERRY" },
    { symbol: "🍋", multiplier: 8, name: "LEMON" },
    { symbol: "🍊", multiplier: 6, name: "ORANGE" },
    { symbol: "🫐", multiplier: 4, name: "PLUM" },
    { symbol: "🍇", multiplier: 3, name: "GRAPE" },
  ];
</script>

<style scoped>
.wheel-page {
  padding: 2rem;
  min-height: calc(100vh - 60px);
}

.game-nav {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.back-link {
  color: var(--white);
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

.game-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  width: 100%;
}

h1 {
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  position: relative;
  top: 1rem;
}

.game-wrapper {
  background: var(--header);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
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
}

@media (max-width: 480px) {
  .game-nav {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .paytable-button {
    right: 10px;
    bottom: 10px;
    padding: 10px 16px;
  }
}
</style>