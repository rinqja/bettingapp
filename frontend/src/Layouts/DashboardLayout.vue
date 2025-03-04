<template>
  <div class="dashboard-layout">
    <Header />
    
    <div class="dashboard-container">
      <aside class="dashboard-sidebar">
        <nav class="sidebar-nav">
          <RouterLink 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-item"
            :class="{ active: currentPath === item.path }"
          >
            <i :class="item.icon"></i>
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </aside>

      <main class="dashboard-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header/Header.vue';

const route = useRoute();
const currentPath = computed(() => route.path);

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: 'icon-dashboard' },
  { path: '/dashboard/bethistory', label: 'Bet History', icon: 'icon-history' },
  { path: '/dashboard/contact-preference', label: 'Contact Preferences', icon: 'icon-contact' },
  { path: '/dashboard/identity', label: 'Identity', icon: 'icon-user' },
  { path: '/dashboard/verification', label: 'Verification', icon: 'icon-verify' },
  { path: '/dashboard/casinobet', label: 'Casino Bets', icon: 'icon-casino' },
  { path: '/dashboard/mypromo', label: 'My Promotions', icon: 'icon-gift' },
  { path: '/dashboard/deposit', label: 'Deposit', icon: 'icon-deposit' },
  { path: '/dashboard/withdraw', label: 'Withdraw', icon: 'icon-withdraw' },
  { path: '/dashboard/transaction', label: 'Transactions', icon: 'icon-transaction' },
  { path: '/dashboard/notification', label: 'Notifications', icon: 'icon-bell' },
  { path: '/dashboard/bonuses', label: 'Bonuses', icon: 'icon-bonus' }
];
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
}

.dashboard-container {
  flex: 1;
  display: flex;
  gap: 1.5rem;
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  padding: 1.5rem 2rem;
}

.dashboard-sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--subheader);
  border-radius: 8px;
  overflow: hidden;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  color: var(--white);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: var(--signbet);
}

.nav-item.active {
  background: var(--preactive);
  border-left: 3px solid var(--active-color);
  color: var(--active-color);
}

.nav-item i {
  font-size: 1.2rem;
}

.dashboard-content {
  flex: 1;
  background: var(--subheader);
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 0; /* Prevent content overflow */
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .dashboard-container {
    flex-direction: column;
    padding: 1rem;
  }

  .dashboard-sidebar {
    width: 100%;
  }

  .sidebar-nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 0.8rem;
  }

  .nav-item {
    padding: 0.8rem;
  }

  .dashboard-content {
    padding: 1rem;
  }
}

/* Safe area support */
@supports (padding: max(0px)) {
  .dashboard-container {
    padding-left: max(2rem, env(safe-area-inset-left));
    padding-right: max(2rem, env(safe-area-inset-right));
    padding-bottom: max(1.5rem, env(safe-area-inset-bottom));
  }
}
</style>
