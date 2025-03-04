import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';
import { PAYLINE_PATTERNS } from '../../constants/slots';

const dbService = new DatabaseService();

// Define slot symbols and their properties
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

export const check = async (req: Request, res: Response) => {
  try {
    const { betAmount, reels } = req.body;
    // @ts-ignore - user added by auth middleware
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user || user.balance < betAmount) {
      return res.status(400).json({
        success: false,
        message: user ? 'Insufficient balance' : 'User not found'
      });
    }

    // Validate reels structure
    if (!validateReels(reels)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reel configuration'
      });
    }

    // Calculate wins from the provided reels
    const { winAmount, winningLines, multiplier } = calculateWin(reels, betAmount);
    
    // Create game record
    const gameId = `slots_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'slots',
      betAmount,
      winAmount,
      status: 'completed',
      result: winAmount > 0 ? 'win' : 'loss',
      gameData: {
        reels,
        winningLines,
        multiplier
      },
      createdAt: new Date(),
      completedAt: new Date()
    });

    // Update user balance
    await dbService.users.updateBalance(userId, -betAmount);
    if (winAmount > 0) {
      await dbService.users.updateBalance(userId, winAmount);
    }

    // Return results to client
    res.json({
      success: true,
      gameId: game.gameId,
      winningLines,
      winAmount,
      multiplier,
      newBalance: user.balance - betAmount + winAmount
    });

  } catch (error) {
    console.error('[SLOTS-CONTROLLER] Error checking spin:', error);
    res.status(500).json({ success: false, message: 'Error checking spin' });
  }
};

function validateReels(reels: any[][]): boolean {
  // Check if reels array is valid
  if (!Array.isArray(reels) || reels.length !== 5) return false;
  
  // Check each reel
  return reels.every(reel => {
    if (!Array.isArray(reel) || reel.length !== 3) return false;
    
    // Check each symbol in the reel
    return reel.every(symbol => {
      return SLOT_SYMBOLS.some(validSymbol => 
        validSymbol.id === symbol.id && 
        validSymbol.name === symbol.name
      );
    });
  });
}

function calculateWin(reels: any[][], betAmount: number) {
  let totalWin = 0;
  let winningLines: number[] = [];
  let maxMultiplier = 1;

  // Check each payline
  PAYLINE_PATTERNS.forEach((payline, index) => {
    const symbols = payline.map((row, col) => reels[col][row]);
    const firstSymbol = symbols[0];
    
    // Count matching symbols from left to right
    let matchCount = 1;
    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i].id === firstSymbol.id) {
        matchCount++;
      } else {
        break;
      }
    }

    // Calculate win for this line
    if (matchCount >= 3) {
      const lineMultiplier = calculateLineMultiplier(matchCount);
      const lineWin = betAmount * lineMultiplier * firstSymbol.value;
      
      if (lineWin > 0) {
        totalWin += lineWin;
        winningLines.push(index);
        maxMultiplier = Math.max(maxMultiplier, lineMultiplier);
      }
    }
  });

  return {
    winAmount: totalWin,
    winningLines,
    multiplier: maxMultiplier
  };
}

function calculateLineMultiplier(matchCount: number): number {
  switch (matchCount) {
    case 3: return 2;
    case 4: return 5;
    case 5: return 10;
    default: return 1;
  }
} 