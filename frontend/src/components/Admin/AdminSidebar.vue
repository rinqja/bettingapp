<template>
  <aside class="admin-sidebar">
    <div class="logo">
      <img src="/favicon.png" alt="Logo" />
      <span>Admin Panel</span>
    </div>
    <nav>
      <RouterLink to="/admin/dashboard" class="nav-item">
        <i class="fas fa-home"></i>
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink to="/admin/users" class="nav-item">
        <i class="fas fa-users"></i>
        <span>Users</span>
      </RouterLink>
      <RouterLink to="/admin/transactions" class="nav-item">
        <i class="fas fa-exchange-alt"></i>
        <span>Transactions</span>
      </RouterLink>
      <RouterLink to="/admin/coins" class="nav-item" v-if="isSuperuser">
        <i class="fas fa-coins"></i>
        <span>Generate Coins</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const isSuperuser = computed(() => authStore.user?.role === 'superuser');
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  height: 100vh;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
}

.logo img {
  width: 32px;
  height: 32px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin-bottom: 5px;
}

.nav-item:hover, .nav-item.router-link-active {
  background: rgba(255, 255, 255, 0.1);
}

.nav-item i {
  width: 20px;
}
</style> 