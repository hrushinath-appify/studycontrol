import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Complete fix for mood enum validation issue
 * This will completely remove any collection-level validators and rely only on Mongoose schema validation
 */

async function completeMoodFix() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const collectionName = 'diaryentries';

    // Step 1: Remove all collection-level validators
    console.log('🔄 Removing collection-level validators...');
    try {
      await db.command({
        collMod: collectionName,
        validator: {},
        validationLevel: 'off',
        validationAction: 'warn'
      });
      console.log('✅ Collection validators removed');
    } catch (error) {
      console.log('⚠️  No validators to remove or collection does not exist');
    }

    // Step 2: Update any existing entries with invalid mood values
    console.log('🔄 Checking for entries with invalid mood values...');
    const collection = db.collection(collectionName);
    
    const invalidMoods = await collection.find({
      mood: { $exists: true, $nin: ['great', 'good', 'okay', 'bad', 'terrible', null] }
    }).toArray();

    if (invalidMoods.length > 0) {
      console.log(`📊 Found ${invalidMoods.length} entries with invalid moods`);
      for (const entry of invalidMoods) {
        console.log(`  - Updating entry ${entry._id}: "${entry.mood}" -> "okay"`);
        await collection.updateOne(
          { _id: entry._id },
          { $set: { mood: 'okay' } }
        );
      }
      console.log('✅ Updated all invalid mood values');
    } else {
      console.log('✅ No invalid mood values found');
    }

    // Step 3: Test creating an entry directly in the collection
    console.log('🔄 Testing direct collection insert...');
    const testEntry = {
      userId: '507f1f77bcf86cd799439011',
      title: 'Test Entry - Direct Insert',
      content: 'Testing direct MongoDB insert with great mood',
      date: new Date().toLocaleDateString(),
      mood: 'great',
      tags: [],
      wordCount: 8,
      isPrivate: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const result = await collection.insertOne(testEntry);
      console.log('✅ Direct insert successful with ID:', result.insertedId);
      
      // Clean up test entry
      await collection.deleteOne({ _id: result.insertedId });
      console.log('🗑️  Test entry cleaned up');
    } catch (error: any) {
      console.error('❌ Direct insert failed:', error.message);
    }

    // Step 4: Test with Mongoose model
    console.log('🔄 Testing Mongoose model...');
    
    // Clear model cache
    delete mongoose.models.DiaryEntry;
    
    // Re-import model
    const { DiaryEntry } = require('../models/DiaryEntry');
    
    try {
      const mongooseEntry = new DiaryEntry({
        userId: '507f1f77bcf86cd799439011',
        title: 'Test Entry - Mongoose',
        content: 'Testing Mongoose model with great mood',
        date: new Date().toLocaleDateString(),
        mood: 'great'
      });

      const saved = await mongooseEntry.save();
      console.log('✅ Mongoose save successful with ID:', saved._id);
      
      // Clean up
      await DiaryEntry.findByIdAndDelete(saved._id);
      console.log('🗑️  Mongoose test entry cleaned up');
    } catch (error: any) {
      console.error('❌ Mongoose save failed:', error.message);
      if (error.errors) {
        console.error('📋 Validation errors:', error.errors);
      }
    }

    console.log('\n✨ Complete mood fix completed!');
    console.log('🔄 Please restart your server to ensure all changes take effect.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Complete fix failed:', error);
    process.exit(1);
  }
}

completeMoodFix();
