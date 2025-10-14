import { NextResponse } from 'next/server'
import { testEmailConfiguration } from '@/lib/email'

export async function GET() {
  try {
    console.log('🔧 Testing email configuration...')
    const result = await testEmailConfiguration()
    
    return NextResponse.json({
      success: result.success,
      message: result.success 
        ? 'Email configuration is working correctly!' 
        : 'Email configuration failed',
      error: result.error || undefined,
      config: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        hasPassword: !!process.env.SMTP_PASS,
        from: process.env.EMAIL_FROM
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to test email configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}