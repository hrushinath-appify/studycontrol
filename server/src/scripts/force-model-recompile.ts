import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Force recompile Mongoose models to clear cached schema
 */

async function forceModelRecompile() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear Mongoose model cache
    console.log('🔄 Clearing Mongoose model cache...');
    delete mongoose.models.DiaryEntry;
    
    // Force recompile by requiring the model again
    console.log('🔄 Recompiling DiaryEntry model...');
    const { DiaryEntry } = require('../models/DiaryEntry');
    
    // Test creating a simple entry to verify the schema
    console.log('🔄 Testing model with valid mood values...');
    
    const testMoods = ['great', 'good', 'okay', 'bad', 'terrible'];
    for (const mood of testMoods) {
      try {
        const testEntry = new DiaryEntry({
          userId: 'test-user-id',
          title: `Test Entry - ${mood}`,
          content: 'Test content',
          date: new Date().toLocaleDateString(),
          mood: mood
        });
        
        // Validate without saving
        await testEntry.validate();
        console.log(`✅ Mood "${mood}" is valid`);
      } catch (error: any) {
        console.error(`❌ Mood "${mood}" failed validation:`, error.message);
      }
    }

    // Check collection validator
    console.log('🔄 Checking collection validator...');
    const db = mongoose.connection.db;
    if (db) {
      try {
        const collectionInfo = await db.listCollections({ name: 'diaryentries' }).toArray();
        if (collectionInfo.length > 0) {
          console.log('📋 Collection exists');
          // Try to get collection stats instead
          const collection = db.collection('diaryentries');
          const stats = await (collection as any).stats();
          console.log('📊 Collection stats:', stats);
        }
      } catch (error) {
        console.log('⚠️  Could not retrieve collection info');
      }
    }

    console.log('\n✨ Model recompilation completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Model recompilation failed:', error);
    process.exit(1);
  }
}

// Run the recompilation
forceModelRecompile();
