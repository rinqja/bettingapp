<template>
  <div class="table__wrap">
    <div v-if="oddsStore.loading" class="loading">Loading...</div>
    <div v-else-if="oddsStore.error" class="error">{{ oddsStore.error }}</div>
    <template v-else>
      <div v-for="match in footballMatches" :key="match.id" class="table__items">
        <div class="t__items">
          <div class="t__items__left">
            <h6>{{ match.home_team }}</h6>
            <h6>{{ match.away_team }}</h6>
            <span class="time">{{ new Date(match.commence_time).toLocaleTimeString() }}</span>
          </div>
          <div class="mart__point__items">
            <RouterLink 
              v-for="outcome in match.bookmakers[0]?.markets[0]?.outcomes" 
              :key="outcome.name"
              :to="'/bet/' + match.id" 
              class="point__box"
            >
              <span class="point">{{ outcome.price.toFixed(2) }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useOddsStore } from '../../stores/odds';
import { useAuthStore } from '../../stores/auth';
import { onMounted, onUnmounted } from 'vue';
import { Modal } from 'bootstrap';
import { computed } from 'vue';
const oddsStore = useOddsStore();
const authStore = useAuthStore();

const openLoginModal = () => {
  const modalEl = document.getElementById('signInPin');
  if (modalEl) {
    const modal = new Modal(modalEl);
    modal.show();
  }
};

// Initial fetch
onMounted(async () => {
  try {
    if (!authStore.isAuthenticated) {
      openLoginModal();
      return;
    }
    
    await oddsStore.fetchMatches({ sport: 'soccer', status: 'live' });
    
    // Refresh every minute
    const interval = setInterval(async () => {
      try {
        if (oddsStore.isStale) {
          await oddsStore.refreshOdds('soccer');
        }
      } catch (error) {
        if (error.message === 'Authentication required') {
          clearInterval(interval);
          openLoginModal();
        }
      }
    }, 60000);

    onUnmounted(() => clearInterval(interval));
  } catch (error) {
    if (error.message === 'Authentication required') {
      openLoginModal();
    }
  }
});

const footballMatches = computed(() => oddsStore.getMatchesBySport('soccer'));
</script>

<style scoped></style>
