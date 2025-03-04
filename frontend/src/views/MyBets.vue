<template>
  <div>
    <Header />
    <div class="my-bets-container">
      <!-- Tabs Navigation -->
      <div class="bets-tabs">
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'open' }"
          @click="activeTab = 'open'"
        >
          Open Bets
          <span class="bet-count" v-if="openBets.length">{{ openBets.length }}</span>
        </button>
        <button 
          class="tab-button" 
          :class="{ active: activeTab === 'settled' }"
          @click="activeTab = 'settled'"
        >
          Settled Bets
          <span class="bet-count" v-if="settledBets.length">{{ settledBets.length }}</span>
        </button>
      </div>

      <!-- Bets List -->
      <div class="bets-list" v-if="!bettingStore.loading">
        <div v-if="currentBets.length === 0" class="no-bets">
          No {{ activeTab }} bets found
        </div>
        
        <div v-else class="bet-cards">
          <div v-for="bet in currentBets" :key="bet._id" class="bet-card">
            <div class="bet-header">
              <span class="bet-type">{{ bet.betType === 'multiple' ? 'Multi Bet' : 'Single Bet' }}</span>
              <span class="bet-status" :class="bet.status">{{ formatStatus(bet.status) }}</span>
            </div>

            <div class="bet-content">
              <div v-for="(selection, index) in bet.selections" :key="index" class="selection">
                <div class="teams">
                  <span class="team home">{{ getHomeTeam(selection.event) }}</span>
                  <span class="vs">vs</span>
                  <span class="team away">{{ getAwayTeam(selection.event) }}</span>
                  <span v-if="selection.status === 'won'" class="won-indicator">✓</span>
                </div>
                <div class="selection-details">
                  <div class="selection-info">
                    <span class="pick">{{ formatSelectionType(selection.selection) }}</span>
                    <span class="market">{{ selection.market }}</span>
                  </div>
                  <span class="odds">{{ selection.odds.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="bet-footer">
              <div class="stake-info">
                <div class="stake">
                  <span>Stake:</span>
                  <span>${{ bet.amount.toFixed(2) }}</span>
                </div>
                <div class="cashout-amount" v-if="bet.status === 'cashed_out'">
                  <span>Cashed Out:</span>
                  <span>${{ (bet.cashoutAmount || 0).toFixed(2) }}</span>
                </div>
                <div class="potential-win" v-else>
                  <span>Potential Win:</span>
                  <span>${{ bet.potentialWin.toFixed(2) }}</span>
                </div>
              </div>
              
              <!-- Add Cashout Button -->
              <button 
                v-if="isCashoutEligible(bet)"
                @click="handleCashout(bet._id)"
                class="cashout-button"
                :disabled="bettingStore.loading"
              >
                {{ bettingStore.loading ? 'Processing...' : 'Cash Out' }}
              </button>
              
              <div class="date">
                {{ formatDate(bet.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="loading">
        <span>Loading bets...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useBettingStore } from '../stores/betting';
import Header from '../components/Header/Header.vue';

const authStore = useAuthStore();
const bettingStore = useBettingStore();
const activeTab = ref('open');

// Mock data - Replace with actual API calls
const openBets = ref([
  {
    id: 1,
    league: 'Germany Bundesliga',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    type: '1',
    odds: 1.85,
    amount: 100,
    potentialWin: 185,
    status: 'open',
    placedAt: new Date(),
  },
  // Add more mock data
]);

const settledBets = ref([
  {
    id: 2,
    league: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    type: 'X',
    odds: 3.20,
    amount: 50,
    winAmount: 160,
    status: 'won',
    placedAt: new Date(Date.now() - 86400000),
  },
  // Add more mock data
]);

onMounted(async () => {
  await bettingStore.fetchUserBets();
});

const currentBets = computed(() => {
  const bets = activeTab.value === 'open' 
    ? bettingStore.activeBets 
    : bettingStore.settledBets;
  
  // Debug log to check bet structure
  console.log('Current bets:', bets);
  bets.forEach(bet => {
    console.log('Bet selections:', bet.selections);
  });
  
  return bets;
});

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatStatus = (status: string) => {
  if (!status) return '';
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
};

const getHomeTeam = (event: string) => {
  return event.split(' vs ')[0];
};

const getAwayTeam = (event: string) => {
  return event.split(' vs ')[1];
};

const formatSelectionType = (type: string) => {
  switch(type) {
    case '1': return 'Home Win';
    case 'X': return 'Draw';
    case '2': return 'Away Win';
    default: return type;
  }
};

// Add method to check if bet is eligible for cashout
const isCashoutEligible = (bet: any) => {
  console.log('Checking frontend eligibility for bet:', bet);
  
  // Basic checks
  const conditions = {
    isPending: bet.status === 'pending',
    hasWonSelections: bet.selections.some((s: any) => s.status === 'won'),
    hasPendingSelections: bet.selections.some((s: any) => s.status === 'pending'),
    hasMatchTime: bet.selections.every((s: any) => s.matchTime !== undefined)
  };
  
  console.log('Frontend eligibility conditions:', conditions);
  
  return conditions.isPending && 
         conditions.hasWonSelections && 
         conditions.hasPendingSelections &&
         conditions.hasMatchTime;
};

// Add cashout method
const handleCashout = async (betId: string) => {
  try {
    await bettingStore.cashoutBet(betId);
    // Refresh the bets list after successful cashout
    await bettingStore.fetchUserBets();
  } catch (error: any) {
    console.error('Error during cashout:', error);
  }
};
</script>

<style scoped>
.my-bets-container {
  padding: 1rem;
  margin-top: 60px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.bets-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--leftpreborder);
}

.tab-button {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  color: var(--textcolor);
  font-weight: 600;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tab-button.active {
  color: var(--active-color);
  border-bottom: 2px solid var(--active-color);
}

.bet-count {
  background: var(--pointbox);
  color: var(--white);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.bet-cards {
  display: grid;
  gap: 1rem;
}

.bet-card {
  background: var(--pointbox);
  border-radius: 8px;
  padding: 1rem;
}

.bet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.bet-type {
  font-weight: 500;
  color: var(--textcolor);
}

.bet-status {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.bet-status.pending {
  background: var(--active-color);
  color: white;
}

.bet-status.won {
  background: var(--success);
  color: white;
}

.bet-status.lost {
  background: var(--button-one);
  color: white;
}

.bet-status.cashed_out {
  background: var(--warning);
  color: white;
}

.bet-content {
  border-top: 1px solid var(--leftpreborder);
  border-bottom: 1px solid var(--leftpreborder);
  padding: 1rem 0;
}

.selection {
  margin-bottom: 1rem;
}

.selection:last-child {
  margin-bottom: 0;
}

.teams {
  margin-bottom: 0.5rem;
  color: var(--textcolor);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.team {
  font-weight: 500;
}

.vs {
  color: var(--textcolor);
  opacity: 0.7;
  font-size: 0.9rem;
}

.selection-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.5rem;
}

.selection-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.market {
  font-size: 0.8rem;
  color: var(--textcolor);
  opacity: 0.8;
}

.pick {
  color: var(--active-color);
  font-weight: 500;
}

.odds {
  color: var(--active-color);
  font-weight: 600;
}

.bet-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.stake-info {
  display: flex;
  gap: 2rem;
}

.stake, .potential-win {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stake span:first-child,
.potential-win span:first-child {
  color: var(--textcolor);
  font-size: 0.875rem;
}

.stake span:last-child,
.potential-win span:last-child {
  color: var(--active-color);
  font-weight: 500;
}

.date {
  color: var(--textcolor);
  font-size: 0.875rem;
}

.loading, .no-bets {
  text-align: center;
  color: var(--textcolor);
  padding: 2rem;
}

.cashout-button {
  background-color: var(--warning);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
}

.cashout-button:hover {
  opacity: 0.9;
}

.won-indicator {
  color: var(--success);
  margin-left: 0.5rem;
  font-weight: bold;
}

.cashout-amount {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cashout-amount span:first-child {
  color: var(--textcolor);
  font-size: 0.875rem;
}

.cashout-amount span:last-child {
  color: var(--warning);
  font-weight: 500;
}

@media (max-width: 768px) {
  .my-bets-container {
    padding: 0.5rem;
    margin-bottom: 60px;
  }

  .bet-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .stake-info {
    width: 100%;
    justify-content: space-between;
  }
}
</style> 