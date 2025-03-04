<template>
  <nav class="mobile-nav">
    <RouterLink
      to="/"
      class="nav-item"
      :class="{ active: currentRoute === '/' }"
      @click="closeModal"
    >
      <i class="fas fa-table-tennis"></i>
      <span>Sports</span>
    </RouterLink>

    <RouterLink
      to="/casino"
      class="nav-item"
      :class="{ active: currentRoute === '/casino' }"
      @click="openEventsModal"
    >
      <i class="fa-solid fa-gift"></i>

      <span>Casino</span>
    </RouterLink>

    <!-- Move betslip to middle position -->
    <a href="#" class="nav-item" @click.prevent="toggleBetslip">
      <div class="betslip-icon-wrapper">
        <i class="fas fa-shopping-cart"></i>
        <span class="selection-counter" v-if="totalSelections > 0">
          {{ totalSelections }}
        </span>
      </div>
      <span>Betslip</span>
    </a>

    <RouterLink
      to="/my-bets"
      class="nav-item"
      :class="{ active: currentRoute === '/my-bets' }"
    >
      <i class="fas fa-ticket-alt"></i>
      <span>My Bets</span>
    </RouterLink>

    <!-- Move account to end -->
    <RouterLink
      to="/profile"
      class="nav-item"
      :class="{ active: currentRoute === '/profile' }"
      @click="closeModal"
    >
      <i class="far fa-user-circle"></i>

      <span>Profile</span>
    </RouterLink>
  </nav>


  <!-- Remove the bootstrap modal and add BetSlip directly -->
  <BetSlip v-if="isMobile" ref="betslipRef" />
</template>

<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { Modal } from "bootstrap";
import BetSlip from "../Common/BetSlip.vue"; // Update import path
import { useBettingStore } from "../../stores/betting"; // Add this import

const route = useRoute();
const currentRoute = computed(() => route.path);
const isMenuOpen = ref(false);
const betslipRef = ref(null);
const isMobile = ref(false);

const bettingStore = useBettingStore();

// Add computed property for total selections
const totalSelections = computed(() => {
  return bettingStore.currentBets?.length || 0;
});

// Check if device is mobile
onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 992;
  };

  checkMobile();
  window.addEventListener("resize", checkMobile);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });
});

// Remove betslipModal ref and related functions
const casinoModal = ref<Modal | null>(null);
const betsModal = ref<Modal | null>(null);


onMounted(() => {
  const casinoModalElement = document.getElementById("casinomodal");
  const betsModalElement = document.getElementById("betsp");


  if (casinoModalElement) {
    casinoModal.value = Modal.getOrCreateInstance(casinoModalElement);
  }


  if (betsModalElement) {
    betsModal.value = Modal.getOrCreateInstance(betsModalElement);
  }
});

const closeModal = () => {
  if (casinoModal.value) {
    casinoModal.value.hide();
  }
  if (betsModal.value) {
    betsModal.value.hide();
  }
};


const openCasinoModal = () => {
  if (casinoModal.value) {
    casinoModal.value.show();
  }
};


const openBetsModal = () => {
  if (betsModal.value) {
    betsModal.value.show();
  }
};

const toggleBetslip = () => {
  if (betslipRef.value) {
    if (betslipRef.value.isVisible) {
      betslipRef.value.closeBetslip();
    } else {
      betslipRef.value.openBetslip();
    }
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.mobile-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--header);
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid var(--leftpreborder);
  z-index: 1001;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: var(--textcolor);
  text-decoration: none;
  padding: 8px;
  min-width: 64px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item i {
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.nav-item span {
  font-size: 0.75rem;
  font-weight: 500;
}

.nav-item.active {
  color: var(--active-color);
}

.nav-item:hover {
  color: var(--active-color);
}

.menu-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.menu-button.active i {
  transform: rotate(180deg);
}

/* Safe area support for mobile devices */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .mobile-nav {
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(60px + env(safe-area-inset-bottom));
  }
}

/* Hide on larger screens */
@media (min-width: 992px) {
  .mobile-nav {
    display: none;
  }
}

.betslip-icon-wrapper {
  position: relative;
  display: inline-block;
}

.selection-counter {
  position: absolute;
  top: -8px;
  right: -28px;
  background: var(--active-color);
  color: var(--black);
  font-size: 0.7rem;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
</style>
