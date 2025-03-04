import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as blackjackController from '../../controllers/casino/blackjackController';

const router = express.Router();

console.log('[BLACKJACK] Setting up blackjack routes');

router.post('/start', (req, res, next) => {
  console.log('[BLACKJACK] Start route hit');
  next();
}, authenticateToken, blackjackController.startGame);

router.post('/double', (req, res, next) => {
  console.log('[BLACKJACK] Double route hit');
  next();
}, authenticateToken, blackjackController.doubleDown);

router.post('/split', (req, res, next) => {
  console.log('[BLACKJACK] Split route hit');
  next();
}, authenticateToken, blackjackController.split);


router.post('/processWin', (req, res, next) => {
  console.log('[BLACKJACK] Process win route hit');
  next();
}, authenticateToken, blackjackController.processWin);

router.post('/deductBet', (req, res, next) => {
  console.log('[BLACKJACK] Deduct bet route hit');
  next();
}, authenticateToken, blackjackController.deductBet);

console.log('[BLACKJACK] Blackjack routes mounted');

export default router; 