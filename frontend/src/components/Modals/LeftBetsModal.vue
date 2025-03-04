<template>
  <div class="left-bets-modal">
    <div class="sports-list">
      <button
        v-for="sport in sports"
        :key="sport.id"
        class="sport-button"
        :class="{ active: currentTab === sport.tab }"
        @click="switchTab(sport.tab, sport.shouldNavigate)"
      >
        <div class="sport-icon">
          <i :class="sport.icon"></i>
        </div>
        <div class="sport-info">
          <span class="sport-name">{{ sport.name }}</span>
          <span class="sport-count">{{ sport.count }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTabStore } from "../../stores/tab";
import { useRouter } from "vue-router";

const tabStore = useTabStore();
const router = useRouter();

const sports = [
  {
    id: 1,
    name: "Home",
    tab: "home",
    icon: "icon-home",
    count: 0,
    shouldNavigate: true,
  },
  {
    id: 2,
    name: "Live",
    tab: "live",
    icon: "icon-live",
    count: 12,
    shouldNavigate: false,
  },
  {
    id: 3,
    name: "Today",
    tab: "today",
    icon: "icon-calendar",
    count: 24,
    shouldNavigate: false,
  },
  {
    id: 4,
    name: "Football",
    tab: "football",
    icon: "icon-football",
    count: 8,
    shouldNavigate: false,
  },
  {
    id: 5,
    name: "Tennis",
    tab: "tennis",
    icon: "icon-tennis",
    count: 4,
    shouldNavigate: false,
  },
  {
    id: 6,
    name: "Basketball",
    tab: "basketball",
    icon: "icon-basketball",
    count: 6,
    shouldNavigate: false,
  },
];

const currentTab = computed(() => tabStore.currentTab);

const switchTab = (tab: string, shouldNavigate: boolean = false) => {
  tabStore.setCurrentTab(tab);
  if (shouldNavigate) {
    router.push("/");
  }
};
</script>

<style scoped>
.left-bets-modal {
  padding: 0.5rem;
}

.sports-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sport-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
}

.sport-button:hover {
  background: var(--pointbox);
}

.sport-button.active {
  background: var(--preactive);
  color: var(--active-color);
}

.sport-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sport-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.sport-count {
  color: var(--textcolor);
  font-size: 0.9rem;
}
</style>
