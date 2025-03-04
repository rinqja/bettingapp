<template>
  <div class="slots-game">
    <!-- Desktop Version -->
    <template v-if="!isMobile">
      <!-- Game Header Stats -->
      <div class="game-header">
        <div class="stats-container">
          <div class="stat-box">
            <span class="stat-label">Last Win</span>
            <span class="stat-value">{{ slotStore.lastWin.toFixed(2) }}€</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Total Win</span>
            <span class="stat-value">{{ slotStore.totalWin.toFixed(2) }}€</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">Multiplier</span>
            <span class="stat-value">{{ slotStore.multiplier }}x</span>
          </div>
        </div>
      </div>

      <!-- Slot Machine -->
      <div class="slot-machine">
        <!-- Updated Reels Container -->
        <div class="reels-container">
          <div
            v-for="(reel, reelIndex) in slotStore.spinningReels"
            :key="reelIndex"
            class="reel"
          >
            <div
              class="reel-strip"
              :class="{ spinning: slotStore.isSpinning }"
              :style="{
                '--delay': `${reelIndex * 0.3}s`,
                '--duration': `${1.5 + reelIndex * 0.3}s`,
                'transform': `translateY(${slotStore.isSpinning ? '-100%' : '0'})`
              }"
            >
              <div
                v-for="(symbol, index) in getReelSymbols(reel)"
                :key="`${reelIndex}-${index}-${symbol.id}`"
                class="symbol"
                :class="{ winning: isWinningSymbol(reelIndex, index % 3) }"
              >
                <div class="symbol-inner">
                  <span class="symbol-emoji">{{ symbol.emoji }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Updated paylines overlay -->
        <div 
          class="paylines-overlay"
          v-if="!slotStore.isSpinning && slotStore.winningLines.length > 0"
        >
          <svg 
            class="paylines" 
            :viewBox="`0 0 ${REEL_WIDTH * 5} ${SYMBOL_HEIGHT * 3}`"
            preserveAspectRatio="none"
          >
            <path
              v-for="lineIndex in slotStore.winningLines"
              :key="lineIndex"
              :d="getPaylinePath(lineIndex)"
              class="payline"
              :class="`payline-${lineIndex}`"
            />
          </svg>
        </div>
      </div>

      <!-- Game Controls -->
      <div class="game-controls">
        <div class="bet-controls">
          <div class="bet-amount">
            <label class="control-label">Bet Amount</label>
            <div class="bet-input">
              <input
                type="number"
                v-model="slotStore.betAmount"
                :disabled="slotStore.isSpinning"
                min="1"
                step="1"
              />
              <div class="quick-amounts">
                <button
                  v-for="amount in [1, 5, 10, 25, 100]"
                  :key="amount"
                  @click="setBetAmount(amount)"
                  :disabled="slotStore.isSpinning"
                >
                  {{ amount }}
                </button>
              </div>
            </div>
          </div>

          <div class="auto-play">
            <label class="control-label">Auto Spins</label>
            <div class="auto-spins">
              <button
                v-for="count in [10, 20, 50, 100]"
                :key="count"
                @click="setAutoPlay(count)"
                :class="{ active: slotStore.autoPlayCount === count }"
                :disabled="slotStore.isSpinning"
              >
                {{ count }}
              </button>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button
            class="stop-auto"
            v-if="slotStore.autoPlay"
            @click="stopAutoPlay"
            :disabled="slotStore.isSpinning"
          >
            Stop Auto
          </button>
          <button
            class="spin-button"
            @click="handleSpin"
            :disabled="slotStore.isSpinning"
          >
            {{ spinButtonText }}
          </button>
        </div>
      </div>

      <!-- Win Popup -->
      <Transition name="fade">
        <div v-if="showWinPopup" class="win-popup">
          <div class="win-content">
            <h2>{{ resultTitle }}</h2>
            <div class="win-amount">{{ slotStore.lastWin.toFixed(2) }}€</div>
            <div v-if="slotStore.multiplier > 1" class="win-multiplier">
              x{{ slotStore.multiplier }}
            </div>
          </div>
        </div>
      </Transition>

      <!-- Win Notifications System -->
      <transition-group
        name="notification"
        tag="div"
        class="notifications-container"
      >
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification"
          :class="notification.type"
        >
          <div class="notification-content">
            <div class="notification-icon">
              {{ getNotificationIcon(notification.type) }}
            </div>
            <div class="notification-text">
              <h3>{{ notification.title }}</h3>
              <p>{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Result Popup -->
      <Transition name="fade">
        <div v-if="showResultPopup" class="result-popup" :class="popupClass">
          <div class="result-content">
            <div class="result-header">
              <h2>{{ resultTitle }}</h2>
              <span class="close-button" @click="closeResultPopup">&times;</span>
            </div>
            <div class="result-details">
              <div class="result-amount">
                <span class="amount-label">Amount:</span>
                <span class="amount-value" :class="{ 'win': slotStore.lastWin > 0 }">
                  {{ slotStore.lastWin > 0 ? '+' : '' }}{{ slotStore.lastWin.toFixed(2) }}€
                </span>
              </div>
              <div v-if="slotStore.multiplier > 1" class="result-multiplier">
                <span class="multiplier-label">Multiplier:</span>
                <span class="multiplier-value">x{{ slotStore.multiplier }}</span>
              </div>
              <div class="result-lines" v-if="slotStore.winningLines.length > 0">
                <span class="lines-label">Winning Lines:</span>
                <span class="lines-value">{{ slotStore.winningLines.length }}</span>
              </div>
            </div>
            <button class="spin-again-button" @click="handleSpinAgain" :disabled="slotStore.isSpinning">
              Spin Again
            </button>
          </div>
        </div>
      </Transition>
    </template>

    <!-- Mobile Version -->
    <template v-else>
      <div class="mobile-slots-game">
        <div class="mobile-stats">
          <div class="mobile-stat-item">
            <span class="mobile-stat-label">Last Win</span>
            <span class="mobile-stat-value">{{ slotStore.lastWin.toFixed(2) }}€</span>
          </div>
          <div class="mobile-stat-item">
            <span class="mobile-stat-label">Total Win</span>
            <span class="mobile-stat-value">{{ slotStore.totalWin.toFixed(2) }}€</span>
          </div>
          <div class="mobile-stat-item">
            <span class="mobile-stat-label">Multiplier</span>
            <span class="mobile-stat-value">{{ slotStore.multiplier }}x</span>
          </div>
        </div>

        <div class="mobile-slot-machine">
          <div class="mobile-reels">
            <div
              v-for="(reel, reelIndex) in slotStore.spinningReels"
              :key="reelIndex"
              class="mobile-reel"
            >
              <div
                class="mobile-reel-strip"
                :class="{ spinning: slotStore.isSpinning }"
                :style="{
                  '--delay': `${reelIndex * 0.3}s`,
                  '--duration': `${1.5 + reelIndex * 0.3}s`,
                  'transform': `translateY(${slotStore.isSpinning ? '-100%' : '0'})`
                }"
              >
                <div
                  v-for="(symbol, index) in getReelSymbols(reel)"
                  :key="`${reelIndex}-${index}-${symbol.id}`"
                  class="mobile-symbol"
                  :class="{ 'mobile-winning': isWinningSymbol(reelIndex, index % 3) }"
                >
                  <div class="mobile-symbol-inner">
                    <span class="mobile-symbol-emoji">{{ symbol.emoji }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile Paylines -->
          <div 
            class="mobile-paylines-overlay"
            v-if="!slotStore.isSpinning && slotStore.winningLines.length > 0"
          >
            <svg 
              class="mobile-paylines" 
              :viewBox="`0 0 ${REEL_WIDTH * 5} ${SYMBOL_HEIGHT * 3}`"
              preserveAspectRatio="none"
            >
              <path
                v-for="lineIndex in slotStore.winningLines"
                :key="lineIndex"
                :d="getPaylinePath(lineIndex)"
                class="mobile-payline"
                :class="`mobile-payline-${lineIndex}`"
              />
            </svg>
          </div>
        </div>

        <div class="mobile-controls">
          <!-- Bet Amount Controls -->
          <div class="mobile-bet-section">
            <div class="mobile-bet-controls">
              <button 
                class="mobile-bet-btn"
                @click="() => adjustBet('min')"
                :disabled="slotStore.isSpinning || slotStore.betAmount <= 1"
              >
                <span>MIN</span>
              </button>
              <button 
                class="mobile-bet-btn"
                @click="() => adjustBet('decrease')"
                :disabled="slotStore.isSpinning || slotStore.betAmount <= 1"
              >
                <span>-</span>
              </button>
              <div class="mobile-bet-display">
                <span class="mobile-bet-label">BET</span>
                <span class="mobile-bet-amount">{{ slotStore.betAmount.toFixed(2) }}€</span>
              </div>
              <button 
                class="mobile-bet-btn"
                @click="() => adjustBet('increase')"
                :disabled="slotStore.isSpinning || slotStore.betAmount >= 100"
              >
                <span>+</span>
              </button>
              <button 
                class="mobile-bet-btn"
                @click="() => adjustBet('max')"
                :disabled="slotStore.isSpinning || slotStore.betAmount >= 100"
              >
                <span>MAX</span>
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mobile-action-buttons">
            <button 
              class="mobile-spin-btn"
              @click="handleSpin"
              :disabled="slotStore.isSpinning"
            >
              <span>{{ slotStore.isSpinning ? 'SPINNING...' : 'SPIN' }}</span>
            </button>
            <button 
              class="mobile-auto-btn"
              @click="toggleAutoPlay"
              :class="{ active: slotStore.autoPlay }"
              :disabled="slotStore.isSpinning"
            >
              <span>AUTO</span>
            </button>
          </div>
        </div>

        <!-- Mobile Result Popup -->
        <Transition name="fade">
          <div v-if="showResultPopup" class="mobile-result-popup" :class="popupClass">
            <div class="mobile-result-content">
              <div class="mobile-result-header">
                <h2>{{ resultTitle }}</h2>
                <span class="close-button" @click="closeResultPopup">&times;</span>
              </div>
              <div class="mobile-result-details">
                <div class="mobile-result-amount">
                  <span class="amount-label">Amount:</span>
                  <span class="amount-value" :class="{ 'win': slotStore.lastWin > 0 }">
                    {{ slotStore.lastWin > 0 ? '+' : '' }}{{ slotStore.lastWin.toFixed(2) }}€
                  </span>
                </div>
                <div v-if="slotStore.multiplier > 1" class="mobile-result-multiplier">
                  <span class="multiplier-label">Multiplier:</span>
                  <span class="multiplier-value">x{{ slotStore.multiplier }}</span>
                </div>
                <div class="mobile-result-lines" v-if="slotStore.winningLines.length > 0">
                  <span class="lines-label">Winning Lines:</span>
                  <span class="lines-value">{{ slotStore.winningLines.length }}</span>
                </div>
              </div>
              <button class="mobile-spin-again-button" @click="handleSpinAgain" :disabled="slotStore.isSpinning">
                Spin Again
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, TransitionGroup } from "vue";
import { useSlotStore } from "../../../stores/casino/slots";
import { storeToRefs } from "pinia";
import { PAYLINE_PATTERNS, SYMBOLS } from '../../../constants/slots';
import { useDeviceDetection } from '../../../composables/useDeviceDetection';

const slotStore = useSlotStore();
const showWinPopup = ref(false);
const showResultPopup = ref(false);
let spinningInterval: ReturnType<typeof setInterval> | null = null;
const { isMobile } = useDeviceDetection();

const spinButtonText = computed(() => {
  if (slotStore.isSpinning) return "Spinning...";
  if (slotStore.autoPlay) return `Auto (${slotStore.autoPlayCount})`;
  return "Spin";
});

const resultTitle = computed(() => {
  const winAmount = slotStore.lastWin;
  const betAmount = slotStore.betAmount;
  
  if (winAmount === 0) return 'No Win';
  if (winAmount >= betAmount * 50) return 'MEGA WIN!';
  if (winAmount >= betAmount * 20) return 'BIG WIN!';
  return 'WIN!';
});

const popupClass = computed(() => {
  const winAmount = slotStore.lastWin;
  const betAmount = slotStore.betAmount;
  
  if (winAmount === 0) return 'loss';
  if (winAmount >= betAmount * 50) return 'mega-win';
  if (winAmount >= betAmount * 20) return 'big-win';
  return 'win';
});

// Watch for spin completion instead of wins
watch(
  () => slotStore.isSpinning,
  async (isSpinning) => {
    if (!isSpinning) {  // Spin has completed
      if (slotStore.lastWin > 0) {
        // Show win popup for big wins
        if (slotStore.lastWin > slotStore.betAmount * 20) {
          showWinPopup.value = true;
          setTimeout(() => {
            showWinPopup.value = false;
          }, 3000);
        }
      }
      // Always show result popup after spin
      showResultPopup.value = true;
      // Auto-close for small wins/losses
      if (slotStore.lastWin <= slotStore.betAmount * 20) {
        setTimeout(() => {
          showResultPopup.value = false;
        }, 5000);
      }
    } else {
      // Hide popups when spinning starts
      showWinPopup.value = false;
      showResultPopup.value = false;
    }
  }
);

// Track the final positions for each reel
const finalPositions = ref<number[]>([0, 0, 0, 0, 0]);

// Calculate the final position for each reel based on server outcome
const getFinalPosition = (reelIndex: number): string => {
  const position = finalPositions.value[reelIndex];
  // Add a full rotation (TOTAL_SYMBOLS * SYMBOL_HEIGHT) plus the target position
  return `${-(TOTAL_SYMBOLS * SYMBOL_HEIGHT + position)}px`;
};

const SYMBOL_HEIGHT = 100; // Height of each symbol in pixels
const VISIBLE_SYMBOLS = 3; // Number of visible symbols
const TOTAL_SYMBOLS = 9; // Total symbols in strip (3x visible symbols)

const getReelSymbols = (reel: any[]) => {
  if (!reel || reel.length === 0) return [];
  
  // Create a longer strip for smooth animation
  const reelSymbols = reel.map(symbol => ({
    ...symbol,
    emoji: SYMBOLS[symbol?.name]?.emoji || '🎰'
  }));
  
  // Repeat the symbols multiple times for continuous animation
  return [...reelSymbols, ...reelSymbols, ...reelSymbols, ...reelSymbols];
};

// Modified handleSpin to calculate final positions
const handleSpin = async () => {
  if (slotStore.isSpinning) return;
  
  showWinPopup.value = false;
  showResultPopup.value = false;
  
  // Reset positions before spin
  finalPositions.value = [0, 0, 0, 0, 0];
  
  await slotStore.spin();
};

const setBetAmount = (amount: number) => {
  if (!slotStore.isSpinning) {
    slotStore.setBetAmount(amount);
  }
};

const setAutoPlay = (count: number) => {
  slotStore.setAutoPlay(count);
  if (!slotStore.isSpinning) {
    handleSpin();
  }
};

const stopAutoPlay = () => {
  slotStore.setAutoPlay(0);
};

// Update isWinningSymbol to use PAYLINE_PATTERNS
const isWinningSymbol = (reelIndex: number, rowIndex: number) => {
  return slotStore.winningLines.some(lineIndex => {
    const pattern = slotStore.paylines[lineIndex];
    return pattern[reelIndex] === rowIndex;
  });
};

// Constants for positioning
const SYMBOL_CENTER = SYMBOL_HEIGHT / 2;
const REEL_WIDTH = 100;    // Width of each reel
const REEL_CENTER = REEL_WIDTH / 2;

// Updated getPaylinePath function
const getPaylinePath = (lineIndex: number): string => {
  const pattern = slotStore.paylines[lineIndex];
  
  // Calculate points for each position in the pattern
  const points = pattern.map((row, col) => ({
    x: col * REEL_WIDTH + REEL_CENTER,
    y: row * SYMBOL_HEIGHT + SYMBOL_CENTER
  }));

  // Create SVG path
  let path = `M ${points[0].x},${points[0].y}`;
  
  // Use curve commands for smooth lines
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    
    // Calculate control points for smooth curve
    const cp1x = prev.x + (curr.x - prev.x) * 0.5;
    const cp2x = curr.x - (curr.x - prev.x) * 0.5;
    
    path += ` C ${cp1x},${prev.y} ${cp2x},${curr.y} ${curr.x},${curr.y}`;
  }
  
  return path;
};

