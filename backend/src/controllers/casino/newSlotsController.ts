import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();

export const startGame = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    console.log('[NEW-SLOTS-CONTROLLER] Starting game:', { userId, betAmount });

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    console.log('[NEW-SLOTS-CONTROLLER] User balance before bet:', user?.balance);

    if (!user || user.balance < betAmount) {
      return res.status(400).json({
        success: false,
        message: user ? 'Insufficient balance' : 'User not found'
      });
    }

    // Deduct bet amount from user balance
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);
    console.log('[NEW-SLOTS-CONTROLLER] Balance after bet:', updatedUser?.balance);

    // Create game record
    const gameId = `new_slots_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await CasinoGame.create({
      gameId,
      userId,
      gameType: 'new_slots',
      betAmount,
      status: 'active',
      createdAt: new Date()
    });

    console.log('[NEW-SLOTS-CONTROLLER] Game created:', gameId);

    res.json({ 
      success: true,
      gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[NEW-SLOTS-CONTROLLER] Error starting game:', error);
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

    console.log('[NEW-SLOTS-CONTROLLER] Processing spin:', { gameId, winAmount, userId });

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    // Validate game exists and is active
    const game = await CasinoGame.findOne({ gameId, userId, status: 'active' });
    if (!game) {
      console.log('[NEW-SLOTS-CONTROLLER] Game not found or inactive:', gameId);
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive game'
      });
    }

    // Update game status
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

    let updatedUser = await dbService.users.findById(userId);
    console.log('[NEW-SLOTS-CONTROLLER] Current balance:', updatedUser?.balance);
    
    if (winAmount > 0) {
      updatedUser = await dbService.users.updateBalance(userId, winAmount);
      console.log('[NEW-SLOTS-CONTROLLER] Balance after win:', updatedUser?.balance);
    }

    res.json({
      success: true,
      newBalance: updatedUser?.balance,
      winAmount
    });

  } catch (error) {
    console.error('[NEW-SLOTS-CONTROLLER] Error processing spin:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}; 