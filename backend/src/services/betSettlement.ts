import Bet from '../models/Bet';
import User from '../models/User';
import mongoose from 'mongoose';

export class BetSettlementService {
  static async settleBet(
    betId: string, 
    outcome: 'won' | 'lost' | 'cancelled'
  ) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const bet = await Bet.findById(betId);
      if (!bet) {
        throw new Error('Bet not found');
      }

      if (bet.status !== 'pending') {
        throw new Error('Bet has already been settled');
      }

      const user = await User.findById(bet.user);
      if (!user) {
        throw new Error('User not found');
      }

      // Update bet status
      bet.status = outcome;
      bet.settledAt = new Date();

      // Update user balance based on outcome
      if (outcome === 'won') {
        user.balance += bet.potentialWin;
      } else if (outcome === 'cancelled') {
        user.balance += bet.amount; // Refund the bet amount
      }

      // Save changes within transaction
      await Promise.all([
        bet.save({ session }),
        user.save({ session })
      ]);

      await session.commitTransaction();
      return { bet, user };

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
} 