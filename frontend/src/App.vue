<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import MainLayout from "./Layouts/MainLayout.vue";
import NotificationContainer from "./components/Common/NotificationContainer.vue";
import { useNotification } from '@kyvg/vue3-notification';

const cleanupModals = () => {
  // Remove modal-open class
  document.body.classList.remove('modal-open');
  
  // Remove any lingering backdrops
  const modalBackdrops = document.getElementsByClassName('modal-backdrop');
  while (modalBackdrops.length > 0) {
    modalBackdrops[0].remove();
  }
  
  // Reset body styles
  document.body.style.removeProperty('padding-right');
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  cleanupModals();
});

onUnmounted(() => {
  cleanupModals();
});
</script>

<template>
  <notifications position="top right" />
  <component :is="$route.meta.layout || MainLayout">
    <RouterView />
    <NotificationContainer />
  </component>
</template>

<style>
/* Add these global modal styles */
.modal-open {
  overflow: hidden;
  padding-right: 0 !important;
}

.modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-dialog {
  margin: 1.75rem auto;
  max-width: 800px;
}

.modal-content {
  background-clip: padding-box;
  outline: 0;
}

.modal-backdrop {
  opacity: 0.5;
  background-color: #000;
}
</style>
