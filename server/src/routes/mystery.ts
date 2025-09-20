import { Router } from 'express';
import {
  getMysteryTopics,
  getMysteryTopicById,
  getMysteryCategories,
  getRandomMysteryTopic,
  searchMysteryTopics,
  getMysteryTopicsByDifficulty
} from '@/controllers/mysteryController';
import { validatePagination, validateSearch, validateMongoId } from '@/middleware/validation';

const router = Router();

// GET /api/v1/mystery - Get all mystery topics
router.get('/', validatePagination, validateSearch, getMysteryTopics);

// GET /api/v1/mystery/search - Search mystery topics
router.get('/search', searchMysteryTopics);

// GET /api/v1/mystery/random - Get random mystery topic
router.get('/random', getRandomMysteryTopic);

// GET /api/v1/mystery/categories - Get available categories
router.get('/categories', getMysteryCategories);

// GET /api/v1/mystery/difficulty/:difficulty - Get topics by difficulty
router.get('/difficulty/:difficulty', getMysteryTopicsByDifficulty);

// GET /api/v1/mystery/:id - Get mystery topic by ID
router.get('/:id', getMysteryTopicById);

export default router;