import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Validates if a string is a valid MongoDB ObjectId
 * @param id - The ID string to validate
 * @returns true if valid ObjectId, false otherwise
 */
export function isValidObjectId(id: string): boolean {
  // Check if it's a 24-character hex string
  return /^[0-9a-fA-F]{24}$/.test(id)
}

/**
 * Safely validates an ObjectId and throws a user-friendly error if invalid
 * @param id - The ID to validate
 * @param context - Optional context for better error messages
 * @throws Error with user-friendly message if invalid
 */
export function validateObjectId(id: string, context = 'resource'): void {
  if (!id) {
    throw new Error(`${context} ID is required`)
  }
  
  if (!isValidObjectId(id)) {
    throw new Error(`Invalid ${context} ID format. Please check the URL and try again.`)
  }
}
