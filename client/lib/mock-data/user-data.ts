// Mock data for user-related information
// Used across various components for demo purposes

export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'student' | 'teacher' | 'admin'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
    studyReminders: boolean
    language: string
  }
  profile: {
    institution?: string
    course?: string
    year?: number
    specialization?: string
    goals?: string[]
  }
  stats: {
    studyStreak: number
    totalStudyHours: number
    completedTasks: number
    notesCreated: number
  }
}

export const mockUser: MockUser = {
  id: 'user-1',
  name: 'Ammu',
  email: 'ammu@studycontrol.com',
  avatar: 'https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=ammu',
  role: 'student',
  preferences: {
    theme: 'system',
    notifications: true,
    studyReminders: true,
    language: 'en'
  },
  profile: {
    institution: 'Kakatiya Medical College',
    course: 'MBBS',
    year: 2,
    specialization: 'General Medicine',
    goals: [
      'Score below 3,000 rank in NEET PG',
      'Complete MBBS with distinction',
      'Develop strong clinical skills',
      'Maintain work-life balance'
    ]
  },
  stats: {
    studyStreak: 7,
    totalStudyHours: 245,
    completedTasks: 89,
    notesCreated: 34
  }
}

// Timer/Focus session related mock data
export interface MockTimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  sessionsUntilLongBreak: number
}

export const defaultTimerSettings: MockTimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  sessionsUntilLongBreak: 4
}

export interface MockPomodoroSession {
  id: string
  type: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  completed: boolean
  startedAt: string
  completedAt?: string
  notes?: string
}

export const mockPomodoroSessions: MockPomodoroSession[] = [
  {
    id: 'session-1',
    type: 'work',
    duration: 25,
    completed: true,
    startedAt: '2024-01-15T09:00:00.000Z',
    completedAt: '2024-01-15T09:25:00.000Z',
    notes: 'Studied organic chemistry - reaction mechanisms'
  },
  {
    id: 'session-2',
    type: 'shortBreak',
    duration: 5,
    completed: true,
    startedAt: '2024-01-15T09:25:00.000Z',
    completedAt: '2024-01-15T09:30:00.000Z'
  },
  {
    id: 'session-3',
    type: 'work',
    duration: 25,
    completed: true,
    startedAt: '2024-01-15T09:30:00.000Z',
    completedAt: '2024-01-15T09:55:00.000Z',
    notes: 'Physics - quantum mechanics problems'
  },
  {
    id: 'session-4',
    type: 'shortBreak',
    duration: 5,
    completed: false,
    startedAt: '2024-01-15T09:55:00.000Z'
  }
]

// Study statistics and analytics
export interface MockStudyStats {
  daily: {
    date: string
    studyMinutes: number
    tasksCompleted: number
    focusSessions: number
  }[]
  weekly: {
    week: string
    totalHours: number
    averageDaily: number
    productivity: number
  }[]
  subjects: {
    name: string
    hoursSpent: number
    progress: number
    lastStudied: string
  }[]
}

export const mockStudyStats: MockStudyStats = {
  daily: [
    { date: '2024-01-15', studyMinutes: 180, tasksCompleted: 5, focusSessions: 7 },
    { date: '2024-01-14', studyMinutes: 150, tasksCompleted: 3, focusSessions: 6 },
    { date: '2024-01-13', studyMinutes: 120, tasksCompleted: 4, focusSessions: 5 },
    { date: '2024-01-12', studyMinutes: 200, tasksCompleted: 6, focusSessions: 8 },
    { date: '2024-01-11', studyMinutes: 90, tasksCompleted: 2, focusSessions: 4 },
    { date: '2024-01-10', studyMinutes: 160, tasksCompleted: 5, focusSessions: 6 },
    { date: '2024-01-09', studyMinutes: 140, tasksCompleted: 3, focusSessions: 5 }
  ],
  weekly: [
    { week: 'Week 3', totalHours: 20.5, averageDaily: 2.9, productivity: 85 },
    { week: 'Week 2', totalHours: 18.2, averageDaily: 2.6, productivity: 78 },
    { week: 'Week 1', totalHours: 22.1, averageDaily: 3.2, productivity: 92 }
  ],
  subjects: [
    { name: 'Organic Chemistry', hoursSpent: 45, progress: 78, lastStudied: '2024-01-15' },
    { name: 'Physics', hoursSpent: 38, progress: 65, lastStudied: '2024-01-15' },
    { name: 'Mathematics', hoursSpent: 42, progress: 82, lastStudied: '2024-01-14' },
    { name: 'Biology', hoursSpent: 35, progress: 70, lastStudied: '2024-01-13' },
    { name: 'English', hoursSpent: 25, progress: 88, lastStudied: '2024-01-12' }
  ]
}

