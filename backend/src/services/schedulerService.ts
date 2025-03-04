import { CronJob } from 'cron';
import { MatchService } from './matchService';
import { SUPPORTED_SPORTS } from '../config/constants';

export class SchedulerService {
  private matchService: MatchService;
  private supportedSports = [
    // Soccer/Football - Top 5 Leagues
    'soccer_epl',           // Premier League
    'soccer_spain_la_liga', // La Liga
    'soccer_germany_bundesliga1', // Bundesliga
    'soccer_italy_serie_a', // Serie A
    'soccer_france_ligue_one', // Ligue 1
    
    // European Competitions
    'soccer_uefa_champs_league', // Champions League
    'soccer_uefa_europa_league', // Europa League
    'soccer_uefa_conference_league', // Conference League
    
    // Domestic Cups
    'soccer_fa_cup',        // England FA Cup
    'soccer_copa_del_rey',  // Spain Copa del Rey
    'soccer_dfb_pokal',     // Germany DFB Pokal
    'soccer_coppa_italia',  // Italy Coppa Italia
    'soccer_coupe_de_france', // France Coupe de France
    
    // Super Cups
    'soccer_uefa_super_cup',    // UEFA Super Cup
    'soccer_england_super_cup', // Community Shield
    'soccer_spain_super_cup',   // Supercopa de España
    'soccer_germany_super_cup', // DFL-Supercup
    'soccer_italy_super_cup',   // Supercoppa Italiana
    'soccer_france_super_cup',  // Trophée des Champions
    
    // Basketball
    'basketball_nba',       // NBA
    'basketball_euroleague', // EuroLeague
    
    // Tennis
    'tennis_atp_singles',   // ATP Tennis
    'tennis_wta_singles'    // WTA Tennis
  ];

  constructor() {
    this.matchService = new MatchService();
  }

  initializeSchedulers() {
    // High-frequency tier (30 seconds) - Live matches
    new CronJob('*/30 * * * * *', async () => {
      try {
        const matches = await this.matchService.getLiveMatches();
        const sportsToUpdate = new Set(matches.map(m => m.sportKey));
        
        for (const sportKey of sportsToUpdate) {
          if (this.supportedSports.includes(sportKey)) {
            await this.matchService.updateMatches(sportKey);
          }
        }
      } catch (error) {
        console.error('Error in high-frequency update:', error);
      }
    }).start();

    // Medium-frequency tier (5 minutes) - Upcoming matches within 24 hours
    new CronJob('*/5 * * * *', async () => {
      try {
        const matches = await this.matchService.getUpcomingMatches();
        const sportsToUpdate = new Set(
          matches
            .filter(m => {
              const hours = (new Date(m.commenceTime).getTime() - Date.now()) / (1000 * 60 * 60);
              return hours <= 24;
            })
            .map(m => m.sportKey)
        );
        
        for (const sportKey of sportsToUpdate) {
          if (this.supportedSports.includes(sportKey)) {
            await this.matchService.updateMatches(sportKey);
          }
        }
      } catch (error) {
        console.error('Error in medium-frequency update:', error);
      }
    }).start();

    // Low-frequency tier (1 hour) - All supported sports
    new CronJob('0 * * * *', async () => {
      try {
        // Update all supported sports
        for (const sportKey of this.supportedSports) {
          await this.matchService.updateMatches(sportKey);
        }
      } catch (error) {
        console.error('Error in low-frequency update:', error);
      }
    }).start();
  }
} 