// Centralized type definitions for the backend API
import { Request } from 'express';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

// =============================================================================
// AUTH & USER TYPES
// =============================================================================

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  role: 'user' | 'admin';
  preferences: {
    theme: 'light' | 'dark' | 'system';
    studyReminders: boolean;
    appUpdates: boolean;
    emailNotifications: boolean;
    soundEnabled: boolean;
    language: string;
  };
  profile: {
    bio?: string;
    studyGoals?: string[];
    focusAreas?: string[];
    dailyStudyHours?: number;
    timezone?: string;
  };
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  refreshTokens: string[];
  lastLoginAt?: Date;
  isActive: boolean;
  // OAuth provider fields
  provider: 'credentials' | 'google' | 'github';
  providerId?: string;
  // Mystery tracking
  mysteryClicks: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}


// =============================================================================
// DIARY TYPES
// =============================================================================

export interface IDiaryEntry extends Document {
  _id: string;
  userId: string;
  title: string;
  content: string;
  preview: string;
  date: string;
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  tags: string[];
  wordCount: number;
  isPrivate: boolean;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DiaryStats {
  totalEntries: number;
  currentStreak: number;
  longestStreak: number;
  totalWords: number;
  averageWordsPerEntry: number;
  moodDistribution: Record<string, number>;
  entriesThisMonth: number;
  entriesThisWeek: number;
  entriesThisYear: number;
  mostUsedTags: Array<{ tag: string; count: number }>;
}

// =============================================================================
// NOTES TYPES
// =============================================================================

export interface INote extends Document {
  _id: string;
  userId: string;
  title: string;
  content: string;
  tags: string[];
  category?: string;
  isArchived: boolean;
  color?: string;
  attachments?: string[];
  sharedWith?: string[]; // user IDs
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// MYSTERY TOPICS TYPES
// =============================================================================

export interface IMysteryTopic extends Document {
  _id: string;
  title: string;
  description: string;
  subtopics: string[];
  questions: string[];
  explanation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number; // in minutes
  tags: string[];
  isActive: boolean;
  createdBy?: string; // user ID
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: any;
}

// =============================================================================
// REQUEST QUERY TYPES
// =============================================================================

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DiaryQuery extends PaginationQuery {
  mood?: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  tags?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

export interface NotesQuery extends PaginationQuery {
  category?: string;
  tags?: string;
  isArchived?: string;
  search?: string;
}


// =============================================================================
// UTILITY TYPES
// =============================================================================

export type UserRole = 'user' | 'admin';
export type Theme = 'light' | 'dark' | 'system';
export type Mood = 'great' | 'good' | 'okay' | 'bad' | 'terrible';
export type TimerType = 'work' | 'shortBreak' | 'longBreak';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// =============================================================================
// VALIDATION TYPES
// =============================================================================

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface CreateDiaryEntryRequest {
  title: string;
  content: string;
  mood?: Mood;
  tags?: string[];
  date?: string;
  isPrivate?: boolean;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tags?: string[];
  category?: string;
  color?: string;
}

