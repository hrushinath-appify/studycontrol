import { Router, Request, Response } from 'express';
import { MarrowProgress } from '../models/MarrowProgress';
import { UserStats } from '../models/UserStats';
import { authenticate } from '../middleware/auth';
import { Types } from 'mongoose';

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// =============================================================================
// GET /api/marrow-progress - Get user's marrow progress
// =============================================================================
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const progress = await MarrowProgress.getUserProgress(new Types.ObjectId(userId));
    
    // Convert to a simple object format for frontend
    const progressMap: Record<string, boolean> = {};
    progress.forEach((item: any) => {
      progressMap[item.topicId] = item.completed;
    });

    res.json({
      success: true,
      data: {
        progress: progressMap,
        details: progress
      }
    });
  } catch (error) {
    console.error('Error fetching marrow progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch marrow progress'
    });
  }
});

// =============================================================================
// POST /api/marrow-progress - Update topic progress
// =============================================================================
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const {
      topicId,
      completed,
      subject,
      chapter,
      topicTitle,
      timeSpent,
      difficulty,
      estimatedTime
    } = req.body;

    if (!topicId || completed === undefined || !subject || !chapter || !topicTitle) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: topicId, completed, subject, chapter, topicTitle'
      });
    }

    // Find existing progress or create new one
    let progressItem = await MarrowProgress.findOne({
      userId: new Types.ObjectId(userId),
      topicId
    });

    if (progressItem) {
      // Update existing progress
      progressItem.completed = completed;
      progressItem.subject = subject;
      progressItem.chapter = chapter;
      progressItem.topicTitle = topicTitle;
      
      if (timeSpent !== undefined) progressItem.timeSpent = timeSpent;
      if (difficulty !== undefined) progressItem.difficulty = difficulty;
      if (estimatedTime !== undefined) progressItem.estimatedTime = estimatedTime;
      
      if (completed) {
        progressItem.completed = true;
        progressItem.completedAt = new Date();
        if (timeSpent !== undefined) progressItem.timeSpent = timeSpent;
      } else {
        progressItem.completed = false;
        progressItem.completedAt = undefined;
      }
      await progressItem.save();
    } else {
      // Create new progress item
      progressItem = new MarrowProgress({
        userId: new Types.ObjectId(userId),
        topicId,
        completed,
        subject,
        chapter,
        topicTitle,
        timeSpent,
        difficulty,
        estimatedTime
      });
      
      if (completed) {
        progressItem.completedAt = new Date();
      }
      
      await progressItem.save();
    }

    res.json({
      success: true,
      data: progressItem,
      message: `Topic ${completed ? 'completed' : 'marked as incomplete'}`
    });
  } catch (error) {
    console.error('Error updating marrow progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update marrow progress'
    });
  }
});

// =============================================================================
// GET /api/marrow-progress/stats - Get user's marrow progress statistics
// =============================================================================
router.get('/stats', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const objectId = new Types.ObjectId(userId);
    
    // Get overall progress stats
    const overallStats = await MarrowProgress.getProgressStats(objectId);
    
    // Get subject-wise stats
    const subjectStats = await MarrowProgress.getSubjectStats(objectId);
    
    // Get recent activity (last 10 completed topics)
    const recentActivity = await MarrowProgress.find({
      userId: objectId,
      completed: true
    })
    .sort({ completedAt: -1 })
    .limit(10)
    .select('topicId topicTitle subject chapter completedAt timeSpent');

    // Get chapter-wise progress
    const chapterStats = await MarrowProgress.aggregate([
      { $match: { userId: objectId } },
      {
        $group: {
          _id: { subject: '$subject', chapter: '$chapter' },
          totalTopics: { $sum: 1 },
          completedTopics: {
            $sum: { $cond: [{ $eq: ['$completed', true] }, 1, 0] }
          },
          totalTimeSpent: { $sum: '$timeSpent' }
        }
      },
      {
        $project: {
          subject: '$_id.subject',
          chapter: '$_id.chapter',
          totalTopics: 1,
          completedTopics: 1,
          completionPercentage: {
            $multiply: [
              { $divide: ['$completedTopics', '$totalTopics'] },
              100
            ]
          },
          totalTimeSpent: 1
        }
      },
      { $sort: { subject: 1, chapter: 1 } }
    ]);

    res.json({
      success: true,
      data: {
        overall: overallStats[0] || {
          totalTopics: 0,
          completedTopics: 0,
          completionPercentage: 0,
          totalTimeSpent: 0,
          averageTimePerTopic: 0
        },
        subjects: subjectStats,
        chapters: chapterStats,
        recentActivity
      }
    });
  } catch (error) {
    console.error('Error fetching marrow progress stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch marrow progress statistics'
    });
  }
});

