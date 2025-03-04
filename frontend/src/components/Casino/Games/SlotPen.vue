<template>
  <div class="slot-machine">
    <div class="reels-container">
      <div class="shadow-overlay"></div>
      <div class="payline"></div>
      <SlotPenReel 
        v-for="(_, index) in 3"
        :key="index"
        :ref="(el) => reels[index] = el"
        :canlock="canLock" 
        @stopped="reelStopped"
      />
    </div>

    <div class="stats-container">
      <div class="coin-slot">
        <div class="coin-button" @mousedown="insertCoin"></div>
      </div>
      <div class="display-container">
        <div class="display credits">
          <div class="display-label">Credits</div>
          <div class="display-value">ABT {{ credits.toFixed(2) }}</div>
          <div class="display-sub">spend ABT {{ spend.toFixed(2) }}</div>
        </div>
        <div class="display won">
          <div class="display-label">Won</div>
          <div class="display-value">ABT {{ win.toFixed(2) }}</div>
        </div>
      </div>
    </div>

    <div class="controls-container">
      <button 
        class="play-button" 
        :disabled="!canSpin"
        @mousedown="spin"
      >
        Play
      </button>
      <button 
        class="take-win-button" 
        :class="{ 'has-win': win > 0 }"
        @mousedown="takeWin"
      >
        Take Win
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SlotPenReel from './SlotPenReel.vue';

// State
const credits = ref(6);
const spend = ref(6);
const win = ref(0);
const resultData = ref<any[]>([]);
const canLock = ref(true);
const wasLocked = ref(false);
const reels = ref<any[]>([]);
const canSpin = ref(true);

// Audio setup
const audio = {
  win: new Audio('https://freesound.org/data/previews/387/387232_1474204-lq.mp3'),
  insertCoin: new Audio('https://freesound.org/data/previews/276/276091_5123851-lq.mp3'),
  bigwin: new Audio('https://freesound.org/data/previews/270/270319_5123851-lq.mp3')
};

const spin = () => {
  if (credits.value > 0 && !resultData.value.length) {
    resultData.value = [];
    credits.value -= 0.5;
    canSpin.value = false;
    
    // Run each reel
    reels.value.forEach(reel => {
      if (reel && reel.run) {
        reel.run();
      }
    });
  }
};

const insertCoin = () => {
  audio.insertCoin.currentTime = 0;
  audio.insertCoin.play();
  credits.value += 0.5;
  spend.value += 0.5;
};

const takeWin = () => {
  if (win.value > 0) {
    credits.value += win.value;
    win.value = 0;
  }
};

const reelStopped = (result: any, wasLockedReel = false) => {
  if (wasLockedReel) {
    wasLocked.value = true;
  }
  
  resultData.value.push(result);
  
  if (resultData.value.length === 3) {
    checkWin();
    if (wasLocked.value) {
      wasLocked.value = false;
      canLock.value = false;
    } else {
      canLock.value = true;
    }
    canSpin.value = true;
  }
};

const checkWin = () => {
  if (resultData.value.length === 3) {
    const [v1, v2, v3] = resultData.value;
    
    if (v1.name === v2.name && v2.name === v3.name) {
      if (v1.value >= 10) {
        audio.bigwin.play();
      } else {
        audio.win.play();
      }
      win.value += v1.value;
      wasLocked.value = true;
    }
    
    resultData.value = [];
  }
};

const keydown = (e: KeyboardEvent) => {
  const keys = {
    one: '1',
    two: '2',
    three: '3',
    space: ' '
  };

  if (e.key === keys.one) {
    reels.value[0]?.lock();
    e.preventDefault();
  } else if (e.key === keys.two) {
    reels.value[1]?.lock();
    e.preventDefault();
  } else if (e.key === keys.three) {
    reels.value[2]?.lock();
    e.preventDefault();
  } else if (e.key === keys.space) {
    spin();
    e.preventDefault();
  }
};

onMounted(() => {
  window.addEventListener('keydown', keydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', keydown);
});
</script>

<style scoped>
.slot-machine {
  max-width: 600px;
  margin: 0 auto;
  background: #2a2a2a;
  border-radius: 8px;
  padding: 20px;
}

.reels-container {
  display: flex;
  position: relative;
  gap: 4px;
  background: white;
  padding: 10px;
  border-radius: 8px;
}

.shadow-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  box-shadow: 
    inset 0 25px 30px -5px rgba(0,0,0,0.1),
    inset 0 5px 10px -2px rgba(0,0,0,0.2),
    inset 0 -25px 30px -5px rgba(0,0,0,0.1),
    inset 0 -5px 10px -2px rgba(0,0,0,0.2);
}

.payline {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255,0,0,0.5);
  pointer-events: none;
}

.stats-container {
  display: flex;
  background: #000;
  padding: 15px;
  margin-top: 20px;
  border-radius: 4px;
}

.display-container {
  flex: 1;
  display: flex;
  gap: 20px;
}

.display {
  flex: 1;
}

.display-label {
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.display-value {
  background: #1a1a1a;
  color: #f00;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 24px;
  text-align: right;
}

.display-sub {
  color: #444;
  font-size: 12px;
  text-align: right;
  margin-top: 4px;
}

.controls-container {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.play-button, .take-win-button {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.play-button {
  background: #28a745;
  color: white;
}

.play-button:disabled {
  background: #1a6b2c;
  cursor: not-allowed;
}

.take-win-button {
  background: #dc3545;
  color: white;
}

.take-win-button.has-win {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.coin-button {
  width: 30px;
  height: 60px;
  background: #444;
  border: 2px solid #666;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 20px;
  transition: background 0.2s;
}

.coin-button:hover {
  background: #555;
}
</style> 