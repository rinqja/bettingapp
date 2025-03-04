import mongoose, { Document } from 'mongoose';

export interface ISelection extends Document {
  sport: string;
  event: string;
  market: string;
  selection: string;
  type?: string;
  odds: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  result?: string;
  settledAt?: Date;
  matchTime?: Date;
  commenceTime?: Date;
}

const selectionSchema = new mongoose.Schema({
  sportKey: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  market: {
    type: String,
    required: true
  },
  selection: {
    type: String,
    required: true
  },
  type: String,
  odds: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'won', 'lost', 'cancelled'],
    default: 'pending'
  },
  result: String,
  settledAt: Date,
  matchTime: Date,
  commenceTime: Date
});

// Add pre-save middleware to ensure selection is set
selectionSchema.pre('save', function(next) {
  if (!this.selection && this.type) {
    this.selection = this.type;
  }
  next();
});

export default mongoose.model<ISelection>('Selection', selectionSchema); 