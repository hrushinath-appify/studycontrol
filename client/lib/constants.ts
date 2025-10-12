// Application constants and configuration

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  TIMEOUT: 10000, // 10 seconds
} as const

// =============================================================================
// API ENDPOINTS
// =============================================================================

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    ME: '/api/v1/auth/me',
    PROFILE: '/api/v1/auth/profile',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
  },
} as const

// =============================================================================
// VALIDATION CONSTANTS
// =============================================================================

export const VALIDATION = {
  EMAIL_MIN_LENGTH: 5,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  TITLE_MIN_LENGTH: 3,
  CONTENT_MIN_LENGTH: 10,
  DESCRIPTION_MAX_LENGTH: 500,
} as const

// =============================================================================
// TIMER CONSTANTS
// =============================================================================

export const POMODORO = {
  DEFAULT_WORK_DURATION: 25, // minutes
  DEFAULT_SHORT_BREAK: 5, // minutes
  DEFAULT_LONG_BREAK: 15, // minutes
  SESSIONS_UNTIL_LONG_BREAK: 4,
} as const

// =============================================================================
// STORAGE KEYS
// =============================================================================

export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user-preferences',
  POMODORO_SESSIONS: 'pomodoro-sessions',
  THEME: 'theme',
  STREAK_DATA: 'streak-data',
} as const

// =============================================================================
// ROUTES
// =============================================================================

export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FOCUS: '/focus',
  SETTINGS: '/settings',
  HELP: '/help',
  MYSTERY: '/mystery',
  DEVELOPER_NOTES: '/developer-notes',
  UNAUTHORIZED: '/unauthorized',
} as const

export const PROTECTED_ROUTES = [
  ROUTES.HOME,
  ROUTES.FOCUS,
  ROUTES.SETTINGS,
  ROUTES.HELP,
  ROUTES.MYSTERY,
  ROUTES.DEVELOPER_NOTES,
] as const

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  '/forgot-password',
] as const

// =============================================================================
// UI CONSTANTS
// =============================================================================

export const UI = {
  DEBOUNCE_DELAY: 300,
  AUTO_SAVE_DELAY: 1000,
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
} as const

// =============================================================================
// PAGINATION
// =============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

// =============================================================================
// FILE UPLOAD
// =============================================================================

export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain', 'application/msword'],
} as const

// =============================================================================
// RATE LIMITING
// =============================================================================

export const RATE_LIMIT = {
  MAX_REQUESTS: 10,
  WINDOW_MS: 60 * 1000, // 1 minute
} as const

// =============================================================================
// SESSION
// =============================================================================

export const SESSION = {
  EXPIRY_DAYS: 7,
  CSRF_TOKEN_EXPIRY: '1h',
} as const

// =============================================================================
// THEMES
// =============================================================================

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// =============================================================================
// PRIORITIES
// =============================================================================

export const PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

// =============================================================================
// MOODS
// =============================================================================

export const MOODS = {
  TERRIBLE: 'terrible',
  BAD: 'bad',
  OKAY: 'okay',
  GOOD: 'good',
  GREAT: 'great',
} as const

// =============================================================================
// USER ROLES
// =============================================================================

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const

// =============================================================================
// ERROR MESSAGES
// =============================================================================

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} is required`,
  MIN_LENGTH: (field: string, length: number) => `${field} must be at least ${length} characters long`,
  MAX_LENGTH: (field: string, length: number) => `${field} must be less than ${length} characters`,
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_CREDENTIALS: 'Invalid credentials',
  NETWORK_ERROR: 'Network error. Please try again.',
  GENERIC_ERROR: 'An error occurred. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
} as const

// =============================================================================
// SUCCESS MESSAGES
// =============================================================================

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  REGISTER_SUCCESS: 'Account created successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PASSWORD_RESET_SENT: 'Password reset email sent',
  ENTRY_SAVED: 'Entry saved successfully',
  NOTE_SAVED: 'Note saved successfully',
} as const
