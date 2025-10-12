import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Simple collection reset - drop and recreate without validators
 */

async function simpleCollectionReset() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not available');
    }

    const collectionName = 'diaryentries';

    // Drop the collection completely
    console.log('🗑️  Dropping the diaryentries collection...');
    try {
      await db.dropCollection(collectionName);
      console.log('✅ Collection dropped successfully');
    } catch (error) {
      console.log('⚠️  Collection may not exist');
    }

    // Create a fresh collection with NO validators at all
    console.log('🔄 Creating fresh collection...');
    await db.createCollection(collectionName);
    console.log('✅ Fresh collection created with no validators');

    // Test with a simple entry
    console.log('🔄 Testing collection...');
    const collection = db.collection(collectionName);
    
    const testEntry = {
      userId: '507f1f77bcf86cd799439011',
      title: 'Test Entry',
      content: 'Testing collection',
      date: new Date().toLocaleDateString(),
      mood: 'okay',
      tags: [],
      wordCount: 2,
      isPrivate: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(testEntry);
    console.log('✅ Test entry created successfully');
    
    // Clean up
    await collection.deleteOne({ _id: result.insertedId });
    console.log('🗑️  Test entry cleaned up');

    console.log('\n✨ Collection reset completed successfully!');
    console.log('📝 The collection now has NO validators - only Mongoose schema validation will apply');
    console.log('🔄 Please restart your server now.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Collection reset failed:', error);
    process.exit(1);
  }
}

simpleCollectionReset();
