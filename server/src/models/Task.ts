import mongoose, { Schema, model } from 'mongoose';
import { ITask } from '@/types';

const subtaskSchema = new Schema({
  id: {
    type: String,
    required: true,
    default: () => new mongoose.Types.ObjectId().toString(),
  },
  title: {
    type: String,
    required: [true, 'Subtask title is required'],
    trim: true,
    maxlength: [200, 'Subtask title cannot exceed 200 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { _id: false });

const taskSchema = new Schema<ITask>(
  {
    userId: {
      type: String,
      required: [true, 'User ID is required'],
      ref: 'User',
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [1, 'Title must be at least 1 character long'],
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
      required: [true, 'Priority is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function(v: Date) {
          return !v || v > new Date();
        },
        message: 'Due date must be in the future',
      },
    },
    completedAt: {
      type: Date,
    },
    tags: [{
      type: String,
      trim: true,
      maxlength: [30, 'Tag cannot exceed 30 characters'],
    }],
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters'],
    },
    estimatedTime: {
      type: Number,
      min: [1, 'Estimated time must be at least 1 minute'],
      max: [1440, 'Estimated time cannot exceed 1440 minutes (24 hours)'],
    },
    actualTime: {
      type: Number,
      min: [0, 'Actual time cannot be negative'],
      max: [1440, 'Actual time cannot exceed 1440 minutes (24 hours)'],
    },
    subtasks: [subtaskSchema],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: function(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes for better query performance
taskSchema.index({ userId: 1, createdAt: -1 });
taskSchema.index({ userId: 1, status: 1 });
taskSchema.index({ userId: 1, priority: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });
taskSchema.index({ userId: 1, category: 1 });
taskSchema.index({ userId: 1, tags: 1 });
taskSchema.index({ userId: 1, completed: 1 });

// Pre-save middleware
taskSchema.pre('save', function (next) {
  // Auto-update status based on completion
  if (this.isModified('completed')) {
    if (this.completed) {
      this.status = 'completed';
      this.completedAt = new Date();
    } else if (this.status === 'completed') {
      this.status = 'pending';
      this.completedAt = undefined;
    }
  }
  
  // Ensure tags are unique and lowercase
  if (this.isModified('tags')) {
    this.tags = [...new Set(this.tags.map(tag => tag.toLowerCase().trim()))];
  }
  
  // Update completion status based on subtasks
  if (this.isModified('subtasks')) {
    const totalSubtasks = this.subtasks.length;
    const completedSubtasks = this.subtasks.filter(subtask => subtask.completed).length;
    
    if (totalSubtasks > 0 && completedSubtasks === totalSubtasks && !this.completed) {
      this.completed = true;
      this.status = 'completed';
      this.completedAt = new Date();
    }
  }
  
  next();
});

// Static method to get tasks by user with pagination and filters
taskSchema.statics.findByUserPaginated = function(
  userId: string,
  page: number = 1,
  limit: number = 10,
  filters: any = {},
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc'
) {
  const skip = (page - 1) * limit;
  const query = { userId, ...filters };
  const sort: any = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
  
  return this.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

// Static method to get overdue tasks
taskSchema.statics.getOverdueTasks = function(userId: string) {
  return this.find({
    userId,
    dueDate: { $lt: new Date() },
    completed: false,
    status: { $ne: 'cancelled' }
  })
  .sort({ dueDate: 1 })
  .lean();
};

// Static method to get task statistics
taskSchema.statics.getUserTaskStats = async function(userId: string) {
  const stats = await this.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
        },
        pending: {
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
        },
        inProgress: {
          $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
        },
        overdue: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $lt: ['$dueDate', new Date()] },
                  { $eq: ['$completed', false] },
                  { $ne: ['$status', 'cancelled'] }
                ]
              },
              1,
              0
            ]
          }
        },
        byPriority: {
          $push: '$priority'
        },
        byCategory: {
          $push: '$category'
        }
      }
    }
  ]);
  
  return stats[0] || {
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    overdue: 0,
    byPriority: [],
    byCategory: []
  };
};

// Static method to search tasks
taskSchema.statics.searchTasks = function(
  userId: string,
  searchTerm: string,
  options: any = {}
) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  
  return this.find({
    userId,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { category: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .lean();
};

// Instance method to get completion percentage
taskSchema.methods.getCompletionPercentage = function(): number {
  if (this.subtasks.length === 0) {
    return this.completed ? 100 : 0;
  }
  
  const completedSubtasks = this.subtasks.filter((subtask: any) => subtask.completed).length;
  return Math.round((completedSubtasks / this.subtasks.length) * 100);
};

// Instance method to check if task is overdue
taskSchema.methods.isOverdue = function(): boolean {
  return !!(this.dueDate && this.dueDate < new Date() && !this.completed);
};

// Virtual for days until due
taskSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) return null;
  
  const today = new Date();
  const due = new Date(this.dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
});

// Virtual for progress percentage
taskSchema.virtual('progressPercentage').get(function() {
  if (this.subtasks.length === 0) {
    return this.completed ? 100 : 0;
  }
  
  const completedSubtasks = this.subtasks.filter(subtask => subtask.completed).length;
  return Math.round((completedSubtasks / this.subtasks.length) * 100);
});

export const Task = model<ITask>('Task', taskSchema);
export default Task;
