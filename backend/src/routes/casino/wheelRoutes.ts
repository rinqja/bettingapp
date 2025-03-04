import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as wheelController from '../../controllers/casino/wheelController';

const router = express.Router();

console.log('[WHEEL] Setting up wheel routes');

router.post('/spin', authenticateToken, wheelController.spin);

export default router; 