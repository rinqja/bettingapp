import { Request, Response, NextFunction } from 'express';
import { BET_LIMITS, BetType } from '../config/constants';

interface BetSelection {
  odds: number;
  matchId: string;
  pick: string;
}

interface BetRequest {
  type: BetType;
  amount: number;
  selections: BetSelection[];
}

interface SGMSelection extends BetSelection {
  market: string;
  homeTeam: string;
  awayTeam: string;
}

interface SGMBetRequest extends BetRequest {
  isSGM?: boolean;
  selections: SGMSelection[];
}

const SGM_LIMITS = {
  minSelections: 2,
  maxSelections: 8,
  minAmount: 0.5,
  maxAmount: 1000,
  // Define incompatible market combinations
  incompatibleMarkets: [
    ['correct_score', 'btts'],
    ['correct_score', 'over_under'],
    ['first_scorer', 'correct_score']
  ]
};

export const validateBet = (
  req: Request<{}, {}, SGMBetRequest>,
  res: Response,
  next: NextFunction
) => {
  const { type, amount, selections, isSGM } = req.body;

  if (!Array.isArray(selections) || selections.length === 0) {
    return res.status(400).json({ message: 'At least one selection is required' });
  }

  // SGM-specific validations
  if (isSGM) {
    // Validate number of selections
    if (selections.length < SGM_LIMITS.minSelections) {
      return res.status(400).json({
        message: `Minimum ${SGM_LIMITS.minSelections} selections required for SGM bets`
      });
    }

    if (selections.length > SGM_LIMITS.maxSelections) {
      return res.status(400).json({
        message: `Maximum ${SGM_LIMITS.maxSelections} selections allowed for SGM bets`
      });
    }

    // Validate all selections are from the same match
    const firstMatch = `${selections[0].homeTeam} vs ${selections[0].awayTeam}`;
    const allSameMatch = selections.every(
      s => `${s.homeTeam} vs ${s.awayTeam}` === firstMatch
    );

    if (!allSameMatch) {
      return res.status(400).json({
        message: 'All selections in an SGM must be from the same match'
      });
    }

    // Check for incompatible market combinations
    const selectedMarkets = selections.map(s => s.market);
    const hasIncompatibleMarkets = SGM_LIMITS.incompatibleMarkets.some(
      incompatiblePair =>
        incompatiblePair.every(market => selectedMarkets.includes(market))
    );

    if (hasIncompatibleMarkets) {
      return res.status(400).json({
        message: 'Selected markets cannot be combined in an SGM bet'
      });
    }

    // Validate amount limits for SGM
    if (amount < SGM_LIMITS.minAmount || amount > SGM_LIMITS.maxAmount) {
      return res.status(400).json({
        message: `Amount must be between ${SGM_LIMITS.minAmount} and ${SGM_LIMITS.maxAmount} for SGM bets`
      });
    }
  } else {
    // Regular bet validation
    const limits = BET_LIMITS[type];

    if (!limits) {
      return res.status(400).json({ message: 'Invalid bet type' });
    }

    // Common validations for all bet types
    if ('minAmount' in limits && 'maxAmount' in limits) {
      if (amount < limits.minAmount || amount > limits.maxAmount) {
        return res.status(400).json({
          message: `Amount must be between ${limits.minAmount} and ${limits.maxAmount}`
        });
      }
    }

    // Type-specific validations
    if (type === 'MULTIPLE' && 'maxSelections' in limits) {
      if (selections.length > limits.maxSelections) {
        return res.status(400).json({
          message: `Maximum ${limits.maxSelections} selections allowed for multiple bets`
        });
      }
    }
  }

  next();
};

export const validateCashout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { betId } = req.params;
    
    if (!betId) {
      return res.status(400).json({
        success: false,
        message: 'Bet ID is required'
      });
    }

    next();
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Validation error'
    });
  }
}; 