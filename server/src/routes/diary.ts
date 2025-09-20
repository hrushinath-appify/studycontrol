import { Router } from 'express';
import {
  getDiaryEntries,
  getDiaryEntry,
  createDiaryEntry,
  updateDiaryEntry,
  deleteDiaryEntry,
  getDiaryStats,
  searchDiaryEntries,
  getEntriesByMood,
  getEntriesByTag
} from '@/controllers/diaryController';
import { authenticate } from '@/middleware/auth';
import {
  validateCreateDiaryEntry,
  validateUpdateDiaryEntry,
  validateMongoId,
  validatePagination,
  validateSearch
} from '@/middleware/validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Routes
router.get('/', validatePagination, getDiaryEntries);
router.post('/', validateCreateDiaryEntry, createDiaryEntry);
router.get('/stats', getDiaryStats);
router.get('/search', validateSearch, validatePagination, searchDiaryEntries);
router.get('/mood/:mood', validatePagination, getEntriesByMood);
router.get('/tag/:tag', validatePagination, getEntriesByTag);
router.get('/:id', validateMongoId, getDiaryEntry);
router.put('/:id', validateUpdateDiaryEntry, updateDiaryEntry);
router.delete('/:id', validateMongoId, deleteDiaryEntry);

export default router;
