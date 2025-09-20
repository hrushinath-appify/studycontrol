import { Router } from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  validateToken,
  verifyEmail,
  resendVerificationEmail
} from '@/controllers/authController';
import { authenticate } from '@/middleware/auth';
import {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateForgotPassword,
  validateResetPassword
} from '@/middleware/validation';

const router = Router();

// Public routes (no authentication required)
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', validateForgotPassword, forgotPassword);
router.post('/reset-password', validateResetPassword, resetPassword);
router.post('/refresh-token', refreshAccessToken);
router.post('/validate-token', validateToken);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);

// Protected routes (authentication required)
router.use(authenticate); // Apply authentication middleware to all routes below

router.post('/logout', logout);
router.get('/me', getCurrentUser);
router.put('/profile', validateUpdateProfile, updateProfile);

export default router;
