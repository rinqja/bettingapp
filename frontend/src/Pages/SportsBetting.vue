<template>
  <div class="sports-betting">
    <Header />
    <div class="sports-container">
      <!-- Left Sidebar -->
      <div class="sports-sidebar">
        <LeftBetsModal />
      </div>

      <!-- Main Content -->
      <div class="sports-content">
        <div class="sports-tabs">
          <div class="tab-content">
            <div class="tab-pane active">
              <HomeTab v-if="currentTab === 'home'" />
              <LiveTab v-if="currentTab === 'live'" />
              <TodayTab v-if="currentTab === 'today'" />
              <FootballTab v-if="currentTab === 'football'" />
              <TennisTab v-if="currentTab === 'tennis'" />
              <BasketballTab v-if="currentTab === 'basketball'" />
              <IceHockeyTab v-if="currentTab === 'icehockey'" />
              <HandballTab v-if="currentTab === 'handball'" />
              <AmericanTab v-if="currentTab === 'american'" />
              <BaseballTab v-if="currentTab === 'baseball'" />
              <HorseRacingTab v-if="currentTab === 'horseracing'" />
              <VirtualTab v-if="currentTab === 'virtual'" />
              <FavouritesTab v-if="currentTab === 'favourites'" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="betslip-sidebar">
        <BetSlip />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from '../components/Header/Header.vue';
import LeftBetsModal from '../components/Modals/LeftBetsModal.vue';
import BetSlip from '../components/Common/BetSlip.vue';
import HomeTab from '../components/Home/HomeTab.vue';
import LiveTab from '../components/Home/LiveTab.vue';
import TodayTab from '../components/Home/TodayTab.vue';
import FootballTab from '../components/Home/FootballTab.vue';
import TennisTab from '../components/Home/TennisTab.vue';
import BasketballTab from '../components/Home/BasketballTab.vue';
import IceHockeyTab from '../components/Home/IceHockeyTab.vue';
import HandballTab from '../components/Home/HandballTab.vue';
import AmericanTab from '../components/Home/AmericanTab.vue';
import BaseballTab from '../components/Home/BaseballTab.vue';
import HorseRacingTab from '../components/Home/HorseRacingTab.vue';
import VirtualTab from '../components/Home/VirtualTab.vue';
import FavouritesTab from '../components/Home/FavouritesTab.vue';

const currentTab = ref('home');
</script>

<style scoped>
.sports-betting {
  width: 100%;
  min-height: 100vh;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
}

.sports-container {
  display: grid;
  grid-template-columns: 280px 1fr 350px;
  gap: 1.5rem;
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  flex: 1;
}

.sports-sidebar,
.betslip-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
  height: calc(100vh - var(--header-height) - 3rem);
  overflow-y: auto;
}

.sports-content {
  min-width: 0; /* Prevent content overflow */
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
}

.sports-tabs {
  height: 100%;
}

.tab-content {
  height: 100%;
}

.tab-pane {
  height: 100%;
  padding: 1.5rem;
}

/* Scrollbar styling */
.sports-sidebar::-webkit-scrollbar,
.betslip-sidebar::-webkit-scrollbar {
  width: 6px;
}

.sports-sidebar::-webkit-scrollbar-thumb,
.betslip-sidebar::-webkit-scrollbar-thumb {
  background: var(--pointbox);
  border-radius: 3px;
}

.sports-sidebar::-webkit-scrollbar-track,
.betslip-sidebar::-webkit-scrollbar-track {
  background: var(--body-color);
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .sports-container {
    grid-template-columns: 240px 1fr 300px;
    padding: 1rem;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .sports-container {
    grid-template-columns: 200px 1fr;
  }

  .betslip-sidebar {
    display: none; /* Hide betslip on smaller screens */
  }
}

@media (max-width: 768px) {
  .sports-container {
    grid-template-columns: 1fr;
    padding: 0.8rem;
  }

  .sports-sidebar {
    display: none; /* Hide sidebar on mobile */
  }

  .tab-pane {
    padding: 1rem;
  }
}

/* Safe area support */
@supports (padding: max(0px)) {
  .sports-container {
    padding-left: max(2rem, env(safe-area-inset-left));
    padding-right: max(2rem, env(safe-area-inset-right));
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }
}
</style>