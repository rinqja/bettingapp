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

    // Add logging to debug the betAmount
    console.log('[KENO-CONTROLLER] Starting game:', {
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
    const gameId = `keno_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'keno',
      betAmount,
      status: 'active',
      createdAt: new Date(),
      gameData: {
        initialBet: betAmount,
      }
    });

    // Log before balance update
    console.log('[KENO-CONTROLLER] Before balance update:', {
      currentBalance: user.balance,
      betAmount,
      newBalance: user.balance - betAmount
    });

    // Deduct bet amount from user balance
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);

    // Log after balance update
    console.log('[KENO-CONTROLLER] After balance update:', {
      previousBalance: user.balance,
      betAmount,
      newBalance: updatedUser?.balance
    });
    
    res.json({ 
      success: true,
      gameId: game.gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[KENO-CONTROLLER] Error starting game:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error starting game' 
    });
  }
};

export const cashoutGame = async (req: Request, res: Response) => {
  try {
    const { gameId, winAmount } = req.body;
    // @ts-ignore - add type ignore since we know the middleware adds this
    const userId = req.user?.userId;  // Changed from req.user?.id to req.user?.userId

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate the game exists and belongs to the user
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
    game.result = winAmount > game.betAmount ? 'win' : 'loss';
    game.winAmount = winAmount;
    game.completedAt = new Date();
    await game.save();

    // Update user balance with winnings
    const user = await dbService.users.updateBalance(userId, winAmount);
    
    res.json({ 
      success: true,
      newBalance: user?.balance,
      gameResult: {
        gameId: game.gameId,
        betAmount: game.betAmount,
        winAmount,
        profit: winAmount - game.betAmount,
        result: game.result
      }
    });

  } catch (error) {
    console.error('Error processing keno cashout:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing cashout' 
    });
  }
};

export const getGameHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const games = await CasinoGame.find({ 
      userId, 
      gameType: 'keno' 
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

    const total = await CasinoGame.countDocuments({ 
      userId, 
      gameType: 'keno' 
    });

    res.json({
      success: true,
      games,
      pagination: {
        current: page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching keno history:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching game history' 
    });
  }
}; 