#!/usr/bin/env bash

# Script to fix MongoDB duplicate indexes
# This will drop all indexes and let Mongoose recreate them properly

cat << 'EOF'
# MongoDB Index Fix Script

Run these commands in MongoDB Compass or Atlas:

## 1. Connect to your database: studycontrol

## 2. Run these commands to drop duplicate indexes:

// Drop all diary entry indexes except _id
db.diaryentries.dropIndexes()

// Drop all note indexes except _id  
db.notes.dropIndexes()

// Drop all marrow progress indexes except _id
db.marrowprogresses.dropIndexes()

// Drop all session indexes except _id (THIS IS THE MAIN CULPRIT!)
db.sessions.dropIndexes()

// Drop specific user index if it exists
try { db.users.dropIndex("mysteryClicks_1") } catch(e) { print("mysteryClicks_1 index not found, skipping") }

## 3. After dropping indexes, redeploy the app
## Mongoose will automatically recreate the correct indexes

## To verify indexes after deployment:
db.diaryentries.getIndexes()
db.notes.getIndexes()
db.marrowprogresses.getIndexes()
db.users.getIndexes()

EOF

echo ""
echo "✅ Index fix script created!"
echo ""
echo "📋 Manual Steps Required:"
echo "1. Go to MongoDB Atlas: https://cloud.mongodb.com/"
echo "2. Navigate to your cluster"
echo "3. Click 'Browse Collections'"
echo "4. Open the shell (>_ icon) or use MongoDB Compass"
echo "5. Copy and paste the commands above"
echo "6. Run them one by one"
echo "7. Come back and redeploy: git push origin main"
echo ""
