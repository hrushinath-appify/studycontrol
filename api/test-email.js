// Simple email test endpoint
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔧 Starting email test...');
    
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log('🔧 Transporter created, testing...');
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Transporter verified');

    // Send test email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'hrushinath29@gmail.com',
      subject: 'Test Email from StudyControl',
      text: 'This is a test email from your StudyControl application.',
      html: '<p>This is a test email from your StudyControl application.</p>'
    });

    console.log('✅ Email sent:', info.messageId);

    return res.json({
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('❌ Email test failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString()
    });
  }
};