<template>
  <header class="admin-header">
    <div class="search">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search..." />
    </div>
    <div class="user-menu">
      <span>{{ username }}</span>
      <button @click="logout" class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = computed(() => authStore.user?.username || '');

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.admin-header {
  position: fixed;
  top: 0;
  right: 0;
  left: 250px;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  padding: 8px 15px;
  border-radius: 20px;
}

.search input {
  border: none;
  background: none;
  outline: none;
  width: 200px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 15px;
  border: none;
  background: #dc3545;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #c82333;
}
</style> 