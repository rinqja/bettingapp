export const SUPPORTED_SPORTS = {
  soccer: [
    // England
    'soccer_epl',                    // Premier League
    'soccer_efl_champ',              // Championship
    'soccer_england_league1',        // League One
    'soccer_england_league2',        // League Two
    'soccer_england_efl_cup',        // EFL Cup
    'soccer_fa_cup',                 // FA Cup
    
    // Spain
    'soccer_spain_la_liga',          // La Liga
    'soccer_spain_segunda_division', // La Liga 2
    
    // Germany
    'soccer_germany_bundesliga',     // Bundesliga
    'soccer_germany_bundesliga2',    // 2. Bundesliga
    
    // Italy
    'soccer_italy_serie_a',          // Serie A
    'soccer_italy_serie_b',          // Serie B
    
    // France
    'soccer_france_ligue_one',       // Ligue 1
    'soccer_france_ligue_two',       // Ligue 2
    
    // Other Top Leagues
    'soccer_netherlands_eredivisie',  // Eredivisie
    'soccer_portugal_primeira_liga', // Primeira Liga
    'soccer_turkey_super_league',    // Super Lig
    
    // European Competitions
    'soccer_uefa_champs_league',     // Champions League
    'soccer_uefa_europa_league',     // Europa League
    'soccer_uefa_europa_conference_league', // Conference League
    'soccer_uefa_champs_league_qualification', // Champions League Qualification
    'soccer_uefa_european_championship', // Euro 2024
    'soccer_uefa_euro_qualification'     // Euro Qualification
  ],
  basketball: [
    'basketball_nba',         // NBA
    'basketball_euroleague',  // EuroLeague
    'basketball_ncaab',       // NCAAB
    'basketball_wnba'         // WNBA
  ]
};

export const LEAGUE_NAMES = {
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
} as const;

// Add type for league keys
export type LeagueKey = keyof typeof LEAGUE_NAMES;

// Add type for sport categories
export type SportCategory = keyof typeof SUPPORTED_SPORTS;

interface SingleBetLimits {
  type: 'SINGLE';
  minAmount: number;
  maxAmount: number;
  minOdds: number;
  maxOdds: number;
  maxPotentialWin: number;
}

interface MultipleBetLimits {
  type: 'MULTIPLE';
  minAmount: number;
  maxAmount: number;
  minOdds: number;
  maxOdds: number;
  maxSelections: number;
  maxPotentialWin: number;
}

interface SystemBetLimits {
  type: 'SYSTEM';
  minWonSelections: number;
  minPendingSelections: number;
  minTimeBeforeMatch: number;
}

export const BET_LIMITS: {
  SINGLE: SingleBetLimits;
  MULTIPLE: MultipleBetLimits;
  SYSTEM: SystemBetLimits;
} = {
  SINGLE: {
    type: 'SINGLE',
    minAmount: 1,
    maxAmount: 1000,
    minOdds: 1.01,
    maxOdds: 1000,
    maxPotentialWin: 10000
  },
  MULTIPLE: {
    type: 'MULTIPLE',
    minAmount: 1,
    maxAmount: 500,
    minOdds: 1.01,
    maxOdds: 1000,
    maxSelections: 20,
    maxPotentialWin: 10000
  },
  SYSTEM: {
    type: 'SYSTEM',
    minWonSelections: 2,
    minPendingSelections: 3,
    minTimeBeforeMatch: 300
  }
};

export type BetType = 'SINGLE' | 'MULTIPLE' | 'SYSTEM'; 