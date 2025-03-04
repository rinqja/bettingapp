<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="logo-section">
        <!-- <img src="../../assets/images/logo.png" alt="BET 24/7" /> -->
      </div>
      
      <div class="auth-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'login' }]" 
          @click="activeTab = 'login'"
        >
          Login
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'register' }]" 
          @click="activeTab = 'register'"
        >
          Register
        </button>
      </div>

      <div class="auth-content">
        <LoginForm v-if="activeTab === 'login'" />
        <SignUpForm v-else />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from '../../components/Auth/LoginForm.vue';
import SignUpForm from '../../components/Auth/SignUpForm.vue';

const activeTab = ref('login');
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--body-color);
}

.auth-container {
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  background: var(--section-bg);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tab-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  background: var(--button-two);
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-btn.active {
  background: var(--active-color);
}
</style> 