// =============================================================================
// GET /api/marrow-progress/subject/:subject - Get progress for specific subject
// =============================================================================
router.get('/subject/:subject', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { subject } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const progress = await MarrowProgress.getUserProgressBySubject(
      new Types.ObjectId(userId),
      subject
    );

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Error fetching subject progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subject progress'
    });
  }
});

// =============================================================================
// DELETE /api/marrow-progress/:topicId - Reset specific topic progress
// =============================================================================
router.delete('/:topicId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { topicId } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const deleted = await MarrowProgress.findOneAndDelete({
      userId: new Types.ObjectId(userId),
      topicId
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Progress item not found'
      });
    }

    res.json({
      success: true,
      message: 'Topic progress reset successfully'
    });
  } catch (error) {
    console.error('Error deleting marrow progress:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset topic progress'
    });
  }
});

// =============================================================================
// POST /api/marrow-progress/bulk - Bulk update multiple topics
// =============================================================================
router.post('/bulk', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: 'User not authenticated'
      });
    }

    const { updates } = req.body;
    
    if (!Array.isArray(updates)) {
      return res.status(400).json({
        success: false,
        error: 'Updates must be an array'
      });
    }

    const results = [];
    const objectId = new Types.ObjectId(userId);

    for (const update of updates) {
      const {
        topicId,
        completed,
        subject,
        chapter,
        topicTitle,
        timeSpent,
        difficulty,
        estimatedTime
      } = update;

      if (!topicId || completed === undefined) {
        continue; // Skip invalid updates
      }

      try {
        let progressItem = await MarrowProgress.findOne({
          userId: objectId,
          topicId
        });

        if (progressItem) {
          progressItem.completed = completed;
          if (subject) progressItem.subject = subject;
          if (chapter) progressItem.chapter = chapter;
          if (topicTitle) progressItem.topicTitle = topicTitle;
          if (timeSpent !== undefined) progressItem.timeSpent = timeSpent;
          if (difficulty !== undefined) progressItem.difficulty = difficulty;
          if (estimatedTime !== undefined) progressItem.estimatedTime = estimatedTime;
          
          if (completed) {
            progressItem.completed = true;
            progressItem.completedAt = new Date();
            if (timeSpent !== undefined) progressItem.timeSpent = timeSpent;
          } else {
            progressItem.completed = false;
            progressItem.completedAt = undefined;
          }
          await progressItem.save();
        } else {
          progressItem = new MarrowProgress({
            userId: objectId,
            topicId,
            completed,
            subject: subject || 'Unknown',
            chapter: chapter || 'General',
            topicTitle: topicTitle || 'Unknown Topic',
            timeSpent,
            difficulty,
            estimatedTime
          });
          
          if (completed) {
            progressItem.completedAt = new Date();
          }
          
          await progressItem.save();
        }

        results.push({
          topicId,
          success: true,
          completed: progressItem.completed
        });
      } catch (itemError) {
        console.error(`Error updating topic ${topicId}:`, itemError);
        results.push({
          topicId,
          success: false,
          error: 'Failed to update topic'
        });
      }
    }

    res.json({
      success: true,
      data: results,
      message: `Bulk update completed. ${results.filter(r => r.success).length}/${results.length} topics updated successfully.`
    });
  } catch (error) {
    console.error('Error in bulk update:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to perform bulk update'
    });
  }
});

export default router;
