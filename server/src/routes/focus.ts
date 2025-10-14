import { Router } from 'express';
import {
  getTimerSettings,
  updateTimerSettings,
  startFocusSession,
  completeFocusSession,
  getFocusSessions,
  getFocusStats
} from '../controllers/focusController';
import { authenticate } from '../middleware/auth';
import { validatePagination } from '../middleware/validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/v1/focus/settings - Get timer settings
router.get('/settings', getTimerSettings);

// PUT /api/v1/focus/settings - Update timer settings
router.put('/settings', updateTimerSettings);

// GET /api/v1/focus/sessions - Get focus sessions
router.get('/sessions', validatePagination, getFocusSessions);

// POST /api/v1/focus/sessions - Start new focus session
router.post('/sessions', startFocusSession);

// PATCH /api/v1/focus/sessions/:id/complete - Complete focus session
router.patch('/sessions/:id/complete', completeFocusSession);

// GET /api/v1/focus/stats - Get focus statistics
router.get('/stats', getFocusStats);

export default router;