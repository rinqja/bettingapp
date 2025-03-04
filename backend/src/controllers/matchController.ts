import { Request, Response } from 'express';
import {Match} from '../models/Match';
import { OddsApiService } from '../services/oddsApiService';
import { UnifiedMatchService } from '../services/unifiedMatchService';
import { MatchService } from '../services/matchService';
import { SUPPORTED_SPORTS } from '../config/constants';

const matchService = new MatchService();
const oddsApiService = new OddsApiService();
const unifiedMatchService = new UnifiedMatchService();
interface OddsType {
  homeWin: number;
  draw?: number;
  awayWin: number;
  totals?: Array<{
    name: string;
    price: number;
    point: number;
  }>;
  spreads?: Array<{
    name: string;
    price: number;
    point: number;
  }>;
}
// Get all supported sports
export const getSports = async (req: Request, res: Response) => {
  try {
    const { all = false } = req.query;
    const sports = await oddsApiService.getSupportedSports(all === 'true');
    res.json(sports);
  } catch (error) {
    console.error('Error fetching sports:', error);
    res.status(500).json({ message: 'Error fetching sports' });
  }
};

// Get matches with filters
export const getMatches = async (req: Request, res: Response) => {
  try {
    const { sportKey } = req.params;

    // Check if the sportKey is in our supported leagues
    const isSupportedLeague = Object.values(SUPPORTED_SPORTS).some(leagues => 
      leagues.includes(sportKey)
    );

    if (!isSupportedLeague) {
      return res.status(400).json({
        success: false,
        message: `Sport ${sportKey} is not supported. Only leagues defined in SUPPORTED_SPORTS are available.`
      });
    }

    const matches = await unifiedMatchService.getMatchesBySport(sportKey);
    res.json({ 
      success: true, 
      matches  // This ensures we return an array in the matches property
    });
  } catch (error) {
    console.error('Error in getMatches:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch matches' 
    });
  }
};

// Get specific match by ID
export const getMatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const match = await Match.findById(id);
    
    if (!match) {
      return res.status(404).json({ 
        success: false, 
        message: 'Match not found' 
      });
    }

    // Transform match data to include markets
    const transformedMatch = {
      ...match.toObject(),
      markets: {
        'Match Winner': [
          { name: 'Home', price: match.odds.homeWin },
          { name: 'Draw', price: match.odds.draw },
          { name: 'Away', price: match.odds.awayWin }
        ],
        'Over/Under': match.odds.totals?.map(total => ({
          name: total.name,
          price: total.price,
          point: total.point
        })) || [],
        'Handicap': match.odds.spreads?.map(spread => ({
          name: spread.name,
          price: spread.price,
          point: spread.point
        })) || []
      }
    };

    res.json({
      success: true,
      match: transformedMatch
    });
  } catch (error) {
    console.error('Error in getMatchById:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching match details' 
    });
  }
};

// Manual refresh of odds
export const refreshOdds = async (req: Request, res: Response) => {
  try {
    const { sport = 'soccer_epl' } = req.query;
    
    const matches = await matchService.getMatches(sport as string);
    const transformedMatches = matches.map(match => transformMatchData(match));

    // Bulk update matches
    await Promise.all(transformedMatches.map(matchData => 
      Match.findOneAndUpdate(
        { externalId: matchData.externalId },
        matchData,
        { upsert: true, new: true }
      )
    ));

    res.json({ 
      message: 'Odds refreshed successfully',
      matchesUpdated: transformedMatches.length 
    });
  } catch (error) {
    console.error('Error refreshing odds:', error);
    res.status(500).json({ message: 'Error refreshing odds' });
  }
};

// Add new controller methods
export const checkMatchResults = async (req: Request, res: Response) => {
  try {
    const pendingMatches = await Match.find({
      status: { $in: ['live', 'upcoming'] },
      commenceTime: { $lt: new Date() }
    });

    const { updatedMatches, settledMatches } = await unifiedMatchService.updateMatches(
      pendingMatches[0]?.sportKey || 'default'
    );

    res.json({
      success: true,
      updatedMatches,
      settledMatches,
      message: `Updated ${updatedMatches.length} matches, settled ${settledMatches.length} matches`
    });
  } catch (error) {
    console.error('Error checking match results:', error);
    res.status(500).json({ message: 'Error checking match results' });
  }
};

