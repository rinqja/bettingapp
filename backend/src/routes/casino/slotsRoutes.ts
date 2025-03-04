import express from 'express';
import { authenticateToken } from '../../middleware/auth';
import * as slotsController from '../../controllers/casino/slotsController';

const router = express.Router();

console.log('[SLOTS] Setting up slots routes');

router.post('/check', authenticateToken, slotsController.check);

export default router; 