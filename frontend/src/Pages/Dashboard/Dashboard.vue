<template>
  <div class="dashboard-page">
    <!-- User Overview Section -->
    <section class="overview-section">
      <div class="overview-card balance">
        <div class="card-header">
          <i class="icon-wallet"></i>
          <h3>Balance</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ formatCurrency(userBalance) }}</span>
          <div class="actions">
            <RouterLink to="/dashboard/deposit" class="action-button deposit">
              <i class="icon-deposit"></i>
              Deposit
            </RouterLink>
            <RouterLink to="/dashboard/withdraw" class="action-button withdraw">
              <i class="icon-withdraw"></i>
              Withdraw
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="overview-card bets">
        <div class="card-header">
          <i class="icon-ticket"></i>
          <h3>Active Bets</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ activeBets }}</span>
          <RouterLink to="/dashboard/bethistory" class="view-all">
            View History
          </RouterLink>
        </div>
      </div>

      <div class="overview-card bonuses">
        <div class="card-header">
          <i class="icon-gift"></i>
          <h3>Available Bonuses</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ availableBonuses }}</span>
          <RouterLink to="/dashboard/bonuses" class="view-all">
            View All
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Recent Activity Section -->
    <section class="activity-section">
      <div class="section-header">
        <h2>Recent Activity</h2>
        <RouterLink to="/dashboard/bethistory" class="view-all">
          View All Activity
        </RouterLink>
      </div>
      
      <div class="activity-list" v-if="recentActivity.length">
        <div 
          v-for="activity in recentActivity" 
          :key="activity.id" 
          class="activity-item"
        >
          <div class="activity-icon" :class="activity.type">
            <i :class="getActivityIcon(activity.type)"></i>
          </div>
          <div class="activity-details">
            <span class="activity-type">{{ activity.description }}</span>
            <span class="activity-date">{{ formatDate(activity.date) }}</span>
          </div>
          <div class="activity-amount" :class="activity.type">
            {{ formatCurrency(activity.amount) }}
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <i class="icon-history"></i>
        <p>No recent activity</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data - replace with actual data from your store/API
const userBalance = ref(1500.50);
const activeBets = ref(3);
const availableBonuses = ref(2);
const recentActivity = ref([
  {
    id: 1,
    type: 'bet',
    description: 'Sports Bet - Football',
    amount: -50.00,
    date: new Date()
  },
  {
    id: 2,
    type: 'deposit',
    description: 'Deposit via Credit Card',
    amount: 200.00,
    date: new Date(Date.now() - 86400000)
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

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'bet': return 'icon-ticket';
    case 'deposit': return 'icon-deposit';
    case 'withdraw': return 'icon-withdraw';
    case 'bonus': return 'icon-gift';
    default: return 'icon-history';
  }
};
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.overview-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  gap: 1rem;
}

.amount {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--white);
}

.actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.action-button.deposit {
  background: var(--active-color);
  color: var(--black);
}

.action-button.withdraw {
  background: var(--pointbox);
  color: var(--white);
  border: 1px solid var(--leftpreborder);
}

.action-button:hover {
  transform: translateY(-1px);
}

.view-all {
  color: var(--active-color);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.view-all:hover {
  color: var(--active-two);
}

.activity-section {
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

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--body-color);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.activity-item:hover {
  background: var(--signbet);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--pointbox);
}

.activity-icon.deposit {
  color: var(--active-color);
}

.activity-icon.withdraw {
  color: var(--button-one);
}

.activity-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.activity-type {
  color: var(--white);
  font-size: 0.95rem;
}

.activity-date {
  color: var(--textcolor);
  font-size: 0.85rem;
}

.activity-amount {
  font-weight: 600;
  font-size: 1.1rem;
}

.activity-amount.deposit {
  color: var(--active-color);
}

.activity-amount.withdraw,
.activity-amount.bet {
  color: var(--button-one);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--textcolor);
}

.empty-state i {
  font-size: 2rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .overview-section {
    grid-template-columns: 1fr;
  }

  .activity-item {
    padding: 0.8rem;
  }

  .amount {
    font-size: 1.5rem;
  }
}
</style>
