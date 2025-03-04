import { defineStore } from 'pinia';
import axios from '../../utils/axios';
import { useAuthStore } from '../auth';
import { PAYLINE_PATTERNS } from '../../constants/slots';

const API_URL = import.meta.env.VITE_API_URL;

// Define slot symbols with emojis
const SLOT_SYMBOLS = [
  { id: 1, name: 'SEVEN', value: 50, emoji: '7️⃣' },
  { id: 2, name: 'BAR', value: 20, emoji: '🎰' },
  { id: 3, name: 'BELL', value: 15, emoji: '🔔' },
  { id: 4, name: 'CHERRY', value: 10, emoji: '🍒' },
  { id: 5, name: 'LEMON', value: 5, emoji: '🍋' },
  { id: 6, name: 'ORANGE', value: 5, emoji: '🍊' },
  { id: 7, name: 'PLUM', value: 5, emoji: '🫐' },
  { id: 8, name: 'GRAPE', value: 5, emoji: '🍇' }
];

interface Symbol {
  id: number;
  name: string;
  value: number;
  emoji: string;
}

interface SlotState {
  reels: Symbol[][];
  spinningReels: Symbol[][];
  finalReels: Symbol[][];
  reelStrips: Symbol[][][];  // Added to store the complete reel strips
  betAmount: number;
  isSpinning: boolean;
  autoPlay: boolean;
  autoPlayCount: number;
  lastWin: number;
  totalWin: number;
  balance: number;
  loading: boolean;
  error: string | null;
  currentGameId: string | null;
  paylines: number[][];
  winningLines: number[];
  multiplier: number;
}

export const useSlotStore = defineStore('slots', {
  state: (): SlotState => ({
    reels: Array(5).fill([]).map(() => Array(3).fill(null)),
    spinningReels: Array(5).fill([]).map(() => Array(3).fill(null)),
    finalReels: Array(5).fill([]).map(() => Array(3).fill(null)),
    reelStrips: Array(5).fill([]).map(() => []),  // Will hold complete reel strips
    betAmount: 1,
    isSpinning: false,
    autoPlay: false,
    autoPlayCount: 0,
    lastWin: 0,
    totalWin: 0,
    balance: 0,
    loading: false,
    error: null,
    currentGameId: null,
    paylines: PAYLINE_PATTERNS,
    winningLines: [],
    multiplier: 1
  }),

  actions: {
    // Generate a complete reel strip that ensures smooth animation
    generateReelStrip(): Symbol[] {
      // Create a base set of symbols
      const baseSymbols = [...SLOT_SYMBOLS];
      // Shuffle the symbols
      for (let i = baseSymbols.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [baseSymbols[i], baseSymbols[j]] = [baseSymbols[j], baseSymbols[i]];
      }
      // Repeat the symbols to create a long strip
      return [...baseSymbols, ...baseSymbols, ...baseSymbols];
    },

    // Initialize all reel strips
    initializeReelStrips() {
      this.reelStrips = Array(5).fill(null).map(() => this.generateReelStrip());
    },

    // Get visible symbols for a reel at a specific position
    getVisibleSymbols(reelIndex: number, position: number): Symbol[] {
      const strip = this.reelStrips[reelIndex];
      const visibleSymbols = [];
      for (let i = 0; i < 3; i++) {
        const index = (position + i) % strip.length;
        visibleSymbols.push(strip[index]);
      }
      return visibleSymbols;
    },

    generateFinalReels(): Symbol[][] {
      // Generate new final positions for each reel
      return Array(5).fill(null).map((_, index) => {
        const startPos = Math.floor(Math.random() * SLOT_SYMBOLS.length);
        return this.getVisibleSymbols(index, startPos);
      });
    },

    async spin() {
      const authStore = useAuthStore();
      
      if (!authStore.token || this.isSpinning) return;
      if (authStore.userBalance < this.betAmount) {
        this.error = 'Insufficient balance';
        return;
      }

      // Initialize reel strips if not already done
      if (this.reelStrips[0].length === 0) {
        this.initializeReelStrips();
      }

      // Reset state
      this.isSpinning = true;
      this.loading = true;
      this.error = null;
      this.lastWin = 0;
      this.winningLines = [];
      this.multiplier = 1;

      // Generate final positions
      this.finalReels = this.generateFinalReels();

      try {
        // Start spinning animation
        await this.animateSpin();

        // Send final positions to server for win checking
        const response = await axios.post(
          `${API_URL}/casino/slots/check`,
          { 
            betAmount: this.betAmount,
            reels: this.finalReels
          },
          {
            headers: {
              'Authorization': `Bearer ${authStore.token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          this.currentGameId = response.data.gameId;
          this.reels = this.finalReels;
          this.lastWin = response.data.winAmount;
          this.totalWin += response.data.winAmount;
          this.winningLines = response.data.winningLines;
          this.multiplier = response.data.multiplier;
          authStore.updateBalance(response.data.newBalance);
        }
      } catch (error: any) {
        console.error('[SLOTS] Error spinning:', error);
        this.error = error.response?.data?.message || 'Failed to spin';
      } finally {
        this.isSpinning = false;
        this.loading = false;
      }
    },

    async animateSpin() {
      return new Promise(resolve => {
        const TOTAL_DURATION = 2500; // Total spin duration in ms
        const BASE_DELAY = 200; // Base delay between reels
        const SPIN_FRAMES = 30; // Frames per second for smooth animation
        const INTERVAL = 1000 / SPIN_FRAMES;
        
        let elapsed = 0;
        let spinPosition = 0;
        
        const spinTimer = setInterval(() => {
          // Calculate the progress for each reel (0 to 1)
          this.spinningReels = this.reelStrips.map((strip, reelIndex) => {
            const reelDelay = reelIndex * BASE_DELAY;
            const reelElapsed = Math.max(0, elapsed - reelDelay);
            const reelDuration = TOTAL_DURATION - reelDelay;
            const progress = Math.min(1, reelElapsed / reelDuration);
            
            // Easing function for smooth deceleration
            const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
            
            // Calculate spin speed based on progress
            const speed = easeOut(1 - progress);
            spinPosition += speed * 0.5;
            
            // Get symbols for current position
            const offset = Math.floor(spinPosition + (reelIndex * strip.length / 5));
            return this.getVisibleSymbols(reelIndex, offset % strip.length);
          });

          elapsed += INTERVAL;

          if (elapsed >= TOTAL_DURATION + (BASE_DELAY * 4)) {
            clearInterval(spinTimer);
            this.spinningReels = this.finalReels;
            resolve(true);
          }
        }, INTERVAL);
      });
    },

    setAutoPlay(count: number) {
      this.autoPlay = count > 0;
      this.autoPlayCount = count;
    },

    setBetAmount(amount: number) {
      if (!this.isSpinning) {
        this.betAmount = amount;
      }
    },

    resetGame() {
      this.isSpinning = false;
      this.autoPlay = false;
      this.autoPlayCount = 0;
      this.lastWin = 0;
      this.totalWin = 0;
      this.error = null;
      this.currentGameId = null;
      this.winningLines = [];
      this.multiplier = 1;
    }
  }
}); 