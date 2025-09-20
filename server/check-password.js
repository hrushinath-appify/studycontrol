require('dotenv').config();

console.log('=== CHECKING APP PASSWORD FORMAT ===');
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS length:', process.env.SMTP_PASS?.length || 0);
console.log('SMTP_PASS format:', process.env.SMTP_PASS);

// Check if password looks like a proper app password
const password = process.env.SMTP_PASS;
if (!password) {
  console.log('❌ No password found');
} else if (password.length !== 16) {
  console.log(`❌ App password should be exactly 16 characters, got ${password.length}`);
} else if (!/^[a-z]+$/.test(password)) {
  console.log('❌ App password should only contain lowercase letters (no spaces, numbers, or special chars)');
} else {
  console.log('✅ Password format looks correct for Gmail app password');
}

console.log('\n=== INSTRUCTIONS ===');
console.log('1. Go to: https://myaccount.google.com/security');
console.log('2. Find "2-Step Verification" and make sure it\'s enabled');
console.log('3. Find "App passwords" (might be under 2-Step Verification)');
console.log('4. Generate new app password for "Mail" + "Other (StudyControl)"');
console.log('5. Copy the 16-character password (remove spaces)');
console.log('6. Update SMTP_PASS in .env file');