import { Types } from 'mongoose';
import CasinoGame from '../models/CasinoGame';
import MinesGame from '../models/MinesGame';
import User from '../models/User';

class CasinoService {
  async createMinesGame(userId: string, betAmount: number, minesCount: number) {
    const session = await MinesGame.startSession();
    session.startTransaction();

    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      if (user.balance < betAmount) throw new Error('Insufficient balance');

      // Create game
      const gameId = `mines_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const grid = Array(25).fill(null).map((_, index) => ({
        position: index,
        isMine: false,
        revealed: false
      }));

      // Place mines randomly
      let minesPlaced = 0;
      while (minesPlaced < minesCount) {
        const position = Math.floor(Math.random() * 25);
        if (!grid[position].isMine) {
          grid[position].isMine = true;
          minesPlaced++;
        }
      }

      const game = await MinesGame.create({
        gameId,
        userId,
        betAmount,
        minesCount,
        grid
      });

      // Deduct bet amount from user balance
      await User.findByIdAndUpdate(userId, {
        $inc: { balance: -betAmount }
      });

      await session.commitTransaction();
      return game;

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Add more methods for game operations
}

export default new CasinoService(); 