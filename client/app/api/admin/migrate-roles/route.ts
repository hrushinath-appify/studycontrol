import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase, User } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    // Security check - only allow in development or with special header
    const adminKey = request.headers.get('x-admin-key')
    if (process.env.NODE_ENV === 'production' && adminKey !== process.env.ADMIN_MIGRATION_KEY) {
      return NextResponse.json({
        success: false,
        error: 'Unauthorized'
      }, { status: 403 })
    }

    console.log('🔧 Starting user role migration...')
    
    await connectToDatabase()
    
    // Update all users without a role field
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await (User as any).updateMany(
      { role: { $exists: false } }, // Users without role field
      { $set: { role: 'user' } } // Set default role
    )
    
    console.log('✅ Migration completed:', result)
    
    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      data: {
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount
      }
    })
    
  } catch (error) {
    console.error('❌ Migration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Migration failed'
    }, { status: 500 })
  }
}