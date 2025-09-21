import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!email.includes('@') || email.length < 5) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Call the backend API server to handle password reset
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
    
    try {
      const resetResponse = await fetch(`${backendUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const resetData = await resetResponse.json()

      if (!resetResponse.ok) {
        return NextResponse.json(
          { error: resetData.error || 'Password reset failed' },
          { status: resetResponse.status }
        )
      }

      // Return the backend response
      return NextResponse.json({
        success: true,
        message: resetData.message || 'If an account with that email exists, a password reset link has been sent.'
      })

    } catch (fetchError) {
      console.error('Backend password reset failed:', fetchError)
      return NextResponse.json(
        { error: 'Password reset service unavailable. Please try again later.' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
