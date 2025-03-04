import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as kenoController from '../../controllers/casino/kenoController';

const router = express.Router();

console.log('[KENO] Setting up keno routes');

router.post('/start', (req, res, next) => {
  console.log('[KENO] Start route hit');
  next();
}, authenticateToken, kenoController.startGame);

router.post('/cashout', (req, res, next) => {
  console.log('[KENO] Cashout route hit');
  next();
}, authenticateToken, kenoController.cashoutGame);

console.log('[KENO] Keno routes mounted');

export default router; 