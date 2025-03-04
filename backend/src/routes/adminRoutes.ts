import express from 'express';
import { authenticateToken, requireAdmin, requireSuperuser } from '../middleware/auth';
import * as adminController from '../controllers/adminController';

const router = express.Router();

// Apply authentication and admin middleware to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// User management routes
router.get('/users', adminController.getAllUsers);
router.patch('/users/:id/role', adminController.updateUserRole);
router.patch('/users/:id/status', adminController.updateUserStatus);

// Admin and Superuser routes
router.get('/dashboard', adminController.getDashboardStats);
router.get('/transactions', adminController.getAllTransactions);
router.post('/transfer-coins', adminController.transferCoins);

// Superuser only routes - add additional superuser middleware
router.post('/generate-coins', requireSuperuser, adminController.generateCoins);

export default router; 