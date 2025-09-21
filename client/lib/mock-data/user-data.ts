// Mock data for user-related functionality
// This provides sample data for development and testing

export interface MockStudyStats {
  totalStudyTime: number // in minutes
  sessionsToday: number
  currentStreak: number
  weeklyGoal: number
  weeklyProgress: number
  averageSessionLength: number
  favoriteSubjects: string[]
  totalSessions: number
  longestStreak: number
}

export interface MockAppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  notifications: {
    studyReminders: boolean
    achievements: boolean
    dailyGoals: boolean
    email: boolean
  }
  study: {
    defaultSessionLength: number
    shortBreakLength: number
    longBreakLength: number
    pomodoroCount: number
    autoStartBreaks: boolean
    autoStartSessions: boolean
  }
  privacy: {
    shareStats: boolean
    showOnLeaderboard: boolean
    allowDataCollection: boolean
  }
}

export interface MockGoal {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  category: 'study' | 'health' | 'personal' | 'academic'
  deadline: string
  isCompleted: boolean
  createdAt: string
}

export interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  sessionsUntilLongBreak: number
}

export interface PomodoroSession {
  id: string
  type: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  completed: boolean
  startedAt: string
  completedAt?: string
  notes?: string
  userId?: string
}

// Mock user data
export const mockUser = {
  id: 'user-123',
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatar: '/images/avatar-placeholder.jpg',
  createdAt: '2025-01-15T10:30:00Z',
  lastLoginAt: '2025-09-22T08:15:00Z',
  role: 'user' as const,
  preferences: {
    theme: 'system' as const,
    language: 'en',
    timezone: 'America/New_York'
  }
}

// Mock study statistics
export const mockStudyStats: MockStudyStats = {
  totalStudyTime: 2847, // in minutes (47.5 hours)
  sessionsToday: 3,
  currentStreak: 7, // days
  weeklyGoal: 1200, // minutes (20 hours)
  weeklyProgress: 856, // minutes completed this week
  averageSessionLength: 45, // minutes
  favoriteSubjects: ['Mathematics', 'Computer Science', 'Physics'],
  totalSessions: 89,
  longestStreak: 21 // days
}

// Mock app settings
export const defaultAppSettings: MockAppSettings = {
  theme: 'system',
  language: 'en',
  notifications: {
    studyReminders: true,
    achievements: true,
    dailyGoals: true,
    email: false
  },
  study: {
    defaultSessionLength: 25, // minutes
    shortBreakLength: 5, // minutes
    longBreakLength: 15, // minutes
    pomodoroCount: 4, // sessions before long break
    autoStartBreaks: false,
    autoStartSessions: false
  },
  privacy: {
    shareStats: true,
    showOnLeaderboard: true,
    allowDataCollection: true
  }
}

// Mock goals
export const mockGoals: MockGoal[] = [
  {
    id: 'goal-1',
    title: 'Study 20 hours this week',
    description: 'Complete 20 hours of focused study sessions this week',
    targetValue: 1200, // minutes
    currentValue: 856, // minutes
    unit: 'minutes',
    category: 'study',
    deadline: '2025-09-28T23:59:59Z',
    isCompleted: false,
    createdAt: '2025-09-16T09:00:00Z'
  },
  {
    id: 'goal-2',
    title: 'Maintain 30-day study streak',
    description: 'Study for at least 25 minutes every day for 30 days',
    targetValue: 30,
    currentValue: 7,
    unit: 'days',
    category: 'study',
    deadline: '2025-10-22T23:59:59Z',
    isCompleted: false,
    createdAt: '2025-09-15T10:00:00Z'
  },
  {
    id: 'goal-3',
    title: 'Complete Math Course',
    description: 'Finish all modules in Advanced Calculus course',
    targetValue: 100,
    currentValue: 75,
    unit: 'percent',
    category: 'academic',
    deadline: '2025-12-15T23:59:59Z',
    isCompleted: false,
    createdAt: '2025-08-01T12:00:00Z'
  },
  {
    id: 'goal-4',
    title: 'Read 2 Research Papers',
    description: 'Read and summarize 2 academic papers this month',
    targetValue: 2,
    currentValue: 2,
    unit: 'papers',
    category: 'academic',
    deadline: '2025-09-30T23:59:59Z',
    isCompleted: true,
    createdAt: '2025-09-01T14:00:00Z'
  }
]

// Mock timer settings
export const defaultTimerSettings: TimerSettings = {
  workDuration: 25, // minutes
  shortBreakDuration: 5, // minutes
  longBreakDuration: 15, // minutes
  autoStartBreaks: false,
  autoStartPomodoros: false,
  sessionsUntilLongBreak: 4
}

// Mock pomodoro sessions
export const mockPomodoroSessions: PomodoroSession[] = [
  {
    id: 'session-1',
    type: 'work',
    duration: 25,
    completed: true,
    startedAt: '2025-09-22T09:00:00Z',
    completedAt: '2025-09-22T09:25:00Z',
    notes: 'Studied calculus chapter 3',
    userId: 'user-123'
  },
  {
    id: 'session-2',
    type: 'shortBreak',
    duration: 5,
    completed: true,
    startedAt: '2025-09-22T09:25:00Z',
    completedAt: '2025-09-22T09:30:00Z',
    userId: 'user-123'
  },
  {
    id: 'session-3',
    type: 'work',
    duration: 25,
    completed: true,
    startedAt: '2025-09-22T09:30:00Z',
    completedAt: '2025-09-22T09:55:00Z',
    notes: 'Worked on physics problems',
    userId: 'user-123'
  },
  {
    id: 'session-4',
    type: 'shortBreak',
    duration: 5,
    completed: false,
    startedAt: '2025-09-22T09:55:00Z',
    userId: 'user-123'
  }
]

const userData = {
  mockUser,
  mockStudyStats,
  defaultAppSettings,
  mockGoals,
  defaultTimerSettings,
  mockPomodoroSessions
}

export default userData