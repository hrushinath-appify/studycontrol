const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod';

async function fixUserVerification() {
  const client = new MongoClient(uri);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('studycontrol');
    const usersCollection = db.collection('users');
    
    // Check current users
    console.log('👥 Checking current users...');
    const users = await usersCollection.find({}).toArray();
    console.log(`📊 Found ${users.length} users:`);
    
    for (const user of users) {
      console.log(`📧 ${user.email} - verified: ${user.isEmailVerified}, active: ${user.isActive}`);
    }
    
    // Update users to be email verified for testing
    console.log('\n🔧 Setting all users as email verified...');
    const updateResult = await usersCollection.updateMany(
      {},
      { 
        $set: { 
          isEmailVerified: true,
          isActive: true 
        } 
      }
    );
    
    console.log(`✅ Updated ${updateResult.modifiedCount} users`);
    
    // Verify the update
    console.log('\n📋 Users after update:');
    const updatedUsers = await usersCollection.find({}).toArray();
    for (const user of updatedUsers) {
      console.log(`📧 ${user.email} - verified: ${user.isEmailVerified}, active: ${user.isActive}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔐 Connection closed');
  }
}

fixUserVerification();