interface Notification {
  id: number;
  type: "win" | "bigWin" | "megaWin";
  title: string;
  message: string;
}

const notifications = ref<Notification[]>([]);
let notificationId = 0;

const getNotificationIcon = (type: string) => {
  const icons = {
    win: "🎉",
    bigWin: "💰",
    megaWin: "🔥",
  };
  return icons[type as keyof typeof icons] || "✨";
};

const addNotification = (
  type: "win" | "bigWin" | "megaWin",
  amount: number
) => {
  const titles = {
    win: "Nice Win!",
    bigWin: "Big Win!",
    megaWin: "Mega Win!",
  };

  const notification: Notification = {
    id: notificationId++,
    type,
    title: titles[type],
    message: `You won ${amount.toFixed(2)}€!`,
  };

  notifications.value.push(notification);

  // Remove notification after animation
  setTimeout(() => {
    notifications.value = notifications.value.filter(
      (n) => n.id !== notification.id
    );
  }, 4000);
};

// Watch for wins and trigger notifications
watch(
  () => slotStore.lastWin,
  (newWin) => {
    if (newWin > 0) {
      if (newWin >= slotStore.betAmount * 50) {
        addNotification("megaWin", newWin);
      } else if (newWin >= slotStore.betAmount * 20) {
        addNotification("bigWin", newWin);
      } else {
        addNotification("win", newWin);
      }
    }
  }
);

