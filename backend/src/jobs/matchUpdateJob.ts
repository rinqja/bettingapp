import { CronJob } from 'cron';
import { MatchService } from '../services/matchService';
import { SUPPORTED_SPORTS } from '../config/constants';
import { UnifiedMatchService } from '../services/unifiedMatchService';

const matchService = new MatchService();

const SPORTS_TO_UPDATE = {
  soccer: ['soccer_epl', 'soccer_spain_la_liga'],
  basketball: ['basketball_nba', 'basketball_euroleague'],
  tennis: ['tennis_atp', 'tennis_wta']
} as const;

// Use Object.values to make it iterable
const sportKeys = Object.values(SPORTS_TO_UPDATE).flat();

// Update upcoming matches less frequently
const upcomingMatchesJob = new CronJob('0 */30 * * * *', async () => {
  for (const sportKey of sportKeys) {
    try {
      await matchService.queueMatchUpdate(sportKey);
      // Increased delay between sports to prevent API rate limits
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      console.error(`Error updating upcoming matches for ${sportKey}:`, error);
    }
  }
});

// Update live matches less frequently
const liveMatchesJob = new CronJob('*/5 * * * *', async () => { // Changed from 2 to 5 minutes
  try {
    const liveMatches = await matchService.getLiveMatches();
    const sportKeys = [...new Set(liveMatches.map(m => m.sportKey))];

    for (const sportKey of sportKeys) {
      await matchService.queueMatchUpdate(sportKey);
      // Increased delay between updates
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  } catch (error) {
    console.error('Error updating live matches:', error);
  }
});

// Cleanup old matches daily
const cleanupJob = new CronJob('0 0 * * *', async () => { // Once per day at midnight
  try {
    await matchService.cleanupOldMatches();
  } catch (error) {
    console.error('Error cleaning up old matches:', error);
  }
});

export const startMatchUpdateJobs = () => {
  upcomingMatchesJob.start();
  liveMatchesJob.start();
  cleanupJob.start();
};

export const updateMatches = async () => {
  const matchService = new UnifiedMatchService();
  
  for (const sport in SUPPORTED_SPORTS) {
    const leagues = SUPPORTED_SPORTS[sport as keyof typeof SUPPORTED_SPORTS];
    for (const league of leagues) {
      try {
        await matchService.updateMatches(league);
      } catch (error) {
        console.error(`Error updating matches for ${league}:`, error);
      }
    }
  }
};
