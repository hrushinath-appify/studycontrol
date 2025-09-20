#!/usr/bin/env node
require('dotenv').config();
const nodemailer = require('nodemailer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 StudyControl Email Setup Helper\n');

async function setupEtherealEmail() {
  console.log('Setting up Ethereal Email for development...');
  
  try {
    // Create test account
    const testAccount = await nodemailer.createTestAccount();
    
    console.log('\n✅ Ethereal Email Account Created:');
    console.log(`SMTP_HOST=smtp.ethereal.email`);
    console.log(`SMTP_PORT=587`);
    console.log(`SMTP_SECURE=false`);
    console.log(`SMTP_USER=${testAccount.user}`);
    console.log(`SMTP_PASS=${testAccount.pass}`);
    console.log(`EMAIL_FROM=${testAccount.user}`);
    console.log(`EMAIL_FROM_NAME=StudyControl Dev`);
    
    console.log('\n📋 Copy the above values to your .env file.');
    
    // Test the configuration
    const transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    console.log('\n🧪 Testing email configuration...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: testAccount.user,
      to: 'test@example.com',
      subject: 'StudyControl Email Test',
      html: '<h1>Email verification working!</h1><p>This is a test email from StudyControl.</p>'
    });
    
    console.log('✅ Test email sent!');
    console.log(`📧 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    
  } catch (error) {
    console.error('❌ Ethereal setup failed:', error.message);
  }
}

async function testCurrentConfig() {
  console.log('Testing current email configuration...');
  
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };
  
  console.log(`Host: ${config.host}`);
  console.log(`Port: ${config.port}`);
  console.log(`Secure: ${config.secure}`);
  console.log(`User: ${config.auth.user}`);
  console.log(`Pass: ${config.auth.pass ? '***' + config.auth.pass.slice(-4) : 'NOT SET'}`);
  
  const transporter = nodemailer.createTransporter(config);
  
  try {
    await transporter.verify();
    console.log('✅ Current configuration works!');
    return true;
  } catch (error) {
    console.log('❌ Current configuration failed:', error.message);
    return false;
  }
}

function showGmailInstructions() {
  console.log('\n📧 Gmail Setup Instructions:');
  console.log('1. Go to https://myaccount.google.com/security');
  console.log('2. Enable 2-Step Verification');
  console.log('3. Go to https://myaccount.google.com/apppasswords');
  console.log('4. Select "Mail" and generate app password');
  console.log('5. Update SMTP_PASS in .env with the 16-character password');
  console.log('\nAlternatively, choose option 2 to use Ethereal Email for development.');
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  console.log('Choose an option:');
  console.log('1. Test current email configuration');
  console.log('2. Setup Ethereal Email (development)');
  console.log('3. Show Gmail setup instructions');
  console.log('4. Exit');
  
  const choice = await askQuestion('\nEnter your choice (1-4): ');
  
  switch (choice) {
    case '1':
      const works = await testCurrentConfig();
      if (!works) {
        console.log('\n💡 Consider using option 2 or 3 to fix email issues.');
      }
      break;
      
    case '2':
      await setupEtherealEmail();
      break;
      
    case '3':
      showGmailInstructions();
      break;
      
    case '4':
      console.log('Goodbye!');
      break;
      
    default:
      console.log('Invalid choice. Please run the script again.');
  }
  
  rl.close();
}

main().catch(console.error);