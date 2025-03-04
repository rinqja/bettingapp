<template>
  <div class="casino-container">
    <!-- Left Sidebar -->
    <div class="casino-sidebar">
      <div class="sidebar-content">
        <div class="game-categories">
          <h3 class="sidebar-title">Casino Games</h3>
          <div class="game-list">
            <div 
              v-for="game in casinoGames" 
              :key="game.id"
              class="game-item"
              :class="{ active: currentGame === game.id }"
              @click="currentGame = game.id"
            >
              <span class="game-icon">
                <i :class="game.icon"></i>
              </span>
              <span class="game-name">{{ game.name }}</span>
              <span class="game-count">{{ game.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <GameGrid 
        :currentGame="currentGame" 
        @launch-game="handleGameLaunch"
      />
    </div>

    <!-- Right Sidebar -->
    <div class="betslip-sidebar">
      <BetSlip />
    </div>
  </div>
  <FooterMobile />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GameGrid from './GameGrid.vue';
import BetSlip from '../Common/BetSlip.vue';
import FooterMobile from '../Footer/FooterMobile.vue';

const emit = defineEmits(['launch-game']);
const currentGame = ref('originals');

const handleGameLaunch = (game: any) => {
  console.log('CasinoMain handling game launch:', game); // Debug log
  emit('launch-game', game);
};

const casinoGames = [
  { id: 'originals', name: 'Originals', icon: 'fas fa-star', count: 13 },
  { id: 'slots', name: 'Slots', icon: 'fas fa-slot-machine', count: 248 },
  { id: 'live', name: 'Live Casino', icon: 'fas fa-dice', count: 34 },
  { id: 'blackjack', name: 'Blackjack', icon: 'fas fa-playing-card', count: 8 },
  { id: 'roulette', name: 'Roulette', icon: 'fas fa-circle', count: 6 },
  { id: 'baccarat', name: 'Baccarat', icon: 'fas fa-cards', count: 4 },
  { id: 'game-shows', name: 'Game Shows', icon: 'fas fa-tv', count: 15 },
  { id: 'crash', name: 'Crash Games', icon: 'fas fa-rocket', count: 3 },
  { id: 'mines', name: 'Mines', icon: 'fas fa-bomb', count: 1 },
  { id: 'plinko', name: 'Plinko', icon: 'fas fa-circle-dot', count: 1 },
  { id: 'keno', name: 'Keno', icon: 'fas fa-grid', count: 1 },
  { id: 'roulette', name: 'Roulette', icon: 'fas fa-circle-notch', count: 1 },
  { id: 'dragontower', name: 'DragonTower', icon: 'fas fa-circle-notch', count: 1 },
  { id: 'blackjack', name: 'Blackjack', icon: 'fas fa-circle-notch', count: 1 },
  { id: 'slots', name: 'Slots', icon: 'fas fa-circle-notch', count: 1 },
  { id: 'halloween-slots', name: 'Halloween Slots', icon: 'fas fa-circle-notch', count: 1 },

];
</script>

<style scoped>
.casino-container {
  display: grid;
  grid-template-columns: 280px 1fr 350px;
  gap: 1.5rem;
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  flex: 1;
}

.casino-sidebar,
.betslip-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
  height: calc(100vh - var(--header-height) - 3rem);
  overflow-y: auto;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-categories {
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
  overflow: hidden;
}

.sidebar-title {
  padding: 1rem;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--white);
  background: var(--header);
  border-bottom: 1px solid var(--leftpreborder);
}

.game-list {
  padding: 0.5rem;
}

.game-item {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  color: var(--white);
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.game-item:hover {
  background: var(--pointbox);
}

.game-item.active {
  background: var(--preactive);
  color: var(--active-color);
}

.game-icon {
  width: 24px;
  margin-right: 0.8rem;
  text-align: center;
}

.game-name {
  flex: 1;
}

.game-count {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.main-content {
  min-width: 0;
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
  padding: 1.5rem;
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .casino-container {
    grid-template-columns: 240px 1fr 300px;
    padding: 1rem;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .casino-container {
    grid-template-columns: 200px 1fr;
  }

  .betslip-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  .casino-container {
    grid-template-columns: 1fr;
    padding: 0.8rem;
  }

  .casino-sidebar {
    display: none;
  }
}

/* Scrollbar styling */
.casino-sidebar::-webkit-scrollbar,
.betslip-sidebar::-webkit-scrollbar {
  width: 6px;
}

.casino-sidebar::-webkit-scrollbar-thumb,
.betslip-sidebar::-webkit-scrollbar-thumb {
  background: var(--pointbox);
  border-radius: 3px;
}

.casino-sidebar::-webkit-scrollbar-track,
.betslip-sidebar::-webkit-scrollbar-track {
  background: var(--body-color);
}
</style>
