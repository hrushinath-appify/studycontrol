import { NextRequest, NextResponse } from 'next/server'
import { createSecureSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json()
    
    console.log('Creating session for user:', { id: user?.id, email: user?.email })
    
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'User data required' },
        { status: 400 }
      )
    }
    
    // Create the session cookie
    const sessionToken = await createSecureSession(user)
    
    console.log('Session created successfully, token length:', sessionToken.length)
    
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