const closeResultPopup = () => {
  showResultPopup.value = false;
};

const handleSpinAgain = () => {
  closeResultPopup();
  handleSpin();
};

const MIN_BET = 1;
const MAX_BET = 100;
const BET_STEP = 1;

const adjustBet = (action: 'min' | 'max' | 'increase' | 'decrease') => {
  if (slotStore.isSpinning) return;

  switch (action) {
    case 'min':
      slotStore.setBetAmount(MIN_BET);
      break;
    case 'max':
      slotStore.setBetAmount(MAX_BET);
      break;
    case 'increase':
      const increasedBet = Math.min(slotStore.betAmount + BET_STEP, MAX_BET);
      slotStore.setBetAmount(increasedBet);
      break;
    case 'decrease':
      const decreasedBet = Math.max(slotStore.betAmount - BET_STEP, MIN_BET);
      slotStore.setBetAmount(decreasedBet);
      break;
  }
};

const toggleAutoPlay = () => {
  if (slotStore.autoPlay) {
    slotStore.setAutoPlay(0);
  } else {
    slotStore.setAutoPlay(50);
  }
};

// Watch for spin completion to set final positions
watch(
  () => slotStore.isSpinning,
  async (isSpinning, prevIsSpinning) => {
    if (!isSpinning && prevIsSpinning) {
      // Calculate the position needed to show the server-generated symbols
      finalPositions.value = slotStore.reels.map((reel, reelIndex) => {
        // Calculate how many positions we need to move to align the symbols
        const targetSymbols = reel.map(s => s.id);
        const currentSymbols = getReelSymbols(reel).slice(0, 3).map(s => s.id);
        const offset = SYMBOL_HEIGHT * (targetSymbols.length - 1);
        return offset;
      });
    }
  }
);
</script>

