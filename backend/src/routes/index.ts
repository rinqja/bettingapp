import express from 'express';
import authRoutes from './auth';
import betRoutes from './bet';
import matchRoutes from './matchRoutes';
import adminRoutes from './adminRoutes';
import casinoRoutes from './casino';

const router = express.Router();

console.log('[ROUTES] Setting up main router');

// Mount routes with logging
router.use('/auth', (req, res, next) => {
  console.log('[ROUTES] Auth route hit');
  next();
}, authRoutes);

router.use('/bets', (req, res, next) => {
  console.log('[ROUTES] Bets route hit');
  next();
}, betRoutes);

router.use('/casino', (req, res, next) => {
  console.log('[ROUTES] Casino route hit');
  next();
}, casinoRoutes);

router.use('/matches', (req, res, next) => {
  console.log('[ROUTES] Matches route hit');
  next();
}, matchRoutes);

router.use('/admin', (req, res, next) => {
  console.log('[ROUTES] Admin route hit');
  next();
}, adminRoutes);

console.log('[ROUTES] All routes mounted');

export default router; 
