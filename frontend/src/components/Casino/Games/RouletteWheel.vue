<!-- frontend/src/components/Casino/Games/RouletteWheel.vue -->
<template>
  <div class="roulette-wheel-container">
    <div
      class="wheel"
      :style="{ transform: `rotate(${rotation}deg)` }"
      :class="{ 'is-spinning': isSpinning }"
    >
      <div
        v-for="(number, index) in numbers"
        :key="index"
        class="wheel-section"
        :style="{
          transform: `rotate(${index * sectionAngle}deg)`,
          backgroundColor: getNumberColor(number),
        }"
      >
        <span
          class="number-label"
          :style="{ transform: `rotate(${-index * sectionAngle}deg)` }"
        >
          {{ number }}
        </span>
      </div>
      <div class="wheel-center">
        <div class="center-design"></div>
      </div>
    </div>
    <div class="wheel-pointer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const props = defineProps<{
  numbers: number[];
  isSpinning: boolean;
  targetNumber: number | null;
}>();

const rotation = ref(0);
const isSpinning = ref(false);
const sectionAngle = computed(() => 360 / props.numbers.length);

const getNumberColor = (number: number) => {
  if (number === 0) return "#0EA94A";
  const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  return redNumbers.includes(number) ? "#DD3333" : "#222222";
};

const spinToNumber = (targetNumber: number) => {
  const targetIndex = props.numbers.indexOf(targetNumber);
  const baseRotations = 6; // Increased to minimum 6 rotations

  // Calculate current rotation to ensure continuous spinning
  const currentRotation = rotation.value % 360;

  // Calculate the target position (top position)
  const targetRotation = 360 - targetIndex * sectionAngle.value;

  // Calculate total rotation including minimum spins
  const totalRotation = baseRotations * 360 + targetRotation - currentRotation;

  isSpinning.value = true;
  rotation.value += totalRotation;

  setTimeout(() => {
    isSpinning.value = false;
  }, 4000);
};

watch(
  () => props.targetNumber,
  (newValue) => {
    if (newValue !== null) {
      spinToNumber(newValue);
    }
  }
);
</script>

<style scoped>
.roulette-wheel-container {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 0 auto;
}

.wheel {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 8px solid var(--border);
  box-shadow: 0 0 0 4px var(--header), 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  will-change: transform;
}

.wheel.is-spinning {
  transition: transform 4s cubic-bezier(0.32, 0, 0.16, 1);
}

.wheel-section {
  position: absolute;
  width: 50%;
  height: 16px;
  transform-origin: 100% 50%;
  left: 0;
  top: 50%;
  display: flex;
  align-items: center;
}

.number-label {
  position: absolute;
  left: 15%;
  color: white;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  transform: rotate(0deg);
}

.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: var(--header);
  border-radius: 50%;
  border: 4px solid var(--border);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.center-design {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
}

.wheel-pointer {
  position: absolute;
  top: 50%;
  left: -20px;
  transform: translateY(-50%) rotate(90deg);
  width: 20px;
  height: 40px;
  background: var(--active-color);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 10;
}

@media (max-width: 768px) {
  .roulette-wheel-container {
    width: 280px;
    height: 280px;
  }

  .wheel-center {
    width: 60px;
    height: 60px;
  }

  .number-label {
    font-size: 12px;
  }
}
</style>
