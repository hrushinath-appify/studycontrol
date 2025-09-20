require('dotenv').config();
const { MongoClient } = require('mongodb');

async function checkPasswordResetTokens() {
  console.log('=== Checking Password Reset Token Generation ===');
  
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not found in environment variables');
    return;
  }

  let client;
  try {
    // Connect to MongoDB
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('studycontrol');
    const usersCollection = db.collection('users');
    
    // Check if users exist
    const userCount = await usersCollection.countDocuments();
    console.log(`📊 Total users in database: ${userCount}`);
    
    if (userCount === 0) {
      console.log('ℹ️  No users found in database. Creating a test user...');
      
      // Create a test user
      const testUser = {
        name: 'Test User',
        email: process.env.SMTP_USER,
        password: '$2a$12$dummy.hash.for.testing.only', // This would be properly hashed in real scenario
        isEmailVerified: true, // Set to true so we can test password reset
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          theme: 'system',
          studyReminders: true,
          appUpdates: true,
          emailNotifications: true,
          soundEnabled: true,
          language: 'en',
        },
        profile: {
          timezone: 'UTC',
        }
      };
      
      const result = await usersCollection.insertOne(testUser);
      console.log('✅ Created test user with ID:', result.insertedId);
    }
    
    // List all users (without sensitive data)
    const users = await usersCollection.find(
      {}, 
      { projection: { name: 1, email: 1, isEmailVerified: 1, passwordResetToken: 1, passwordResetExpires: 1 } }
    ).toArray();
    
    console.log('\n📋 Users in database:');
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email})`);
      console.log(`   - Email verified: ${user.isEmailVerified}`);
      console.log(`   - Has reset token: ${!!user.passwordResetToken}`);
      if (user.passwordResetExpires) {
        console.log(`   - Reset token expires: ${user.passwordResetExpires}`);
        console.log(`   - Token expired: ${user.passwordResetExpires < new Date()}`);
      }
      console.log('');
    });
    
    // Test password reset token generation for the test email
    const testEmail = process.env.SMTP_USER;
    console.log(`\n🔍 Testing password reset for: ${testEmail}`);
    
    // Simulate the forgot password flow
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    console.log('Generated reset token:', resetToken);
    console.log('Hashed reset token:', hashedResetToken);
    console.log('Reset expires:', resetExpires);
    
    // Update user with reset token
    const updateResult = await usersCollection.updateOne(
      { email: testEmail.toLowerCase() },
      {
        $set: {
          passwordResetToken: hashedResetToken,
          passwordResetExpires: resetExpires
        }
      }
    );
    
    if (updateResult.matchedCount > 0) {
      console.log('✅ Reset token stored in database');
      
      // Verify the token was stored
      const userWithToken = await usersCollection.findOne(
        { email: testEmail.toLowerCase() },
        { projection: { passwordResetToken: 1, passwordResetExpires: 1 } }
      );
      
      console.log('📋 Stored token data:');
      console.log('   - Token stored:', !!userWithToken.passwordResetToken);
      console.log('   - Expires at:', userWithToken.passwordResetExpires);
      console.log('   - Currently valid:', userWithToken.passwordResetExpires > new Date());
      
      // Test token verification (simulate reset password verification)
      const testHashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      const tokenMatches = testHashedToken === userWithToken.passwordResetToken;
      console.log('   - Token verification test:', tokenMatches ? '✅ PASS' : '❌ FAIL');
      
    } else {
      console.log('❌ No user found with email:', testEmail);
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('📌 Database connection closed');
    }
  }
}

checkPasswordResetTokens().then(() => {
  console.log('\n=== Database test completed ===');
  process.exit(0);
}).catch((error) => {
  console.error('Test failed:', error);
  process.exit(1);
});