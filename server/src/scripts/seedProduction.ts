import { database } from '@/config/database';
import { User, Quote } from '@/models';
import { config } from '@/config/environment';

// Production quotes (curated set)
const productionQuotes = [
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: 'motivation',
    tags: ['success', 'failure', 'courage']
  },
  {
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
    category: 'learning',
    tags: ['expertise', 'learning', 'growth']
  },
  {
    quote: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
    category: 'education',
    tags: ['education', 'power', 'change']
  },
  {
    quote: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: 'learning',
    tags: ['learning', 'knowledge', 'permanent']
  },
  {
    quote: "Study hard, for the well is deep, and our brains are shallow.",
    author: "Richard Baxter",
    category: 'education',
    tags: ['study', 'knowledge', 'depth']
  },
  {
    quote: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
    author: "Dr. Seuss",
    category: 'learning',
    tags: ['reading', 'knowledge', 'opportunities']
  },
  {
    quote: "Learning never exhausts the mind.",
    author: "Leonardo da Vinci",
    category: 'learning',
    tags: ['learning', 'mind', 'endless']
  },
  {
    quote: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
    category: 'motivation',
    tags: ['journey', 'beginning', 'action']
  },
  {
    quote: "Dream it. Wish it. Do it.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['dreams', 'action', 'achievement']
  },
  {
    quote: "Great things never come from comfort zones.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['comfort zone', 'growth', 'achievement']
  },
  {
    quote: "A goal without a plan is just a wish.",
    author: "Antoine de Saint-Exupéry",
    category: 'success',
    tags: ['goals', 'planning', 'strategy']
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: 'motivation',
    tags: ['future', 'dreams', 'belief']
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: 'motivation',
    tags: ['belief', 'confidence', 'achievement']
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: 'success',
    tags: ['great work', 'passion', 'love']
  },
  {
    quote: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    category: 'success',
    tags: ['innovation', 'leadership', 'creativity']
  }
];

const seedProduction = async (): Promise<void> => {
  try {
    console.log('🌱 Starting production database seeding...');
    
    if (config.NODE_ENV !== 'production') {
      console.log('⚠️  Warning: Not running in production environment');
      console.log(`Current environment: ${config.NODE_ENV}`);
      console.log('Continue? (This will seed the database)');
    }

    // Connect to database
    await database.connect();

    // Check if data already exists
    const existingQuotes = await Quote.countDocuments();
    if (existingQuotes > 0) {
      console.log('⚠️  Database already contains quotes. Skipping quote seeding.');
      console.log(`Found ${existingQuotes} existing quotes`);
    } else {
      // Create admin user (only if doesn't exist)
      let adminId;
      const existingAdmin = await User.findOne({ email: 'admin@studycontrol.com' });

      if (!existingAdmin) {
        const admin = new User({
          name: 'System Administrator',
          email: 'admin@studycontrol.com',
          password: 'ChangeThisPassword123!', // MUST be changed after deployment
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
        });

        const savedAdmin = await admin.save();
        adminId = savedAdmin._id;
        console.log('✅ Admin user created');
        console.log('🔐 CRITICAL: Change admin password immediately after deployment!');
      } else {
        adminId = existingAdmin._id;
        console.log('ℹ️  Admin user already exists');
      }

      // Seed quotes
      const quotes = productionQuotes.map(quote => ({
        ...quote,
        isActive: true,
        likes: Math.floor(Math.random() * 10), // Small random likes for production
        addedBy: adminId
      }));

      await Quote.insertMany(quotes);
      console.log(`✅ ${quotes.length} quotes seeded successfully`);
    }

    // Display final statistics
    const finalQuoteCount = await Quote.countDocuments();
    const finalUserCount = await User.countDocuments();

    console.log(`
📊 Production Database Status:

Statistics:
• Users: ${finalUserCount}
• Quotes: ${finalQuoteCount}
• Environment: ${config.NODE_ENV}

🔐 SECURITY REMINDERS:
1. Change the admin password immediately!
2. Verify all environment variables are set correctly
3. Ensure HTTPS is enabled in production
4. Check CORS origins match your frontend domains

🎉 Production database is ready!
    `);

  } catch (error) {
    console.error('❌ Production seeding failed:', error);
    throw error;
  } finally {
    await database.disconnect();
  }
};

// Run seeding if this file is executed directly
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
