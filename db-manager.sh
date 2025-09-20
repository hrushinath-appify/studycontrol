#!/bin/bash

# StudyControl Database Management Script
echo "🗄️  StudyControl Database Management"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables
if [ -f "server/.env" ]; then
    export $(cat server/.env | grep -v '^#' | xargs)
else
    echo -e "${RED}❌ server/.env file not found${NC}"
    exit 1
fi

# Extract database name from URI
DB_NAME=$(echo $MONGODB_URI | sed 's/.*\/\([^?]*\).*/\1/')
echo -e "${BLUE}Database: ${DB_NAME}${NC}"

show_menu() {
    echo ""
    echo -e "${GREEN}Select an option:${NC}"
    echo "1. Test database connection"
    echo "2. Seed database with sample data"
    echo "3. View database statistics"
    echo "4. Clear all data (⚠️  Destructive)"
    echo "5. Export data backup"
    echo "6. View collections"
    echo "7. Connect to MongoDB shell"
    echo "8. Exit"
    echo ""
}

test_connection() {
    echo -e "${BLUE}Testing database connection...${NC}"
    cd server
    node -e "
        const mongoose = require('mongoose');
        mongoose.connect('$MONGODB_URI')
            .then(() => {
                console.log('✅ Connected to MongoDB Atlas successfully!');
                console.log('Database:', mongoose.connection.name);
                console.log('Host:', mongoose.connection.host);
                process.exit(0);
            })
            .catch(err => {
                console.error('❌ Connection failed:', err.message);
                process.exit(1);
            });
    "
    cd ..
}

seed_database() {
    echo -e "${BLUE}Seeding database with sample data...${NC}"
    cd server
    if [ -f "src/scripts/seed.ts" ]; then
        npm run seed
    else
        echo -e "${YELLOW}Creating sample data...${NC}"
        node -e "
            const mongoose = require('mongoose');
            
            async function seedData() {
                try {
                    await mongoose.connect('$MONGODB_URI');
                    console.log('Connected to database');
                    
                    // Sample user
                    const User = mongoose.model('User', new mongoose.Schema({
                        name: String,
                        email: String,
                        password: String,
                        role: { type: String, default: 'user' },
                        createdAt: { type: Date, default: Date.now }
                    }));
                    
                    // Sample diary entry
                    const DiaryEntry = mongoose.model('DiaryEntry', new mongoose.Schema({
                        userId: mongoose.Schema.Types.ObjectId,
                        title: String,
                        content: String,
                        mood: String,
                        date: String,
                        createdAt: { type: Date, default: Date.now }
                    }));
                    
                    console.log('✅ Sample collections created');
                    console.log('Run the app and register a user to see data');
                    
                    await mongoose.disconnect();
                } catch (error) {
                    console.error('❌ Seeding failed:', error.message);
                }
            }
            
            seedData();
        "
    fi
    cd ..
}

view_stats() {
    echo -e "${BLUE}Fetching database statistics...${NC}"
    cd server
    node -e "
        const mongoose = require('mongoose');
        
        async function getStats() {
            try {
                await mongoose.connect('$MONGODB_URI');
                const db = mongoose.connection.db;
                
                const stats = await db.stats();
                console.log('📊 Database Statistics:');
                console.log('Database Name:', stats.db);
                console.log('Collections:', stats.collections);
                console.log('Objects:', stats.objects);
                console.log('Data Size:', Math.round(stats.dataSize / 1024), 'KB');
                console.log('Storage Size:', Math.round(stats.storageSize / 1024), 'KB');
                
                // List collections
                const collections = await db.listCollections().toArray();
                console.log('\n📋 Collections:');
                for (const col of collections) {
                    console.log('-', col.name);
                }
                
                await mongoose.disconnect();
            } catch (error) {
                console.error('❌ Failed to get stats:', error.message);
            }
        }
        
        getStats();
    "
    cd ..
}

clear_data() {
    echo -e "${RED}⚠️  This will delete ALL data in the database!${NC}"
    read -p "Are you sure? Type 'YES' to confirm: " confirm
    
    if [ "$confirm" = "YES" ]; then
        echo -e "${BLUE}Clearing database...${NC}"
        cd server
        node -e "
            const mongoose = require('mongoose');
            
            async function clearData() {
                try {
                    await mongoose.connect('$MONGODB_URI');
                    await mongoose.connection.db.dropDatabase();
                    console.log('✅ Database cleared successfully');
                    await mongoose.disconnect();
                } catch (error) {
                    console.error('❌ Failed to clear database:', error.message);
                }
            }
            
            clearData();
        "
        cd ..
    else
        echo -e "${YELLOW}Operation cancelled${NC}"
    fi
}

export_backup() {
    echo -e "${BLUE}Exporting database backup...${NC}"
    BACKUP_FILE="studycontrol-backup-$(date +%Y%m%d-%H%M%S).json"
    
    cd server
    node -e "
        const mongoose = require('mongoose');
        const fs = require('fs');
        
        async function exportData() {
            try {
                await mongoose.connect('$MONGODB_URI');
                const db = mongoose.connection.db;
                
                const collections = await db.listCollections().toArray();
                const backup = {};
                
                for (const colInfo of collections) {
                    const collection = db.collection(colInfo.name);
                    backup[colInfo.name] = await collection.find({}).toArray();
                }
                
                fs.writeFileSync('$BACKUP_FILE', JSON.stringify(backup, null, 2));
                console.log('✅ Backup saved to $BACKUP_FILE');
                
                await mongoose.disconnect();
            } catch (error) {
                console.error('❌ Backup failed:', error.message);
            }
        }
        
        exportData();
    "
    cd ..
}

view_collections() {
    echo -e "${BLUE}Viewing collection data...${NC}"
    cd server
    node -e "
        const mongoose = require('mongoose');
        
        async function viewCollections() {
            try {
                await mongoose.connect('$MONGODB_URI');
                const db = mongoose.connection.db;
                
                const collections = await db.listCollections().toArray();
                
                for (const colInfo of collections) {
                    const collection = db.collection(colInfo.name);
                    const count = await collection.countDocuments();
                    console.log(\`\n📁 \${colInfo.name} (\${count} documents):\`);
                    
                    if (count > 0) {
                        const sample = await collection.findOne({});
                        console.log('Sample document:', JSON.stringify(sample, null, 2).substring(0, 200) + '...');
                    }
                }
                
                await mongoose.disconnect();
            } catch (error) {
                console.error('❌ Failed to view collections:', error.message);
            }
        }
        
        viewCollections();
    "
    cd ..
}

connect_shell() {
    echo -e "${BLUE}Connecting to MongoDB shell...${NC}"
    echo -e "${YELLOW}Note: You'll need mongosh installed locally${NC}"
    echo -e "${YELLOW}Or use MongoDB Atlas web interface at: https://cloud.mongodb.com${NC}"
    
    if command -v mongosh &> /dev/null; then
        mongosh "$MONGODB_URI"
    else
        echo -e "${RED}❌ mongosh not found locally${NC}"
        echo -e "${BLUE}Install with: brew install mongosh${NC}"
        echo -e "${BLUE}Or use Atlas web interface${NC}"
    fi
}

# Main menu loop
while true; do
    show_menu
    read -p "Enter your choice (1-8): " choice
    
    case $choice in
        1) test_connection ;;
        2) seed_database ;;
        3) view_stats ;;
        4) clear_data ;;
        5) export_backup ;;
        6) view_collections ;;
        7) connect_shell ;;
        8) echo -e "${GREEN}Goodbye!${NC}"; exit 0 ;;
        *) echo -e "${RED}Invalid option. Please try again.${NC}" ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done