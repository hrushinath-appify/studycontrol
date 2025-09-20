const nodemailer = require('nodemailer');

// Load environment variables
require('dotenv').config();

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('SMTP_USER:', process.env.SMTP_USER);
  console.log('SMTP_PASS length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 0);

  try {
    // Create transporter
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

    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Test sending an email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: process.env.SMTP_USER, // Send to yourself for testing
      subject: 'Test Email - StudyControl',
      html: '<h1>Test Email</h1><p>This is a test email from StudyControl server.</p>',
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
    return true;
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    return false;
  }
}

testEmail().then(() => {
  console.log('Email test completed.');
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});