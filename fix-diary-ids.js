#!/usr/bin/env node

/**
 * Script to fix corrupted diary entry IDs in the database
 * This will delete entries with invalid ObjectIds and ensure clean data
 */

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config({ path: './client/.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

async function fixDiaryIds() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('diaryentries');
    
    console.log('📊 Checking diary entries...');
    
    // Find all entries
    const allEntries = await collection.find({}).toArray();
    console.log(`Found ${allEntries.length} diary entries`);
    
    // Check for entries with invalid IDs
    const invalidEntries = [];
    const validEntries = [];
    
    for (const entry of allEntries) {
      try {
        // Try to create ObjectId from the _id
        const id = entry._id.toString();
        if (!/^[0-9a-fA-F]{24}$/.test(id)) {
          invalidEntries.push(entry);
        } else {
          validEntries.push(entry);
        }
      } catch (error) {
        invalidEntries.push(entry);
      }
    }
    
    console.log(`✅ Valid entries: ${validEntries.length}`);
    console.log(`❌ Invalid entries: ${invalidEntries.length}`);
    
    if (invalidEntries.length > 0) {
      console.log('\n🗑️  Removing invalid entries:');
      for (const entry of invalidEntries) {
        console.log(`  - Removing entry: ${entry._id} (${entry.title || 'Untitled'})`);
        await collection.deleteOne({ _id: entry._id });
      }
      console.log(`✅ Removed ${invalidEntries.length} invalid entries`);
    }
    
    // Verify remaining entries
    const remainingEntries = await collection.find({}).toArray();
    console.log(`\n📊 Final count: ${remainingEntries.length} valid entries`);
    
    if (remainingEntries.length > 0) {
      console.log('\n✅ Valid entries:');
      for (const entry of remainingEntries) {
        console.log(`  - ${entry._id} (${entry.title || 'Untitled'}) - ${entry.date || new Date(entry.createdAt).toLocaleDateString()}`);
      }
    }
    
    console.log('\n🎉 Database cleanup complete!');
    console.log('💡 You can now create new diary entries and they should work properly.');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

// Run the script
fixDiaryIds().catch(console.error);
