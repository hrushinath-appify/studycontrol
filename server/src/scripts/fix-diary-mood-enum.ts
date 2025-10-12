import mongoose from 'mongoose';
import { DiaryEntry } from '../models/DiaryEntry';
import { config } from '../config/environment';

/**
 * Migration script to fix diary mood enum values
 * This script will:
 * 1. Update any entries with invalid mood values to 'okay'
 * 2. Drop and recreate the collection with proper validation
 */

const validMoods = ['great', 'good', 'okay', 'bad', 'terrible'];

async function fixMoodEnum() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all entries with invalid mood values
    const invalidEntries = await DiaryEntry.find({
      mood: { $exists: true, $nin: [...validMoods, null] }
    });

    console.log(`📊 Found ${invalidEntries.length} entries with invalid mood values`);

    if (invalidEntries.length > 0) {
      console.log('🔄 Updating invalid mood values to "okay"...');
      
      for (const entry of invalidEntries) {
        console.log(`  - Updating entry ${entry._id}: "${entry.mood}" -> "okay"`);
        entry.mood = 'okay' as any;
        await entry.save({ validateBeforeSave: false });
      }
      
      console.log('✅ Updated all invalid mood values');
    }

    // Drop the collection validator and recreate it
    console.log('🔄 Updating collection validator...');
    const db = mongoose.connection.db;
    
    if (!db) {
      throw new Error('Database connection not available');
    }
    
    const collectionName = 'diaryentries';
    
    try {
      // Get current collection info
      const collections = await db.listCollections({ name: collectionName }).toArray();
      
      if (collections.length > 0) {
        console.log('🔄 Dropping existing validator...');
        await db.command({
          collMod: collectionName,
          validator: {},
          validationLevel: 'off'
        });
        console.log('✅ Validator dropped');
      }
    } catch (error) {
      console.log('⚠️  No existing validator to drop');
    }

    // Apply the new validation rules
    console.log('🔄 Applying new validation rules...');
    await db.command({
      collMod: collectionName,
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            mood: {
              bsonType: ['string', 'null'],
              enum: [...validMoods, null],
              description: 'Mood must be one of: great, good, okay, bad, terrible, or null'
            }
          }
        }
      },
      validationLevel: 'moderate',
      validationAction: 'error'
    });
    console.log('✅ New validation rules applied');

    // Verify the fix
    console.log('🔍 Verifying fix...');
    const remainingInvalid = await DiaryEntry.find({
      mood: { $exists: true, $nin: [...validMoods, null] }
    });

    if (remainingInvalid.length === 0) {
      console.log('✅ All mood values are now valid!');
    } else {
      console.log(`⚠️  Still found ${remainingInvalid.length} entries with invalid moods`);
    }

    console.log('\n✨ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
fixMoodEnum();

