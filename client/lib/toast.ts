// Toast notification utilities using Sonner
import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    })
  },

  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    })
  },

  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 4000,
    })
  },

  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 3000,
    })
  },

  loading: (message: string) => {
    return sonnerToast.loading(message)
  },

  promise: <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string
      success: string | ((data: T) => string)
      error: string | ((error: unknown) => string)
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    })
  },

  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id)
  },
}

// Predefined toast messages for common scenarios
export const toastMessages = {
  auth: {
    loginSuccess: "Welcome back!",
    loginError: "Login failed",
    registerSuccess: "Account created successfully!",
    registerError: "Registration failed",
    logoutSuccess: "You've been logged out",
    logoutError: "Logout failed",
    profileUpdateSuccess: "Profile updated successfully",
    profileUpdateError: "Failed to update profile",
    passwordResetSent: "Password reset email sent",
    passwordResetError: "Failed to send password reset email",
    invalidCredentials: "Invalid email or password",
    emailAlreadyExists: "An account with this email already exists",
    weakPassword: "Password must be at least 8 characters with uppercase, lowercase, and number",
  },
  
  validation: {
    requiredField: (field: string) => `${field} is required`,
    invalidEmail: "Please enter a valid email address",
    passwordMismatch: "Passwords do not match",
    minLength: (field: string, length: number) => `${field} must be at least ${length} characters`,
  },

  general: {
    saveSuccess: "Changes saved successfully",
    saveError: "Failed to save changes",
    deleteSuccess: "Item deleted successfully",
    deleteError: "Failed to delete item",
    networkError: "Network error. Please check your connection and try again",
    unexpectedError: "An unexpected error occurred. Please try again",
    accessDenied: "You don't have permission to perform this action",
  },

  studyControl: {
    noteCreated: "Note created successfully",
    noteUpdated: "Note updated successfully",
    noteDeleted: "Note deleted successfully",
    focusSessionStarted: "Focus session started",
    focusSessionCompleted: "Focus session completed! Great work!",
    focusSessionPaused: "Focus session paused",
  }
}