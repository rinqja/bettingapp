<template>
  <div class="main-layout">
    <main class="main-content">
      <slot />
    </main>

    <!-- Keep existing modals -->
    <LoginModal />
    <SignUpModal />
  </div>
</template>

<script setup lang="ts">
import { useBettingStore } from "../stores/betting";
import LoginModal from "../components/Modals/LoginModal.vue";
import SignUpModal from "../components/Modals/SignUpModal.vue";

const bettingStore = useBettingStore();
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: var(--body-color);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-content {
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }
}

/* Safe area support */
@supports (padding: max(0px)) {
  .main-content {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
}
</style>
