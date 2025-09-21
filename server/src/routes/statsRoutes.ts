import { Router } from 'express'
import { getUserStats } from '../controllers/statsController'
import { authenticate } from '../middleware/auth'

const router = Router()

// All routes require authentication
router.use(authenticate)

// @route   GET /api/v1/stats
// @desc    Get user statistics
// @access  Private
router.get('/', getUserStats)

export default router