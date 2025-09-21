import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Register user against the backend API server
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
    
    try {
      const registerResponse = await fetch(`${backendUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, confirmPassword: password }),
      })

      const registerData = await registerResponse.json()

      if (!registerResponse.ok) {
        return NextResponse.json(
          { success: false, error: registerData.error || 'Registration failed' },
          { status: registerResponse.status }
        )
      }

      // DO NOT create session automatically for unverified users
      // Only return the registration success message
      return NextResponse.json({
        success: true,
        data: registerData.data,
        message: registerData.message || 'Registration successful! Please check your email to verify your account.'
      })

    } catch (fetchError) {
      console.error('Backend registration failed:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Registration service unavailable' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
