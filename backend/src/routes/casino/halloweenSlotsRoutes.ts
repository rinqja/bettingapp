import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import { startGame, spin } from '../../controllers/casino/halloweenSlotsController';

const router = express.Router();

router.post('/start', authenticateToken, startGame);
router.post('/spin', authenticateToken, spin);

export default router; 