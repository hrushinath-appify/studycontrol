#!/usr/bin/env node

/**
 * Password Reset Test Helper
 * This script helps test the password reset flow by extracting reset tokens
 * from the database and simulating the reset process.
 */

const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod';

async function getPasswordResetInfo(email) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');
    
    // Find user with reset token
    const user = await users.findOne(
      { 
        email: email.toLowerCase(),
        passwordResetExpires: { $gt: new Date() }
      },
      { 
        projection: { 
          name: 1, 
          email: 1, 
          passwordResetToken: 1, 
          passwordResetExpires: 1 
        } 
      }
    );
    
    if (!user) {
      console.log(`❌ No password reset token found for: ${email}`);
      return null;
    }
    
    console.log(`✅ Found password reset request for: ${user.name} (${user.email})`);
    console.log(`📅 Token expires: ${user.passwordResetExpires}`);
    console.log(`🔒 Hashed token: ${user.passwordResetToken}`);
    
    console.log('\n🔍 To test password reset, you need the original token that would be in the email.');
    console.log('Since we store hashed tokens, here\'s how to test:');
    
    // Generate a test token for demonstration
    const testToken = crypto.randomBytes(32).toString('hex');
    const hashedTestToken = crypto.createHash('sha256').update(testToken).digest('hex');
    
    console.log('\n📧 Example reset process:');
    console.log('1. Original token would be sent via email (example):', testToken);
    console.log('2. This gets hashed and stored:', hashedTestToken);
    console.log('3. To reset password, use:');
    console.log(`
curl -X POST http://localhost:5000/api/v1/auth/reset-password \\
  -H "Content-Type: application/json" \\
  -d '{"token": "ORIGINAL_TOKEN_FROM_EMAIL", "password": "NewStrongPass123!"}'`);
    
    return user.passwordResetToken;
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return null;
  } finally {
    await client.close();
  }
}

async function generateTestResetToken(email) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');
    
    // Generate test token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Update user with test token
    const result = await users.updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          passwordResetToken: hashedResetToken,
          passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        }
      }
    );
    
    if (result.matchedCount === 0) {
      console.log(`❌ User not found: ${email}`);
      return null;
    }
    
    console.log(`✅ Generated test reset token for ${email}`);
    console.log(`🔑 Reset token: ${resetToken}`);
    console.log(`📅 Expires: ${new Date(Date.now() + 10 * 60 * 1000)}`);
    
    console.log('\n🧪 Test the reset with:');
    console.log(`curl -X POST http://localhost:5000/api/v1/auth/reset-password \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"token": "${resetToken}", "password": "NewStrongPass123!"}'`);
    
    return resetToken;
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return null;
  } finally {
    await client.close();
  }
}

// Command line interface
const command = process.argv[2];
const email = process.argv[3];

if (!command || !email) {
  console.log('🔐 Password Reset Test Helper\n');
  console.log('Usage:');
  console.log('  node password-reset-helper.js check <email>      - Check reset token status');
  console.log('  node password-reset-helper.js generate <email>   - Generate test reset token');
  console.log('\nExample:');
  console.log('  node password-reset-helper.js check test@example.com');
  console.log('  node password-reset-helper.js generate test@example.com');
  process.exit(1);
}

(async () => {
  switch (command) {
    case 'check':
      await getPasswordResetInfo(email);
      break;
    case 'generate':
      await generateTestResetToken(email);
      break;
    default:
      console.log('❌ Invalid command. Use "check" or "generate"');
  }
})();