import { Match, IMatch } from '../models/Match';
import { OddsApiService } from './oddsApiService';
import { eventEmitter } from '../utils/eventEmitter';
import mongoose, { Document } from 'mongoose';

type MatchDocument = Document<unknown, {}, IMatch> & IMatch & Required<{ _id: unknown }> & { __v: number };

export class UnifiedMatchService {
  private oddsApiService: OddsApiService;
  private cache: Map<string, {data: MatchDocument[], timestamp: number}> = new Map();
  private requestQueue: Map<string, Promise<void>> = new Map();
  private rateLimitDelay = 1000; // 1 second between requests

  constructor() {
    this.oddsApiService = new OddsApiService();
  }

  private async updateMatchesInDb(matches: IMatch[], sportKey: string): Promise<MatchDocument[]> {
    const savedMatches: MatchDocument[] = [];
    const session = await mongoose.startSession();

    try {
      await session.withTransaction(async () => {
        for (const match of matches) {
          if (!this.validateMatch(match)) {
            console.error(`Skipping invalid match:`, match);
            continue;
          }

          try {
            const savedMatch = await Match.findOneAndUpdate(
              { externalId: match.externalId },
              match,
              { 
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
                session
              }
            );
            
            if (savedMatch) {
              savedMatches.push(savedMatch);
            }
          } catch (error: any) {
            if (error.code === 112) { // WriteConflict error
              await new Promise(resolve => setTimeout(resolve, 100));
              // Retry the operation
              const retryMatch = await Match.findOneAndUpdate(
                { externalId: match.externalId },
                match,
                { 
                  upsert: true,
                  new: true,
                  setDefaultsOnInsert: true,
                  session
                }
              );
              if (retryMatch) {
                savedMatches.push(retryMatch);
              }
            } else {
              console.error(`Error saving match to DB:`, error);
            }
          }
        }
      });
    } finally {
      await session.endSession();
    }

    return savedMatches;
  }

  private validateMatch(match: any): boolean {
    const requiredFields = [
      'externalId',
      'sportKey',
      'sportTitle',
      'homeTeam',
      'awayTeam',
      'commenceTime'
    ];

    const missingFields = requiredFields.filter(field => !match[field]);
    
    if (missingFields.length > 0) {
      console.error(`Match validation failed. Missing fields: ${missingFields.join(', ')}`, match);
      return false;
    }

    return true;
  }

  private async debouncedRequest(sportKey: string): Promise<IMatch[]> {
    const existingRequest = this.requestQueue.get(sportKey);
    if (existingRequest) {
      await existingRequest;
    }

    const requestPromise = new Promise<void>(async (resolve) => {
      try {
        await new Promise(r => setTimeout(r, this.rateLimitDelay));
        const matches = await this.oddsApiService.getMatches(sportKey);
        const savedMatches = await this.updateMatchesInDb(matches, sportKey);
        this.cache.set(sportKey, {
          data: savedMatches,
          timestamp: Date.now()
        });
      } finally {
        resolve();
      }
    });

    this.requestQueue.set(sportKey, requestPromise);
    await requestPromise;
    return (this.cache.get(sportKey)?.data || []);
  }

  async getMatchesBySport(sportKey: string): Promise<MatchDocument[]> {
    const cached = this.cache.get(sportKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < 5 * 60 * 1000) { // 5 minutes cache
      return cached.data;
    }

    let matches = await Match.find({ 
      sportKey,
      commenceTime: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (matches.length > 0) {
      this.cache.set(sportKey, { data: matches, timestamp: now });
      return matches;
    }

    try {
      const apiMatches = await this.debouncedRequest(sportKey);
      matches = await this.updateMatchesInDb(apiMatches, sportKey);
      this.cache.set(sportKey, { data: matches, timestamp: now });
      return matches;
    } catch (error) {
      console.error('Error fetching matches:', error);
      return matches; // Return whatever we have from DB
    }
  }

  async getLiveMatches(): Promise<MatchDocument[]> {
    return Match.find({ status: 'live' }).sort({ lastUpdated: -1 });
  }

  async getUpcomingMatches(): Promise<MatchDocument[]> {
    const now = new Date();
    return Match.find({
      status: 'upcoming',
      commenceTime: { $gt: now }
    }).sort({ commenceTime: 1 });
  }

  private async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }
    throw new Error('Operation failed after all retries');
  }

  async updateMatches(sportKey: string, session?: mongoose.ClientSession) {
    const matches = await this.oddsApiService.getMatches(sportKey);
    const updatedMatches: MatchDocument[] = [];
    const settledMatches: MatchDocument[] = [];

    for (const match of matches) {
      if (this.validateMatch(match)) {
        const updatedMatch = await Match.findOneAndUpdate(
          { externalId: match.externalId },
          match,
          { 
            upsert: true, 
            new: true, 
            session,
            setDefaultsOnInsert: true 
          }
        );
        if (updatedMatch) {
          updatedMatches.push(updatedMatch);
          if (updatedMatch.status === 'ended') {
            settledMatches.push(updatedMatch);
          }
        }
      }
    }

    return { updatedMatches, settledMatches };
  }
} 