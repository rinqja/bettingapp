import mongoose, { Schema, Document } from 'mongoose';

export interface ICasinoGame extends Document {
  gameId: string;
  userId: string;
  gameType: string;
  betAmount: number;
  status: 'active' | 'completed' | 'canceled';
  result: 'win' | 'loss' | null;
  winAmount: number;
  createdAt: Date;
  completedAt?: Date;
  gameData: any;
}

const CasinoGameSchema: Schema = new Schema({
  gameId: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gameType: { type: String, required: true },
  betAmount: { type: Number, required: true },
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
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  gameData: { type: Schema.Types.Mixed }
});

// Indexes
CasinoGameSchema.index({ userId: 1, createdAt: -1 });
CasinoGameSchema.index({ gameId: 1 }, { unique: true });
CasinoGameSchema.index({ status: 1 });

export default mongoose.model<ICasinoGame>('CasinoGame', CasinoGameSchema); 