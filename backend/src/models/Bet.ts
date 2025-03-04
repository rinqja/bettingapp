import mongoose, { Document } from 'mongoose';

export interface IBet extends Document {
  user: mongoose.Types.ObjectId;
  betType: 'single' | 'multiple';
  selections: mongoose.Types.ObjectId[];
  amount: number;
  totalOdds: number;
  potentialWin: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled' | 'cashed_out';
  createdAt: Date;
  settledAt?: Date;
  cashoutAmount?: number;
  cashoutTime?: Date;
  cashoutDetails?: {
    timestamp: Date;
    wonSelections: mongoose.Types.ObjectId[];
    remainingSelections: mongoose.Types.ObjectId[];
    partialOdds: number;
  };
  isEligibleForCashout(): Promise<{
    isEligible: boolean;
    wonSelections: any[];
    pendingSelections: any[];
  }>;
  calculateCashoutAmount(wonSelections: any[]): {
    rawAmount: number;
    feeAmount: number;
    finalAmount: number;
    partialOdds: number;
  };
}

const betSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  betType: {
    type: String,
    enum: ['single', 'multiple'],
    required: true
  },
  selections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Selection'
  }],
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  totalOdds: {
    type: Number,
    required: true
  },
  potentialWin: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost', 'cancelled', 'cashed_out'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  settledAt: Date,
  cashoutAmount: Number,
  cashoutTime: Date,
  cashoutDetails: {
    timestamp: Date,
    wonSelections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selection'
    }],
    remainingSelections: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Selection'
    }],
    partialOdds: Number
  }
});

betSchema.methods.isEligibleForCashout = async function() {
  const CASHOUT_CUTOFF_MINUTES = 5;
  
  console.log('Checking cashout eligibility for bet:', this._id);
  
  const populatedBet = await this.populate('selections');
  console.log('Populated selections:', populatedBet.selections);
  
  const selectionsByStatus = populatedBet.selections.reduce((acc: any, selection: any) => {
    if (!acc[selection.status]) {
      acc[selection.status] = [];
    }
    acc[selection.status].push(selection);
    return acc;
  }, {});

  console.log('Selections by status:', selectionsByStatus);
  
  // Log each condition separately
  const conditions = {
    isPending: this.status === 'pending',
    hasWonSelections: selectionsByStatus['won']?.length > 0,
    hasPendingSelections: selectionsByStatus['pending']?.length > 0,
    matchTimeCheck: selectionsByStatus['pending']?.every((selection: any) => {
      const timeUntilMatch = selection.matchTime 
        ? (new Date(selection.matchTime).getTime() - Date.now()) / (1000 * 60)
        : Infinity;
      console.log(`Selection ${selection._id} time until match:`, timeUntilMatch);
      return timeUntilMatch > CASHOUT_CUTOFF_MINUTES;
    })
  };

  console.log('Eligibility conditions:', conditions);

  const isEligible = 
    conditions.isPending &&
    conditions.hasWonSelections &&
    conditions.hasPendingSelections &&
    conditions.matchTimeCheck;

  console.log('Final eligibility:', isEligible);

  return {
    isEligible,
    wonSelections: selectionsByStatus['won'] || [],
    pendingSelections: selectionsByStatus['pending'] || []
  };
};

betSchema.methods.calculateCashoutAmount = function(wonSelections: any[]) {
  const CASHOUT_FEE_PERCENTAGE = 0.05;
  
  const partialOdds = wonSelections.reduce((total, selection) => total * selection.odds, 1);
  
  const rawAmount = this.amount * partialOdds;
  
  const feeAmount = rawAmount * CASHOUT_FEE_PERCENTAGE;
  const finalAmount = rawAmount - feeAmount;
  
  return {
    rawAmount,
    feeAmount,
    finalAmount,
    partialOdds
  };
};

const BetModel = mongoose.model<IBet>('Bet', betSchema);
export default BetModel; 