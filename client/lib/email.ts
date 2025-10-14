// Simple email service for development
// In production, replace this with a proper email service like SendGrid, AWS SES, etc.

// Email templates
function getVerificationEmailTemplate(name: string, verificationUrl: string) {
  return {
    subject: 'Verify Your Email - StudyControl',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">📚 StudyControl</div>
            <h2>Welcome to StudyControl!</h2>
          </div>
          <div class="content">
            <h3>Hi ${name}! 👋</h3>
            <p>Thank you for joining StudyControl! To complete your registration and start your learning journey, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace;">
              ${verificationUrl}
            </p>
            
            <p><strong>This link will expire in 24 hours.</strong></p>
            
            <p>If you didn't create an account with StudyControl, you can safely ignore this email.</p>
            
            <div class="footer">
              <p>Best regards,<br>The StudyControl Team</p>
              <p style="font-size: 12px; color: #999;">
                This email was sent from StudyControl. If you have any questions, please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Welcome to StudyControl!
      
      Hi ${name}!
      
      Thank you for joining StudyControl! To complete your registration, please verify your email address by visiting:
      
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with StudyControl, you can safely ignore this email.
      
      Best regards,
      The StudyControl Team
    `
  }
}

// Development email service - logs email and returns verification URL
export async function sendVerificationEmail(
  email: string, 
  name: string, 
  verificationToken: string
): Promise<{ success: boolean; error?: string; verificationUrl?: string }> {
  try {
    console.log('📧 [DEV EMAIL SERVICE] Sending verification email to:', email)
    
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`
    const emailTemplate = getVerificationEmailTemplate(name, verificationUrl)
    
    // In development: Log the email content instead of sending
    console.log('📧 [EMAIL CONTENT]')
    console.log('To:', email)
    console.log('Subject:', emailTemplate.subject)
    console.log('Verification URL:', verificationUrl)
    console.log('📧 [EMAIL LOGGED - Use the verification URL above to verify manually]')
    
    // Simulate successful email sending
    // In production, replace this with actual email sending logic
    
    return { 
      success: true,
      verificationUrl 
    }
    
  } catch (error) {
    console.error('❌ Failed to process verification email:', error)
    
    let errorMessage = 'Failed to send email'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    
    return {
      success: false,
      error: errorMessage
    }
  }
}

// Test email configuration
export async function testEmailConfiguration(): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🔧 Testing email configuration (development mode)...')
    
    // In development mode, always return success
    // In production, implement actual SMTP testing
    
    console.log('✅ Email configuration test passed (development mode)')
    return { success: true }
    
  } catch (error) {
    console.error('❌ Email configuration test failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Email configuration test failed'
    }
  }
}