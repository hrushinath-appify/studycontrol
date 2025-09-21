import { Router } from 'express';
import authRoutes from './auth';
import diaryRoutes from './diary';
import tasksRoutes from './tasks';
import notesRoutes from './notes';
import mysteryRoutes from './mystery';
import focusRoutes from './focus';
import quotesRoutes from './quotes';
import statsRoutes from './statsRoutes';
import testRoutes from './test';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'StudyControl API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/diary', diaryRoutes);
router.use('/tasks', tasksRoutes);
router.use('/notes', notesRoutes);
router.use('/mystery', mysteryRoutes);
router.use('/focus', focusRoutes);
router.use('/quotes', quotesRoutes);
router.use('/stats', statsRoutes);
router.use('/test', testRoutes);

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: 'NOT_FOUND'
  });
});

export default router;
