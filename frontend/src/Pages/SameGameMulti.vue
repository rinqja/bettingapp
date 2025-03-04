<template>
  <Header />

  <div class="home-container">
    <!-- Main Content -->
    <div class="main-content">
      <div class="same-game-multi-content">
        <div v-if="loading" class="loading-state">
          Loading match details...
        </div>
        <div v-else-if="error" class="error-state">
          {{ error }}
        </div>
        <div v-else>
          <div class="match-header">
            <h2>{{ homeTeam }} vs {{ awayTeam }}</h2>
            <div class="match-time">{{ formatTime(commenceTime) }}</div>
          </div>

          <div class="markets-container">
            <div v-for="(market, marketKey) in markets" :key="marketKey" class="market-section">
              <h3>{{ market.name }}</h3>
              <div class="odds-grid">
                <button
                  v-for="outcome in market.outcomes"
                  :key="outcome.name"
                  class="odd-button"
                  :class="{
                    selected: isOddSelected(matchId, marketKey, outcome.name),
                    disabled: isIncompatibleMarket(marketKey)
                  }"
                  @click="handleOddClick(marketKey, outcome.name, outcome.price)"
                >
                  <span class="selection-name">{{ outcome.name }}</span>
                  <span class="odds">{{ formatOdd(outcome.price) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="betslip-sidebar">
      <BetSlip />
    </div>
  </div>
  <FooterMobile />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBettingStore } from '../stores/betting';
import { useMatchesStore } from '../stores/matches';
import BetSlip from '../components/Common/BetSlip.vue';
import { formatMatchTime } from '../utils/dateUtils';
import { SGM_LIMITS } from '../types';
import FooterMobile from "../components/Footer/FooterMobile.vue";
import Header from "../components/Header/Header.vue";

const route = useRoute();
const bettingStore = useBettingStore();
const matchesStore = useMatchesStore();

const matchId = ref(route.params.matchId as string);
const homeTeam = ref('');
const awayTeam = ref('');
const commenceTime = ref('');
const markets = ref({});
const loading = ref(true);
const error = ref('');

const formatTime = (time: string) => {
  if (!time) return '';
  return new Date(time).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

const formatOdd = (odd: number) => odd.toFixed(2);

const isOddSelected = (matchId: string, market: string, type: string) => {
  return bettingStore.currentSelections.some(
    (s) => s.matchId === matchId && s.type === `${market}_${type}`
  );
};

const isIncompatibleMarket = (marketKey: string) => {
  const currentMarkets = bettingStore.currentSelections.map(s => s.market);
  return bettingStore.hasIncompatibleMarkets && 
         currentMarkets.includes(marketKey);
};

const handleOddClick = (market: string, type: string, odds: number) => {
  bettingStore.addSelection({
    matchId: matchId.value,
    homeTeam: homeTeam.value,
    awayTeam: awayTeam.value,
    type: `${market}_${type}`,
    selection: type,
    odds: odds,
    sportKey: "soccer",
    status: "upcoming",
    event: `${homeTeam.value} vs ${awayTeam.value}`,
    commenceTime: commenceTime.value,
    market: market
  });
};

onMounted(async () => {
  if (!matchId.value) {
    error.value = 'Invalid match ID';
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    const match = await matchesStore.fetchMatchById(matchId.value);
    if (match) {
      homeTeam.value = match.homeTeam;
      awayTeam.value = match.awayTeam;
      commenceTime.value = match.commenceTime;
      markets.value = match.markets || {};
    } else {
      error.value = 'Match not found';
    }
  } catch (err: any) {
    error.value = err.message || 'Failed to load match details';
    console.error('Error loading match:', err);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.home-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 1.5rem;
  max-width: 1920px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  flex: 1;
  margin-top: 0;
}

.betslip-sidebar {
  position: sticky;
  top: calc(var(--header-height) + 1.5rem);
  height: calc(100vh - var(--header-height) - 3rem);
  overflow-y: auto;
}

.main-content {
  min-width: 0;
  background: var(--subheader);
  border-radius: 8px;
  border: 1px solid var(--leftpreborder);
}

.same-game-multi-content {
  padding: 1rem;
}

.match-header {
  background: var(--header);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.teams {
  margin-top: 1rem;
  font-size: 1.2rem;
}

.vs {
  margin: 0 1rem;
  color: var(--textcolor);
}

.betting-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.market-section {
  background: var(--subheader);
  padding: 1rem;
  border-radius: 8px;
}

.market-section h3 {
  margin-bottom: 1rem;
  color: var(--textcolor);
  font-size: 1.1rem;
}

.odds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.8rem;
}

.odd-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  color: var(--white);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.odd-btn:hover {
  background: var(--preactive);
  transform: translateY(-2px);
  border-color: var(--active-color);
}

.odd-btn:active {
  transform: translateY(0);
}

.odd-btn.selected {
  background: var(--active-color);
  border-color: var(--active-color);
  transform: translateY(-2px);
}

.odd-btn.selected .odd-value {
  color: var(--white);
}

.odd-value {
  font-weight: bold;
  color: var(--active-color);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .home-container {
    padding: 0.8rem;
  }

  .match-header {
    padding: 1rem;
  }

  .teams {
    font-size: 1rem;
  }

  .odds-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .odd-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-height: 44px;
  }

  .market-section {
    padding: 0.8rem;
  }

  .market-section h3 {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
}

.team {
  font-weight: 500;
}

.team.home {
  color: var(--white);
}

.team.away {
  color: var(--white);
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .home-container {
    grid-template-columns: 1fr 300px;
    padding: 1rem;
    gap: 1rem;
  }
}

@media (max-width: 1200px) {
  .home-container {
    grid-template-columns: 1fr;
  }

  .betslip-sidebar {
    display: none;
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

/* Scrollbar styling */
.betslip-sidebar::-webkit-scrollbar {
  width: 6px;
}

.betslip-sidebar::-webkit-scrollbar-thumb {
  background: var(--pointbox);
  border-radius: 3px;
}

.betslip-sidebar::-webkit-scrollbar-track {
  background: var(--body-color);
}

/* Adjust grid for correct score market */
.market-section:has(h3:contains("Correct Score")) .odds-grid {
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.odd-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--pointbox);
  transform: none;
  border-color: var(--leftpreborder);
}

.odd-btn.disabled:hover {
  background: var(--pointbox);
  transform: none;
  border-color: var(--leftpreborder);
}

.odd-btn.disabled .odd-value {
  color: var(--textcolor);
}
</style>
