require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('=== TESTING EMAIL ALTERNATIVES ===');

// Test with different Gmail configurations
async function testGmailAlternatives() {
  console.log('\n1. Testing Gmail with different auth methods...');
  
  // Test 1: Standard Gmail SMTP
  const gmail1 = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await gmail1.verify();
    console.log('✅ Gmail service method works!');
    return gmail1;
  } catch (error) {
    console.log('❌ Gmail service method failed:', error.message);
  }

  // Test 2: Gmail with explicit host/port
  const gmail2 = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await gmail2.verify();
    console.log('✅ Gmail secure method works!');
    return gmail2;
  } catch (error) {
    console.log('❌ Gmail secure method failed:', error.message);
  }

  return null;
}

// Test with Ethereal (fake SMTP for testing)
async function testEthereal() {
  console.log('\n2. Setting up Ethereal test account...');
  
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('✅ Ethereal test account created:');
    console.log(`   Email: ${testAccount.user}`);
    console.log(`   Password: ${testAccount.pass}`);
    
    const ethereal = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });

    await ethereal.verify();
    console.log('✅ Ethereal SMTP connection successful!');
    
    return { transporter: ethereal, account: testAccount };
  } catch (error) {
    console.log('❌ Ethereal setup failed:', error.message);
    return null;
  }
}

// Test sending actual email
async function testSendEmail(transporter, testAccount = null) {
  const mailOptions = {
    from: testAccount ? testAccount.user : process.env.SMTP_USER,
    to: 'test@example.com',
    subject: 'StudyControl Email Test',
    text: 'This is a test email from StudyControl application.',
    html: '<p>This is a <b>test email</b> from StudyControl application.</p>'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    
    if (testAccount) {
      console.log('   Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.log('❌ Email sending failed:', error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  // Test Gmail first
  const gmailTransporter = await testGmailAlternatives();
  
  if (gmailTransporter) {
    console.log('\n3. Testing Gmail email sending...');
    await testSendEmail(gmailTransporter);
  }
  
  // Test Ethereal as backup
  const etherealResult = await testEthereal();
  
  if (etherealResult) {
    console.log('\n4. Testing Ethereal email sending...');
    await testSendEmail(etherealResult.transporter, etherealResult.account);
  }
  
  console.log('\n=== EMAIL TESTING COMPLETE ===');
}

runTests().catch(console.error);