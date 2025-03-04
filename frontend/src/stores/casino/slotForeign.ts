import { defineStore } from 'pinia';

interface SlotForeignState {
  credits: number;
  spend: number;
  win: number;
  isSpinning: boolean;
  canLock: boolean;
  wasLocked: boolean;
  resultData: any[];
}

export const useSlotForeignStore = defineStore('slotForeign', {
  state: (): SlotForeignState => ({
    credits: 6,
    spend: 6,
    win: 0,
    isSpinning: false,
    canLock: true,
    wasLocked: false,
    resultData: []
  }),

  actions: {
    insertCoin() {
      this.credits += 0.5;
      this.spend += 0.5;
    },

    spin() {
      if (this.credits > 0 && !this.isSpinning) {
        this.credits -= 0.5;
        this.isSpinning = true;
        this.resultData = [];
      }
    },

    takeWin() {
      if (this.win > 0) {
        this.credits += this.win;
        this.win = 0;
      }
    },

    addResult(result: any, wasLocked: boolean) {
      if (wasLocked) {
        this.wasLocked = true;
      }

      this.resultData.push(result);
      
      if (this.resultData.length === 3) {
        this.checkWin();
        this.isSpinning = false;
        
        if (this.wasLocked) {
          this.wasLocked = false;
          this.canLock = false;
        } else {
          this.canLock = true;
        }
      }
    },

    checkWin() {
      if (this.resultData.length === 3) {
        const [v1, v2, v3] = this.resultData;
        
        if (v1.name === v2.name && v2.name === v3.name) {
          this.win += v1.value;
          this.wasLocked = true; // prevent lock after an unlocked win
        }
        
        this.resultData = [];
      }
    },

    reset() {
      this.credits = 6;
      this.spend = 6;
      this.win = 0;
      this.isSpinning = false;
      this.canLock = true;
      this.wasLocked = false;
      this.resultData = [];
    }
  }
}); 