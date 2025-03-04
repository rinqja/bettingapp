<template>
  <div class="dashboard-page">
    <!-- Overview Section -->
    <section class="overview-section">
      <div class="overview-card notifications">
        <div class="card-header">
          <i class="fas fa-bell"></i>
          <h3>Notifications</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ activeNotifications }}</span>
          <span class="subtitle">Active Notifications</span>
        </div>
      </div>

      <div class="overview-card messages">
        <div class="card-header">
          <i class="fas fa-envelope"></i>
          <h3>Messages</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ unreadMessages }}</span>
          <span class="subtitle">Unread Messages</span>
        </div>
      </div>

      <div class="overview-card settings">
        <div class="card-header">
          <i class="fas fa-cog"></i>
          <h3>Preferences</h3>
        </div>
        <div class="card-content">
          <span class="amount">{{ activePreferences }}</span>
          <span class="subtitle">Active Settings</span>
        </div>
      </div>
    </section>

    <!-- Contact Preferences Section -->
    <section class="preferences-section">
      <div class="section-header">
        <h2>Contact Preferences</h2>
        <button class="save-button" @click="savePreferences">Save Changes</button>
      </div>
      
      <div class="preferences-list">
        <div class="preference-group">
          <h3>Email Notifications</h3>
          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-title">Promotional Offers</span>
              <span class="preference-description">Receive emails about special offers and promotions</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.promotionalEmails">
              <span class="slider"></span>
            </label>
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-title">Bet Updates</span>
              <span class="preference-description">Get notified about your bet results</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.betEmails">
              <span class="slider"></span>
            </label>
          </div>
        </div>

        <div class="preference-group">
          <h3>SMS Notifications</h3>
          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-title">Security Alerts</span>
              <span class="preference-description">Receive SMS for account security updates</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.securitySMS">
              <span class="slider"></span>
            </label>
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-title">Transaction Updates</span>
              <span class="preference-description">Get SMS for deposits and withdrawals</span>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" v-model="preferences.transactionSMS">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Mock data
const activeNotifications = ref(3);
const unreadMessages = ref(2);
const activePreferences = ref(4);

const preferences = ref({
  promotionalEmails: true,
  betEmails: true,
  securitySMS: true,
  transactionSMS: false
});

const savePreferences = () => {
  // Implement save logic here
  console.log('Saving preferences:', preferences.value);
};
</script>

<style scoped>
/* Include base dashboard styles */
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ... Include other base styles from Dashboard.vue ... */

/* Additional styles specific to Contact Preferences */
.preferences-section {
  background: var(--header);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--leftpreborder);
}

.preference-group {
  margin-bottom: 2rem;
}

.preference-group h3 {
  color: var(--white);
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.preference-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--body-color);
  border-radius: 4px;
  margin-bottom: 1rem;
}

.preference-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.preference-title {
  color: var(--white);
  font-weight: 500;
}

.preference-description {
  color: var(--textcolor);
  font-size: 0.9rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pointbox);
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: var(--white);
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--active-color);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.save-button {
  background: var(--active-color);
  color: var(--black);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.save-button:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

@media (max-width: 768px) {
  .preference-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .toggle-switch {
    align-self: flex-end;
  }
}
</style>
