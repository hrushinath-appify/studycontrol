import { Request, Response } from 'express';
import { Note } from '@/models/Note';
import { AuthenticatedRequest } from '@/types';

// Get all notes for the authenticated user
export const getNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id.toString();
    const {
      limit = 50,
      page = 1,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      category,
      tags,
      search
    } = req.query;


    // By default, do not filter out archived notes (show all)
    const filter: any = { userId };
    if (category) filter.category = category;
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filter.tags = { $in: tagArray };
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [notes, total] = await Promise.all([
      Note.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Note.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: notes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notes'
    });
  }
};

// Get note by ID
export const getNoteById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id.toString();

    const note = await Note.findOne({ _id: id, userId }).lean();

    if (!note) {
      res.status(404).json({
        success: false,
        error: 'Note not found'
      });
      return;
    }

    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch note'
    });
  }
};

// Create new note
export const createNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id.toString();
    const { title, content, category, tags, isPinned } = req.body;

    const note = new Note({
      userId,
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      isPinned: isPinned || false
    });

    await note.save();

    res.status(201).json({
      success: true,
      data: note,
      message: 'Note created successfully'
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create note'
    });
  }
};

// Update note
export const updateNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id.toString();
    const updateData = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId },
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean();

    if (!note) {
      res.status(404).json({
        success: false,
        error: 'Note not found'
      });
      return;
    }

    res.json({
      success: true,
      data: note,
      message: 'Note updated successfully'
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update note'
    });
  }
};

// Delete note
export const deleteNote = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id.toString();

    const note = await Note.findOneAndDelete({ _id: id, userId });

    if (!note) {
      res.status(404).json({
        success: false,
        error: 'Note not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete note'
    });
  }
};

// Toggle note pin status
export const togglePin = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!._id.toString();

    const note = await Note.findOne({ _id: id, userId });

    if (!note) {
      res.status(404).json({
        success: false,
        error: 'Note not found'
      });
      return;
    }

    note.isPinned = !note.isPinned;
    note.updatedAt = new Date();

    await note.save();

    res.json({
      success: true,
      data: note,
      message: 'Note pin status updated successfully'
    });
  } catch (error) {
    console.error('Error toggling note pin:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to toggle note pin'
    });
  }
};

// Search notes
export const searchNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id.toString();
    const { q, category, tags } = req.query;

    if (!q) {
      res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
      return;
    }

    const filter: any = {
      userId,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ]
    };

    // Apply additional filters
    if (category) filter.category = category;
    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : [tags];
      filter.tags = { $in: tagArray };
    }

    const notes = await Note.find(filter)
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search notes'
    });
  }
};

// Get notes by category
export const getNotesByCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const userId = req.user!._id.toString();

    const notes = await Note.find({ userId, category })
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Error fetching notes by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch notes by category'
    });
  }
};

// Get pinned notes
export const getPinnedNotes = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id.toString();

    const notes = await Note.find({ userId, isPinned: true })
      .sort({ updatedAt: -1 })
      .lean();

    res.json({
      success: true,
      data: notes
    });
  } catch (error) {
    console.error('Error fetching pinned notes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch pinned notes'
    });
  }
};

// Get all unique tags for user
export const getNoteTags = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id.toString();

    const tags = await Note.distinct('tags', { userId });

    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    console.error('Error fetching note tags:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch note tags'
    });
  }
};