import { Match } from '../models/Match';
import { MatchService } from './matchService';
import mongoose from 'mongoose';
import { eventEmitter } from '../utils/eventEmitter';

export class MatchSettlementService {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  async processMatchSettlements(session?: mongoose.ClientSession): Promise<{
    updatedMatches: any[];
    settledMatches: any[];
  }> {
    const pendingMatches = await Match.find({
      status: { $in: ['live', 'upcoming'] },
      commenceTime: { 
        $lt: new Date(),
        $gt: new Date(Date.now() - 48 * 60 * 60 * 1000)
      }
    }).session(session);

    const updatedMatches = await this.matchService.checkAndUpdateMatchResults(pendingMatches);
    let settledMatches: any[] = [];

    if (updatedMatches.length > 0) {
      settledMatches = await this.matchService.settleMatches(session);
    }

    return { updatedMatches, settledMatches };
  }
} 