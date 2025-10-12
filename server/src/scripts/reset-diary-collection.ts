import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Aggressive migration to completely reset the DiaryEntry collection
 * This will drop the entire collection and recreate it with proper validation
 * WARNING: This will delete all diary entries! Use with caution.
 */

async function resetDiaryCollection() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const collectionName = 'diaryentries';

    // Check if collection exists
    const collections = await db.listCollections({ name: collectionName }).toArray();
    
    if (collections.length > 0) {
      console.log('⚠️  WARNING: This will delete all diary entries!');
      console.log('🔄 Dropping collection...');
      await db.dropCollection(collectionName);
      console.log('✅ Collection dropped');
    }

    // Recreate collection with proper validation
    console.log('🔄 Creating new collection with validation...');
    await db.createCollection(collectionName, {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['userId', 'title', 'content', 'date'],
          properties: {
            userId: {
              bsonType: 'string',
              description: 'User ID is required'
            },
            title: {
              bsonType: 'string',
              minLength: 1,
              maxLength: 200,
              description: 'Title must be between 1 and 200 characters'
            },
            content: {
              bsonType: 'string',
              minLength: 1,
              maxLength: 50000,
              description: 'Content must be between 1 and 50,000 characters'
            },
            date: {
              bsonType: 'string',
              description: 'Date is required'
            },
            mood: {
              bsonType: ['string', 'null'],
              enum: ['great', 'good', 'okay', 'bad', 'terrible', null],
              description: 'Mood must be one of: great, good, okay, bad, terrible, or null'
            },
            tags: {
              bsonType: 'array',
              items: {
                bsonType: 'string',
                maxLength: 30
              },
              description: 'Tags array with string items'
            },
            wordCount: {
              bsonType: 'number',
              minimum: 0,
              description: 'Word count must be non-negative'
            },
            isPrivate: {
              bsonType: 'bool',
              description: 'Privacy flag'
            }
          }
        }
      },
      validationLevel: 'strict',
      validationAction: 'error'
    });

    // Create indexes
    console.log('🔄 Creating indexes...');
    const collection = db.collection(collectionName);
    
    await Promise.all([
      collection.createIndex({ userId: 1, createdAt: -1 }),
      collection.createIndex({ userId: 1, date: -1 }),
      collection.createIndex({ userId: 1, mood: 1 }),
      collection.createIndex({ userId: 1, tags: 1 }),
      collection.createIndex({ 
        title: 'text', 
        content: 'text' 
      }, { 
        weights: { title: 10, content: 5 } 
      })
    ]);

    console.log('✅ New collection created with proper validation and indexes');
    console.log('\n✨ Collection reset completed successfully!');
    console.log('⚠️  Note: All previous diary entries have been deleted.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Collection reset failed:', error);
    process.exit(1);
  }
}

// Run the reset (uncomment the line below to execute)
// resetDiaryCollection();

console.log('⚠️  This script will delete all diary entries!');
console.log('⚠️  Uncomment the last line in the script to execute.');
console.log('⚠️  Make sure you have a backup of your data first.');
