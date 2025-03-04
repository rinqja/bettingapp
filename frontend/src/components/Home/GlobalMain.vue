<template>
  <div class="global-main">
    <div class="content-wrapper">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <span>Loading...</span>
      </div>

      <!-- Content -->

      <!-- Home Tab -->
      <div v-if="currentTab === 'home'" class="tab-section">
        <SportMatches
          v-for="sport in availableSports"
          :key="sport.key"
          :sportKey="sport.key"
          :sportTitle="sport.title"
          :tabId="sport.tabId"
          :iconClass="sport.iconClass"
          :tableClass="sport.tableClass"
        />
      </div>

      <!-- Live Tab -->
      <div v-else-if="currentTab === 'live'" class="tab-section">
        <LiveMatches />
      </div>

      <!-- Today Tab -->
      <div v-else-if="currentTab === 'today'" class="tab-section">
        <TodayMatches />
      </div>

      <!-- Sport Specific Tabs -->
      <div v-else class="tab-section">
        <SportMatches
          :sportKey="getCurrentSportKey"
          :sportTitle="getCurrentSportTitle"
          :tabId="currentTab"
          :iconClass="getCurrentSportIcon"
          :tableClass="`${currentTab}-table`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useTabStore } from "../../stores/tab";
import SportMatches from "../Sports/SportMatches.vue";
import LiveMatches from "../Sports/LiveMatches.vue";
import TodayMatches from "../Sports/TodayMatches.vue";

const tabStore = useTabStore();
const currentTab = computed(() => tabStore.currentTab);
const isLoading = ref(false);

const availableSports = [
  {
    key: "soccer",
    title: "Football",
    tabId: "football",
    iconClass: "icon-football",
    tableClass: "football-table",
  },
  {
    key: "tennis",
    title: "Tennis",
    tabId: "tennis",
    iconClass: "icon-tennis",
    tableClass: "tennis-table",
  },
  {
    key: "basketball",
    title: "Basketball",
    tabId: "basketball",
    iconClass: "icon-basketball",
    tableClass: "basketball-table",
  },
 
];

// Computed properties for current sport
const getCurrentSportKey = computed(() => {
  const sport = availableSports.find(
    (sport) => sport.tabId === currentTab.value
  );
  return sport?.key || "";
});

const getCurrentSportTitle = computed(() => {
  const sport = availableSports.find(
    (sport) => sport.tabId === currentTab.value
  );
  return sport?.title || "";
});

const getCurrentSportIcon = computed(() => {
  const sport = availableSports.find(
    (sport) => sport.tabId === currentTab.value
  );
  return sport?.iconClass || "";
});

// Handle tab changes
watch(
  currentTab,
  async (newTab) => {
    isLoading.value = true;
    try {
      // Simulate data loading - replace with actual API calls
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Error loading tab data:", error);
    } finally {
      isLoading.value = false;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.global-main {
  height: 100%;
  min-height: calc(100vh - var(--header-height) - 3rem);
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
}

.content-wrapper {
  height: 100%;
  min-height: inherit;
  position: relative;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: var(--textcolor);
  background: var(--subheader);
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid var(--pointbox);
  border-top-color: var(--active-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.tab-content {
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
}

.tab-section {
  min-height: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Scrollbar styling */
.tab-content::-webkit-scrollbar {
  width: 6px;
}

.tab-content::-webkit-scrollbar-thumb {
  background: var(--pointbox);
  border-radius: 3px;
}

.tab-content::-webkit-scrollbar-track {
  background: var(--body-color);
}

@media (max-width: 768px) {
  .tab-content {
    padding: 1rem;
  }
}
</style>
