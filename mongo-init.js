// MongoDB initialization script
// This script creates a user for the StudyControl application

db = db.getSiblingDB('studycontrol');

// Create application user
db.createUser({
  user: 'studycontrol',
  pwd: 'studycontrol123',
  roles: [
    {
      role: 'readWrite',
      db: 'studycontrol'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.diaryentries.createIndex({ "userId": 1, "createdAt": -1 });
db.notes.createIndex({ "userId": 1, "isPinned": -1, "updatedAt": -1 });
db.quotes.createIndex({ "category": 1, "isActive": 1 });

print('Database initialization completed successfully!');