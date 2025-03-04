import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();
export const startGame = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user || user.balance < betAmount) {
      return res.status(400).json({
        success: false,
        message: user ? 'Insufficient balance' : 'User not found'
      });
    }

    // Deduct bet amount from user balance
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);

    // Create game record
    const gameId = `halloween_slots_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await CasinoGame.create({
      gameId,
      userId,
      gameType: 'halloween_slots',
      betAmount,
      status: 'active',
      createdAt: new Date()
    });

    res.json({ 
      success: true,
      gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[HALLOWEEN-SLOTS] Error starting game:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const spin = async (req: Request, res: Response) => {
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

    // Validate the game exists and is active
    const game = await CasinoGame.findOne({ gameId, userId, status: 'active' });
    if (!game) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive game'
      });
    }

    // Always update game status
    await CasinoGame.updateOne(
      { gameId },
      { 
        $set: { 
          status: 'completed',
          winAmount,
          updatedAt: new Date()
        }
      }
    );

    // Get user's current balance
    let updatedUser = await dbService.users.findById(userId);
    
    // If there's a win, add it to the balance
    if (winAmount > 0) {
      updatedUser = await dbService.users.updateBalance(userId, winAmount);
    }

    res.json({
      success: true,
      newBalance: updatedUser?.balance,
      winAmount
    });

  } catch (error) {
    console.error('[HALLOWEEN-SLOTS] Error processing spin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 