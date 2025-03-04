<template>
  <div class="main-layout">
    <Header />
    <CasinoMain @launch-game="launchGame" />

    <!-- Game Modal -->
    <div v-if="activeGame" class="game-modal">
      <div class="game-modal-content">
        <div class="game-modal-header">
          <h2>{{ activeGame.name }}</h2>
          <button class="close-button" @click="closeGame">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="game-modal-body">
          <component 
            :is="gameComponents[activeGame.type]" 
            v-if="gameComponents[activeGame.type]"
            @close="closeGame"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from "vue";
import Header from "../components/Header/Header.vue";
import CasinoMain from "../components/Casino/CasinoMain.vue";

// Lazy load game components
const gameComponents = {
  mines: defineAsyncComponent(() => 
    import("../components/Casino/Games/Mines.vue")
  ),
  // Add other games here as needed
};

interface GameInfo {
  type: string;
  name: string;
}

const activeGame = ref<GameInfo | null>(null);

const launchGame = (game: GameInfo) => {
  console.log('Launching game:', game); // Debug log
  activeGame.value = game;
};

const closeGame = () => {
  activeGame.value = null;
};
</script>

<style scoped>
.main-layout {
  width: 100%;
  min-height: 100vh;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
}

.game-modal {
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
}

.game-modal-content {
  background: var(--header);
  border-radius: 12px;
  width: 95%;
  max-width: 1200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--leftpreborder);
}

.game-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--leftpreborder);
}

.game-modal-header h2 {
  color: var(--white);
  margin: 0;
  font-size: 1.25rem;
}

.close-button {
  background: none;
  border: none;
  color: var(--textcolor);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: var(--white);
}

.game-modal-body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}
</style>
