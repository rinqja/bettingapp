import express from 'express';
import { 
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  changePassword
} from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/register', register);

// Protected routes
router.use(authenticateToken);
router.post('/logout', logout);
router.get('/me', getProfile);
router.patch('/profile', updateProfile);
router.post('/change-password', changePassword);

export default router;
