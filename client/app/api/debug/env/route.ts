import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      NODE_ENV: process.env.NODE_ENV,
      hasMongoUri: !!process.env.MONGODB_URI,
      hasJwtSecret: !!process.env.JWT_SECRET,
      mongoUriLength: process.env.MONGODB_URI?.length || 0,
      jwtSecretLength: process.env.JWT_SECRET?.length || 0,
    }
  })
}