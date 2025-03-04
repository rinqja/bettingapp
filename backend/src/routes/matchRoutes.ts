import express from 'express';
import * as matchController from '../controllers/matchController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/matches', matchController.getMatches);
router.get('/matches/:id', matchController.getMatchById);
router.get('/sports', matchController.getSports);
router.get('/:sportKey/matches', matchController.getMatches);
router.get('/live', matchController.getLiveMatches);

// Protected routes - apply authenticateToken middleware
router.use(authenticateToken); // Apply to all routes below this line

router.post('/check-results', matchController.checkMatchResults);

export default router; 