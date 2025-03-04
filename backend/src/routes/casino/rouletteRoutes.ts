import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as rouletteController from '../../controllers/casino/rouletteController';

const router = express.Router();

console.log('[ROULETTE] Setting up roulette routes');

router.post('/start', authenticateToken, rouletteController.startGame);
router.post('/processWin', authenticateToken, rouletteController.processWin);
console.log('[ROULETTE] Roulette routes mounted');

export default router; 