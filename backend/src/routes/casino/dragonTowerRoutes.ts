import express from 'express';
import { startGame, processWin, processLoss } from '../../controllers/casino/dragonTowerController';
import { authenticateToken } from '../../middleware/auth';

const router = express.Router();

router.post('/start', authenticateToken, startGame);
router.post('/processWin', authenticateToken, processWin);
router.post('/processLoss', authenticateToken, processLoss);

export default router; 