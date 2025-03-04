import mongoose, { Schema, Document } from 'mongoose';

export interface IMinesGame extends Document {
  gameId: string;
  userId: string;
  betAmount: number;
  minesCount: number;
  grid: Array<{
    position: number;
    isMine: boolean;
    revealed: boolean;
  }>;
  status: 'active' | 'completed' | 'canceled';
  result: 'win' | 'loss' | null;
  winAmount: number;
  currentMultiplier: number;
  revealedCount: number;
  createdAt: Date;
  completedAt?: Date;
}

const MinesGameSchema: Schema = new Schema({
  gameId: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  betAmount: { type: Number, required: true },
  minesCount: { type: Number, required: true },
  grid: [{
    position: Number,
    isMine: Boolean,
    revealed: Boolean
  }],
  status: { 
    type: String, 
    enum: ['active', 'completed', 'canceled'],
    default: 'active' 
  },
  result: { 
    type: String, 
    enum: ['win', 'loss', null],
    default: null 
  },
  winAmount: { type: Number, default: 0 },
  currentMultiplier: { type: Number, default: 1 },
  revealedCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date }
});

// Define indexes once
MinesGameSchema.index({ userId: 1, createdAt: -1 });
MinesGameSchema.index({ gameId: 1 }, { unique: true });
MinesGameSchema.index({ status: 1 });

export default mongoose.model<IMinesGame>('MinesGame', MinesGameSchema); 