const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

async function testPasswordResetEmail() {
  console.log('Testing password reset email functionality...');

  try {
    // Create transporter (same as in emailService)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Test reset token and URL
    const resetToken = 'test-reset-token-12345';
    const resetUrl = `${process.env.CORS_ORIGIN}/reset-password?token=${resetToken}`;
    const userEmail = process.env.SMTP_USER; // Send to yourself for testing
    const userName = 'Test User';

    console.log('Reset URL:', resetUrl);
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - StudyControl</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ff7675 0%, #fd79a8 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #ff7675; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request 🔒</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName},</h2>
            <p>We received a request to reset your password for your StudyControl account. If you made this request, click the button below to reset your password:</p>
            
            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">Reset My Password</a>
            </p>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: monospace;">
              ${resetUrl}
            </p>
            
            <div class="warning">
              <strong>Important:</strong> This password reset link will expire in 10 minutes for security reasons.
            </div>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>Best regards,<br>The StudyControl Team</p>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>&copy; 2025 StudyControl. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    console.log('Sending password reset email...');
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: userEmail,
      subject: 'Reset Your Password - StudyControl',
      html,
    });

    console.log('✅ Password reset email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Email sent to:', userEmail);
    
    return true;
  } catch (error) {
    console.error('❌ Password reset email test failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    return false;
  }
}

// Test the forgot password API call
async function testForgotPasswordAPI() {
  console.log('\n=== Testing Forgot Password API ===');
  
  try {
    const testEmail = process.env.SMTP_USER;
    const backendUrl = 'http://localhost:5000';
    
    console.log('Testing forgot password for email:', testEmail);
    console.log('Backend URL:', backendUrl);
    
    const response = await fetch(`${backendUrl}/api/v1/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Forgot password API call successful');
    } else {
      console.log('❌ Forgot password API call failed');
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

async function runTests() {
  await testPasswordResetEmail();
  await testForgotPasswordAPI();
}

runTests().then(() => {
  console.log('\n=== All tests completed ===');
  process.exit(0);
}).catch((error) => {
  console.error('Test suite failed:', error);
  process.exit(1);
});