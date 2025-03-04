<template>
  <div class="dashboard__body__wrap">
    <h3 class="account__head mb__30">Notifications</h3>
    <div class="notification__wrap">
      <h4>Notifications</h4>
      <div class="notification__items">
        <div class="left">
          <h5>Announcements</h5>
          <p>Occasional announcements of new features</p>
        </div>
        <div class="right form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="downs"
            defaultChecked
          />
        </div>
      </div>
      <div class="notification__items">
        <div class="left">
          <h5>Feedback requests</h5>
          <p>Occasional requests for feedback</p>
        </div>
        <div class="right form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="downs1"
            defaultChecked
          />
        </div>
      </div>
      <div class="notification__items">
        <div class="left">
          <h5>Billing and account</h5>
          <p>Transactional emails and account notifications</p>
        </div>
        <div class="right">
          <RouterLink to="#">Legally obligated</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
