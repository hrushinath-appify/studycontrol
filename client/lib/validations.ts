// Validation schemas and utilities for forms and API requests

import type { LoginFormData, SignupFormData, FormErrors } from '@/types'
import { VALIDATION, ERROR_MESSAGES } from './constants'

// =============================================================================
// VALIDATION UTILITIES
// =============================================================================

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// =============================================================================
// COMMON VALIDATION FUNCTIONS
// =============================================================================

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return ERROR_MESSAGES.REQUIRED_FIELD('Email')
  }
  if (!EMAIL_REGEX.test(email)) {
    return ERROR_MESSAGES.INVALID_EMAIL
  }
  if (email.length < VALIDATION.EMAIL_MIN_LENGTH) {
    return ERROR_MESSAGES.MIN_LENGTH('Email', VALIDATION.EMAIL_MIN_LENGTH)
  }
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return ERROR_MESSAGES.REQUIRED_FIELD('Password')
  }
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return ERROR_MESSAGES.MIN_LENGTH('Password', VALIDATION.PASSWORD_MIN_LENGTH)
  }
  return null
}

export function validateName(name: string): string | null {
  if (!name.trim()) {
    return ERROR_MESSAGES.REQUIRED_FIELD('Name')
  }
  if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    return ERROR_MESSAGES.MIN_LENGTH('Name', VALIDATION.NAME_MIN_LENGTH)
  }
  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `${fieldName} is required`
  }
  return null
}

// =============================================================================
// FORM VALIDATION SCHEMAS
// =============================================================================

export function validateLoginForm(data: LoginFormData): FormErrors {
  const errors: FormErrors = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  return errors
}

export function validateSignupForm(data: SignupFormData): FormErrors {
  const errors: FormErrors = {}

  const nameError = validateName(data.name)
  if (nameError) errors.name = nameError

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  return errors
}

// =============================================================================
// API REQUEST VALIDATION
// =============================================================================

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateLoginRequest(body: any): ValidationResult {
  const { email, password } = body

  if (!email || !password) {
    return {
      isValid: false,
      errors: { general: 'Email and password are required' }
    }
  }

  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)

  const errors: Record<string, string> = {}
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export function validateRegisterRequest(body: any): ValidationResult {
  const { name, email, password } = body

  if (!name || !email || !password) {
    return {
      isValid: false,
      errors: { general: 'Name, email, and password are required' }
    }
  }

  const nameError = validateName(name)
  const emailError = validateEmail(email)
  const passwordError = validatePassword(password)

  const errors: Record<string, string> = {}
  if (nameError) errors.name = nameError
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// =============================================================================
// DIARY VALIDATION
// =============================================================================

export function validateDiaryEntry(title: string, content: string): FormErrors {
  const errors: FormErrors = {}

  if (!title.trim()) {
    errors.title = 'Title is required'
  } else if (title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long'
  }

  if (!content.trim()) {
    errors.content = 'Content is required'
  } else if (content.trim().length < 10) {
    errors.content = 'Content must be at least 10 characters long'
  }

  return errors
}

// =============================================================================
// NOTE VALIDATION
// =============================================================================

export function validateNote(title: string, content: string): FormErrors {
  const errors: FormErrors = {}

  if (!title.trim()) {
    errors.title = 'Note title is required'
  } else if (title.trim().length < 2) {
    errors.title = 'Note title must be at least 2 characters long'
  }

  if (!content.trim()) {
    errors.content = 'Note content is required'
  }

  return errors
}
