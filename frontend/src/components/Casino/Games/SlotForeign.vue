<template>
  <div class="slot-machine">
    <div class="container">
      <div class="logo">
        <img src="/img/ui/logo.png" class="responsive-img" alt="Logo" />
      </div>
      <div class="reels-container">
        <div class="shadow-overlay"></div>
        <div class="payline"></div>
        <SlotForeignReel ref="reel1" :canlock="canlock" @stopped="reelStopped"></SlotForeignReel>
        <SlotForeignReel ref="reel2" :canlock="canlock" @stopped="reelStopped"></SlotForeignReel>
        <SlotForeignReel ref="reel3" :canlock="canlock" @stopped="reelStopped"></SlotForeignReel>
      </div>
      <div class="hero-image">
        <img src="/img/ui/pers.png" class="responsive-img" alt="Character" />
      </div>
      <div class="toolbar">
        <div class="stats-section">
          <div class="stats-grid">
            <div class="stats-column">
              <div class="coin-button" @mousedown="insertCoin()"></div>
            </div>
            <div class="stats-column">
              <div class="credit-display">
                <div class="stat-title">Credits</div>
                <div class="stat-value">{{ slotStore.credits.toFixed(2) }}€</div>
                <div class="stat-sub">spend {{ slotStore.spend.toFixed(2) }}</div>
              </div>
            </div>
            <div class="stats-column">
              <div class="win-display">
                <div class="stat-title">Won</div>
                <div class="stat-value">{{ slotStore.win.toFixed(2) }}€</div>
              </div>
            </div>
          </div>
        </div>
        <div class="controls-section">
          <div class="win-button" :class="{ 'has-win': slotStore.win }" @mousedown="takeWin()">
            Take Win
          </div>
          <button class="spin-button" @mousedown="spin()"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSlotForeignStore } from '../../../stores/casino/slotForeign';
import SlotForeignReel from './SlotForeignReel.vue';

const slotStore = useSlotForeignStore();

// Refs for reels
const reel1 = ref();
const reel2 = ref();
const reel3 = ref();

// Audio setup
const audio = {
  win: new Audio('/sounds/win.mp3'),
  insertCoin: new Audio('/sounds/insert_coin.mp3'),
  bigwin: new Audio('/sounds/big_win.mp3')
};

// Methods
const keydown = (e: KeyboardEvent) => {
  const key = {
    one: 49,
    two: 50,
    three: 51,
    space: 32
  };

  if (e.which === key.one) {
    reel1.value?.lock();
    e.preventDefault();
  } else if (e.which === key.two) {
    reel2.value?.lock();
    e.preventDefault();
  } else if (e.which === key.three) {
    reel3.value?.lock();
    e.preventDefault();
  } else if (e.which === key.space) {
    spin();
    e.preventDefault();
  }
};

const spin = () => {
  if (slotStore.credits > 0 && !slotStore.isSpinning) {
    slotStore.spin();
    reel1.value?.run();
    reel2.value?.run();
    reel3.value?.run();
  }
};

const insertCoin = () => {
  audio.insertCoin.currentTime = 0;
  audio.insertCoin.play();
  slotStore.insertCoin();
};

const takeWin = () => {
  if (slotStore.win > 0) {
    slotStore.takeWin();
  }
};

const reelStopped = (result: any, wasLocked: boolean) => {
  slotStore.addResult(result, wasLocked);
  
  // Play win sounds if applicable
  if (slotStore.resultData.length === 3) {
    const v1 = slotStore.resultData[0];
    if (v1 && v1.value >= 10) {
      audio.bigwin.play();
    } else if (slotStore.win > 0) {
      audio.win.play();
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('keydown', keydown);
  // Reset store state when component mounts
  slotStore.reset();
});
</script>

<style scoped>
.slot-machine {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  position: relative;
}

.container {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  padding: 2rem;
}

.logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo img {
  max-width: 200px;
  height: auto;
}

.reels-container {
  display: flex;
  gap: 10px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  position: relative;
  margin-bottom: 2rem;
}

.hero-image {
  position: absolute;
  bottom: 0;
  left: -100px;
  width: 200px;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: auto;
  transform: scaleX(-1);
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 1rem;
  margin-top: 1rem;
}

.stats-section {
  flex: 2;
}

.controls-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  align-items: center;
}

.coin-button {
  width: 80px;
  height: 80px;
  background: url('/img/ui/buy_button_up.png') no-repeat center;
  background-size: contain;
  cursor: pointer;
  transition: transform 0.2s;
}

.coin-button:hover {
  transform: scale(1.05);
}

.spin-button {
  width: 100px;
  height: 100px;
  background: url('/img/ui/spin_up.png') no-repeat center;
  background-size: contain;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
}

.spin-button:hover {
  background-image: url('/img/ui/spin_down.png');
}

.win-button {
  padding: 1rem;
  background: rgba(255, 0, 0, 0.3);
  border-radius: 8px;
  cursor: pointer;
  color: white;
  transition: all 0.3s;
}

.win-button.has-win {
  background: rgba(255, 0, 0, 0.8);
}

@media (max-width: 768px) {
  .hero-image {
    width: 150px;
    left: -50px;
  }
  
  .toolbar {
    flex-direction: column;
    gap: 1rem;
  }
  
  .controls-section {
    width: 100%;
    justify-content: center;
  }
}
</style>