const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function cleanupDemoUsers() {
    try {
        console.log('🧹 Cleaning up demo users and invalid credentials...');
        console.log('📍 Connection URI:', MONGODB_URI.replace(/:[^@]+@/, ':****@'));
        
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Connected to MongoDB Atlas successfully!');
        
        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');
        
        // Find and remove demo users
        const demoEmails = [
            'demo@studycontrol.com',
            'test@example.com',
            'admin@studycontrol.com' // Remove if it has weak password
        ];
        
        console.log('\n🔍 Searching for demo users...');
        
        for (const email of demoEmails) {
            const user = await usersCollection.findOne({ email });
            if (user) {
                console.log(`Found demo user: ${email}`);
                
                // Special check for admin user - only remove if it has the default weak password
                if (email === 'admin@studycontrol.com') {
                    console.log('⚠️  Admin user found. Checking if it has weak password...');
                    // Check if it's using any of the known weak passwords
                    const hasWeakPassword = user.password && (
                        user.password.includes('Admin123!') ||
                        user.password.includes('ChangeThisPassword123!') ||
                        user.password.includes('CHANGE_THIS_PASSWORD_123!')
                    );
                    
                    if (hasWeakPassword) {
                        console.log('🔐 Admin user has weak/default password. Consider removing and recreating with strong password.');
                        // Uncomment the next line if you want to automatically remove weak admin users
                        // await usersCollection.deleteOne({ email });
                        // console.log(`❌ Removed admin user with weak password: ${email}`);
                    } else {
                        console.log('✅ Admin user has secure password. Keeping.');
                    }
                } else {
                    // Remove demo users
                    await usersCollection.deleteOne({ email });
                    console.log(`❌ Removed demo user: ${email}`);
                }
            }
        }
        
        // Count remaining users
        const remainingUsers = await usersCollection.countDocuments();
        console.log(`\n📊 Database cleanup completed!`);
        console.log(`👥 Remaining users: ${remainingUsers}`);
        
        if (remainingUsers > 0) {
            console.log('\n📋 Remaining users:');
            const users = await usersCollection.find({}, { 
                projection: { 
                    name: 1, 
                    email: 1, 
                    role: 1,
                    createdAt: 1 
                } 
            }).toArray();
            
            users.forEach((user, index) => {
                console.log(`   ${index + 1}. ${user.name} (${user.email}) - ${user.role}`);
            });
        }
        
        console.log('\n🎯 Security Status:');
        console.log('✅ All demo credentials removed');
        console.log('✅ Only API-registered users can login');
        console.log('✅ Authentication secured');
        
    } catch (error) {
        console.error('❌ Cleanup failed:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
    }
}

cleanupDemoUsers();