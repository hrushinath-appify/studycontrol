// test-email.js
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmailConfiguration() {
  console.log('Testing email configuration...');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Send test email
    console.log('Sending test email...');
    const testEmail = {
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Test Email from StudyControl',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745;">✅ Email Configuration Successful!</h2>
          <p>This is a test email to confirm that your email configuration is working correctly.</p>
          <p><strong>Configuration Details:</strong></p>
          <ul>
            <li>SMTP Host: ${process.env.SMTP_HOST}</li>
            <li>SMTP Port: ${process.env.SMTP_PORT}</li>
            <li>From Email: ${process.env.EMAIL_FROM}</li>
            <li>From Name: ${process.env.EMAIL_FROM_NAME}</li>
          </ul>
          <p>Your StudyControl email system is ready to go! 🎉</p>
        </div>
      `,
      text: `
        Email Configuration Successful!
        
        This is a test email to confirm that your email configuration is working correctly.
        
        Configuration Details:
        - SMTP Host: ${process.env.SMTP_HOST}
        - SMTP Port: ${process.env.SMTP_PORT}
        - From Email: ${process.env.EMAIL_FROM}
        - From Name: ${process.env.EMAIL_FROM_NAME}
        
        Your StudyControl email system is ready to go!
      `
    };

    const info = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Check your inbox at:', process.env.SMTP_USER);

  } catch (error) {
    console.error('❌ Email configuration test failed:');
    console.error('Error details:', error.message);
    
    // Provide specific troubleshooting based on error
    if (error.code === 'EAUTH') {
      console.error('\n🔧 Troubleshooting:');
      console.error('- Double-check your app password (16 characters)');
      console.error('- Make sure you\'re using your Gmail address for SMTP_USER');
      console.error('- Ensure 2-Step Verification is enabled on your Google Account');
    } else if (error.code === 'ECONNECTION') {
      console.error('\n🔧 Troubleshooting:');
      console.error('- Check your internet connection');
      console.error('- Verify SMTP settings (host, port)');
    }
  }
}

// Run the test
testEmailConfiguration();