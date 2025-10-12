import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null
  private initialized = false

  private async initialize() {
    if (this.initialized) return

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || '587')
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpSecure = process.env.SMTP_SECURE === 'true'

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn('⚠️  Email service not configured - SMTP credentials missing')
      console.warn('   Please set: SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local')
      this.initialized = true
      return
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false, // For development
        },
      })

      // Verify connection
      await this.transporter.verify()
      console.log('✅ Email service initialized successfully')
      this.initialized = true
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error)
      this.transporter = null
      this.initialized = true
    }
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    await this.initialize()

    if (!this.transporter) {
      console.warn('⚠️  Email service not available - skipping email send')
      console.log('📧 Email that would have been sent to:', options.to)
      console.log('📧 Subject:', options.subject)
      return false
    }

    try {
      const emailFrom = process.env.EMAIL_FROM || process.env.SMTP_USER
      const emailFromName = process.env.EMAIL_FROM_NAME || 'StudyControl'

      const mailOptions = {
        from: `${emailFromName} <${emailFrom}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
      }

      const result = await this.transporter.sendMail(mailOptions)
      console.log(`✅ Email sent successfully to ${options.to}:`, result.messageId)
      return true
    } catch (error) {
      console.error(`❌ Failed to send email to ${options.to}:`, error)
      return false
    }
  }

  async sendVerificationEmail(
    email: string,
    name: string,
    verificationToken: string
  ): Promise<boolean> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const verificationUrl = `${baseUrl}/verify-email?token=${verificationToken}`

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - StudyControl</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .content h2 { color: #667eea; margin-top: 0; }
          .button-container { text-align: center; margin: 30px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; }
          .button:hover { opacity: 0.9; }
          .url-box { background: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px; margin: 20px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .warning strong { color: #856404; }
          .footer { background: #f8f8f8; padding: 20px 30px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; }
          .footer p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Welcome to StudyControl!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Thank you for registering with StudyControl. We're excited to have you on board! 🎉</p>
            <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
            
            <div class="button-container">
              <a href="${verificationUrl}" class="button">Verify My Email</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="url-box">
              ${verificationUrl}
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This verification link will expire in 24 hours. If you don't verify your email within this time, you'll need to request a new verification link.
            </div>
            
            <p>If you didn't create an account with StudyControl, please ignore this email and no account will be created.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>The StudyControl Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>This is an automated email. Please do not reply to this message.</strong></p>
            <p>&copy; ${new Date().getFullYear()} StudyControl. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await this.sendEmail({
      to: email,
      subject: '✅ Verify Your Email - StudyControl',
      html,
    })

    // Log token for development if email fails
    if (!result) {
      console.log('📧 Development - Verification details:')
      console.log(`   Email: ${email}`)
      console.log(`   Token: ${verificationToken}`)
      console.log(`   URL: ${verificationUrl}`)
    }

    return result
  }

  async sendPasswordResetEmail(
    email: string,
    name: string,
    resetToken: string
  ): Promise<boolean> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - StudyControl</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff7675 0%, #fd79a8 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .content h2 { color: #ff7675; margin-top: 0; }
          .button-container { text-align: center; margin: 30px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #ff7675 0%, #fd79a8 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; }
          .button:hover { opacity: 0.9; }
          .url-box { background: #f8f8f8; border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; word-break: break-all; font-family: monospace; font-size: 14px; margin: 20px 0; }
          .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .warning strong { color: #856404; }
          .footer { background: #f8f8f8; padding: 20px 30px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #e0e0e0; }
          .footer p { margin: 5px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔒 Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${name},</h2>
            <p>We received a request to reset your password for your StudyControl account. If you made this request, click the button below to reset your password:</p>
            
            <div class="button-container">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="url-box">
              ${resetUrl}
            </div>
            
            <div class="warning">
              <strong>⏰ Important:</strong> This password reset link will expire in 10 minutes for security reasons. If it expires, you'll need to request a new password reset.
            </div>
            
            <p><strong>If you didn't request a password reset, please ignore this email.</strong> Your password will remain unchanged and no action is required.</p>
            
            <p style="margin-top: 30px;">Best regards,<br><strong>The StudyControl Team</strong></p>
          </div>
          <div class="footer">
            <p><strong>This is an automated email. Please do not reply to this message.</strong></p>
            <p>&copy; ${new Date().getFullYear()} StudyControl. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `

    const result = await this.sendEmail({
      to: email,
      subject: '🔒 Reset Your Password - StudyControl',
      html,
    })

    // Log token for development if email fails
    if (!result) {
      console.log('📧 Development - Password reset details:')
      console.log(`   Email: ${email}`)
      console.log(`   Token: ${resetToken}`)
      console.log(`   URL: ${resetUrl}`)
    }

    return result
  }
}

// Export singleton instance
export const emailService = new EmailService()
export default emailService
