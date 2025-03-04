<template>
  <div class="dashboard-page">
    <!-- Overview Section -->
    <section class="overview-section">
      <div class="overview-card bets">
        <div class="card-header">
          <i class="fas fa-ticket-alt"></i>
          <h3>Total Bets</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ totalBets }}</span>
          <span class="subtitle">All time bets</span>
        </div>
      </div>

      <div class="overview-card winnings">
        <div class="card-header">
          <i class="fas fa-trophy"></i>
          <h3>Total Winnings</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ formatCurrency(totalWinnings) }}</span>
          <span class="subtitle">All time profit</span>
        </div>
      </div>

      <div class="overview-card win-rate">
        <div class="card-header">
          <i class="fas fa-chart-line"></i>
          <h3>Win Rate</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ winRate }}%</span>
          <span class="subtitle">Success rate</span>
        </div>
      </div>
    </section>

    <!-- Bet History Section -->
    <section class="history-section">
      <div class="section-header">
        <h2>Bet History</h2>
        <div class="filters">
          <select v-model="selectedPeriod" class="filter-select">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select v-model="selectedType" class="filter-select">
            <option value="all">All Types</option>
            <option value="sports">Sports</option>
            <option value="casino">Casino</option>
          </select>
        </div>
      </div>
      
      <div class="history-list" v-if="betHistory.length">
        <div 
          v-for="bet in betHistory" 
          :key="bet.id" 
          class="history-item"
          :class="bet.status"
        >
          <div class="bet-info">
            <div class="bet-type">
              <i :class="getBetIcon(bet.type)"></i>
              <span>{{ bet.type }}</span>
            </div>
            <div class="bet-details">
              <span class="bet-event">{{ bet.event }}</span>
              <span class="bet-date">{{ formatDate(bet.date) }}</span>
            </div>
            <div class="bet-status">
              <span :class="bet.status">{{ bet.status }}</span>
            </div>
            <div class="bet-amount">
              <span class="label">Stake:</span>
              <span class="value">{{ formatCurrency(bet.stake) }}</span>
            </div>
            <div class="bet-result">
              <span class="label">Result:</span>
              <span class="value" :class="bet.status">
                {{ formatCurrency(bet.result) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <i class="fas fa-history"></i>
        <p>No bet history found</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data - replace with actual data from your store/API
const totalBets = ref(156);
const totalWinnings = ref(2450.75);
const winRate = ref(62);
const selectedPeriod = ref('all');
const selectedType = ref('all');

const betHistory = ref([
  {
    id: 1,
    type: 'Sports',
    event: 'Manchester United vs Liverpool',
    date: new Date(),
    status: 'won',
    stake: 100,
    result: 250
  },
  {
    id: 2,
    type: 'Casino',
    event: 'Blackjack',
    date: new Date(Date.now() - 86400000),
    status: 'lost',
    stake: 50,
    result: -50
  }
]);

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getBetIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'sports': return 'fas fa-futbol';
    case 'casino': return 'fas fa-dice';
    default: return 'fas fa-ticket-alt';
  }
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
}

.overview-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.overview-card {
  background: var(--header);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--leftpreborder);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.card-header i {
  font-size: 1.5rem;
  color: var(--active-color);
}

.card-header h3 {
  color: var(--white);
  font-size: 1.1rem;
  margin: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.amount {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--white);
}

.subtitle {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.history-section {
  background: var(--header);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--leftpreborder);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: var(--white);
  font-size: 1.2rem;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  background: var(--pointbox);
  color: var(--white);
  border: 1px solid var(--leftpreborder);
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.history-item {
  background: var(--pointbox);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--leftpreborder);
}

.bet-info {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  align-items: center;
  gap: 1.5rem;
}

.bet-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--white);
}

.bet-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.bet-event {
  color: var(--white);
  font-weight: 500;
}

.bet-date {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.bet-status {
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 600;
}

.bet-status .won {
  color: var(--success);
}

.bet-status .lost {
  color: var(--error);
}

.bet-amount,
.bet-result {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: right;
}

.label {
  color: var(--textcolor);
  font-size: 0.8rem;
}

.value {
  color: var(--white);
  font-weight: 500;
}

.value.won {
  color: var(--success);
}

.value.lost {
  color: var(--error);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--textcolor);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 1rem;
  }

  .bet-info {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .bet-type,
  .bet-details {
    grid-column: span 2;
  }
}
</style>