// Application preferences and settings
export interface MockAppSettings {
  notifications: {
    studyReminders: boolean
    breakReminders: boolean
    dailyGoals: boolean
    weeklyReports: boolean
  }
  appearance: {
    theme: 'light' | 'dark' | 'system'
    fontSize: 'small' | 'medium' | 'large'
    compactMode: boolean
  }
  study: {
    defaultFocusTime: number
    autoStartBreaks: boolean
    soundEnabled: boolean
    backgroundSounds: string
  }
  privacy: {
    shareProgress: boolean
    publicProfile: boolean
    dataCollection: boolean
  }
}

export const defaultAppSettings: MockAppSettings = {
  notifications: {
    studyReminders: true,
    breakReminders: true,
    dailyGoals: true,
    weeklyReports: false
  },
  appearance: {
    theme: 'system',
    fontSize: 'medium',
    compactMode: false
  },
  study: {
    defaultFocusTime: 25,
    autoStartBreaks: false,
    soundEnabled: true,
    backgroundSounds: 'nature'
  },
  privacy: {
    shareProgress: false,
    publicProfile: false,
    dataCollection: true
  }
}

// Goal tracking
export interface MockGoal {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  unit: string
  category: 'study' | 'health' | 'personal' | 'academic'
  deadline: string
  priority: 'low' | 'medium' | 'high'
  status: 'active' | 'completed' | 'paused'
  createdAt: string
}

export const mockGoals: MockGoal[] = [
  {
    id: 'goal-1',
    title: 'NEET PG Preparation',
    description: 'Achieve rank below 3,000 in NEET PG examination',
    targetValue: 3000,
    currentValue: 0,
    unit: 'rank',
    category: 'academic',
    deadline: '2024-12-31',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'goal-2',
    title: 'Daily Study Hours',
    description: 'Maintain 4 hours of focused study daily',
    targetValue: 4,
    currentValue: 3.2,
    unit: 'hours',
    category: 'study',
    deadline: '2024-01-31',
    priority: 'high',
    status: 'active',
    createdAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: 'goal-3',
    title: 'Complete Organic Chemistry',
    description: 'Finish all topics in organic chemistry syllabus',
    targetValue: 100,
    currentValue: 78,
    unit: 'percent',
    category: 'academic',
    deadline: '2024-03-15',
    priority: 'medium',
    status: 'active',
    createdAt: '2024-01-05T00:00:00.000Z'
  }
]

// Utility functions
export const getUserProgress = (_userId: string = 'user-1') => {
  // In a real app, this would fetch from API based on userId
  return {
    user: mockUser,
    stats: mockStudyStats,
    goals: mockGoals,
    settings: defaultAppSettings
  }
}

export const getStudyStreakData = () => {
  const today = new Date()
  const streak = mockUser.stats.studyStreak
  
  return {
    currentStreak: streak,
    longestStreak: Math.max(streak, 14), // Mock longest streak
    lastStudyDate: today.toISOString().split('T')[0],
    totalStudyDays: 45 // Mock total study days
  }
}
