import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { 
  placeBet,
  getUserBets,
  getAllBets,
  cashoutBet,
  debugSettleBets
} from '../controllers/betController';

const router = express.Router();

// Make sure authenticateToken is defined before using it
console.log('authenticateToken:', authenticateToken); // Debug log

// All bet routes require authentication
router.use(authenticateToken);

// Routes
router.post('/place', placeBet);
router.get('/user', getUserBets);
router.get('/all', getAllBets);
router.post('/:betId/cashout', cashoutBet);
router.post('/debug/settle', debugSettleBets);

export default router; 