export const settleMatches = async (req: Request, res: Response) => {
  try {
    const settledMatches = await matchService.settleMatches();
    res.json({
      success: true,
      settledMatches,
      message: `Settled ${settledMatches.length} matches`
    });
  } catch (error) {
    console.error('Error settling matches:', error);
    res.status(500).json({ message: 'Error settling matches' });
  }
};

// Helper function to safely parse date
const parseSafeDate = (dateString: string): Date => {
  const parsed = new Date(dateString);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

// Helper function to transform API match data to our schema
const transformMatchData = (match: any) => {
  if (!match) {
    console.warn('Received empty match data');
    return null;
  }

  try {
    const bestBookmaker = getBestBookmaker(match.bookmakers);
    const markets = bestBookmaker?.markets || [];
    
    // Get h2h market for main odds
    const h2hMarket = markets.find(m => m.key === 'h2h');
    const homeTeamOdds = getOutcomePrice(h2hMarket?.outcomes || [], match.home_team);
    const awayTeamOdds = getOutcomePrice(h2hMarket?.outcomes || [], match.away_team);
    const drawOdds = getOutcomePrice(h2hMarket?.outcomes || [], 'Draw');

    console.log('Transforming odds:', {
      match: `${match.home_team} vs ${match.away_team}`,
      homeTeamOdds,
      drawOdds,
      awayTeamOdds
    });

    return {
      externalId: match.id,
      sportKey: match.sport_key,
      sportTitle: match.sport_title,
      homeTeam: match.home_team,
      awayTeam: match.away_team,
      commenceTime: new Date(match.commence_time),
      odds: {
        homeWin: normalizeOdds(homeTeamOdds),
        draw: normalizeOdds(drawOdds),
        awayWin: normalizeOdds(awayTeamOdds)
      },
      bookmaker: bestBookmaker ? {
        key: bestBookmaker.key,
        title: bestBookmaker.title,
        lastUpdate: new Date(bestBookmaker.last_update)
      } : null,
      status: determineMatchStatus(match.commence_time),
      result: match.scores ? determineMatchResult(match.scores, match.home_team) : null,
      lastUpdated: new Date()
    };
  } catch (error) {
    console.error('Error transforming match data:', error, 'Match:', match);
    return null;
  }
};

// Helper function to get the best bookmaker (most markets or most recent update)
const getBestBookmaker = (bookmakers: any[] | undefined) => {
  // Add null check and empty array handling
  if (!bookmakers || !Array.isArray(bookmakers) || bookmakers.length === 0) {
    console.warn('No valid bookmakers data received');
    return {
      key: 'default',
      title: 'Default',
      markets: [],
      last_update: new Date().toISOString()
    };
  }

  // Filter out invalid bookmakers first
  const validBookmakers = bookmakers.filter(b => 
    b && typeof b === 'object' && Array.isArray(b.markets)
  );

  if (validBookmakers.length === 0) {
    console.warn('No valid bookmakers after filtering');
    return {
      key: 'default',
      title: 'Default',
      markets: [],
      last_update: new Date().toISOString()
    };
  }

  return validBookmakers.sort((a, b) => {
    // First, compare by number of markets
    const marketDiff = (b.markets?.length || 0) - (a.markets?.length || 0);
    if (marketDiff !== 0) return marketDiff;
    
    // If equal markets, compare by last update time
    return new Date(b.last_update || 0).getTime() - new Date(a.last_update || 0).getTime();
  })[0];
};

// Helper function to get outcome price with proper type checking
const getOutcomePrice = (outcomes: any[], name: string): number | null => {
  const outcome = outcomes.find(o => o?.name === name);
  return outcome?.price || null;
};

// Helper function to normalize odds to a reasonable format
const normalizeOdds = (odds: number | null): number => {
  if (!odds) return 0;
  
  // Convert American odds to decimal if needed
  if (odds > 100 || odds < -100) {
    return odds > 0 
      ? Number(((odds / 100) + 1).toFixed(2))
      : Number((100 / Math.abs(odds) + 1).toFixed(2));
  }
  
  // Round decimal odds to 2 decimal places
  return Number(odds.toFixed(2));
};

// Helper function to determine if odds are stale (older than 5 minutes)
const isOddsStale = (match: any) => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return new Date(match.lastUpdated) < fiveMinutesAgo;
};

