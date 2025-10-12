import mongoose from 'mongoose';
import { config } from '../config/environment';

async function testMoodValidation() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Import the model fresh
    const { DiaryEntry } = require('../models/DiaryEntry');
    
    console.log('🔄 Testing mood validation...');
    
    // Test with a valid mood
    try {
      const validEntry = new DiaryEntry({
        userId: '507f1f77bcf86cd799439011',
        title: 'Test Entry',
        content: 'Test content for mood validation',
        date: new Date().toLocaleDateString(),
        mood: 'great'
      });
      
      await validEntry.validate();
      console.log('✅ "great" mood is valid in Mongoose schema');
      
      // Try to save it to test MongoDB collection validator
      const saved = await validEntry.save();
      console.log('✅ Entry saved successfully with "great" mood');
      console.log('📝 Saved entry ID:', saved._id);
      
      // Clean up - delete the test entry
      await DiaryEntry.findByIdAndDelete(saved._id);
      console.log('🗑️  Test entry cleaned up');
      
    } catch (error: any) {
      console.error('❌ Failed to create entry with "great" mood:', error.message);
      if (error.errors) {
        console.error('📋 Validation errors:', error.errors);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testMoodValidation();
