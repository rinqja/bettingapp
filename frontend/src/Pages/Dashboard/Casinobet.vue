<template>
  <div class="dashboard-page">
    <!-- Overview Section -->
    <section class="overview-section">
      <div class="overview-card total-bets">
        <div class="card-header">
          <i class="fas fa-dice"></i>
          <h3>Total Casino Bets</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ totalCasinoBets }}</span>
          <span class="subtitle">All time bets</span>
        </div>
      </div>

      <div class="overview-card winnings">
        <div class="card-header">
          <i class="fas fa-coins"></i>
          <h3>Casino Winnings</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ formatCurrency(casinoWinnings) }}</span>
          <span class="subtitle">Total profit</span>
        </div>
      </div>

      <div class="overview-card favorite">
        <div class="card-header">
          <i class="fas fa-star"></i>
          <h3>Favorite Game</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ favoriteGame }}</span>
          <span class="subtitle">Most played</span>
        </div>
      </div>
    </section>

    <!-- Casino History Section -->
    <section class="casino-section">
      <div class="section-header">
        <h2>Casino History</h2>
        <div class="filters">
          <select v-model="selectedPeriod" class="filter-select">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select v-model="selectedGame" class="filter-select">
            <option value="all">All Games</option>
            <option value="slots">Slots</option>
            <option value="blackjack">Blackjack</option>
            <option value="roulette">Roulette</option>
            <option value="poker">Poker</option>
          </select>
        </div>
      </div>
      
      <div class="casino-history" v-if="casinoHistory.length">
        <div 
          v-for="bet in casinoHistory" 
          :key="bet.id" 
          class="history-item"
          :class="bet.result"
        >
          <div class="game-info">
            <div class="game-icon">
              <i :class="getGameIcon(bet.game)"></i>
            </div>
            <div class="game-details">
              <span class="game-name">{{ bet.game }}</span>
              <span class="game-time">{{ formatDate(bet.timestamp) }}</span>
            </div>
          </div>
          <div class="bet-details">
            <div class="bet-stake">
              <span class="label">Stake:</span>
              <span class="value">{{ formatCurrency(bet.stake) }}</span>
            </div>
            <div class="bet-result" :class="bet.result">
              <span class="label">Result:</span>
              <span class="value">{{ formatCurrency(bet.payout) }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <i class="fas fa-dice-d20"></i>
        <p>No casino history found</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data
const totalCasinoBets = ref(156);
const casinoWinnings = ref(2750.25);
const favoriteGame = ref('Blackjack');

const selectedPeriod = ref('all');
const selectedGame = ref('all');

const casinoHistory = ref([
  {
    id: 1,
    game: 'Blackjack',
    stake: 50,
    payout: 100,
    result: 'win',
    timestamp: new Date(),
  },
  {
    id: 2,
    game: 'Roulette',
    stake: 25,
    payout: 0,
    result: 'loss',
    timestamp: new Date(Date.now() - 3600000),
  },
  // Add more history items as needed
]);

const getGameIcon = (game: string) => {
  const icons: Record<string, string> = {
    'Blackjack': 'fas fa-playing-card',
    'Roulette': 'fas fa-circle',
    'Slots': 'fas fa-slot-machine',
    'Poker': 'fas fa-diamonds',
  };
  return icons[game] || 'fas fa-dice';
};

const formatCurrency = (amount: number) => {
  return `€${amount.toFixed(2)}`;
};

const formatDate = (date: Date) => {
  return date.toLocaleString();
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.casino-section {
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
  font-size: 1.3rem;
  margin: 0;
}

.filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem;
  border-radius: 4px;
  background: var(--body-color);
  border: 1px solid var(--leftpreborder);
  color: var(--white);
  cursor: pointer;
}

.filter-select option {
  background: var(--body-color);
  color: var(--white);
}

/* History Items */
.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--body-color);
  border-radius: 4px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
}

.history-item:hover {
  background: var(--signbet);
}

.game-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.game-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: var(--pointbox);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--active-color);
}

.game-details {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.game-name {
  color: var(--white);
  font-weight: 500;
  font-size: 1rem;
}

.game-time {
  color: var(--textcolor);
  font-size: 0.85rem;
}

.bet-details {
  display: flex;
  gap: 2rem;
}

.bet-stake,
.bet-result {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: right;
  min-width: 100px;
}

.label {
  color: var(--textcolor);
  font-size: 0.85rem;
  font-weight: 500;
}

.value {
  color: var(--white);
  font-weight: 600;
  font-size: 1rem;
}

/* Result-specific colors */
.bet-result.win .value {
  color: var(--success);
}

.bet-result.loss .value {
  color: var(--error);
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--textcolor);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--active-color);
}

.empty-state p {
  color: var(--white);
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .history-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .bet-details {
    width: 100%;
    justify-content: space-between;
  }

  .filters {
    flex-direction: column;
  }

  .bet-stake,
  .bet-result {
    min-width: auto;
  }
}

/* Update text colors for better visibility */
.card-header h3 {
  color: var(--white);
  font-size: 1.1rem;
  margin: 0;
}

.amount {
  color: var(--white);
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0.5rem 0;
}

.subtitle {
  color: var(--textcolor);
  font-size: 0.9rem;
}

/* Overview cards specific styles */
.overview-card {
  background: var(--header);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--leftpreborder);
}

.overview-card .card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--active-color);
}

.overview-card.total-bets .amount {
  color: var(--white);
}

.overview-card.winnings .amount {
  color: var(--active-color);
}

.overview-card.favorite .amount {
  color: var(--white);
  font-size: 1.4rem; /* Slightly smaller for game name */
}
</style>