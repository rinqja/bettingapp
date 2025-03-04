<template>
  <div class="modal event__modal" id="betsp" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        
        <div class="betslip-section">
          <BetSlip />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BetSlip from '../Common/BetSlip.vue';
</script>

<style scoped>
.modal-content {
  background: var(--body-color);
  border: none;
  border-radius: 8px;
  overflow: hidden;
}

.modal-header {
  background: var(--header);
  border-bottom: 2px solid var(--active-color);
  padding: 1rem;
}

.btn-close {
  background: var(--pointbox);
  border: 1px solid var(--leftpreborder);
  border-radius: 4px;
  opacity: 1;
  padding: 0.8rem;
  margin: 0;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: var(--preactive);
  border-color: var(--active-color);
  transform: translateY(-1px);
}

.betslip-section {
  padding: 1rem;
}

/* Modal animations */
.modal.fade .modal-dialog {
  transition: transform 0.2s ease-out;
}

.modal.fade.show .modal-dialog {
  transform: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .modal-header {
    padding: 0.8rem;
  }

  .btn-close {
    padding: 0.6rem;
  }

  .betslip-section {
    padding: 0.8rem;
  }
}

/* Safe area support for modern iOS devices */
@supports (padding: max(0px)) {
  .modal-content {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
