<template>
  <div class="mart__point__items">
    <div class="mart__point__left">
      <RouterLink 
        v-for="(odd, type) in displayOdds" 
        :key="type"
        to="#" 
        class="point__box"
        :class="{ 'disabled': status === 'ended' }"
        @click="handleOddClick(type, odd)"
      >
        <span class="point__1">{{ type }}</span>
        <span>{{ formatOdd(odd) }}</span>
      </RouterLink>
    </div>
    <div class="mart__point__right">
      <RouterLink to="#" class="point__box bg__none">
        <i class="icon-star star"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  odds: {
    homeWin: number;
    draw?: number;
    awayWin: number;
  };
  status: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['bet-selected']);

const displayOdds = computed(() => {
  console.log('Received odds:', props.odds); // Debug log
  const odds: Record<string, number> = {
    '1': props.odds?.homeWin || 0,
    'X': props.odds?.draw || 0,
    '2': props.odds?.awayWin || 0
  };
  
  console.log('Transformed odds:', odds); // Debug log
  return odds;
});

const formatOdd = (odd: number) => {
  console.log('Formatting odd:', odd); // Debug log
  return odd ? odd.toFixed(2) : '0.00';
};

const handleOddClick = (type: string, odd: number) => {
  if (props.status !== 'ended' && odd > 0) {
    emit('bet-selected', type, odd);
  }
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.point__box {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  border-radius: 4px;
  text-decoration: none;
  color: white;
}

.point__box:not(.disabled):hover {
  background-color: var(--primary-color-dark);
}

.point__1 {
  font-weight: bold;
}

.bg__none {
  background: none;
}

.star {
  color: var(--primary-color);
}
</style> 