import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Verification token is required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Email verification failed' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: data.message || 'Email verified successfully',
      data: data.data
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}