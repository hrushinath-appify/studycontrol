const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB Atlas connection...');
        console.log('📍 Connection URI:', MONGODB_URI.replace(/:[^@]+@/, ':****@'));
        
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Connected to MongoDB Atlas successfully!');
        
        // Get database info
        const db = mongoose.connection.db;
        const dbName = db.databaseName;
        console.log('📊 Database name:', dbName);
        
        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('📂 Collections in database:');
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });
        
        // Check if users collection exists and count documents
        const usersCollection = db.collection('users');
        const userCount = await usersCollection.countDocuments();
        console.log(`👥 Users collection document count: ${userCount}`);
        
        // If there are users, show some sample data (without passwords)
        if (userCount > 0) {
            console.log('📋 Sample users:');
            const sampleUsers = await usersCollection.find({}, { 
                projection: { 
                    name: 1, 
                    email: 1, 
                    createdAt: 1, 
                    role: 1,
                    _id: 1 
                } 
            }).limit(3).toArray();
            
            sampleUsers.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.name} (${user.email}) - ${user.role} - Created: ${user.createdAt}`);
            });
        } else {
            console.log('ℹ️  No users found in the collection');
            console.log('💡 Try registering a user through the API to create test data');
        }
        
        // Test creating a sample user (optional)
        console.log('\n🧪 Would you like to create a test user? (This will create actual data)');
        console.log('   To create a test user, use the register API endpoint instead');
        
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        
        if (error.message.includes('authentication failed')) {
            console.log('🔐 Authentication Error Solutions:');
            console.log('   1. Check username/password in connection string');
            console.log('   2. Verify user has correct permissions');
            console.log('   3. Check if IP is whitelisted in Atlas');
        }
        
        if (error.message.includes('ENOTFOUND')) {
            console.log('🌐 Network Error Solutions:');
            console.log('   1. Check internet connection');
            console.log('   2. Verify cluster URL is correct');
            console.log('   3. Check firewall settings');
        }
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

testConnection();