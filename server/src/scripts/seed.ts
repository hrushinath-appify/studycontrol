import { database } from '@/config/database';
import { User, Quote } from '@/models';

// Sample quotes data (matching the frontend mock data)
const sampleQuotes = [
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
    quote: "Your limitation—it's only your imagination.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['limitations', 'imagination', 'potential']
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
    quote: "Success doesn't just find you. You have to go out and get it.",
    author: "Anonymous",
    category: 'success',
    tags: ['success', 'action', 'initiative']
  },
  {
    quote: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Anonymous",
    category: 'success',
    tags: ['hard work', 'achievement', 'satisfaction']
  },
  {
    quote: "Don't stop when you're tired. Stop when you're done.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['perseverance', 'completion', 'endurance']
  },
  {
    quote: "Wake up with determination. Go to bed with satisfaction.",
    author: "Anonymous",
    category: 'motivation',
    tags: ['determination', 'satisfaction', 'daily']
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
    quote: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: 'motivation',
    tags: ['darkness', 'focus', 'hope']
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
  }
];

// Optional admin user (remove/comment out if not needed)
const createAdminUser = false; // Set to true only if you need an admin user

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
    await Quote.deleteMany({});
    
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

    // Seed quotes
    console.log('💬 Seeding quotes...');
    const quotes = sampleQuotes.map(quote => ({
      ...quote,
      isActive: true,
      likes: Math.floor(Math.random() * 50),
      addedBy: adminId // Will be null if no admin user created
    }));

    await Quote.insertMany(quotes);
    console.log(`✅ ${quotes.length} quotes seeded successfully`);

    // Display statistics
    const quoteCount = await Quote.countDocuments();
    const userCount = await User.countDocuments();

    console.log(`
📊 Database Seeding Completed!

Statistics:
• Users: ${userCount}
• Quotes: ${quoteCount}

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
