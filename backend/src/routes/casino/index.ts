import express from 'express';
import minesRoutes from './minesRoutes';
import kenoRoutes from './kenoRoutes';
import rouletteRoutes from './rouletteRoutes';
import dragontowerRoutes from './dragonTowerRoutes';
import blackjackRoutes from './blackjackRoutes';
import slotsRoutes from './slotsRoutes';
import halloweenSlotsRoutes from './halloweenSlotsRoutes';
import slotPenRoutes from './slotPenRoutes';
import wheelRoutes from './wheelRoutes';
import newSlotsRoutes from './newSlotsRoutes';
const router = express.Router();

console.log('[CASINO] Setting up casino routes');

// Debug route
router.get('/test', (req, res) => {
  console.log('[CASINO] Test route hit');
  res.json({ message: 'Casino routes are working' });
});

// Mount casino game routes with logging
router.use('/mines', (req, res, next) => {
  console.log('[CASINO] Mines route hit');
  next();
}, minesRoutes);

router.use('/keno', (req, res, next) => {
  console.log('[CASINO] Keno route hit');
  next();
}, kenoRoutes);

router.use('/roulette', (req, res, next) => {
  console.log('[CASINO] Roulette route hit');
  next();
}, rouletteRoutes);

router.use('/dragontower', (req, res, next) => {
  console.log('[CASINO] DragonTower route hit');
  next();
}, dragontowerRoutes);

router.use('/blackjack', (req, res, next) => {
  console.log('[CASINO] Blackjack route hit');
  next();
}, blackjackRoutes);
router.use('/slots', (req, res, next) => {
  console.log('[CASINO] Slots route hit');
  next();
}, slotsRoutes);
router.use('/halloween-slots', (req, res, next) => {
  console.log('[CASINO] Halloween Slots route hit');
  next();
}, halloweenSlotsRoutes);
router.use('/slotpen', (req, res, next) => {
  console.log('[CASINO] Slot Pen route hit');
  next();
}, slotPenRoutes);
router.use('/wheel', (req, res, next) => {
  console.log('[CASINO] Wheel route hit');
  next();
}, wheelRoutes);
router.use('/new-slots', (req, res, next) => {
  console.log('[CASINO] New Slots route hit');
  next();
}, newSlotsRoutes);


console.log('[CASINO] Casino routes mounted');

export default router; 