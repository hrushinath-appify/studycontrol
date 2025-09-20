// API service for focus/pomodoro sessions
// Handles timer settings and session tracking with fallback to localStorage

import { apiClient } from './index'
import { 
  defaultTimerSettings, 
  mockPomodoroSessions
} from '../mock-data/user-data'

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

export interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  sessionsUntilLongBreak: number
}

export interface FocusStats {
  totalSessions: number
  completedSessions: number
  totalFocusTime: number // in minutes
  averageSessionLength: number
  longestStreak: number
  currentStreak: number
  sessionsToday: number
  sessionsThisWeek: number
  productivityScore: number
}

export interface SessionApiParams {
  limit?: number
  page?: number
  dateFrom?: string
  dateTo?: string
  type?: PomodoroSession['type']
  completed?: boolean
}

export interface CreateSessionData {
  type: PomodoroSession['type']
  duration: number
  notes?: string
}

export interface UpdateSessionData {
  id: string
  completed?: boolean
  completedAt?: string
  notes?: string
}

export class FocusApi {
  private static readonly ENDPOINT = '/focus'
  private static readonly SESSIONS_STORAGE_KEY = 'pomodoroSessions'
  private static readonly SETTINGS_STORAGE_KEY = 'timerSettings'

  // Timer Settings Methods
  static async getSettings(): Promise<TimerSettings> {
    try {
      const response = await apiClient.get<TimerSettings>(`${this.ENDPOINT}/settings`)
      return response.data || defaultTimerSettings
    } catch (error) {
      console.warn('Failed to fetch timer settings from API, using localStorage:', error)
      return this.getLocalSettings()
    }
  }

  static async updateSettings(settings: Partial<TimerSettings>): Promise<TimerSettings> {
    try {
      const response = await apiClient.put<TimerSettings>(`${this.ENDPOINT}/settings`, settings)
      return response.data!
    } catch (error) {
      console.warn('Failed to update timer settings via API, using localStorage:', error)
      return this.updateLocalSettings(settings)
    }
  }

  // Session Methods
  static async getSessions(params?: SessionApiParams): Promise<PomodoroSession[]> {
    try {
      const response = await apiClient.get<PomodoroSession[]>(`${this.ENDPOINT}/sessions`, params)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch sessions from API, using localStorage:', error)
      return this.getLocalSessions(params)
    }
  }

