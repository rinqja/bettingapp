<template>
  <div class="home-container">
    <!-- Left Sidebar -->
    <div class="home-sidebar">
      <div class="sidebar-content">
        <div class="popular-events">
          <LeftBetsModal />
        </div>
        
      
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <GlobalMain />
    </div>

    <!-- Right Sidebar -->
    <div class="betslip-sidebar">
      <BetSlip />
    </div>
  </div>
  <FooterMobile />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTabStore } from '../../stores/tab';
import LeftBetsModal from '../Modals/LeftBetsModal.vue';
import BetSlip from '../Common/BetSlip.vue';
import GlobalMain from './GlobalMain.vue';
import FooterMobile from '../Footer/FooterMobile.vue';

const tabStore = useTabStore();
const currentTab = computed(() => tabStore.currentTab);
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 280px 1fr 350px;
  gap: 1.5rem;
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  flex: 1;
}

.home-sidebar,
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

.popular-events {
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

.live-prematch {
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
  overflow: hidden;
}

.tab-buttons {
  display: flex;
  border-bottom: 1px solid var(--leftpreborder);
}

.tab-btn {
  flex: 1;
  padding: 0.8rem;
  background: none;
  border: none;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: var(--preactive);
  color: var(--active-color);
}

.sport-list {
  padding: 0.5rem;
}

.sport-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  color: var(--white);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.sport-item:hover {
  background: var(--pointbox);
}

.count {
  color: var(--textcolor);
}

.main-content {
  min-width: 0;
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
}

/* Scrollbar styling */
.home-sidebar::-webkit-scrollbar,
.betslip-sidebar::-webkit-scrollbar {
  width: 6px;
}

.home-sidebar::-webkit-scrollbar-thumb,
.betslip-sidebar::-webkit-scrollbar-thumb {
  background: var(--pointbox);
  border-radius: 3px;
}

.home-sidebar::-webkit-scrollbar-track,
.betslip-sidebar::-webkit-scrollbar-track {
  background: var(--body-color);
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .home-container {
    grid-template-columns: 240px 1fr 300px;
    padding: 1rem;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .home-container {
    grid-template-columns: 200px 1fr;
  }

  .betslip-sidebar {
    display: none; /* Hide betslip on smaller screens */
  }
}

@media (max-width: 768px) {
  .home-container {
    grid-template-columns: 1fr;
    padding: 0.8rem;
  }

  .home-sidebar {
    display: none; /* Hide sidebar on mobile */
  }
}

/* Safe area support */
@supports (padding: max(0px)) {
  .home-container {
    padding-left: max(2rem, env(safe-area-inset-left));
    padding-right: max(2rem, env(safe-area-inset-right));
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }
}
</style>