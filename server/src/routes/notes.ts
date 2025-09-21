import { Router } from 'express';
import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
  getNotesByCategory,
  getNoteTags,
  getNoteStats,
  toggleArchive,
  duplicateNote
} from '@/controllers/notesController';
import { authenticate } from '@/middleware/auth';
import {
  validateCreateNote,
  validateUpdateNote,
  validateNoteId
} from '@/middleware/validation';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// GET /api/v1/notes - Get all notes
router.get('/', getNotes);

// GET /api/v1/notes/search - Search notes
router.get('/search', searchNotes);

// GET /api/v1/notes/stats - Get note statistics
router.get('/stats', getNoteStats);

// GET /api/v1/notes/tags - Get all unique tags
router.get('/tags', getNoteTags);

// GET /api/v1/notes/category/:category - Get notes by category
router.get('/category/:category', getNotesByCategory);

// GET /api/v1/notes/:id - Get note by ID
router.get('/:id', 
  validateNoteId, 
  getNoteById
);

// POST /api/v1/notes - Create new note
router.post('/', validateCreateNote, createNote);

// PUT /api/v1/notes/:id - Update note
router.put('/:id', 
  validateNoteId, 
  validateUpdateNote, 
  updateNote
);

// PATCH /api/v1/notes/:id/archive - Toggle archive status
router.patch('/:id/archive',
  validateNoteId,
  toggleArchive
);

// POST /api/v1/notes/:id/duplicate - Duplicate note
router.post('/:id/duplicate',
  validateNoteId,
  duplicateNote
);

// DELETE /api/v1/notes/:id - Delete note
router.delete('/:id', 
  validateNoteId, 
  deleteNote
);

export default router;