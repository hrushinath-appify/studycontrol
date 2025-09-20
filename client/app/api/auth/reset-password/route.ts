import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, password, confirmPassword } = body

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Reset token is required' },
        { status: 400 }
      )
    }

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Password and confirmation are required' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      )
    }

    // Forward the request to the backend
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Password reset failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: data.message || 'Password reset successfully',
      data: data.data
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}