import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { verifySecureSession, createSecureSession, deleteSecureSession } from './session'
import type { User, Session, UserRole } from '@/types'

// Verify session and return user data
export const verifySession = cache(async (): Promise<Session | null> => {
  return await verifySecureSession()
})

// Get user data with auth check
export const getUser = cache(async (): Promise<User | null> => {
  const session = await verifySession()
  
  if (!session) {
    return null
  }

  // In a real app, you might want to fetch fresh user data from database
  // For now, return user from session
  return session.user
})

// Get user data with redirect if not authenticated
export const getAuthenticatedUser = cache(async (): Promise<User> => {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  return user
})

// Check if user has specific role
export const hasRole = cache(async (requiredRole: UserRole): Promise<boolean> => {
  const user = await getUser()
  
  if (!user) {
    return false
  }
  
  // Admin has access to everything
  if (user.role === 'admin') {
    return true
  }
  
  return user.role === requiredRole
})

// Require specific role or redirect
export const requireRole = cache(async (requiredRole: UserRole): Promise<User> => {
  const user = await getUser()
  
  if (!user) {
    redirect('/login')
  }
  
  if (user.role !== requiredRole && user.role !== 'admin') {
    redirect('/unauthorized')
  }
  
  return user
})

// Create session (used by login)
export async function createSession(user: User): Promise<string> {
  return await createSecureSession(user)
}

// Delete session (used by logout)
export async function deleteSession(): Promise<void> {
  await deleteSecureSession()
}
