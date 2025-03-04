// Define specific league keys type
export type LeagueKey = keyof typeof LEAGUE_NAMES;

// Define supported sports type
export type SupportedSport = 'soccer' | 'basketball';

// Define the sports configuration with strict typing
export const SPORTS_CONFIG: Record<SupportedSport, LeagueKey[]> = {
  soccer: [
    'soccer_epl',
    'soccer_efl_champ',
    'soccer_england_league1',
    'soccer_england_league2',
    'soccer_england_efl_cup',
    'soccer_fa_cup',
    'soccer_spain_la_liga',
    'soccer_spain_segunda_division',
    'soccer_germany_bundesliga',
    'soccer_germany_bundesliga2',
    'soccer_italy_serie_a',
    'soccer_italy_serie_b',
    'soccer_france_ligue_one',
    'soccer_france_ligue_two',
    'soccer_netherlands_eredivisie',
    'soccer_portugal_primeira_liga',
    'soccer_turkey_super_league',
    'soccer_uefa_champs_league',
    'soccer_uefa_europa_league',
    'soccer_uefa_europa_conference_league',
    'soccer_uefa_champs_league_qualification',
    'soccer_uefa_european_championship',
    'soccer_uefa_euro_qualification'
  ],
  basketball: [
    'basketball_nba',
    'basketball_euroleague',
    'basketball_ncaab',
    'basketball_wnba'
  ]
};

// Helper function to check if a league is supported
export const isSupportedLeague = (league: string): boolean => {
  return Object.values(SPORTS_CONFIG).some(leagues => 
    leagues.includes(league as LeagueKey)
  );
};

// Helper function to get leagues for a sport
export const getLeaguesForSport = (sport: SupportedSport): LeagueKey[] => {
  return SPORTS_CONFIG[sport] || [];
};

// Export league name mappings for consistent formatting
export const LEAGUE_NAMES: Record<string, string> = {
  // England
  'soccer_epl': 'Premier League',
  'soccer_efl_champ': 'Championship',
  'soccer_england_league1': 'League One',
  'soccer_england_league2': 'League Two',
  'soccer_england_efl_cup': 'EFL Cup',
  'soccer_fa_cup': 'FA Cup',
  
  // Spain
  'soccer_spain_la_liga': 'La Liga',
  'soccer_spain_segunda_division': 'La Liga 2',
  
  // Germany
  'soccer_germany_bundesliga': 'Bundesliga',
  'soccer_germany_bundesliga2': '2. Bundesliga',
  
  // Italy
  'soccer_italy_serie_a': 'Serie A',
  'soccer_italy_serie_b': 'Serie B',
  
  // France
  'soccer_france_ligue_one': 'Ligue 1',
  'soccer_france_ligue_two': 'Ligue 2',
  
  // Other Top Leagues
  'soccer_netherlands_eredivisie': 'Eredivisie',
  'soccer_portugal_primeira_liga': 'Primeira Liga',
  'soccer_turkey_super_league': 'Super Lig',
  
  // European Competitions
  'soccer_uefa_champs_league': 'Champions League',
  'soccer_uefa_europa_league': 'Europa League',
  'soccer_uefa_europa_conference_league': 'Conference League',
  'soccer_uefa_champs_league_qualification': 'Champions League Qualification',
  'soccer_uefa_european_championship': 'Euro 2024',
  'soccer_uefa_euro_qualification': 'Euro Qualification',
  
  // Basketball
  'basketball_nba': 'NBA',
  'basketball_euroleague': 'EuroLeague',
  'basketball_ncaab': 'NCAAB',
  'basketball_wnba': 'WNBA'
};

// Type for supported sports
export type SupportedSport = keyof typeof SPORTS_CONFIG;

// Type for league keys
export type LeagueKey = keyof typeof LEAGUE_NAMES; 