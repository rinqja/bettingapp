import User from '../models/User';
import CasinoGame from '../models/CasinoGame';
import MinesGame from '../models/MinesGame';

class DatabaseService {
  users = {
    findById: async (userId: string) => {
      const user = await User.findById(userId);
      console.log('[DB-SERVICE] Found user:', {
        userId,
        currentBalance: user?.balance
      });
      return user;
    },
    updateBalance: async (userId: string, amount: number) => {
      const user = await User.findById(userId);
      console.log('[DB-SERVICE] Balance update request:', {
        userId,
        currentBalance: user?.balance,
        updateAmount: amount,
        expectedNewBalance: user ? user.balance + Number(amount) : null
      });

      // Ensure amount is a number
      const numericAmount = Number(amount);
      
      if (isNaN(numericAmount)) {
        console.error('[DB-SERVICE] Invalid amount for balance update:', amount);
        throw new Error('Invalid amount type for balance update');
      }

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $inc: { balance: numericAmount } },
        { new: true }
      );

      console.log('[DB-SERVICE] Balance updated:', {
        userId,
        previousBalance: user?.balance,
        updateAmount: numericAmount,
        newBalance: updatedUser?.balance
      });

      return updatedUser;
    }
  };

  gameHistory = {
    create: async (data: {
      userId: string;
      gameId: string;
      gameType: string;
      result: 'win' | 'loss';
      amount: number;
      timestamp: Date;
    }) => {
      return await CasinoGame.create({
        userId: data.userId,
        gameId: data.gameId,
        gameType: data.gameType,
        betAmount: data.amount,
        status: 'completed',
        result: data.result,
        winAmount: data.result === 'win' ? data.amount : 0,
        createdAt: data.timestamp,
        completedAt: data.timestamp
      });
    }
  };

  minesGame = {
    create: async (data: {
      gameId: string;
      userId: string;
      betAmount: number;
      minesCount: number;
      grid: Array<{
        position: number;
        isMine: boolean;
        revealed: boolean;
      }>;
    }) => {
      return await MinesGame.create(data);
    }
  };
}

export { DatabaseService }; 