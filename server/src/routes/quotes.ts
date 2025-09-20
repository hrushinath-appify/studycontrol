import { Router } from 'express';
import {
  getQuotes,
  getRandomQuote,
  getQuoteOfTheDay,
  getQuotesByCategory,
  getQuotesByTag,
  searchQuotes,
  getPopularQuotes,
  createQuote,
  likeQuote,
  getQuoteStats
} from '@/controllers/quotesController';
import { authenticate, authorize, optionalAuth } from '@/middleware/auth';
import {
  validateCreateQuote,
  validateMongoId,
  validatePagination,
  validateSearch
} from '@/middleware/validation';

const router = Router();

// Public routes (no authentication required)
router.get('/', validatePagination, getQuotes);
router.get('/random', getRandomQuote);
router.get('/quote-of-the-day', getQuoteOfTheDay);
router.get('/popular', validatePagination, getPopularQuotes);
router.get('/search', validateSearch, validatePagination, searchQuotes);
router.get('/stats', getQuoteStats);
router.get('/category/:category', validatePagination, getQuotesByCategory);
router.get('/tag/:tag', validatePagination, getQuotesByTag);

// Routes with optional authentication
router.post('/:id/like', optionalAuth, validateMongoId, likeQuote);

// Protected routes (authentication required)
router.post('/', authenticate, authorize('admin'), validateCreateQuote, createQuote);

export default router;
