import { NextRequest, NextResponse } from 'next/server'
import { callBackendAPI, parseJsonResponse } from '@/lib/backend-api'

interface PasswordChangeResponse {
  success?: boolean
  message?: string
  error?: string
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { currentPassword, newPassword } = body

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      )
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Call the backend API
    const response = await callBackendAPI('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    })

    const data = await parseJsonResponse(response) as PasswordChangeResponse

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Password change failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: data.message || 'Password changed successfully'
    })

  } catch (error) {
    console.error('Password change error:', error)
    
    // Handle specific authentication errors
    if (error instanceof Error && error.message.includes('Access token not found')) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}