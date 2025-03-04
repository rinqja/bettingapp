<template>
  <div class="user-balance" v-if="authStore.isAuthenticated">
    <i class="icon-coins"></i>
    <span class="balance-amount">{{ formatBalance(authStore.userBalance) }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const formatBalance = (balance: number) => {
  return balance.toFixed(2);
};
</script>

<style scoped>
.user-balance {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--signbet);
  border-radius: 20px;
  margin-right: 1rem;
}

.icon-coins {
  color: var(--active-color);
}

.balance-amount {
  font-weight: 600;
  color: var(--active-color);
}
</style> 