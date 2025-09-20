# StudyControl - Manual Setup Guide

This guide provides step-by-step instructions for manually setting up and running the StudyControl application with MongoDB Atlas.

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MongoDB Atlas account** (free tier available)
- **Terminal/Command Prompt**

## 🚀 Quick Start

1. **Clone and navigate to the project:**
   ```bash
   cd studyControl
   ```

2. **Run the automated setup:**
   ```bash
   ./start-app.sh
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free or log in
3. Create a new project: "StudyControl"

### Step 2: Create Database Cluster
1. Click "Build a Database"
2. Select "M0 Sandbox" (free tier)
3. Choose cloud provider and region
4. Name: "studycontrol-cluster"
5. Click "Create"

### Step 3: Database User Setup
1. Go to "Database Access" in Security
2. Click "Add New Database User"
3. Username: `studycontrol`
4. Generate secure password (save it!)
5. Role: "Read and write to any database"
6. Click "Add User"

### Step 4: Network Access
1. Go to "Network Access" in Security
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js 4.1+"
4. Copy the connection string:
   ```
   mongodb+srv://studycontrol:<password>@studycontrol-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ⚙️ Environment Configuration

### Update Server Configuration

Edit `server/.env`:

```bash
# Database Configuration - REPLACE WITH YOUR ATLAS CONNECTION
MONGODB_URI=mongodb+srv://studycontrol:<YOUR_PASSWORD>@studycontrol-cluster.xxxxx.mongodb.net/studycontrol?retryWrites=true&w=majority

# JWT Configuration - CHANGE IN PRODUCTION
JWT_SECRET=your-super-secret-jwt-key-make-this-very-long-and-random
JWT_REFRESH_SECRET=your-refresh-token-secret-also-make-this-different

# Other settings (optional to modify)
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Client Configuration

The `client/.env.local` should already be configured:

```bash 
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🏃‍♂️ Manual Startup

### Option 1: Automated Script
```bash
./start-app.sh
```

### Option 2: Manual Commands

**Terminal 1 - Backend:**
```bash
cd server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm run dev
```

## 🗄️ Database Management

Use the database manager script:

```bash
./db-manager.sh
```

### Available Options:
1. **Test Connection** - Verify Atlas connectivity
2. **Seed Data** - Add sample data
3. **View Statistics** - Database info and stats
4. **Clear Data** - Remove all data (⚠️ destructive)
5. **Export Backup** - Create JSON backup
6. **View Collections** - Browse data
7. **MongoDB Shell** - Direct database access

## 🔧 Manual Database Operations

### Test Connection
```bash
cd server
node -e "
const mongoose = require('mongoose');
mongoose.connect('YOUR_MONGODB_URI')
  .then(() => console.log('✅ Connected!'))
  .catch(err => console.error('❌ Failed:', err.message));
"
```

### Create Sample User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

## 📊 Testing the Application

### 1. API Health Check
```bash
curl http://localhost:5000/health
```

### 2. Frontend Access
Open browser: http://localhost:3000

### 3. Create Test Data
1. Register a new user via frontend
2. Create diary entries, tasks, notes
3. Verify data in MongoDB Atlas web interface

## 🛠️ Development Commands

### Backend Commands
```bash
cd server
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Frontend Commands
```bash
cd client
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Issues
1. Check connection string format
2. Verify IP whitelist in Atlas
3. Confirm user credentials
4. Test network connectivity

### Environment Issues
1. Ensure `.env` files exist
2. Verify environment variables
3. Check file permissions

## 📱 Application Features

### Authentication
- User registration and login
- JWT-based authentication
- Password reset functionality

### Core Features
- **Diary**: Personal journal entries with mood tracking
- **Tasks**: Todo management with priorities
- **Notes**: Organized note-taking system
- **Focus**: Pomodoro timer for productivity
- **Content**: Quotes, news, and learning topics

### API Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/diary` - Get diary entries
- `POST /api/v1/diary` - Create diary entry
- `GET /api/v1/tasks` - Get tasks
- `POST /api/v1/tasks` - Create task
- And many more...

## 🔐 Security Notes

### For Production:
1. Change all default secrets in `.env`
2. Use strong, unique passwords
3. Restrict MongoDB Atlas IP access
4. Enable MongoDB Atlas network encryption
5. Set up proper CORS origins
6. Use HTTPS in production

## 📞 Support

If you encounter issues:

1. Check the terminal output for error messages
2. Verify MongoDB Atlas connection
3. Ensure all dependencies are installed
4. Check port availability
5. Review environment configuration

## 🎯 Next Steps

1. **Development**: Start building features
2. **Testing**: Add tests for your code
3. **Deployment**: Deploy to production
4. **Monitoring**: Set up logging and monitoring
5. **Scaling**: Plan for growth and scaling

---

**StudyControl** - Your comprehensive study management platform! 🎓