// Helper function to get spread market data with null checks
const getSpreadMarket = (markets: any[]) => {
  if (!markets || !Array.isArray(markets)) return null;
  
  const spreadMarket = markets.find(m => m?.key === 'spreads');
  if (!spreadMarket || !spreadMarket.outcomes) return null;
  
  return spreadMarket.outcomes.map((o: any) => ({
    name: o.name || '',
    price: o.price || 0,
    point: o.point || 0
  }));
};

// Helper function to get totals market data with null checks
const getTotalsMarket = (markets: any[]) => {
  if (!markets || !Array.isArray(markets)) return null;
  
  const totalsMarket = markets.find(m => m?.key === 'totals');
  if (!totalsMarket || !totalsMarket.outcomes) return null;
  
  return totalsMarket.outcomes.map((o: any) => ({
    name: o.name || '',
    price: o.price || 0,
    point: o.point || 0
  }));
};

// Helper function to determine match status
const determineMatchStatus = (commenceTime: string): 'upcoming' | 'live' | 'ended' => {
  const now = new Date();
  const matchTime = new Date(commenceTime);
  
  if (matchTime > now) return 'upcoming';
  if (matchTime <= now && now <= new Date(matchTime.getTime() + 3 * 60 * 60 * 1000)) {
    return 'live';
  }
  return 'ended';
};

// Add helper function to determine match result
const determineMatchResult = (scores: any, homeTeam: string): '1' | 'X' | '2' | null => {
  if (!scores || !scores.home || !scores.away) return null;

  const homeScore = parseInt(scores.home);
  const awayScore = parseInt(scores.away);

  if (isNaN(homeScore) || isNaN(awayScore)) return null;

  if (homeScore > awayScore) return '1';
  if (homeScore < awayScore) return '2';
  return 'X';
};

// New endpoints with 'v2' prefix
export const getMatchesV2 = async (req: Request, res: Response) => {
  try {
    const { sportKey } = req.params;
    const matches = await unifiedMatchService.getMatchesBySport(sportKey);
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error in getMatchesV2:', error);
    res.status(500).json({ success: false, message: 'Error fetching matches' });
  }
};

export const checkMatchResultsV2 = async (req: Request, res: Response) => {
  try {
    const pendingMatches = await Match.find({
      status: { $in: ['live', 'upcoming'] },
      commenceTime: { $lt: new Date() }
    });

    const { updatedMatches, settledMatches } = await unifiedMatchService.updateMatches(
      pendingMatches[0]?.sportKey || 'default'
    );

    res.json({
      success: true,
      updatedMatches,
      settledMatches,
      message: `Updated ${updatedMatches.length} matches, settled ${settledMatches.length} matches`
    });
  } catch (error) {
    console.error('Error in checkMatchResultsV2:', error);
    res.status(500).json({ success: false, message: 'Error checking match results' });
  }
};

// Keep old endpoints temporarily
export const getMatchesLegacy = async (req: Request, res: Response) => {
  try {
    const { sportKey } = req.params;
    const matches = await matchService.getMatchesBySport(sportKey);
    console.log('Using legacy getMatches endpoint');
    res.json({ success: true, matches });
  } catch (error) {
    console.error('Error in legacy getMatches:', error);
    res.status(500).json({ success: false, message: 'Error fetching matches' });
  }
};

export const getLiveMatches = async (req: Request, res: Response) => {
  try {
    const { sportKey } = req.params;

    // Check if the sportKey is in our supported leagues
    const isSupportedLeague = Object.values(SUPPORTED_SPORTS).some(leagues => 
      leagues.includes(sportKey)
    );

    if (!isSupportedLeague) {
      return res.status(400).json({
        success: false,
        message: `Sport ${sportKey} is not supported. Only leagues defined in SUPPORTED_SPORTS are available.`
      });
    }

    const matches = await oddsApiService.getLiveMatches(sportKey);
    res.json({
      success: true,
      data: matches
    });
  } catch (error) {
    console.error('Error in getLiveMatches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch live matches'
    });
  }
}; 