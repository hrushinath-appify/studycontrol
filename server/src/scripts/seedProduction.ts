import { database } from '@/config/database';
import { User } from '@/models';
import { config } from '@/config/environment';

// Production admin user (CRITICAL: Change password after first use)
const adminUser = {
  name: 'StudyControl Admin',
  email: process.env.ADMIN_EMAIL || 'admin@studycontrol.app',
  password: process.env.ADMIN_PASSWORD || 'TempAdmin123!',
  role: 'admin' as const,
  isEmailVerified: true,
  preferences: {
    theme: 'system' as const,
    studyReminders: true,
    appUpdates: true,
    emailNotifications: true,
    soundEnabled: true,
    language: 'en'
  },
  profile: {
    bio: 'StudyControl Administrator',
    studyGoals: ['System Management'],
    focusAreas: ['Platform Administration'],
    dailyStudyHours: 8,
    timezone: 'UTC'
  }
};

async function seedProduction() {
  try {
    console.log('🌱 Starting production database seeding...');
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Database: ${config.MONGODB_URI ? 'Connected' : 'Not configured'}`);

    // Connect to database
    await database.connect();

    // Check if data already exists
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log('⚠️  Database already contains users. Skipping user seeding.');
      console.log(`Found ${existingUsers} existing users`);
    } else {
      // Create admin user
      console.log('👤 Creating admin user...');
      const admin = new User(adminUser);
      await admin.save();
      console.log(`✅ Admin user created: ${admin.email}`);
      console.log('🔐 CRITICAL: Change the admin password immediately!');
    }

    // Quotes are now handled by external Quotable API
    console.log('💬 Quotes are now provided by external Quotable API - no seeding needed');

    // Display final statistics
    const finalUserCount = await User.countDocuments();

    console.log(`
📊 Production Database Setup Complete!
═══════════════════════════════════════
• Users: ${finalUserCount}
• Quotes: External API (Quotable)
═══════════════════════════════════════

⚠️  IMPORTANT NEXT STEPS:
1. Change the admin password immediately
2. Set up proper environment variables
3. Configure email service
4. Set up monitoring and backups

🎉 Your StudyControl production database is ready!
    `);

  } catch (error) {
    console.error('❌ Production seeding failed:', error);
    throw error;
  } finally {
    await database.disconnect();
  }
}

// Run the seeding
if (require.main === module) {
  seedProduction()
    .then(() => {
      console.log('✅ Production seeding completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Production seeding failed:', error);
      process.exit(1);
    });
}

export default seedProduction;