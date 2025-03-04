import axios from 'axios';
import config from '../config/config';
import { IMatch, Match } from '../models/Match';
import { SUPPORTED_SPORTS } from '../config/constants';

const ODDS_API_HOST = 'https://api.the-odds-api.com/v4';

export interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

export interface Outcome {
  name: string;
  price: number;
}

export interface Market {
  key: string;
  outcomes: Outcome[];
}

export interface Bookmaker {
  key: string;
  title: string;
  last_update: string;
  markets: Market[];
}

export interface Match {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface OddsParams {
  regions?: string;
  markets?: string;
  oddsFormat?: 'decimal' | 'american';
  dateFormat?: 'iso' | 'unix';
}

export class OddsApiService {
  private readonly BASE_URL = 'https://api.the-odds-api.com/v4';
  private readonly API_KEY: string;
  private requestQueue: Promise<any> = Promise.resolve();
  private readonly MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests
  private lastRequestTime: number = 0;

  constructor() {
    this.API_KEY = process.env.ODDS_API_KEY || '';
    if (!this.API_KEY) {
      throw new Error('ODDS_API_KEY is not configured');
    }
  }

  private async throttleRequest<T>(request: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
      await new Promise(resolve => 
        setTimeout(resolve, this.MIN_REQUEST_INTERVAL - timeSinceLastRequest)
      );
    }

    this.requestQueue = this.requestQueue
      .then(async () => {
        try {
          this.lastRequestTime = Date.now();
          return await request();
        } catch (error: any) {
          if (error.response?.status === 429) {
            console.log('Rate limit hit, waiting before retry...');
            await new Promise(resolve => setTimeout(resolve, this.MIN_REQUEST_INTERVAL * 2));
            return await request();
          }
          throw error;
        }
      });

    return this.requestQueue;
  }

