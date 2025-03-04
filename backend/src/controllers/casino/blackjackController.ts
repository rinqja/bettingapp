import { Request, Response } from 'express';
import { DatabaseService } from '../../services/DatabaseService';
import CasinoGame from '../../models/CasinoGame';

const dbService = new DatabaseService();

// Update the type definition for game result
type GameResult = 'win' | 'loss' | 'push';

export const startGame = async (req: Request, res: Response) => {
  try {
    const { betAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    console.log('[BLACKJACK-CONTROLLER] Starting game request:', {
      userId,
      betAmount,
      timestamp: new Date().toISOString()
    });

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate user and bet amount
    const user = await dbService.users.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    // Only validate balance
    if (user.balance < betAmount) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance' 
      });
    }

    // Create game record without deducting balance
    const gameId = `blackjack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const game = await CasinoGame.create({
      gameId,
      userId,
      gameType: 'blackjack',
      betAmount,
      status: 'active',
      createdAt: new Date(),
      gameData: {
        initialBet: betAmount,
        currentBets: [betAmount],
        actions: ['start']
      }
    });

    console.log('[BLACKJACK-CONTROLLER] Game created:', {
      gameId,
      userId,
      betAmount,
      timestamp: new Date().toISOString()
    });

    res.json({ 
      success: true,
      gameId: game.gameId
    });

  } catch (error) {
    console.error('[BLACKJACK-CONTROLLER] Error starting game:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error starting game' 
    });
  }
};

export const doubleDown = async (req: Request, res: Response) => {
  try {
    const { gameId, additionalBet } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate game exists and belongs to user
    const game = await CasinoGame.findOne({ gameId, userId });
    if (!game) {
      return res.status(404).json({ 
        success: false,
        message: 'Game not found' 
      });
    }

    // Validate user has enough balance
    const user = await dbService.users.findById(userId);
    if (!user || user.balance < additionalBet) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance' 
      });
    }

    // Update game data
    game.betAmount += additionalBet;
    game.gameData.currentBets.push(additionalBet);
    game.gameData.actions.push('double');
    await game.save();

    // Update user balance
    const updatedUser = await dbService.users.updateBalance(userId, -additionalBet);

    res.json({ 
      success: true,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[BLACKJACK-CONTROLLER] Error doubling down:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing double down' 
    });
  }
};

export const split = async (req: Request, res: Response) => {
  try {
    const { gameId, splitBet } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: 'User not authenticated' 
      });
    }

    // Validate game and user balance
    const [game, user] = await Promise.all([
      CasinoGame.findOne({ gameId, userId }),
      dbService.users.findById(userId)
    ]);

    if (!game) {
      return res.status(404).json({ 
        success: false,
        message: 'Game not found' 
      });
    }

    if (!user || user.balance < splitBet) {
      return res.status(400).json({ 
        success: false,
        message: 'Insufficient balance' 
      });
    }

    // Update game data
    game.betAmount += splitBet;
    game.gameData.currentBets.push(splitBet);
    game.gameData.actions.push('split');
    await game.save();

    // Update user balance
    const updatedUser = await dbService.users.updateBalance(userId, -splitBet);

    res.json({ 
      success: true,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[BLACKJACK-CONTROLLER] Error processing split:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing split' 
    });
  }
};

export const processWin = async (req: Request, res: Response) => {
  try {
    const { gameId, winAmount } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    console.log('[BLACKJACK-CONTROLLER][processWin] Processing win:', {
      userId,
      gameId,
      winAmount,
      timestamp: new Date().toISOString()
    });

    // Get current user state
    const user = await dbService.users.findById(userId);
    
    console.log('[BLACKJACK-CONTROLLER][processWin] Current user state:', {
      userId,
      currentBalance: user?.balance,
      timestamp: new Date().toISOString()
    });

    // winAmount already includes the bet for wins/pushes, or is 0 for losses
    const updatedUser = await dbService.users.updateBalance(userId, winAmount);

    console.log('[BLACKJACK-CONTROLLER][processWin] After balance update:', {
      userId,
      oldBalance: user?.balance,
      newBalance: updatedUser?.balance,
      winAmount,
      timestamp: new Date().toISOString()
    });

    // Update game record
    const game = await CasinoGame.findOne({ gameId, userId });
    if (game) {
      game.status = 'completed';
      const result: GameResult = winAmount > game.betAmount ? 'win' : winAmount === game.betAmount ? 'push' : 'loss';
      game.winAmount = winAmount;
      game.completedAt = new Date();
      await game.save();

      console.log('[BLACKJACK-CONTROLLER][processWin] Game record updated:', {
        gameId,
        status: game.status,
        result: game.result,
        winAmount,
        timestamp: new Date().toISOString()
      });
    }

    res.json({ 
      success: true,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[BLACKJACK-CONTROLLER][processWin] Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing game result' 
    });
  }
};

export const deductBet = async (req: Request, res: Response) => {
  try {
    const { betAmount, action, gameId } = req.body;
    // @ts-ignore
    const userId = req.user?.userId;

    console.log('[BLACKJACK-CONTROLLER][deductBet] Request:', {
      userId,
      betAmount,
      action,
      gameId,
      timestamp: new Date().toISOString()
    });

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

    // Deduct bet amount
    const updatedUser = await dbService.users.updateBalance(userId, -betAmount);

    // If this is the initial bet, create a new game record
    let gameRecord = gameId ? 
      await CasinoGame.findOne({ gameId, userId }) :
      await CasinoGame.create({
        gameId: `blackjack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId,
        gameType: 'blackjack',
        betAmount,
        status: 'active',
        createdAt: new Date(),
        gameData: {
          initialBet: betAmount,
          currentBets: [betAmount],
          actions: [action]
        }
      });

    // If this is a double or split, update the game record
    if (gameRecord && (action === 'double' || action === 'split')) {
      gameRecord.gameData.currentBets.push(betAmount);
      gameRecord.gameData.actions.push(action);
      await gameRecord.save();
    }

    console.log('[BLACKJACK-CONTROLLER][deductBet] Bet deducted:', {
      userId,
      oldBalance: user.balance,
      newBalance: updatedUser?.balance,
      deduction: betAmount,
      timestamp: new Date().toISOString()
    });

    res.json({ 
      success: true,
      gameId: gameRecord.gameId,
      newBalance: updatedUser?.balance
    });

  } catch (error) {
    console.error('[BLACKJACK-CONTROLLER][deductBet] Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error processing bet' 
    });
  }
}; 