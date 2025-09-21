import { Request, Response } from 'express';
import { Task } from '@/models/Task';
import { AuthenticatedRequest } from '@/types';

// Get all tasks for the authenticated user
export const getTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const {
      limit = 50,
      page = 1,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      category,
      priority,
      completed,
      overdue
    } = req.query;

    const filter: any = { userId };

    // Apply filters
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === 'true';

    // Handle overdue filter
    if (overdue === 'true') {
      filter.completed = false;
      filter.dueDate = { $lt: new Date() };
    }

    const sortOptions: any = {};
    sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);

    const [tasksRaw, total] = await Promise.all([
      Task.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Task.countDocuments(filter)
    ]);

    // Transform _id to id for all tasks
    const tasks = tasksRaw.map((task: any) => ({
      ...task,
      id: task._id.toString(),
      _id: undefined
    }));

    res.json({
      success: true,
      data: tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks'
    });
  }
};

// Get task by ID
export const getTaskById = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const taskRaw = await Task.findOne({ _id: id, userId }).lean();

    if (!taskRaw) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    // Transform _id to id
    const task = {
      ...taskRaw,
      id: taskRaw._id.toString(),
      _id: undefined
    };

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task'
    });
  }
};

// Create new task
export const createTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { title, description, priority, category, dueDate, tags } = req.body;

    const task = new Task({
      userId,
      title,
      description,
      priority,
      category,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      tags: tags || []
    });

    await task.save();

    // Convert to JSON to apply transformations
    const taskData = task.toJSON();

    res.status(201).json({
      success: true,
      data: taskData,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create task'
    });
  }
};

// Update task
export const updateTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const updateData = req.body;

    // Handle completion status change
    if (updateData.completed !== undefined) {
      if (updateData.completed && !updateData.completedAt) {
        updateData.completedAt = new Date();
      } else if (!updateData.completed) {
        updateData.completedAt = undefined;
      }
    }

    const taskRaw = await Task.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!taskRaw) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    // Transform _id to id
    const task = {
      ...taskRaw,
      id: taskRaw._id.toString(),
      _id: undefined
    };

    res.json({
      success: true,
      data: task,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update task'
    });
  }
};

// Delete task
export const deleteTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete task'
    });
  }
};

// Toggle task completion
export const toggleTask = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const task = await Task.findOne({ _id: id, userId });

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date() : undefined;

    await task.save();

    // Manual transformation to avoid toJSON issues
    const taskResponse = {
      id: task._id.toString(),
      title: task.title,
      description: task.description,
      completed: task.completed,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      completedAt: task.completedAt,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      tags: task.tags,
      status: task.status
    };

    res.json({
      success: true,
      data: taskResponse,
      message: 'Task toggled successfully'
    });
  } catch (error) {
    console.error('Error toggling task:', error);
    // Check if response was already sent
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        error: 'Failed to toggle task'
      });
    }
  }
};

// Search tasks
export const searchTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { q, category, priority, completed } = req.query;

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
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q as string, 'i')] } }
      ]
    };

    // Apply additional filters
    if (category) filter.category = category;
    if (priority) filter.priority = priority;
    if (completed !== undefined) filter.completed = completed === 'true';

    const tasksRaw = await Task.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    // Transform _id to id for all tasks
    const tasks = tasksRaw.map((task: any) => ({
      ...task,
      id: task._id.toString(),
      _id: undefined
    }));

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error searching tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search tasks'
    });
  }
};

// Get task statistics
export const getTaskStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const [total, completed, todayCompleted, weekCompleted, overdue] = await Promise.all([
      Task.countDocuments({ userId }),
      Task.countDocuments({ userId, completed: true }),
      Task.countDocuments({
        userId,
        completed: true,
        completedAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }),
      Task.countDocuments({
        userId,
        completed: true,
        completedAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }),
      Task.countDocuments({
        userId,
        completed: false,
        dueDate: { $lt: new Date() }
      })
    ]);

    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      success: true,
      data: {
        total,
        completed,
        pending,
        completionRate,
        todayCompleted,
        weekCompleted,
        overdue
      }
    });
  } catch (error) {
    console.error('Error fetching task stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch task statistics'
    });
  }
};

// Get tasks by category
export const getTasksByCategory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const userId = req.user!.id;

    const tasksRaw = await Task.find({ userId, category })
      .sort({ createdAt: -1 })
      .lean();

    // Transform _id to id for all tasks
    const tasks = tasksRaw.map((task: any) => ({
      ...task,
      id: task._id.toString(),
      _id: undefined
    }));

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching tasks by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tasks by category'
    });
  }
};

// Get overdue tasks
export const getOverdueTasks = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;

    const tasksRaw = await Task.find({
      userId,
      completed: false,
      dueDate: { $lt: new Date() }
    })
      .sort({ dueDate: 1 })
      .lean();

    // Transform _id to id for all tasks
    const tasks = tasksRaw.map((task: any) => ({
      ...task,
      id: task._id.toString(),
      _id: undefined
    }));

    res.json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.error('Error fetching overdue tasks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch overdue tasks'
    });
  }
};