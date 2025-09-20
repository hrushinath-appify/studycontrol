const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('=== EMAIL DEBUG TEST ===');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_SECURE:', process.env.SMTP_SECURE);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS length:', process.env.SMTP_PASS ? process.env.SMTP_PASS.length : 'undefined');
console.log('SMTP_PASS first 4 chars:', process.env.SMTP_PASS ? process.env.SMTP_PASS.substring(0, 4) + '...' : 'undefined');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true,
  logger: true
});

async function testConnection() {
  try {
    console.log('\n=== TESTING CONNECTION ===');
    const result = await transporter.verify();
    console.log('✅ Connection successful!', result);
    
    console.log('\n=== SENDING TEST EMAIL ===');
    const info = await transporter.sendMail({
      from: `"StudyControl" <${process.env.SMTP_USER}>`,
      to: "hrushi@appi-fy.ai",
      subject: "Test Email from StudyControl",
      text: "This is a test email to verify SMTP configuration.",
      html: "<b>This is a test email to verify SMTP configuration.</b>"
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.error('❌ Email test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Response:', error.response);
  }
}

testConnection();