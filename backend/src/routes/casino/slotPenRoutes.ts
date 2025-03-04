import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as slotPenController from '../../controllers/casino/slotPenController';

const router = express.Router();

console.log('[SLOTPEN] Setting up slot pen routes');

router.post('/spin', authenticateToken, slotPenController.spin);
router.post('/collect', authenticateToken, slotPenController.collectWinnings);

export default router; 