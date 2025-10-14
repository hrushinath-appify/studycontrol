import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';

// In-memory storage for demo purposes
// In production, this would use a database
const userFocusSessions: Record<string, any[]> = {};
const userTimerSettings: Record<string, any> = {};

// Default timer settings
const defaultTimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  sessionsUntilLongBreak: 4,
  soundEnabled: true,
  notificationsEnabled: true
};

// Get user's timer settings
export const getTimerSettings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    
    const settings = userTimerSettings[userId] || defaultTimerSettings;

    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching timer settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch timer settings'
    });
  }
};

// Update user's timer settings
export const updateTimerSettings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const updateData = req.body;

    const currentSettings = userTimerSettings[userId] || defaultTimerSettings;
    const updatedSettings = { ...currentSettings, ...updateData };

    userTimerSettings[userId] = updatedSettings;

    res.json({
      success: true,
      data: updatedSettings,
      message: 'Timer settings updated successfully'
    });
  } catch (error) {
    console.error('Error updating timer settings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update timer settings'
    });
  }
};

// Start a focus session
export const startFocusSession = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { type, duration } = req.body;

    const session = {
      id: Date.now().toString(),
      type: type || 'work',
      duration: duration || 25,
      actualDuration: 0,
      completed: false,
      startedAt: new Date(),
      userId
    };

    if (!userFocusSessions[userId]) {
      userFocusSessions[userId] = [];
    }

    userFocusSessions[userId].push(session);

    res.status(201).json({
      success: true,
      data: session,
      message: 'Focus session started successfully'
    });
  } catch (error) {
    console.error('Error starting focus session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start focus session'
    });
  }
};

// Complete a focus session
export const completeFocusSession = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { id } = req.params;
    const { actualDuration, notes } = req.body;

    const sessions = userFocusSessions[userId] || [];
    const sessionIndex = sessions.findIndex(session => session.id === id);

    if (sessionIndex === -1) {
      res.status(404).json({
        success: false,
        error: 'Focus session not found'
      });
      return;
    }

    const session = sessions[sessionIndex];
    session.completed = true;
    session.completedAt = new Date();
    session.actualDuration = actualDuration || session.duration;
    session.notes = notes;

    sessions[sessionIndex] = session;

    res.json({
      success: true,
      data: session,
      message: 'Focus session completed successfully'
    });
  } catch (error) {
    console.error('Error completing focus session:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to complete focus session'
    });
  }
};

// Get focus sessions
export const getFocusSessions = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const {
      limit = 50,
      page = 1,
      type,
      dateFrom,
      dateTo
    } = req.query;

    let sessions = userFocusSessions[userId] || [];

    // Apply filters
    if (type) {
      sessions = sessions.filter(session => session.type === type);
    }

    if (dateFrom) {
      const fromDate = new Date(dateFrom as string);
      sessions = sessions.filter(session => new Date(session.startedAt) >= fromDate);
    }

    if (dateTo) {
      const toDate = new Date(dateTo as string);
      sessions = sessions.filter(session => new Date(session.startedAt) <= toDate);
    }

    // Sort by start date (newest first)
    sessions.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

    // Pagination
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = startIndex + Number(limit);
    const paginatedSessions = sessions.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: paginatedSessions,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: sessions.length,
        totalPages: Math.ceil(sessions.length / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching focus sessions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch focus sessions'
    });
  }
};

// Get focus statistics
export const getFocusStats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const sessions = userFocusSessions[userId] || [];

    const completedSessions = sessions.filter(session => session.completed);
    const workSessions = completedSessions.filter(session => session.type === 'work');
    
    const totalSessions = completedSessions.length;
    const totalWorkTime = workSessions.reduce((sum, session) => sum + session.actualDuration, 0);
    const averageSessionDuration = totalSessions > 0 ? totalWorkTime / workSessions.length : 0;

    // Today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysSessions = completedSessions.filter(session => 
      new Date(session.startedAt) >= today
    );
    const todaysWorkTime = todaysSessions
      .filter(session => session.type === 'work')
      .reduce((sum, session) => sum + session.actualDuration, 0);

    // This week's stats
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekSessions = completedSessions.filter(session => 
      new Date(session.startedAt) >= oneWeekAgo
    );
    const weekWorkTime = weekSessions
      .filter(session => session.type === 'work')
      .reduce((sum, session) => sum + session.actualDuration, 0);

    // Streak calculation (consecutive days with at least one work session)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Get unique dates with work sessions
    const workDates = workSessions
      .map(session => new Date(session.startedAt).toDateString())
      .filter((date, index, array) => array.indexOf(date) === index)
      .sort()
      .reverse();

    // Calculate current streak
    const todayString = new Date().toDateString();
    const yesterdayString = new Date(Date.now() - 86400000).toDateString();
    
    if (workDates.includes(todayString) || workDates.includes(yesterdayString)) {
      let checkDate = workDates.includes(todayString) ? todayString : yesterdayString;
      let checkIndex = workDates.indexOf(checkDate);
      
      while (checkIndex !== -1) {
        currentStreak++;
        const nextDate = new Date(checkDate);
        nextDate.setDate(nextDate.getDate() - 1);
        const nextDateString = nextDate.toDateString();
        
        if (workDates.includes(nextDateString)) {
          checkDate = nextDateString;
          checkIndex = workDates.indexOf(checkDate);
        } else {
          break;
        }
      }
    }

    res.json({
      success: true,
      data: {
        totalSessions,
        totalWorkTime,
        averageSessionDuration: Math.round(averageSessionDuration),
        todaysWorkTime,
        todaysSessions: todaysSessions.length,
        weekWorkTime,
        weekSessions: weekSessions.length,
        currentStreak,
        longestStreak: Math.max(longestStreak, currentStreak),
        completionRate: sessions.length > 0 ? Math.round((completedSessions.length / sessions.length) * 100) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching focus stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch focus statistics'
    });
  }
};