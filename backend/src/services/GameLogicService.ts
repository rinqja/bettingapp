import { SYMBOLS, PAYLINE_PATTERNS } from '../constants/slots';

interface Symbol {
  id: number;
  name: string;
  value: number;
  image: string;
}

interface SpinOutcome {
  reels: Symbol[][];
  winningLines: number[];
  totalWin: number;
  multiplier: number;
}

// Define slot symbols with proper typing
const SLOT_SYMBOLS: Symbol[] = [
  { id: 1, name: 'SEVEN', value: 50, image: '/images/slots/seven.png' },
  { id: 2, name: 'BAR', value: 20, image: '/images/slots/bar.png' },
  { id: 3, name: 'BELL', value: 15, image: '/images/slots/bell.png' },
  { id: 4, name: 'CHERRY', value: 10, image: '/images/slots/cherry.png' },
  { id: 5, name: 'LEMON', value: 5, image: '/images/slots/lemon.png' },
  { id: 6, name: 'ORANGE', value: 5, image: '/images/slots/orange.png' },
  { id: 7, name: 'PLUM', value: 5, image: '/images/slots/plum.png' },
  { id: 8, name: 'GRAPE', value: 5, image: '/images/slots/grape.png' }
];


export class GameLogicService {
  private generateReels(): Symbol[][] {
    return Array(5).fill(null).map(() => 
      Array(3).fill(null).map(() => {
        const randomIndex = Math.floor(Math.random() * SLOT_SYMBOLS.length);
        return SLOT_SYMBOLS[randomIndex];
      })
    );
  }

  private evaluateWinningLines(reels: Symbol[][]): number[] {
    const winningLines: number[] = [];
    
    PAYLINE_PATTERNS.forEach((pattern, index) => {
      const symbols = pattern.map((row, col) => reels[col][row]);
      const firstSymbol = symbols[0];
      
      if (!firstSymbol) return;
      
      // Count matching symbols from left to right
      let matchCount = 1;
      for (let i = 1; i < symbols.length; i++) {
        const currentSymbol = symbols[i];
        if (currentSymbol && currentSymbol.id === firstSymbol.id) {
          matchCount++;
        } else {
          break;
        }
      }

      if (matchCount >= 3) {
        winningLines.push(index);
      }
    });

    return winningLines;
  }

  private calculateMultiplier(matchCount: number): number {
    switch (matchCount) {
      case 5: return 10;
      case 4: return 5;
      case 3: return 2;
      default: return 1;
    }
  }

  private calculateWinAmount(reels: Symbol[][], winningLines: number[], betAmount: number): number {
    let totalWin = 0;

    winningLines.forEach(lineIndex => {
      const pattern = PAYLINE_PATTERNS[lineIndex];
      const symbols = pattern.map((row, col) => reels[col][row]);
      const firstSymbol = symbols[0];
      
      if (!firstSymbol) return;
      
      const matchCount = symbols.filter(s => s && s.id === firstSymbol.id).length;
      const multiplier = this.calculateMultiplier(matchCount);
      const lineWin = betAmount * multiplier * firstSymbol.value;
      
      totalWin += lineWin;
    });

    return totalWin;
  }

  generateSpinOutcome(betAmount: number): SpinOutcome {
    const reels = this.generateReels();
    const winningLines = this.evaluateWinningLines(reels);
    const totalWin = this.calculateWinAmount(reels, winningLines, betAmount);
    
    // Calculate highest multiplier achieved
    let maxMultiplier = 1;
    winningLines.forEach(lineIndex => {
      const pattern = PAYLINE_PATTERNS[lineIndex];
      const symbols = pattern.map((row, col) => reels[col][row]);
      const firstSymbol = symbols[0];
      
      if (!firstSymbol) return;
      
      const matchCount = symbols.filter(s => s && s.id === firstSymbol.id).length;
      maxMultiplier = Math.max(maxMultiplier, this.calculateMultiplier(matchCount));
    });

    return {
      reels,
      winningLines,
      totalWin,
      multiplier: maxMultiplier
    };
  }
} 