#!/usr/bin/env node

/**
 * Script to check diary entries in the database
 * Run with: node check-diary-entries.js
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: './client/.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

// Define DiaryEntry schema
const diaryEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  mood: { type: String, enum: ['great', 'good', 'okay', 'bad', 'terrible'] },
  tags: [{ type: String }],
  isPrivate: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

async function checkDiaryEntries() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const DiaryEntry = mongoose.model('DiaryEntry', diaryEntrySchema);

    // Get all diary entries
    const entries = await DiaryEntry.find().lean();
    
    console.log(`📊 Total diary entries in database: ${entries.length}\n`);

    if (entries.length === 0) {
      console.log('⚠️  No diary entries found in database!');
      console.log('This explains the 404 error - there are no entries to display.\n');
      console.log('💡 To fix this:');
      console.log('1. Create a new diary entry from the diary page');
      console.log('2. Or import sample data if available\n');
    } else {
      console.log('📋 Diary Entries:\n');
      entries.forEach((entry, index) => {
        console.log(`Entry ${index + 1}:`);
        console.log(`  ID: ${entry._id}`);
        console.log(`  User ID: ${entry.userId}`);
        console.log(`  Title: ${entry.title}`);
        console.log(`  Created: ${entry.createdAt}`);
        console.log(`  ID Length: ${entry._id.toString().length} chars`);
        console.log(`  Valid ObjectId: ${mongoose.Types.ObjectId.isValid(entry._id)}`);
        console.log('');
      });
    }

    // Get unique user IDs
    const userIds = [...new Set(entries.map(e => e.userId.toString()))];
    console.log(`👥 Unique users with diary entries: ${userIds.length}`);
    if (userIds.length > 0) {
      console.log('User IDs:');
      userIds.forEach(id => console.log(`  - ${id}`));
    }

  } catch (error) {
    console.error('❌ Error checking diary entries:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
}

checkDiaryEntries();
