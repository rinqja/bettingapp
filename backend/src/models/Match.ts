import mongoose, { Schema, Document } from 'mongoose';

interface ISGMMarkets {
  matchWinner: {
    key: string;
    outcomes: [{
      name: string;
      price: number;
    }]
  };
  bothTeamsToScore: {
    key: string;
    outcomes: [{
      name: string;
      price: number;
    }]
  };
  overUnder: [{
    key: string;
    outcomes: [{
      name: string;
      price: number;
      point: number;
    }]
  }];
  h2h3Way: {
    key: string;
    outcomes: [{
      name: string;
      price: number;
    }]
  };
}

interface Market {
  key: string;
  outcomes: {
    name: string;
    price: number;
    point?: number;
  }[];
}

interface Odds {
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

export interface IMatch extends Document {
  externalId: string;
  sportKey: string;
  sportTitle: string;
  homeTeam: string;
  awayTeam: string;
  commenceTime: Date;
  status: 'upcoming' | 'live' | 'ended';
  odds?: Odds;
  sgmMarkets?: ISGMMarkets;
  scores?: {
    home: number;
    away: number;
  };
  spreads?: {
    points: number;
    homeOdds: number;
    awayOdds: number;
  };
  totals?: {
    points: number;
    overOdds: number;
    underOdds: number;
  };
  bookmaker?: string;
  lastUpdated: Date;
  tier?: string;
  title?: string;
  formattedCommenceTime?: string;
  result?: '1' | 'X' | '2' | null;
  settled?: boolean;
  isStale?: boolean;
}

const matchSchema = new Schema<IMatch>({
  externalId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true 
  },
  sportKey: { 
    type: String, 
    required: true,
    index: true 
  },
  sportTitle: { 
    type: String, 
    required: true 
  },
  homeTeam: { 
    type: String, 
    required: true 
  },
  awayTeam: { 
    type: String, 
    required: true 
  },
  commenceTime: { 
    type: Date, 
    required: true,
    index: true 
  },
  odds: {
    homeWin: { type: Number, required: true },
    draw: { type: Number, required: true },
    awayWin: { type: Number, required: true }
  },
  spreads: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    point: { type: Number, required: true }
  }],
  totals: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    point: { type: Number, required: true }
  }],
  bookmaker: {
    key: { type: String, required: true },
    title: { type: String, required: true },
    lastUpdate: { type: Date, required: true }
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'ended'],
    default: 'upcoming',
    index: true
  },
  tier: {
    type: String,
    enum: ['tier1', 'tier2', 'tier3'],
    required: true
  },
  lastUpdated: { 
    type: Date, 
    default: Date.now,
    index: true 
  },
  result: {
    type: String,
    enum: ['1', 'X', '2'],
    default: null
  },
  scores: {
    home: Number,
    away: Number
  },
  settled: {
    type: Boolean,
    default: false
  },
  sgmMarkets: {
    matchWinner: {
      key: String,
      outcomes: [{
        name: String,
        price: Number
      }]
    },
    bothTeamsToScore: {
      key: String,
      outcomes: [{
        name: String,
        price: Number
      }]
    },
    overUnder: [{
      key: String,
      outcomes: [{
        name: String,
        price: Number,
        point: Number
      }]
    }],
    h2h3Way: {
      key: String,
      outcomes: [{
        name: String,
        price: Number
      }]
    }
  }
}, {
  timestamps: true
});

// Index for querying matches by sport and status
matchSchema.index({ sportKey: 1, status: 1 });

// Index for querying upcoming matches
matchSchema.index({ status: 1, commenceTime: 1 });
matchSchema.index({ tier: 1, lastUpdated: 1 });

// Methods
matchSchema.methods.isStale = function(): boolean {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return this.lastUpdated < fiveMinutesAgo;
};

// Virtual for match title
matchSchema.virtual('title').get(function() {
  return `${this.homeTeam} vs ${this.awayTeam}`;
});

// Virtual for formatted commence time
matchSchema.virtual('formattedCommenceTime').get(function() {
  return this.commenceTime.toLocaleString();
});

// Ensure virtuals are included in JSON
matchSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

export const Match = mongoose.model<IMatch>('Match', matchSchema);