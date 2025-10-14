import { database } from '../config/database';
import { User } from '../models';


// Optional admin user (remove/comment out if not needed)
const createAdminUser = true; // Set to true only if you need an admin user

const adminUser = {
  name: 'Admin User',
  email: 'admin@studycontrol.com',
  password: 'CHANGE_THIS_PASSWORD_123!', // MUST be changed after creation
  role: 'admin',
  preferences: {
    theme: 'dark',
    studyReminders: true,
    appUpdates: true,
    emailNotifications: true,
    soundEnabled: true,
    language: 'en',
  },
  profile: {
    bio: 'System administrator for StudyControl',
    timezone: 'UTC',
  },
  isEmailVerified: true
};

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await database.connect();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    
    let adminId;
    
    // Create admin user only if enabled
    if (createAdminUser) {
      // Only delete admin user if it exists
      const existingAdmin = await User.findOne({ email: adminUser.email });
      if (existingAdmin) {
        await User.deleteOne({ email: adminUser.email });
        console.log('🗑️  Removed existing admin user');
      }

      console.log('👤 Creating admin user...');
      const admin = new User(adminUser);
      await admin.save();
      adminId = admin._id;
      console.log(`✅ Admin user created: ${admin.email}`);
      console.log('🔐 WARNING: Change the admin password immediately!');
    } else {
      console.log('ℹ️  Admin user creation skipped (createAdminUser = false)');
      // Use a placeholder ID for quotes
      adminId = null;
    }

    // Quotes are now handled by external Quotable API
    console.log('💬 Quotes are now provided by external Quotable API - no seeding needed');

    // Display statistics
    const userCount = await User.countDocuments();

    console.log(`
📊 Database Seeding Completed!

Statistics:
• Users: ${userCount}
• Quotes: External API (Quotable)

${createAdminUser ? `
⚠️  Admin User Created:
• Email: ${adminUser.email}
• Password: ${adminUser.password}
• 🔐 CRITICAL: Change this password immediately!
` : ''}

🎉 Your StudyControl database is ready to use!
    `);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await database.disconnect();
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('✅ Seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    });
}

export default seedDatabase;
