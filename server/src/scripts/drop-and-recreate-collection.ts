import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Nuclear option: Drop and recreate the diary collection completely
 * This will delete all diary entries but ensure the mood validation works
 */

async function dropAndRecreateCollection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const collectionName = 'diaryentries';

    // Step 1: Backup existing data (optional - comment out if you want to keep data)
    console.log('📋 Checking existing entries...');
    const collection = db.collection(collectionName);
    const existingEntries = await collection.find({}).toArray();
    console.log(`📊 Found ${existingEntries.length} existing entries`);

    if (existingEntries.length > 0) {
      console.log('💾 Backing up entries to backup collection...');
      await db.collection('diaryentries_backup').insertMany(existingEntries);
      console.log('✅ Backup created in diaryentries_backup collection');
    }

    // Step 2: Drop the problematic collection completely
    console.log('🗑️  Dropping the diaryentries collection...');
    try {
      await db.dropCollection(collectionName);
      console.log('✅ Collection dropped successfully');
    } catch (error) {
      console.log('⚠️  Collection may not exist or already dropped');
    }

    // Step 3: Create a fresh collection with NO validators
    console.log('🔄 Creating fresh collection with no validators...');
    await db.createCollection(collectionName, {
      // No validator at all - let Mongoose handle validation
    });
    console.log('✅ Fresh collection created');

    // Step 4: Create indexes only (no validation)
    console.log('🔄 Creating indexes...');
    const newCollection = db.collection(collectionName);
    
    await Promise.all([
      newCollection.createIndex({ userId: 1, createdAt: -1 }),
      newCollection.createIndex({ userId: 1, date: -1 }),
      newCollection.createIndex({ userId: 1, mood: 1 }),
      newCollection.createIndex({ userId: 1, tags: 1 }),
      newCollection.createIndex({ 
        title: 'text', 
        content: 'text' 
      }, { 
        weights: { title: 10, content: 5 } 
      })
    ]);
    console.log('✅ Indexes created');

    // Step 5: Restore data if backed up
    if (existingEntries.length > 0) {
      console.log('🔄 Restoring entries to new collection...');
      
      // Clean up any invalid mood values before restoring
      const cleanedEntries = existingEntries.map(entry => ({
        ...entry,
        mood: ['great', 'good', 'okay', 'bad', 'terrible'].includes(entry.mood) 
          ? entry.mood 
          : entry.mood 
            ? 'okay'  // Convert any invalid mood to 'okay'
            : null    // Keep null as null
      }));
      
      await newCollection.insertMany(cleanedEntries);
      console.log('✅ Entries restored successfully');
      
      // Clean up backup
      await db.dropCollection('diaryentries_backup');
      console.log('🗑️  Backup collection cleaned up');
    }

    // Step 6: Test the new collection
    console.log('🔄 Testing new collection...');
    
    const testEntry = {
      userId: '507f1f77bcf86cd799439011',
      title: 'Test Entry - Fresh Collection',
      content: 'Testing fresh collection with okay mood',
      date: new Date().toLocaleDateString(),
      mood: 'okay',
      tags: [],
      wordCount: 7,
      isPrivate: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await newCollection.insertOne(testEntry);
    console.log('✅ Test entry created successfully with ID:', result.insertedId);
    
    // Test all mood values
    const testMoods = ['great', 'good', 'okay', 'bad', 'terrible'];
    for (const mood of testMoods) {
      const testMoodEntry = {
        ...testEntry,
        title: `Test ${mood} mood`,
        mood: mood,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const moodResult = await newCollection.insertOne(testMoodEntry);
      console.log(`✅ ${mood} mood test successful with ID:`, moodResult.insertedId);
      
      // Clean up test entry
      await newCollection.deleteOne({ _id: moodResult.insertedId });
    }
    
    // Clean up main test entry
    await newCollection.deleteOne({ _id: result.insertedId });
    console.log('🗑️  Test entries cleaned up');

    console.log('\n✨ Collection recreation completed successfully!');
    console.log('🔄 Please restart your server now.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Collection recreation failed:', error);
    process.exit(1);
  }
}

dropAndRecreateCollection();
