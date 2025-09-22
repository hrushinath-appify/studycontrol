import { NextRequest, NextResponse } from 'next/server'
import { createSecureSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json()
    
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'User data required' },
        { status: 400 }
      )
    }
    
    // Create the session cookie
    await createSecureSession(user)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Session created successfully' 
    })
    
  } catch (error) {
    console.error('Create session error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create session' },
      { status: 500 }
    )
  }
}