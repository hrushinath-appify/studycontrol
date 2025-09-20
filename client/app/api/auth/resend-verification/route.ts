import { NextRequest, NextResponse } from 'next/server'
import { API_CONFIG } from '@/lib/constants'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    // Forward the request to the backend
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data.message || 'Failed to resend verification email' },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: data.message || 'Verification email sent successfully',
      data: data.data
    })

  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}