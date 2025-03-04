import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();

export const startGame = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore - add type ignore since we know the middleware adds this
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    console.log('[MINES-CONTROLLER] Starting game:', {
      userId,
      betAmount,
      betAmountType: typeof betAmount
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

    // Create a new game record
    const gameId = `mines_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'mines',
      betAmount,
      status: 'active',
      createdAt: new Date()
    });

    // Deduct bet amount from user balance
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);

    console.log('[MINES-CONTROLLER] Game started:', {
      gameId,
      previousBalance: user.balance,
      newBalance: updatedUser?.balance,
      betAmount
    });
    
    res.json({ 
      success: true,
      gameId: game.gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[MINES-CONTROLLER] Error starting game:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error starting game' 
    });
  }
};

export const cashoutGame = async (req: Request, res: Response) => {
  try {
    const { gameId, winAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    const game = await CasinoGame.findOne({ gameId, userId });
    if (!game) {
      return res.status(404).json({ 
        success: false,
        message: 'Game not found' 
      });
    }

    if (game.status !== 'active') {
      return res.status(400).json({ 
        success: false,
        message: 'Game is not active' 
      });
    }

    // Update game status
    game.status = 'completed';
    game.result = 'win';
    game.winAmount = winAmount;
    game.completedAt = new Date();
    await game.save();

    // Update user balance with winnings
    const user = await dbService.users.updateBalance(userId, winAmount);
    
    console.log('[MINES-CONTROLLER] Win processed:', {
      gameId,
      previousBalance: user?.balance - winAmount,
      newBalance: user?.balance,
      winAmount
    });

    res.json({ 
      success: true,
      newBalance: user?.balance
    });

  } catch (error) {
    console.error('[MINES-CONTROLLER] Error processing cashout:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing cashout' 
    });
  }
}; 