<style scoped>
.slots-game {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.slot-machine {
  position: relative;
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.reels-container {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px auto;
  max-width: 100%;
  perspective: 1000px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.reel {
  flex: 1;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0) 15%,
    rgba(0, 0, 0, 0) 85%,
    rgba(0, 0, 0, 0.3)
  );
  height: 300px;
  min-width: 60px;
  max-width: 80px;
  overflow: hidden;
  border: 3px solid gold;
  border-radius: 10px;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
  position: relative;
}

.reel::before {
  content: "";
  position: absolute;
  left: 2px;
  right: 2px;
  top: 50%;
  height: 80px;
  transform: translateY(-50%);
  background: rgba(255, 215, 0, 0.1);
  border-top: 1px solid rgba(255, 215, 0, 0.5);
  border-bottom: 1px solid rgba(255, 215, 0, 0.5);
  z-index: 1;
  pointer-events: none;
  border-radius: 4px;
}

.reel-strip {
  position: relative;
  transform: translateY(0);
  will-change: transform;
  backface-visibility: hidden;
}

.spinning {
  animation: smoothSpin 1s linear infinite;
}

@keyframes smoothSpin {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

.stopping {
  animation: none;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1) !important;
}

.symbol {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  transform-style: preserve-3d;
  padding: 5px;
}

.symbol-inner {
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  position: relative;
  z-index: 2;
}

.symbol-emoji {
  font-size: 32px;
}

/* Winning symbol styles */
.symbol.winning {
  background: linear-gradient(145deg, var(--active-color) 0%, var(--header) 100%);
  box-shadow: 0 0 15px rgba(var(--active-color-rgb), 0.5);
  transform: scale(1.05);
  z-index: 1;
}

.symbol.winning .symbol-emoji {
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
  animation: winPulse 1s infinite;
}

/* Tablet styles */
@media (min-width: 768px) {
  .reels-container {
    gap: 15px;
  }

  .reel {
    height: 400px;
    min-width: 80px;
    max-width: 100px;
    border-width: 4px;
  }

  .reel::before {
    height: 100px;
    border-top-width: 2px;
    border-bottom-width: 2px;
  }

  .symbol {
    height: 100px;
  }

  .symbol-emoji {
    font-size: 48px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .reels-container {
    gap: 20px;
  }

  .reel {
    height: 450px;
    min-width: 100px;
    max-width: 120px;
    border-width: 6px;
  }

  .reel::before {
    height: 120px;
  }

  .symbol {
    height: 120px;
  }

  .symbol-emoji {
    font-size: 64px;
  }
}

/* Large desktop styles */
@media (min-width: 1200px) {
  .reel {
    height: 500px;
    min-width: 120px;
    max-width: 140px;
    border-width: 8px;
  }

  .reel::before {
    height: 150px;
  }

  .symbol {
    height: 150px;
  }

  .symbol-emoji {
    font-size: 72px;
  }
}

/* Animation keyframes */
@keyframes winPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Stats container styles */
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-box {
  padding: 1rem;
  background: linear-gradient(145deg, var(--subheader) 0%, var(--header) 100%);
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
}

/* Game controls styles */
.game-controls {
  padding: 15px;
  margin-top: 20px;
  background: linear-gradient(145deg, var(--subheader) 0%, var(--header) 100%);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.bet-controls {
  gap: 10px;
}

.bet-amount,
.auto-play {
  flex: 1;
}

.bet-input,
.auto-spins {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.bet-input input {
  width: 100%;
  padding: 0.75rem;
  background: var(--background);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--white);
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.quick-amounts button,
.auto-spins button {
  background: linear-gradient(145deg, var(--background) 0%, var(--header) 100%);
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.quick-amounts button:hover,
.auto-spins button:hover {
  background: var(--active-color);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(var(--active-color-rgb), 0.3);
}

.spin-button {
  background: linear-gradient(
    145deg,
    var(--active-color) 0%,
    var(--header) 100%
  );
  padding: 1.25rem;
  font-size: 1.3rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(var(--active-color-rgb), 0.3);
  transition: all 0.3s ease;
}

.spin-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 20px rgba(var(--active-color-rgb), 0.4);
}

.spin-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.win-popup {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
}

.win-content {
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  padding: 3rem;
  border-radius: 24px;
  border: 2px solid var(--active-color);
  box-shadow: 0 0 50px rgba(var(--active-color-rgb), 0.3);
}

.win-content h2 {
  color: var(--gold);
  font-size: 2rem;
  margin-bottom: 1rem;
}

.win-amount {
  font-size: 3rem;
  font-weight: bold;
  color: var(--white);
  margin-bottom: 0.5rem;
}

.win-multiplier {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

@media (max-width: 1024px) {
  .reel {
    height: 360px;
  }

  .symbol {
    height: 120px;
  }

  .symbol-emoji {
    font-size: 60px;
  }
}

@media (max-width: 768px) {
  .reel {
    height: 270px;
    width: 150px;
  }

  .symbol {
    height: 90px;
  }

  .symbol-emoji {
    font-size: 45px;
  }
}

@media (max-width: 480px) {
  .reel {
    height: 180px;
    width: 100px;
  }

  .symbol {
    height: 60px;
  }

  .symbol-emoji {
    font-size: 30px;
  }

  .reels-container {
    gap: 10px;
  }
}

@media (max-width: 1024px) {
  .slots-game {
    padding: 1rem;
  }

  .stats-container {
    gap: 1rem;
  }

  .stat-box {
    padding: 1rem;
  }

  .stat-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .slot-machine {
    padding: 1.5rem;
    margin: 1rem 0;
  }

  .reels-container {
    padding: 1rem;
    gap: 0.5rem;
  }

  .symbol-emoji {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .slots-game {
    padding: 0.5rem;
  }

  .stats-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.75rem;
  }

  .stat-box {
    flex: 0 1 calc(33.33% - 0.75rem);
    min-width: 100px;
    padding: 0.75rem;
  }

  .slot-machine {
    padding: 1rem;
    border-radius: 16px;
  }

  .reels-container {
    padding: 0.75rem;
    gap: 0.4rem;
  }

  .reel {
    gap: 0.4rem;
  }

  .symbol {
    padding: 0.25rem;
    border-radius: 8px;
  }

  .symbol-emoji {
    font-size: 2rem;
  }

  .game-controls {
    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 16px;
  }

  .bet-controls {
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .bet-amount,
  .auto-play {
    width: 100%;
  }

  .control-label {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--white);
  }

  .bet-input,
  .auto-spins {
    padding: 0.75rem;
  }

  .quick-amounts,
  .auto-spins {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .quick-amounts button,
  .auto-spins button {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  .action-buttons {
    gap: 0.5rem;
  }

  .spin-button {
    padding: 0.75rem;
    font-size: 1rem;
  }

  .notifications-container {
    left: 10px;
    right: 10px;
    bottom: 10px;
  }

  .notification {
    padding: 0.75rem;
    border-radius: 8px;
  }

  .notification-icon {
    font-size: 1.5rem;
    min-width: 30px;
    height: 30px;
  }

  .notification-text h3 {
    font-size: 1rem;
  }

  .notification-text p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .slots-game {
    padding: 0.25rem;
  }

  .stats-container {
    gap: 0.5rem;
  }

  .stat-box {
    flex: 1 1 calc(50% - 0.5rem);
    padding: 0.5rem;
  }

  .stat-label {
    font-size: 0.8rem;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .slot-machine {
    padding: 0.5rem;
    border-radius: 12px;
  }

  .reels-container {
    padding: 0.5rem;
    gap: 0.3rem;
  }

  .symbol {
    border-radius: 6px;
  }

  .symbol-emoji {
    font-size: 1.5rem;
  }

  .game-controls {
    margin-top: 1rem;
    padding: 0.75rem;
  }

  .quick-amounts,
  .auto-spins {
    grid-template-columns: repeat(2, 1fr);
  }

  .quick-amounts button,
  .auto-spins button {
    padding: 0.4rem;
    font-size: 0.8rem;
  }

  .spin-button {
    padding: 0.6rem;
    font-size: 0.9rem;
  }

  .win-popup .win-content {
    padding: 1.5rem;
  }

  .win-content h2 {
    font-size: 1.5rem;
  }

  .win-amount {
    font-size: 2rem;
  }

  .win-multiplier {
    font-size: 1.2rem;
  }
}

@media (max-height: 600px) and (orientation: landscape) {
  .slots-game {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 0.5rem;
  }

  .game-header {
    grid-column: 1 / -1;
  }

  .slot-machine {
    margin: 0;
  }

  .game-controls {
    margin-top: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .stats-container {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .symbol-emoji {
    font-size: 1.8rem;
  }
}

/* Updated Payline Styles */
.paylines-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  overflow: visible;
}

.paylines {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.payline {
  fill: none;
  stroke-width: 4px;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 0 8px currentColor);
  opacity: 0;
  animation: paylineShow 2s ease-in-out infinite;
}

/* Different colors for different paylines */
.payline-0 {
  stroke: #ff4081;
  animation-delay: 0s;
}
.payline-1 {
  stroke: #40c4ff;
  animation-delay: 0.2s;
}
.payline-2 {
  stroke: #7c4dff;
  animation-delay: 0.4s;
}
.payline-3 {
  stroke: #ffeb3b;
  animation-delay: 0.6s;
}
.payline-4 {
  stroke: #76ff03;
  animation-delay: 0.8s;
}
.payline-5 {
  stroke: #ff9100;
  animation-delay: 1s;
}
.payline-6 {
  stroke: #00e5ff;
  animation-delay: 1.2s;
}
.payline-7 {
  stroke: #ff1744;
  animation-delay: 1.4s;
}
.payline-8 {
  stroke: #64ffda;
  animation-delay: 1.6s;
}

@keyframes paylineShow {
  0%,
  5% {
    opacity: 0;
    stroke-dasharray: 0, 1500;
    stroke-dashoffset: 1500;
  }
  20% {
    opacity: 1;
  }
  45% {
    stroke-dasharray: 1500, 0;
    stroke-dashoffset: 0;
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  95%,
  100% {
    opacity: 0;
    stroke-dasharray: 1500, 0;
    stroke-dashoffset: -1500;
  }
}

/* Responsive adjustments for paylines */
@media (max-width: 768px) {
  .payline {
    stroke-width: 3px;
  }
}

@media (max-width: 480px) {
  .payline {
    stroke-width: 2px;
  }
}

/* Laptop optimization for paylines */
@media (min-width: 1024px) {
  .payline {
    stroke-width: 5px;
  }
}

.result-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2px;
  min-width: 300px;
  max-width: 90vw;
}

.result-content {
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  border-radius: 18px;
  padding: 2rem;
  text-align: center;
}

.result-header {
  position: relative;
  margin-bottom: 1.5rem;
}

.result-header h2 {
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(to right, #fff, var(--active-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.close-button {
  position: absolute;
  top: -1rem;
  right: -1rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.close-button:hover {
  color: var(--white);
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.result-amount,
.result-multiplier,
.result-lines {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.amount-value.win {
  color: var(--active-color);
  font-weight: bold;
}

.spin-again-button {
  background: linear-gradient(145deg, var(--active-color) 0%, var(--header) 100%);
  color: var(--white);
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.spin-again-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(var(--active-color-rgb), 0.3);
}

.spin-again-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Popup variants */
.result-popup.mega-win {
  animation: pulse 1s infinite;
  border: 2px solid var(--active-color);
}

.result-popup.big-win {
  border: 2px solid var(--active-color);
}

.result-popup.win {
  border: 1px solid var(--active-color);
}

.result-popup.loss {
  border: 1px solid var(--border);
}

/* Animation keyframes */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--active-color-rgb), 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(var(--active-color-rgb), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--active-color-rgb), 0);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive styles */
@media (max-width: 768px) {
  .result-popup {
    min-width: 280px;
  }

  .result-content {
    padding: 1.5rem;
  }

  .result-header h2 {
    font-size: 1.5rem;
  }
}

/* Mobile-specific styles */
.mobile-slots-game {
  width: 100%;
  padding: 0.5rem;
}

.mobile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.mobile-stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem;
  border-radius: 4px;
  text-align: center;
}

.mobile-stat-label {
  font-size: 0.75rem;
  display: block;
  color: #888;
}

.mobile-stat-value {
  font-size: 0.875rem;
  font-weight: bold;
}

.mobile-slot-machine {
  position: relative;
  width: 100%;
  aspect-ratio: 5/3;
  background: #2c3e50;
  border-radius: 8px;
  padding: 4px;
}

.mobile-reels {
  display: flex;
  gap: 8px;
  padding: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
}

.mobile-reel {
  flex: 1;
  position: relative;
  height: 300px; /* Height to show 3 symbols */
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 2px solid gold;
}

/* Add mask gradients to top and bottom */
.mobile-reel::before,
.mobile-reel::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 50px;
  z-index: 2;
  pointer-events: none;
}

.mobile-reel::before {
  top: 0;
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.mobile-reel::after {
  bottom: 0;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}

.mobile-reel-strip {
  position: absolute;
  width: 100%;
  transform: translateY(0);
  will-change: transform;
}

.mobile-reel-strip.spinning {
  animation: mobileSpin var(--duration) cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
  animation-delay: var(--delay);
}

.mobile-symbol {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin: 2px;
}

.mobile-symbol-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-symbol-emoji {
  font-size: 2.5rem;
  line-height: 1;
}

.mobile-winning {
  background: rgba(255, 215, 0, 0.2);
  animation: winPulse 1s infinite;
}

@keyframes mobileSpin {
  0% {
    transform: translateY(0);
  }
  20% { /* Quick acceleration */
    transform: translateY(calc(-0.2 * var(--full-height)));
  }
  80% { /* Maintain speed */
    transform: translateY(calc(-0.8 * var(--full-height)));
  }
  100% { /* Slow down to final position */
    transform: translateY(var(--final-position));
  }
}

/* Add a transition for when spinning stops */
.mobile-reel-strip:not(.spinning) {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

@keyframes winPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Make symbols larger on larger screens */
@media (min-width: 768px) {
  .mobile-symbol-emoji {
    font-size: 3rem;
  }
}

.mobile-paylines-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: transparent;
}

.mobile-paylines {
  width: 100%;
  height: 100%;
  background: transparent;
}

.mobile-payline {
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.7));
  animation: paylineShow 3s linear infinite;
}

/* Update mobile payline colors to match desktop */
.mobile-payline-0 { stroke: #ff4081; animation-delay: 0s; }
.mobile-payline-1 { stroke: #40c4ff; animation-delay: 0.2s; }
.mobile-payline-2 { stroke: #7c4dff; animation-delay: 0.4s; }
.mobile-payline-3 { stroke: #ffeb3b; animation-delay: 0.6s; }
.mobile-payline-4 { stroke: #76ff03; animation-delay: 0.8s; }
.mobile-payline-5 { stroke: #ff9100; animation-delay: 1s; }
.mobile-payline-6 { stroke: #00e5ff; animation-delay: 1.2s; }
.mobile-payline-7 { stroke: #ff1744; animation-delay: 1.4s; }
.mobile-payline-8 { stroke: #64ffda; animation-delay: 1.6s; }

@keyframes mobile-payline-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.mobile-bet-section {
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  margin: 0.5rem 0;
}

.mobile-bet-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.25rem;
}

.mobile-bet-btn {
  flex: 0 0 auto;
  height: 40px;
  min-width: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  transition: all 0.2s ease;
}

.mobile-bet-btn:active:not(:disabled) {
  transform: scale(0.95);
  background: rgba(255, 255, 255, 0.2);
}

.mobile-bet-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mobile-bet-display {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
  min-width: 80px;
}

.mobile-bet-label {
  font-size: 0.75rem;
  color: #888;
  text-transform: uppercase;
}

.mobile-bet-amount {
  font-size: 1.125rem;
  font-weight: bold;
  color: #fff;
}

.mobile-action-buttons {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
}

.mobile-spin-btn {
  background: linear-gradient(to bottom, #4CAF50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
}

.mobile-spin-btn:active:not(:disabled) {
  transform: scale(0.98);
  background: linear-gradient(to bottom, #45a049, #409444);
}

.mobile-auto-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.mobile-auto-btn.active {
  background: #ff9800;
}

.mobile-auto-btn:active:not(:disabled) {
  transform: scale(0.98);
}

/* Additional responsive adjustments */
@media (max-width: 360px) {
  .mobile-bet-btn {
    height: 36px;
    min-width: 36px;
    font-size: 0.875rem;
  }

  .mobile-bet-amount {
    font-size: 1rem;
  }

  .mobile-spin-btn {
    font-size: 1.125rem;
    padding: 0.75rem;
  }

  .mobile-auto-btn {
    font-size: 0.875rem;
  }
}

.mobile-result-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2px;
  width: 90%;
  max-width: 320px;
}

.mobile-result-content {
  background: linear-gradient(145deg, var(--header) 0%, var(--background) 100%);
  border-radius: 14px;
  padding: 1.5rem;
  text-align: center;
}

.mobile-result-header {
  position: relative;
  margin-bottom: 1rem;
}

.mobile-result-header h2 {
  font-size: 1.75rem;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(to right, #fff, var(--active-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mobile-result-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
}

.mobile-spin-again-button {
  background: var(--active-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1.125rem;
  font-weight: bold;
  width: 100%;
  margin-top: 1rem;
  transition: all 0.2s ease;
}

.mobile-spin-again-button:active:not(:disabled) {
  transform: scale(0.98);
}

/* Updated reel animation styles */
.reel-strip,
.mobile-reel-strip {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.reel-strip.spinning,
.mobile-reel-strip.spinning {
  animation: spinAnimation var(--duration) var(--delay) cubic-bezier(0.1, 0.7, 0.2, 1) infinite;
}

@keyframes spinAnimation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}

/* Smooth symbol transitions */
.symbol,
.mobile-symbol {
  height: 100px;
  min-height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.symbol-inner,
.mobile-symbol-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.symbol-emoji,
.mobile-symbol-emoji {
  font-size: 2.5rem;
  line-height: 1;
  transform: translateZ(0);
}

/* Add smooth stopping animation */
.reel-strip:not(.spinning),
.mobile-reel-strip:not(.spinning) {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Updated payline animations */
.payline,
.mobile-payline {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 3s ease-in-out infinite;
}

@keyframes drawLine {
  0% {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  20% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  80% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -1000;
    opacity: 0;
  }
}

/* Optimize mobile animations */
@media (max-width: 768px) {
  .mobile-reel-strip.spinning {
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
  
  .mobile-symbol.winning {
    animation-duration: 1s;
  }
  
  .mobile-payline {
    animation-duration: 2s;
  }
}

/* Hardware acceleration for smoother animations */
.reel-strip,
.mobile-reel-strip,
.symbol,
.mobile-symbol {
  transform: translateZ(0);
  backface-visibility: hidden;
  will-change: transform;
}
</style>