  async getSupportedSports(all: boolean = false): Promise<Sport[]> {
    return this.throttleRequest(async () => {
      try {
        const response = await axios.get(`${this.BASE_URL}/sports`, {
          params: {
            apiKey: this.API_KEY,
            all: all
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching sports:', error);
        throw error;
      }
    });
  }

  async getMatches(sportKey: string): Promise<any[]> {
    return this.throttleRequest(async () => {
      try {
        // Check if sport is supported using our constants
        const isSupportedSport = Object.keys(SUPPORTED_SPORTS).some(sport => 
          SUPPORTED_SPORTS[sport as keyof typeof SUPPORTED_SPORTS].includes(sportKey)
        );

        if (!isSupportedSport) {
          console.warn(`Sport ${sportKey} is not in SUPPORTED_SPORTS, falling back to database`);
          const existingMatches = await Match.find({ sportKey });
          return existingMatches;
        }

        const mainResponse = await axios.get(`${this.BASE_URL}/sports/${sportKey}/odds`, {
          params: {
            apiKey: this.API_KEY,
            regions: 'eu',
            markets: 'h2h,spreads,totals',
            oddsFormat: 'decimal'
          }
        });

        if (!mainResponse.data || mainResponse.status !== 200) {
          throw new Error(`API request failed: ${mainResponse.statusText}`);
        }

        // For each match, get additional markets
        const matches = await Promise.all(
          mainResponse.data.map(async (match: any) => {
            try {
              // Only fetch additional markets for soccer leagues
              if (SUPPORTED_SPORTS.soccer.includes(sportKey)) {
                const additionalResponse = await axios.get(
                  `${this.BASE_URL}/sports/${sportKey}/events/${match.id}/odds`,
                  {
                    params: {
                      apiKey: this.API_KEY,
                      regions: 'eu',
                      markets: 'btts,h2h_3_way',
                      oddsFormat: 'decimal'
                    }
                  }
                );

                if (additionalResponse.data && additionalResponse.data.bookmakers) {
                  const mainBookmaker = this.getBestBookmaker(match.bookmakers);
                  const additionalBookmaker = this.getBestBookmaker(additionalResponse.data.bookmakers);
                  
                  return {
                    ...match,
                    bookmakers: [{
                      ...mainBookmaker,
                      markets: [
                        ...(mainBookmaker.markets || []),
                        ...(additionalBookmaker.markets || [])
                      ].filter(market => market)
                    }]
                  };
                }
              }
              return match;
            } catch (error) {
              console.warn(`Failed to fetch additional markets for match ${match.id}:`, error);
              return match;
            }
          })
        );

        return this.transformMatches(matches);
      } catch (error: any) {
        console.error('Error in getMatches:', error);
        if (error.response?.status === 404 || error.response?.data?.error_code === 'UNKNOWN_SPORT') {
          const existingMatches = await Match.find({ sportKey });
          return existingMatches;
        }
        throw error;
      }
    });
  }

  async getUpcomingMatches(sportKey: string): Promise<IMatch[]> {
    const matches = await this.getMatches(sportKey);
    return matches;
  }

  async getLiveMatches(sportKey: string): Promise<IMatch[]> {
    return this.throttleRequest(async () => {
      try {
        const response = await axios.get(`${this.BASE_URL}/sports/${sportKey}/odds`, {
          params: {
            apiKey: this.API_KEY,
            regions: 'eu',
            markets: 'h2h', // Keep it simple for live matches
            oddsFormat: 'decimal'
          }
        });

        if (!response.data || response.status !== 200) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        return this.transformMatches(response.data);
      } catch (error: any) {
        console.error('Error in getLiveMatches:', error);
        if (error.response?.data?.error_code === 'UNKNOWN_SPORT') {
          const existingMatches = await Match.find({ sportKey, status: 'live' });
          return existingMatches;
        }
        throw error;
      }
    });
  }

  async getMatchResult(sportKey: string, matchId: string): Promise<{ home: number; away: number } | null> {
    if (!this.API_KEY) {
      throw new Error('ODDS_API_KEY is not configured');
    }

    try {
      const response = await fetch(
        `${this.BASE_URL}/sports/${sportKey}/scores/${matchId}?apiKey=${this.API_KEY}`
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return this.transformScores(data);
    } catch (error) {
      console.error('Error fetching match result:', error);
      return null;
    }
  }

  private async transformMatches(apiMatches: any[]): Promise<IMatch[]> {
    const transformedMatches = await Promise.all(apiMatches.map(async match => {
      const bestBookmaker = this.getBestBookmaker(match.bookmakers);
      const markets = bestBookmaker.markets || [];

      // Extract all available markets
      const sgmMarkets = {
        matchWinner: this.extractMatchWinnerMarket(markets),
        bothTeamsToScore: this.extractBTTSMarket(markets),
        overUnder: this.extractOverUnderMarkets(markets),
        h2h3Way: this.extractH2H3WayMarket(markets)
      };

      // Basic odds for display
      const odds = this.extractBasicOdds(markets, match);

      const matchData = {
        externalId: match.id,
        sportKey: match.sport_key,
        sportTitle: match.sport_title,
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        commenceTime: new Date(match.commence_time),
        status: this.determineMatchStatus(match.commence_time),
        scores: match.scores ? {
          home: Number(match.scores.home) || 0,
          away: Number(match.scores.away) || 0
        } : undefined,
        odds,
        bookmaker: {
          key: bestBookmaker.key || 'default',
          title: bestBookmaker.title || 'Default',
          lastUpdate: new Date(bestBookmaker.last_update || Date.now())
        },
        tier: this.determineTier(match),
        sgmMarkets,
        lastUpdated: new Date()
      };

      try {
        // Use findOneAndUpdate with upsert instead of create
        const updatedMatch = await Match.findOneAndUpdate(
          { externalId: match.id }, // find by externalId
          { $set: matchData }, // update data
          { 
            new: true, // return the updated document
            upsert: true, // create if doesn't exist
            runValidators: true // run validators on update
          }
        );
        return updatedMatch;
      } catch (error) {
        console.error(`Error updating match ${match.id}:`, error);
        return null;
      }
    }));

    // Filter out any null values from failed updates
    return transformedMatches.filter(match => match !== null) as IMatch[];
  }

  private transformScores(matchData: any): { home: number; away: number } | null {
    if (!matchData.scores) return null;
    return {
      home: Number(matchData.scores.home),
      away: Number(matchData.scores.away)
    };
  }

  private determineMatchStatus(commenceTime: string): 'upcoming' | 'live' | 'ended' {
    const now = new Date();
    const matchTime = new Date(commenceTime);
    
    if (matchTime > now) {
      return 'upcoming';
    } else if (matchTime <= now && now.getTime() - matchTime.getTime() < 3 * 60 * 60 * 1000) { // 3 hours
      return 'live';
    }
    return 'ended';
  }

  private determineTier(match: any): string {
    // Return a valid tier value based on the league/competition
    if (SUPPORTED_SPORTS.soccer.includes(match.sport_key)) {
      // Top 5 leagues and European competitions are tier1
      if ([
        'soccer_epl',
        'soccer_spain_la_liga',
        'soccer_germany_bundesliga',
        'soccer_italy_serie_a',
        'soccer_france_ligue_one',
        'soccer_uefa_champs_league',
        'soccer_uefa_europa_league'
      ].includes(match.sport_key)) {
        return 'tier1';
      }
      // Other soccer competitions are tier2
      return 'tier2';
    }
    
    // Basketball
    if (match.sport_key === 'basketball_nba') {
      return 'tier1';
    }
    if (match.sport_key === 'basketball_euroleague') {
      return 'tier2';
    }

    // Tennis
    if (['tennis_atp_singles', 'tennis_wta_singles'].includes(match.sport_key)) {
      return 'tier2';
    }

    // If no specific tier is determined, default to tier3
    return 'tier3';
  }

  private extractSGMMarkets(markets: any[]): any {
    return {
      matchWinner: this.extractMatchWinnerMarket(markets),
      bothTeamsToScore: this.extractBTTSMarket(markets),
      overUnder: this.extractOverUnderMarkets(markets),
      h2h3Way: this.extractH2H3WayMarket(markets)
    };
  }

  private extractBTTSMarket(markets: any[]): Market | null {
    const bttsMarket = markets.find(m => m.key === 'btts');
    if (!bttsMarket?.outcomes) return null;

    return {
      key: 'btts',
      outcomes: bttsMarket.outcomes.map(o => ({
        name: o.name,
        price: this.normalizeOdds(o.price)
      }))
    };
  }

  private extractH2H3WayMarket(markets: any[]): Market | null {
    const h2h3WayMarket = markets.find(m => m.key === 'h2h_3_way');
    if (!h2h3WayMarket?.outcomes) return null;

    return {
      key: 'h2h_3_way',
      outcomes: h2h3WayMarket.outcomes.map(o => ({
        name: o.name,
        price: this.normalizeOdds(o.price)
      }))
    };
  }

  private extractOverUnderMarkets(markets: any[]): Market[] {
    const overUnderMarkets = markets.filter(m => 
      m.key.startsWith('totals') || 
      m.key.includes('over_under')
    );

    return overUnderMarkets.map(market => ({
      key: market.key,
      outcomes: market.outcomes.map(o => ({
        name: o.name,
        price: this.normalizeOdds(o.price),
        point: o.point || parseFloat(o.name.match(/\d+\.?\d*/)?.[0] || '0')
      }))
    }));
  }

  private extractMatchWinnerMarket(markets: any[]): Market | null {
    const matchWinnerMarket = markets.find(m => m.key === 'h2h');
    if (!matchWinnerMarket?.outcomes) return null;

    return {
      key: 'h2h',
      outcomes: matchWinnerMarket.outcomes.map(o => ({
        name: o.name,
        price: this.normalizeOdds(o.price)
      }))
    };
  }

  private normalizeOdds(odds: number): number {
    // Implementation of normalizeOdds method
    return odds;
  }

  private getBestBookmaker(bookmakers: any[] | undefined): any {
    if (!bookmakers || !Array.isArray(bookmakers) || bookmakers.length === 0) {
      return {
        key: 'default',
        title: 'Default',
        markets: [],
        last_update: new Date().toISOString()
      };
    }

    // Filter out invalid bookmakers and their markets
    const validBookmakers = bookmakers.filter(b => 
      b && typeof b === 'object' && 
      Array.isArray(b.markets) && 
      b.markets.length > 0
    ).map(b => ({
      ...b,
      markets: b.markets.filter(m => m && m.key && Array.isArray(m.outcomes))
    }));

    if (validBookmakers.length === 0) {
      return {
        key: 'default',
        title: 'Default',
        markets: [],
        last_update: new Date().toISOString()
      };
    }

    return validBookmakers.sort((a, b) => {
      const marketDiff = (b.markets?.length || 0) - (a.markets?.length || 0);
      if (marketDiff !== 0) return marketDiff;
      return new Date(b.last_update || 0).getTime() - new Date(a.last_update || 0).getTime();
    })[0];
  }

  private extractBasicOdds(markets: any[], match: any): { homeWin: number; draw: number; awayWin: number } {
    const h2hMarket = markets.find((m: any) => m.key === 'h2h');
    const h2h3WayMarket = markets.find((m: any) => m.key === 'h2h_3_way');
    
    if (h2h3WayMarket?.outcomes) {
      return {
        homeWin: this.findOutcomePrice(h2h3WayMarket.outcomes, match.home_team),
        draw: this.findOutcomePrice(h2h3WayMarket.outcomes, 'Draw'),
        awayWin: this.findOutcomePrice(h2h3WayMarket.outcomes, match.away_team)
      };
    }
    
    if (h2hMarket?.outcomes) {
      return {
        homeWin: this.findOutcomePrice(h2hMarket.outcomes, match.home_team),
        draw: 0,
        awayWin: this.findOutcomePrice(h2hMarket.outcomes, match.away_team)
      };
    }

    // Default odds if no markets are found
    return { 
      homeWin: 0, 
      draw: 0, 
      awayWin: 0 
    };
  }

  private findOutcomePrice(outcomes: any[], name: string): number {
    const outcome = outcomes?.find(o => o.name === name);
    return this.normalizeOdds(outcome?.price || 0);
  }
}