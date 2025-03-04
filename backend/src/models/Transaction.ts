import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  type: 'transfer' | 'system_generation' | 'bet_placement' | 'bet_win';
  amount: number;
  from?: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['transfer', 'system_generation', 'bet_placement', 'bet_win']
  },
  amount: {
    type: Number,
    required: true
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: function(this: ITransaction) {
      return this.type === 'transfer';
    }
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema); 