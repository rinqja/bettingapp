import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();

const SLOT_SYMBOLS = [
  { id: 1, name: 'Lemon', value: 2, probability: 30, image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Lemon-512.png' },
  { id: 2, name: 'Melon', value: 4, probability: 25, image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Watermelon-512.png' },
  { id: 3, name: 'Grapes', value: 10, probability: 20, image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png' },
  { id: 4, name: 'Cherry', value: 16, probability: 15, image: 'https://cdn4.iconfinder.com/data/icons/slot-machines/512/Cherry-512.png' },
  { id: 5, name: 'Bar', value: 32, probability: 10, image: 'https://cdn4.iconfinder.com/data/icons/casino-games/512/bar-512.png' }
];

const calculateWin = (result: any[]): number => {
  // Check if all symbols are the same
  if (result[0].name === result[1].name && result[1].name === result[2].name) {
    return result[0].value;
  }
  return 0;
};

export const spin = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore - user added by auth middleware
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    console.log('[SLOTPEN-CONTROLLER] Processing spin:', {
      userId,
      betAmount
    });

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (user.balance < betAmount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Generate result using weighted probabilities
    const result = SLOT_SYMBOLS.map(symbol => ({
      ...symbol,
      random: Math.random() * symbol.probability
    }))
    .sort((a, b) => b.random - a.random)
    .slice(0, 3)
    .map(({ id, name, value, image }) => ({ id, name, value, image }));

    const winAmount = calculateWin(result);

    // Create game record
    const gameId = `slotpen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'slotpen',
      betAmount,
      winAmount,
      status: 'completed',
      result: winAmount > 0 ? 'win' : 'loss',
      createdAt: new Date(),
      completedAt: new Date()
    });

    // Update user balance
    const balanceChange = winAmount - betAmount;
    const updatedUser = await dbService.users.updateBalance(userId, balanceChange);

    console.log('[SLOTPEN-CONTROLLER] Spin completed:', {
      gameId,
      previousBalance: user.balance,
      newBalance: updatedUser?.balance,
      betAmount,
      winAmount
    });

    res.json({
      success: true,
      gameId: game.gameId,
      result,
      winAmount,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[SLOTPEN-CONTROLLER] Error processing spin:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing spin'
    });
  }
};

export const collectWinnings = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user added by auth middleware
    const userId = req.user?.userId;
    const { gameId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Find the game session
    const game = await CasinoGame.findOne({
      gameId,
      userId,
      status: 'completed'
    });

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game session not found'
      });
    }

    // Get updated user balance
    const user = await dbService.users.findById(userId);

    return res.json({
      success: true,
      balance: user?.balance
    });

  } catch (error) {
    console.error('[SLOTPEN-CONTROLLER] Error collecting winnings:', error);
    res.status(500).json({
      success: false,
      message: 'Error collecting winnings'
    });
  }
}; 