import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as minesController from '../../controllers/casino/minesController';

const router = express.Router();

console.log('[MINES] Setting up mines routes');

router.post('/start', authenticateToken, minesController.startGame);
router.post('/cashout', authenticateToken, minesController.cashoutGame);

export default router;