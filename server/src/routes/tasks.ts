import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
  searchTasks,
  getTaskStats,
  getTasksByCategory,
  getOverdueTasks
} from '@/controllers/tasksController';
import { authenticate } from '@/middleware/auth';
import {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId
} from '@/middleware/validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/v1/tasks - Get all tasks
router.get('/', getTasks);

// GET /api/v1/tasks/stats - Get task statistics
router.get('/stats', getTaskStats);

// GET /api/v1/tasks/search - Search tasks
router.get('/search', searchTasks);

// GET /api/v1/tasks/overdue - Get overdue tasks
router.get('/overdue', getOverdueTasks);

// GET /api/v1/tasks/category/:category - Get tasks by category
router.get('/category/:category', getTasksByCategory);

// GET /api/v1/tasks/:id - Get task by ID
router.get('/:id', 
  validateTaskId, 
  getTaskById
);

// POST /api/v1/tasks - Create new task
router.post('/', validateCreateTask, createTask);

// PUT /api/v1/tasks/:id - Update task
router.put('/:id', 
  validateTaskId, 
  validateUpdateTask, 
  updateTask
);

// PATCH /api/v1/tasks/:id/toggle - Toggle task completion
router.patch('/:id/toggle', 
  validateTaskId, 
  toggleTask
);

// DELETE /api/v1/tasks/:id - Delete task
router.delete('/:id', 
  validateTaskId, 
  deleteTask
);

export default router;