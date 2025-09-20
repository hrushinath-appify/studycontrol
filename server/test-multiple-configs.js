require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMultipleConfigurations() {
  console.log('=== TESTING MULTIPLE GMAIL CONFIGURATIONS ===');
  
  const configs = [
    {
      name: 'Current Config (Port 587, STARTTLS)',
      config: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    },
    {
      name: 'SSL Config (Port 465, SSL/TLS)',
      config: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    },
    {
      name: 'Gmail Service Shortcut',
      config: {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    }
  ];

  for (const { name, config } of configs) {
    console.log(`\n--- Testing: ${name} ---`);
    
    try {
      const transporter = nodemailer.createTransport(config);
      await transporter.verify();
      console.log('✅ SUCCESS! This configuration works.');
      
      // If this config works, let's try sending a test email
      console.log('Attempting to send test email...');
      const info = await transporter.sendMail({
        from: `StudyControl <${process.env.EMAIL_FROM}>`,
        to: process.env.SMTP_USER,
        subject: 'StudyControl Email Test - SUCCESS!',
        html: `
          <h2 style="color: green;">🎉 Email Configuration Working!</h2>
          <p>This email confirms that your StudyControl email system is working correctly.</p>
          <p><strong>Configuration that worked:</strong> ${name}</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        `,
        text: `Email Configuration Working! This email confirms that your StudyControl email system is working correctly. Configuration: ${name}`
      });
      
      console.log('✅ Test email sent successfully!');
      console.log('Message ID:', info.messageId);
      console.log('Check your Gmail inbox!');
      
      return config; // Return the working config
      
    } catch (error) {
      console.log('❌ Failed:', error.message);
      
      if (error.code === 'EAUTH') {
        console.log('   → Authentication issue');
      } else if (error.code === 'ECONNECTION') {
        console.log('   → Connection issue');
      }
    }
  }
  
  console.log('\n=== ALL CONFIGURATIONS FAILED ===');
  console.log('🔧 Next steps:');
  console.log('1. Double-check that 2-Step Verification is enabled');
  console.log('2. Generate a NEW app password (the current one might be invalid)');
  console.log('3. Make sure you copied the app password correctly (no spaces)');
  console.log('4. Wait 5-10 minutes after generating the app password');
  
  return null;
}

testMultipleConfigurations().catch(console.error);