<template>
  <div class="Reel" :class="{'is-locked': locked}" @mousedown="lock()">
    <div class="Reel-inner" :class="{ 'move': isMoving }">
      <img class="Reel-image" :src="reelTileData[tile1Index]?.image" />
      <img class="Reel-image" :src="reelTileData[tile2Index]?.image" />
      <img class="Reel-image" :src="reelTileData[tile3Index]?.image" />
      <img class="Reel-image" :src="reelTileData[tile4Index]?.image" />
      <img class="Reel-image" :src="reelTileData[tile5Index]?.image" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';

const props = defineProps<{
  canlock: boolean
}>();

const emit = defineEmits(['stopped']);

// State
const momentum = ref<number | null>(null);
const locked = ref(false);
const isMoving = ref(false);

// Reel indices
const reelIndex = ref(2);
const tile1Index = ref(0);
const tile2Index = ref(1);
const tile3Index = ref(2);
const tile4Index = ref(3);
const tile5Index = ref(4);

// Audio setup
const audio = {
  spin: new Audio('https://freesound.org/data/previews/120/120373_824230-lq.mp3'),
  spinEnd: new Audio('https://freesound.org/data/previews/145/145441_2615119-lq.mp3'),
  lock: new Audio('https://freesound.org/data/previews/56/56246_91374-lq.mp3')
};

// Configure audio
audio.spin.volume = 0.3;
audio.spinEnd.volume = 0.8;
audio.lock.volume = 0.2;
audio.spin.currentTime = 0.3;

// Reel data
const reelSourceData = [
  {
    name: 'Lemon',
    value: 2,
    image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Lemon-512.png'
  },
  {
    name: 'Melon',
    value: 4,
    image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Watermelon-512.png'
  },
  {
    name: 'Grapes',
    value: 10,
    image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png'
  },
  {
    name: 'Cherry',
    value: 16,
    image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Cherry-512.png'
  },
  {
    name: 'Bar',
    value: 32,
    image: 'https://cdn4.iconfinder.com/data/icons/casino-games/512/bar-512.png'
  }
];

const reelTileData = ref<any[]>([]);

const animate = () => {
  isMoving.value = true;
};

const animateEnd = () => {
  isMoving.value = false;
  reIndex();
  momentum.value = momentum.value! - 1;
  
  if (momentum.value! > 0) {
    setTimeout(animate, 10);
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

const lock = () => {
  if (props.canlock) {
    locked.value = !locked.value;
    audio.lock.play();
  }
};

// Initialize reel data
onBeforeMount(() => {
  let frs: any[] = [];
  let reelSourceDataCopy = [...reelSourceData].sort((a, b) => b.value - a.value);
  
  reelSourceDataCopy.forEach((sd, i) => {
    let times = i + 1 + i;
    while (times > 0) {
      frs.push(sd);
      times--;
    }
  });
  
  // Shuffle array
  reelTileData.value = frs.sort(() => Math.random() - 0.5);
});

onMounted(() => {
  const el = document.querySelector('.Reel');
  if (el) el.addEventListener("transitionend", animateEnd);
});

defineExpose({
  run,
  lock
});
</script>

<style scoped>
:root {
  --tileSize: 90px;
}

.Reel {
  width: var(--tileSize);
  height: calc(var(--tileSize) * 2.333);
  overflow: hidden;
  position: relative;
}

.Reel.is-locked {
  background: rgba(0,0,0,0.1);
}

.Reel:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.Reel-inner {
  position: relative;
  top: calc(var(--tileSize) * -1 * 1.333);
  display: flex;
  flex-direction: column;
}

.Reel.move .Reel-inner {
  transition: margin-top 0.04s linear;
  margin-top: var(--tileSize);
}

.Reel-image {
  width: var(--tileSize);
  height: var(--tileSize);
  object-fit: contain;
  padding: 5px;
}
</style> 