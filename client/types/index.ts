// Centralized type definitions for the application

// =============================================================================
// AUTH & USER TYPES
// =============================================================================

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  lastLoginAt: string
  role?: 'user' | 'admin'
}

export interface Session {
  user: User
  expires: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isInitializing: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<{ email: string; requiresVerification: boolean }>
  updateProfile: (data: Partial<User>) => Promise<void>
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>
  forgotPassword: (email: string) => Promise<void>
  isAuthenticated: boolean
  error: string | null
  clearError: () => void
}

// =============================================================================
// FORM TYPES
// =============================================================================

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  name: string
  email: string
  password: string
}

export interface FormErrors {
  [key: string]: string | undefined
}

// =============================================================================
// PRODUCTIVITY TYPES
// =============================================================================

export interface PomodoroSession {
  id: string
  type: 'work' | 'shortBreak' | 'longBreak'
  duration: number
  completed: boolean
  startedAt: string
}

export interface TimerSettings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  sessionsUntilLongBreak: number
}

// =============================================================================
// NOTES TYPES
// =============================================================================

export interface Note {
  id: string
  title: string
  content: string
  tags?: string[]
  category?: string
  createdAt: string
  updatedAt: string
  isPinned: boolean
}


// =============================================================================
// NEWS & CONTENT TYPES
// =============================================================================

export interface NewsArticle {
  id: string
  title: string
  description: string
  url: string
  category: string
  publishedAt: string
  source: string
  imageUrl?: string
}

export interface ResearchPaper {
  id: string
  title: string
  abstract: string
  authors: string[]
  journal: string
  publishedAt: string
  url: string
  doi?: string
}

// =============================================================================
// SETTINGS & PREFERENCES TYPES
// =============================================================================

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  studyReminders: boolean
  appUpdates: boolean
  emailNotifications: boolean
  soundEnabled: boolean
  language: string
}

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

export interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

export interface LoadingScreenProps {
  message?: string
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export interface FeatureCardProps {
  title: string
  description: string
  href?: string
  icon?: React.ReactNode
}

export interface TopBarProps {
  title?: string
  showKeyboardShortcut?: boolean
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuthResponse {
  success: boolean
  user: User
  token?: string
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type Theme = 'light' | 'dark' | 'system'
export type Mood = 'great' | 'good' | 'okay' | 'bad' | 'terrible'
export type UserRole = 'user' | 'admin'
export type TimerType = 'work' | 'shortBreak' | 'longBreak'