  static async getSessionById(id: string): Promise<PomodoroSession | null> {
    try {
      const response = await apiClient.get<PomodoroSession>(`${this.ENDPOINT}/sessions/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch session by ID from API, using localStorage:', error)
      const sessions = this.getLocalSessions()
      return sessions.find(session => session.id === id) || null
    }
  }

  static async createSession(data: CreateSessionData): Promise<PomodoroSession> {
    try {
      const response = await apiClient.post<PomodoroSession>(`${this.ENDPOINT}/sessions`, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to create session via API, using localStorage:', error)
      return this.createLocalSession(data)
    }
  }

  static async updateSession(data: UpdateSessionData): Promise<PomodoroSession> {
    try {
      const response = await apiClient.put<PomodoroSession>(`${this.ENDPOINT}/sessions/${data.id}`, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to update session via API, using localStorage:', error)
      return this.updateLocalSession(data)
    }
  }

  static async completeSession(id: string, notes?: string): Promise<PomodoroSession> {
    try {
      const response = await apiClient.patch<PomodoroSession>(`${this.ENDPOINT}/sessions/${id}/complete`, { notes })
      return response.data!
    } catch (error) {
      console.warn('Failed to complete session via API, using localStorage:', error)
      return this.updateLocalSession({
        id,
        completed: true,
        completedAt: new Date().toISOString(),
        ...(notes && { notes })
      })
    }
  }

  // Statistics Methods
  static async getStats(dateFrom?: string, dateTo?: string): Promise<FocusStats> {
    try {
      const response = await apiClient.get<FocusStats>(`${this.ENDPOINT}/stats`, { dateFrom, dateTo })
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch focus stats from API, calculating from localStorage:', error)
      return this.calculateLocalStats(dateFrom, dateTo)
    }
  }

  static async getTodayStats(): Promise<FocusStats> {
    const today = new Date().toISOString().split('T')[0]
    return this.getStats(today, today)
  }

  static async getWeeklyStats(): Promise<FocusStats> {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return this.getStats(weekAgo.toISOString().split('T')[0], today.toISOString().split('T')[0])
  }

  // Streak Methods
  static async getCurrentStreak(): Promise<number> {
    try {
      const response = await apiClient.get<{ streak: number }>(`${this.ENDPOINT}/streak`)
      return response.data?.streak || 0
    } catch (error) {
      console.warn('Failed to fetch streak from API, calculating from localStorage:', error)
      return this.calculateLocalStreak()
    }
  }

  // Private methods for localStorage fallback
  private static getLocalSettings(): TimerSettings {
    try {
      const stored = localStorage.getItem(this.SETTINGS_STORAGE_KEY)
      return stored ? { ...defaultTimerSettings, ...JSON.parse(stored) } : defaultTimerSettings
    } catch (error) {
      console.error('Failed to get local timer settings:', error)
      return defaultTimerSettings
    }
  }

  private static updateLocalSettings(settings: Partial<TimerSettings>): TimerSettings {
    try {
      const currentSettings = this.getLocalSettings()
      const updatedSettings = { ...currentSettings, ...settings }
      localStorage.setItem(this.SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings))
      return updatedSettings
    } catch (error) {
      console.error('Failed to update local timer settings:', error)
      return defaultTimerSettings
    }
  }

  private static getLocalSessions(params?: SessionApiParams): PomodoroSession[] {
    try {
      const stored = localStorage.getItem(this.SESSIONS_STORAGE_KEY)
      let sessions: PomodoroSession[] = stored ? JSON.parse(stored) : [...mockPomodoroSessions]

      // Apply filters
      if (params?.type) {
        sessions = sessions.filter(session => session.type === params.type)
      }

      if (params?.completed !== undefined) {
        sessions = sessions.filter(session => session.completed === params.completed)
      }

      if (params?.dateFrom) {
        sessions = sessions.filter(session => 
          new Date(session.startedAt) >= new Date(params.dateFrom!)
        )
      }

      if (params?.dateTo) {
        sessions = sessions.filter(session => 
          new Date(session.startedAt) <= new Date(params.dateTo!)
        )
      }

      // Sort by start time (newest first)
      sessions = sessions.sort((a, b) => 
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
      )

      if (params?.limit) {
        sessions = sessions.slice(0, params.limit)
      }

      return sessions
    } catch (error) {
      console.error('Failed to get local sessions:', error)
      return []
    }
  }

  private static createLocalSession(data: CreateSessionData): PomodoroSession {
    const sessions = this.getLocalSessions()
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: data.type,
      duration: data.duration,
      completed: false,
      startedAt: new Date().toISOString()
    }

    const updatedSessions = [newSession, ...sessions]
    localStorage.setItem(this.SESSIONS_STORAGE_KEY, JSON.stringify(updatedSessions))
    
    return newSession
  }

  private static updateLocalSession(data: UpdateSessionData): PomodoroSession {
    const sessions = this.getLocalSessions()
    const sessionIndex = sessions.findIndex(session => session.id === data.id)
    
    if (sessionIndex === -1) {
      throw new Error('Session not found')
    }

    const existingSession = sessions[sessionIndex]!
    const updatedSession: PomodoroSession = {
      id: existingSession.id,
      type: existingSession.type,
      duration: existingSession.duration,
      completed: data.completed ?? existingSession.completed,
      startedAt: existingSession.startedAt
    }

    sessions[sessionIndex] = updatedSession
    localStorage.setItem(this.SESSIONS_STORAGE_KEY, JSON.stringify(sessions))
    
    return updatedSession
  }

  private static calculateLocalStats(dateFrom?: string, dateTo?: string): FocusStats {
    let sessions = this.getLocalSessions()

    // Filter by date range if provided
    if (dateFrom) {
      sessions = sessions.filter(session => 
        new Date(session.startedAt) >= new Date(dateFrom)
      )
    }

    if (dateTo) {
      sessions = sessions.filter(session => 
        new Date(session.startedAt) <= new Date(dateTo)
      )
    }

    const totalSessions = sessions.length
    const completedSessions = sessions.filter(s => s.completed).length
    const workSessions = sessions.filter(s => s.type === 'work' && s.completed)
    const totalFocusTime = workSessions.reduce((sum, s) => sum + s.duration, 0)
    const averageSessionLength = completedSessions > 0 ? 
      sessions.filter(s => s.completed).reduce((sum, s) => sum + s.duration, 0) / completedSessions : 0

    // Calculate today's sessions
    const today = new Date().toDateString()
    const sessionsToday = sessions.filter(s => 
      new Date(s.startedAt).toDateString() === today
    ).length

    // Calculate this week's sessions
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const sessionsThisWeek = sessions.filter(s => 
      new Date(s.startedAt) >= oneWeekAgo
    ).length

    // Mock values for streak and productivity score
    const currentStreak = this.calculateLocalStreak()
    const longestStreak = Math.max(currentStreak, 14) // Mock longest streak
    const productivityScore = completedSessions > 0 ? 
      Math.round((completedSessions / totalSessions) * 100) : 0

    return {
      totalSessions,
      completedSessions,
      totalFocusTime,
      averageSessionLength: Math.round(averageSessionLength),
      longestStreak,
      currentStreak,
      sessionsToday,
      sessionsThisWeek,
      productivityScore
    }
  }

  private static calculateLocalStreak(): number {
    const sessions = this.getLocalSessions({ completed: true, type: 'work' })
    
    if (sessions.length === 0) return 0

    // Group sessions by date
    const sessionsByDate = new Map<string, number>()
    sessions.forEach(session => {
      const date = new Date(session.startedAt).toDateString()
      sessionsByDate.set(date, (sessionsByDate.get(date) || 0) + 1)
    })

    const dates = Array.from(sessionsByDate.keys()).sort((a, b) => 
      new Date(b).getTime() - new Date(a).getTime()
    )

    // Calculate current streak
    let streak = 0
    const today = new Date()
    
    for (let i = 0; i < dates.length; i++) {
      const expectedDate = new Date(today)
      expectedDate.setDate(today.getDate() - i)
      
      if (dates[i] === expectedDate.toDateString()) {
        streak++
      } else {
        break
      }
    }

    return streak
  }
}

// Export convenience functions
export const getSettings = FocusApi.getSettings
export const updateSettings = FocusApi.updateSettings
export const getSessions = FocusApi.getSessions
export const getSessionById = FocusApi.getSessionById
export const createSession = FocusApi.createSession
export const updateSession = FocusApi.updateSession
export const completeSession = FocusApi.completeSession
export const getStats = FocusApi.getStats
export const getTodayStats = FocusApi.getTodayStats
export const getWeeklyStats = FocusApi.getWeeklyStats
export const getCurrentStreak = FocusApi.getCurrentStreak
