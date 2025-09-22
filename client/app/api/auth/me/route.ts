import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('access-token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { success: false, error: 'Access token not found' },
        { status: 401 }
      )
    }

    // Verify token with backend API
    const backendUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1').replace(/\/+$/, '')
    
    try {
      const response = await fetch(`${backendUrl}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        // Token is invalid or expired
        const errorData = await response.json().catch(() => ({ error: 'Token validation failed' }))
        return NextResponse.json(
          { success: false, error: errorData.error || 'Authentication failed' },
          { status: response.status }
        )
      }

      const userData = await response.json()
      
      return NextResponse.json({
        success: true,
        data: userData.data
      })

    } catch (fetchError) {
      console.error('Backend /auth/me request failed:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Authentication service unavailable' },
        { status: 503 }
      )
    }

  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
