import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();

export const startGame = async (req: Request, res: Response) => {
  try {
    const { totalBet } = req.body;
    // @ts-ignore - add type ignore since we know the middleware adds this
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    console.log('[ROULETTE-CONTROLLER] Starting game:', {
      userId,
      totalBet
    });

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    if (user.balance < totalBet) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance' 
      });
    }

    console.log('[ROULETTE-CONTROLLER] Before balance deduction:', {
      userId,
      currentBalance: user.balance,
      deductAmount: -totalBet,
      expectedBalance: user.balance - totalBet
    });

    // Create game record
    const gameId = `roulette_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'roulette',
      betAmount: totalBet,
      status: 'active',
      createdAt: new Date()
    });

    // Deduct bet amount from balance
    const newBalance = await dbService.users.updateBalance(userId, -totalBet);

    console.log('[ROULETTE-CONTROLLER] After balance deduction:', {
      userId,
      previousBalance: user.balance,
      deductedAmount: totalBet,
      newBalance: newBalance?.balance
    });

    console.log('[ROULETTE-CONTROLLER] Game started:', {
      gameId,
      previousBalance: user.balance,
      newBalance,
      totalBet
    });

    res.json({
      success: true,
      gameId,
      newBalance
    });

  } catch (error) {
    console.error('[ROULETTE-CONTROLLER] Error starting game:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error starting game' 
    });
  }
};

export const processWin = async (req: Request, res: Response) => {
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
    game.winAmount = winAmount;
    game.completedAt = new Date();
    await game.save();

    console.log('[ROULETTE-CONTROLLER] Before processing win:', {
      userId,
      gameId,
      winAmount,
      currentGameStatus: game.status
    });

    // Update user balance with winnings
    const newBalance = await dbService.users.updateBalance(userId, winAmount);

    console.log('[ROULETTE-CONTROLLER] After processing win:', {
      userId,
      previousBalance: game.betAmount,
      winAmount,
      finalBalance: newBalance?.balance
    });

    res.json({
      success: true,
      newBalance: typeof newBalance === 'object' ? newBalance?.balance : newBalance
    });

  } catch (error) {
    console.error('[ROULETTE-CONTROLLER] Error processing win:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing win' 
    });
  }
}; 