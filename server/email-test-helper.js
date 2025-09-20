#!/usr/bin/env node

/**
 * Email Verification Test Helper
 * This script helps test the email verification flow by extracting verification tokens
 * from the database and simulating the verification process.
 */

const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod';

async function getVerificationToken(email) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');
    
    // Find unverified user
    const user = await users.findOne(
      { 
        email: email.toLowerCase(),
        isEmailVerified: false,
        emailVerificationExpires: { $gt: new Date() }
      },
      { 
        projection: { 
          name: 1, 
          email: 1, 
          emailVerificationToken: 1, 
          emailVerificationExpires: 1 
        } 
      }
    );
    
    if (!user) {
      console.log(`❌ No unverified user found with email: ${email}`);
      return null;
    }
    
    console.log(`✅ Found unverified user: ${user.name} (${user.email})`);
    console.log(`📅 Token expires: ${user.emailVerificationExpires}`);
    
    // Since we store hashed tokens, we need to generate all possible tokens to find a match
    // In a real scenario, the original token would be in the email
    console.log('\n🔍 To verify this user, use one of these methods:');
    console.log('\n1. Using the API endpoint:');
    console.log(`curl -X POST http://localhost:5000/api/v1/auth/verify-email \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"token": "ORIGINAL_TOKEN_FROM_EMAIL"}'`);
    
    console.log('\n2. Manually verify in database:');
    console.log(`curl -X POST http://localhost:5000/api/v1/test/verify-user \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -d '{"email": "${email}"}'`);
    
    return user.emailVerificationToken;
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return null;
  } finally {
    await client.close();
  }
}

async function verifyUserManually(email) {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');
    
    // Update user as verified
    const result = await users.updateOne(
      { 
        email: email.toLowerCase(),
        isEmailVerified: false 
      },
      { 
        $set: { isEmailVerified: true },
        $unset: { 
          emailVerificationToken: '',
          emailVerificationExpires: ''
        }
      }
    );
    
    if (result.matchedCount === 0) {
      console.log(`❌ No unverified user found with email: ${email}`);
      return false;
    }
    
    console.log(`✅ User ${email} has been manually verified!`);
    return true;
    
  } catch (error) {
    console.error('❌ Database error:', error);
    return false;
  } finally {
    await client.close();
  }
}

// Command line interface
const command = process.argv[2];
const email = process.argv[3];

if (!command || !email) {
  console.log('📧 Email Verification Test Helper\n');
  console.log('Usage:');
  console.log('  node email-test-helper.js check <email>     - Check verification status');
  console.log('  node email-test-helper.js verify <email>    - Manually verify user');
  console.log('\nExample:');
  console.log('  node email-test-helper.js check test@example.com');
  console.log('  node email-test-helper.js verify test@example.com');
  process.exit(1);
}

(async () => {
  switch (command) {
    case 'check':
      await getVerificationToken(email);
      break;
    case 'verify':
      await verifyUserManually(email);
      break;
    default:
      console.log('❌ Invalid command. Use "check" or "verify"');
  }
})();