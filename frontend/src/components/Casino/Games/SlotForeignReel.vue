<template>
  <div class="reel-column" :class="{'is-locked': locked}" @mousedown="lock()">
    <div class="reel-inner" :class="{ 'move': isMoving }"> 
      <div class="reel-symbols">
        <img 
          v-for="(tile, index) in visibleTiles" 
          :key="index"
          class="reel-image" 
          :src="tile.image" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed } from 'vue';

const props = defineProps<{
  canlock: boolean
}>();

const emit = defineEmits(['stopped']);

// State
const momentum = ref<number | null>(null);
const locked = ref(false);
const reelIndex = ref(2);
const tile1Index = ref(0);
const tile2Index = ref(1);
const tile3Index = ref(2);
const tile4Index = ref(3);
const tile5Index = ref(4);
const isMoving = ref(false);

// Audio setup
const audio = {
  spin: new Audio('/sounds/spin.mp3'),
  spinEnd: new Audio('/sounds/spin_end.mp3'),
  lock: new Audio('/sounds/lock.mp3')
};

// Configure audio
audio.spin.volume = 0.3;
audio.spinEnd.volume = 0.8;
audio.lock.volume = 0.2;
audio.spin.currentTime = 0.3;

// Reel data
const reelSourceData = [
  { name: 'Lemon', value: 2, image: '/img/hand.png' },
  { name: 'Melon', value: 4, image: '/img/pumpkin.png' },
  { name: 'Grapes', value: 10, image: '/img/hat.png' },
  { name: 'Cherry', value: 16, image: '/img/pot.png' },
  { name: 'Bar', value: 32, image: '/img/wild.png' }
];

let reelTileData = ref<any[]>([]);

const visibleTiles = computed(() => [
  reelTileData.value[tile1Index.value],
  reelTileData.value[tile2Index.value],
  reelTileData.value[tile3Index.value],
  reelTileData.value[tile4Index.value],
  reelTileData.value[tile5Index.value]
]);

// Methods
const run = () => {
  if (!locked.value) {
    const min = 8;
    const max = 28;
    momentum.value = Math.floor(Math.random() * (max - min + 1) + min);
    audio.spin.play();
    animate();
  } else {
    locked.value = false;
    emit('stopped', reelTileData.value[reelIndex.value], true);
  }
};

const animate = () => {
  isMoving.value = true;
};

const animateEnd = () => {
  isMoving.value = false;
  reIndex();
  if (momentum.value && momentum.value > 0) {
    momentum.value--;
    setTimeout(animate, 50);
  } else {
    emit('stopped', reelTileData.value[reelIndex.value]);
    audio.spinEnd.play();
    audio.spin.pause();
    audio.spin.currentTime = 0.3;
  }
};

const reIndex = () => {
  const end = reelTileData.value.length - 1;
  const index = reelIndex.value === 0 ? end : reelIndex.value - 1;
  reelIndex.value = index;
  tile1Index.value = index === 1 ? end : index === 0 ? end - 1 : index - 2;
  tile2Index.value = index === 0 ? end : index - 1;
  tile3Index.value = index;
  tile4Index.value = index === end ? 0 : index + 1;
  tile5Index.value = index === end - 1 ? 0 : index === end ? 1 : index + 2;
};

const lock = () => {
  if (props.canlock) {
    locked.value = !locked.value;
    audio.lock.play();
  }
};

// Initialize reel data
onBeforeMount(() => {
  const frs: any[] = [];
  const sortedData = [...reelSourceData].sort((a, b) => b.value - a.value);
  
  sortedData.forEach((sd, i) => {
    let times = i + 1 + i;
    while (times > 0) {
      frs.push(sd);
      times--;
    }
  });

  // Shuffle array
  const shuffled = frs.sort(() => Math.random() - 0.5);
  reelTileData.value = shuffled;
});

onMounted(() => {
  const el = document.querySelector('.reel-column');
  if (el) el.addEventListener("transitionend", animateEnd);
});

// Expose methods for parent component
defineExpose({
  run,
  lock
});
</script>

<style scoped>
.reel-column {
  flex: 1;
  width: calc(33.333% - 10px);
  height: 300px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  position: relative;
}

.reel-symbols {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.reel-inner {
  position: relative;
  height: 100%;
}

.reel-image {
  width: 100%;
  height: 60px;
  object-fit: contain;
  padding: 5px;
}

.move {
  animation: spinReel 0.1s linear;
}

@keyframes spinReel {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-60px);
  }
}

.reel-inner.move .reel-symbols {
  transform: translateY(60px);
}

.reel-column.is-locked {
  background: rgba(0, 0, 0, 0.5);
}
</style> 