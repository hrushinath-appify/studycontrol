import { Router } from 'express';
import authRoutes from './auth';
import diaryRoutes from './diary';
import notesRoutes from './notes';
import mysteryRoutes from './mystery';
import focusRoutes from './focus';
import quotesRoutes from './quotes';
import statsRoutes from './statsRoutes';
import marrowProgressRoutes from './marrowProgress';

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
router.use('/notes', notesRoutes);
router.use('/mystery', mysteryRoutes);
router.use('/focus', focusRoutes);
router.use('/quotes', quotesRoutes);
router.use('/stats', statsRoutes);
router.use('/marrow-progress', marrowProgressRoutes);

// 404 handler for undefined routes
router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    error: 'NOT_FOUND'
  });
});

export default router;
