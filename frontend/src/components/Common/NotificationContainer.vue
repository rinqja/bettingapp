<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="['notification', notification.type]"
      >
        <div class="notification-content">
          <i :class="getIconClass(notification.type)"></i>
          <div class="notification-text">
            <h4 v-if="notification.title" class="notification-title">{{ notification.title }}</h4>
            <p class="notification-message">{{ notification.message }}</p>
          </div>
        </div>
        <button
          type="button"
          class="btn-close"
          @click="removeNotification(notification.id)"
          aria-label="Close"
        ></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotificationStore } from '../../stores/notification';

const notificationStore = useNotificationStore();
const notifications = computed(() => notificationStore.notifications);

const removeNotification = (id: string) => {
  notificationStore.removeNotification(id);
};

const getIconClass = (type: string) => {
  switch (type) {
    case 'success':
      return 'icon-check-circle';
    case 'error':
      return 'icon-alert-circle';
    case 'warning':
      return 'icon-alert-triangle';
    default:
      return 'icon-info';
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 400px;
  pointer-events: none;
}

.notification {
  background: var(--signbet);
  border-left: 4px solid;
  border-radius: 8px;
  padding: 1rem;
  color: var(--white);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: auto;
  position: relative;
  min-width: 300px;
}

.notification-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  padding-right: 2.5rem;
}

.notification-text {
  flex-grow: 1;
}

.notification-title {
  margin: 0;
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
}

.notification-message {
  margin: 0.25rem 0 0;
  color: var(--white);
  font-size: 0.9rem;
}

.btn-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 42px;
  height: 42px;
  background: none;
  border: none;
  color: var(--textcolor);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: 1;
}

.btn-close::before {
  content: "×";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1;
}

.btn-close:hover {
  background: var(--pointbox);
  color: var(--active-color);
}

.success {
  border-left-color: var(--active-color);
}

.success i:first-child {
  color: var(--active-color);
}

.error {
  border-left-color: var(--button-one);
}

.error i:first-child {
  color: var(--button-one);
}

.warning {
  border-left-color: #f59e0b;
}

.warning i:first-child {
  color: #f59e0b;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 768px) {
  .notification-container {
    top: auto;
    bottom: 20px;
    left: 20px;
    right: 20px;
  }

  .notification {
    width: 100%;
    min-width: auto;
    margin: 0;
  }
}

@supports (padding: max(0px)) {
  .notification-container {
    padding-top: max(20px, env(safe-area-inset-top));
    padding-right: max(20px, env(safe-area-inset-right));
  }

  @media (max-width: 768px) {
    .notification-container {
      padding-bottom: max(20px, env(safe-area-inset-bottom));
      padding-left: max(20px, env(safe-area-inset-left));
      padding-right: max(20px, env(safe-area-inset-right));
    }
  }
}
</style> 