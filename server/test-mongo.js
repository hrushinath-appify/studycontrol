const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod';

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected successfully to MongoDB!');
    await client.close();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
}

testConnection();
