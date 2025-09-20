// API service for user data and statistics
// Handles user preferences, goals, and analytics with fallback to localStorage

import { apiClient } from './index'
import { 
  mockUser, 
  mockStudyStats, 
  mockGoals, 
  defaultAppSettings,
  type MockStudyStats, 
  type MockAppSettings 
} from '../mock-data/user-data'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: boolean
  studyReminders: boolean
  language: string
}

export interface UserProfile {
  institution?: string
  course?: string
  year?: number
  specialization?: string
  goals?: string[]
}

export interface UserStats {
  studyStreak: number
  totalStudyHours: number
  completedTasks: number
  notesCreated: number
  averageStudyTime: number
  productivityScore: number
}

export interface Goal {
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

export interface CreateGoalData {
  title: string
  description: string
  targetValue: number
  unit: string
  category: Goal['category']
  deadline: string
  priority: Goal['priority']
}

export interface UpdateGoalData extends Partial<CreateGoalData> {
  id: string
  currentValue?: number
  status?: Goal['status']
}

export class UserApi {
  private static readonly ENDPOINT = '/user'
  private static readonly PREFERENCES_STORAGE_KEY = 'userPreferences'
  private static readonly PROFILE_STORAGE_KEY = 'userProfile'
  private static readonly GOALS_STORAGE_KEY = 'userGoals'
  private static readonly SETTINGS_STORAGE_KEY = 'appSettings'

  // User Preferences Methods
  static async getPreferences(): Promise<UserPreferences> {
    try {
      const response = await apiClient.get<UserPreferences>(`${this.ENDPOINT}/preferences`)
      return response.data || mockUser.preferences
    } catch (error) {
      console.warn('Failed to fetch preferences from API, using localStorage:', error)
      return this.getLocalPreferences()
    }
  }

  static async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const response = await apiClient.put<UserPreferences>(`${this.ENDPOINT}/preferences`, preferences)
      return response.data!
    } catch (error) {
      console.warn('Failed to update preferences via API, using localStorage:', error)
      return this.updateLocalPreferences(preferences)
    }
  }

  // User Profile Methods
  static async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<UserProfile>(`${this.ENDPOINT}/profile`)
      return response.data || mockUser.profile
    } catch (error) {
      console.warn('Failed to fetch profile from API, using localStorage:', error)
      return this.getLocalProfile()
    }
  }

  static async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await apiClient.put<UserProfile>(`${this.ENDPOINT}/profile`, profile)
      return response.data!
    } catch (error) {
      console.warn('Failed to update profile via API, using localStorage:', error)
      return this.updateLocalProfile(profile)
    }
  }

  // User Statistics Methods
  static async getStats(): Promise<UserStats> {
    try {
      const response = await apiClient.get<UserStats>(`${this.ENDPOINT}/stats`)
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch user stats from API, using mock data:', error)
      return this.getMockStats()
    }
  }

  static async getStudyStats(dateFrom?: string, dateTo?: string): Promise<MockStudyStats> {
    try {
      const response = await apiClient.get<MockStudyStats>(`${this.ENDPOINT}/study-stats`, { 
        dateFrom, 
        dateTo 
      })
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch study stats from API, using mock data:', error)
      return mockStudyStats
    }
  }

  // Goals Methods
  static async getGoals(): Promise<Goal[]> {
    try {
      const response = await apiClient.get<Goal[]>(`${this.ENDPOINT}/goals`)
      return response.data || []
    } catch (error) {
      console.warn('Failed to fetch goals from API, using localStorage:', error)
      return this.getLocalGoals()
    }
  }

  static async getGoalById(id: string): Promise<Goal | null> {
    try {
      const response = await apiClient.get<Goal>(`${this.ENDPOINT}/goals/${id}`)
      return response.data || null
    } catch (error) {
      console.warn('Failed to fetch goal by ID from API, using localStorage:', error)
      const goals = this.getLocalGoals()
      return goals.find(goal => goal.id === id) || null
    }
  }

  static async createGoal(data: CreateGoalData): Promise<Goal> {
    try {
      const response = await apiClient.post<Goal>(`${this.ENDPOINT}/goals`, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to create goal via API, using localStorage:', error)
      return this.createLocalGoal(data)
    }
  }

  static async updateGoal(data: UpdateGoalData): Promise<Goal> {
    try {
      const response = await apiClient.put<Goal>(`${this.ENDPOINT}/goals/${data.id}`, data)
      return response.data!
    } catch (error) {
      console.warn('Failed to update goal via API, using localStorage:', error)
      return this.updateLocalGoal(data)
    }
  }

  static async deleteGoal(id: string): Promise<boolean> {
    try {
      await apiClient.delete(`${this.ENDPOINT}/goals/${id}`)
      return true
    } catch (error) {
      console.warn('Failed to delete goal via API, using localStorage:', error)
      return this.deleteLocalGoal(id)
    }
  }

  static async updateGoalProgress(id: string, currentValue: number): Promise<Goal> {
    try {
      const response = await apiClient.patch<Goal>(`${this.ENDPOINT}/goals/${id}/progress`, { currentValue })
      return response.data!
    } catch (error) {
      console.warn('Failed to update goal progress via API, using localStorage:', error)
      return this.updateLocalGoal({ id, currentValue })
    }
  }

  // App Settings Methods
  static async getAppSettings(): Promise<MockAppSettings> {
    try {
      const response = await apiClient.get<MockAppSettings>(`${this.ENDPOINT}/settings`)
      return response.data || defaultAppSettings
    } catch (error) {
      console.warn('Failed to fetch app settings from API, using localStorage:', error)
      return this.getLocalAppSettings()
    }
  }

  static async updateAppSettings(settings: Partial<MockAppSettings>): Promise<MockAppSettings> {
    try {
      const response = await apiClient.put<MockAppSettings>(`${this.ENDPOINT}/settings`, settings)
      return response.data!
    } catch (error) {
      console.warn('Failed to update app settings via API, using localStorage:', error)
      return this.updateLocalAppSettings(settings)
    }
  }

  // Analytics Methods
  static async getProductivityAnalytics(period: 'week' | 'month' | 'year' = 'week'): Promise<any> {
    try {
      const response = await apiClient.get(`${this.ENDPOINT}/analytics/productivity`, { period })
      return response.data!
    } catch (error) {
      console.warn('Failed to fetch productivity analytics from API, using mock data:', error)
      return this.getMockProductivityAnalytics(period)
    }
  }

  // Private methods for localStorage fallback
  private static getLocalPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(this.PREFERENCES_STORAGE_KEY)
      return stored ? JSON.parse(stored) : mockUser.preferences
    } catch (error) {
      console.error('Failed to get local preferences:', error)
      return mockUser.preferences
    }
  }

  private static updateLocalPreferences(preferences: Partial<UserPreferences>): UserPreferences {
    try {
      const current = this.getLocalPreferences()
      const updated = { ...current, ...preferences }
      localStorage.setItem(this.PREFERENCES_STORAGE_KEY, JSON.stringify(updated))
      return updated
    } catch (error) {
      console.error('Failed to update local preferences:', error)
      return mockUser.preferences
    }
  }

  private static getLocalProfile(): UserProfile {
    try {
      const stored = localStorage.getItem(this.PROFILE_STORAGE_KEY)
      return stored ? JSON.parse(stored) : mockUser.profile
    } catch (error) {
      console.error('Failed to get local profile:', error)
      return mockUser.profile
    }
  }

  private static updateLocalProfile(profile: Partial<UserProfile>): UserProfile {
    try {
      const current = this.getLocalProfile()
      const updated = { ...current, ...profile }
      localStorage.setItem(this.PROFILE_STORAGE_KEY, JSON.stringify(updated))
      return updated
    } catch (error) {
      console.error('Failed to update local profile:', error)
      return mockUser.profile
    }
  }

  private static getMockStats(): UserStats {
    return {
      studyStreak: mockUser.stats.studyStreak,
      totalStudyHours: mockUser.stats.totalStudyHours,
      completedTasks: mockUser.stats.completedTasks,
      notesCreated: mockUser.stats.notesCreated,
      averageStudyTime: 3.2, // Mock average
      productivityScore: 85 // Mock score
    }
  }

  private static getLocalGoals(): Goal[] {
    try {
      const stored = localStorage.getItem(this.GOALS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : mockGoals
    } catch (error) {
      console.error('Failed to get local goals:', error)
      return mockGoals
    }
  }

  private static createLocalGoal(data: CreateGoalData): Goal {
    const goals = this.getLocalGoals()
    const newGoal: Goal = {
      ...data,
      id: Date.now().toString(),
      currentValue: 0,
      status: 'active',
      createdAt: new Date().toISOString()
    }

    const updatedGoals = [newGoal, ...goals]
    localStorage.setItem(this.GOALS_STORAGE_KEY, JSON.stringify(updatedGoals))
    
    return newGoal
  }

  private static updateLocalGoal(data: UpdateGoalData): Goal {
    const goals = this.getLocalGoals()
    const goalIndex = goals.findIndex(goal => goal.id === data.id)
    
    if (goalIndex === -1) {
      throw new Error('Goal not found')
    }

    const existingGoal = goals[goalIndex]!
    const updatedGoal: Goal = {
      id: existingGoal.id,
      title: data.title ?? existingGoal.title,
      description: data.description ?? existingGoal.description,
      targetValue: data.targetValue ?? existingGoal.targetValue,
      currentValue: data.currentValue ?? existingGoal.currentValue,
      unit: data.unit ?? existingGoal.unit,
      category: data.category ?? existingGoal.category,
      deadline: data.deadline ?? existingGoal.deadline,
      priority: data.priority ?? existingGoal.priority,
      status: data.status ?? existingGoal.status,
      createdAt: existingGoal.createdAt
    }
    goals[goalIndex] = updatedGoal
    localStorage.setItem(this.GOALS_STORAGE_KEY, JSON.stringify(goals))
    
    return updatedGoal
  }

  private static deleteLocalGoal(id: string): boolean {
    try {
      const goals = this.getLocalGoals()
      const updatedGoals = goals.filter(goal => goal.id !== id)
      localStorage.setItem(this.GOALS_STORAGE_KEY, JSON.stringify(updatedGoals))
      return true
    } catch (error) {
      console.error('Failed to delete local goal:', error)
      return false
    }
  }

  private static getLocalAppSettings(): MockAppSettings {
    try {
      const stored = localStorage.getItem(this.SETTINGS_STORAGE_KEY)
      return stored ? { ...defaultAppSettings, ...JSON.parse(stored) } : defaultAppSettings
    } catch (error) {
      console.error('Failed to get local app settings:', error)
      return defaultAppSettings
    }
  }

  private static updateLocalAppSettings(settings: Partial<MockAppSettings>): MockAppSettings {
    try {
      const current = this.getLocalAppSettings()
      const updated = {
        ...current,
        ...settings,
        notifications: settings.notifications ? { ...current.notifications, ...settings.notifications } : current.notifications,
        appearance: settings.appearance ? { ...current.appearance, ...settings.appearance } : current.appearance,
        study: settings.study ? { ...current.study, ...settings.study } : current.study,
        privacy: settings.privacy ? { ...current.privacy, ...settings.privacy } : current.privacy
      }
      localStorage.setItem(this.SETTINGS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    } catch (error) {
      console.error('Failed to update local app settings:', error)
      return defaultAppSettings
    }
  }

  private static getMockProductivityAnalytics(period: string): any {
    // Return mock analytics data based on period
    const baseData = {
      week: {
        studyHours: [2, 3, 4, 2, 5, 3, 4],
        productivity: [75, 80, 90, 70, 95, 85, 88],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      month: {
        studyHours: Array.from({ length: 30 }, () => Math.floor(Math.random() * 6) + 1),
        productivity: Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 60),
        labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
      },
      year: {
        studyHours: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 50),
        productivity: Array.from({ length: 12 }, () => Math.floor(Math.random() * 30) + 70),
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    }

    return baseData[period as keyof typeof baseData] || baseData.week
  }
}

// Export convenience functions
export const getPreferences = UserApi.getPreferences
export const updatePreferences = UserApi.updatePreferences
export const getProfile = UserApi.getProfile
export const updateProfile = UserApi.updateProfile
export const getStats = UserApi.getStats
export const getStudyStats = UserApi.getStudyStats
export const getGoals = UserApi.getGoals
export const getGoalById = UserApi.getGoalById
export const createGoal = UserApi.createGoal
export const updateGoal = UserApi.updateGoal
export const deleteGoal = UserApi.deleteGoal
export const updateGoalProgress = UserApi.updateGoalProgress
export const getAppSettings = UserApi.getAppSettings
export const updateAppSettings = UserApi.updateAppSettings
export const getProductivityAnalytics = UserApi.getProductivityAnalytics
