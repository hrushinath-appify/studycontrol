# StudyControl Backend - Quick Setup Guide

This guide will help you get the StudyControl backend API up and running quickly.

## 🚀 Quick Start (5 minutes)

### Step 1: Prerequisites Check
Make sure you have:
- **Node.js** v18+ installed
- **MongoDB** running (local or Atlas)
- **Git** installed

### Step 2: Environment Setup
1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` with your settings:
   ```env
   # Required: Change these values
   MONGODB_URI=mongodb://localhost:27017/studycontrol
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   
   # Optional: Customize if needed
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

### Step 3: Install & Run
```bash
# Install dependencies
npm install

# Seed the database (optional but recommended)
npm run seed

# Start development server
npm run dev
```

That's it! Your API should be running at `http://localhost:5000`

## 🧪 Test Your Setup

### 1. Health Check
```bash
curl http://localhost:5000/health
```
Expected response:
```json
{
  "success": true,
  "message": "StudyControl API is healthy",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

### 2. Get Random Quote
```bash
curl http://localhost:5000/api/v1/quotes/random
```

### 3. Register a Test User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

## 🔧 MongoDB Setup Options

### Option 1: Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Install MongoDB (Ubuntu)
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Option 2: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

## 🛠️ Development Commands

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Seed database with sample data
npm run seed

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📱 Frontend Integration

Update your frontend's API configuration to point to:
```typescript
// In your frontend config
const API_BASE_URL = 'http://localhost:5000/api/v1'
```

## 🐛 Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution**: 
- Check MongoDB is running: `brew services list | grep mongodb`
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

### Issue: "Port 5000 already in use"
**Solution**:
```bash
# Find and kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Issue: "JWT token error"
**Solution**: Make sure `JWT_SECRET` and `JWT_REFRESH_SECRET` are set in `.env`

### Issue: "CORS error from frontend"
**Solution**: Update `CORS_ORIGIN` in `.env` to match your frontend URL

## 🔐 Admin Access

After running `npm run seed`, you can use these admin credentials:
- **Email**: `admin@studycontrol.com`
- **Password**: `Admin123!`

## 📊 API Endpoints Overview

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | No |
| POST | `/api/v1/auth/register` | Register user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| GET | `/api/v1/auth/me` | Get current user | Yes |
| GET | `/api/v1/quotes/random` | Get random quote | No |
| GET | `/api/v1/quotes/quote-of-the-day` | Daily quote | No |
| GET | `/api/v1/diary` | Get diary entries | Yes |
| POST | `/api/v1/diary` | Create diary entry | Yes |

## 🚀 Production Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/studycontrol
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

### Build and Deploy
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📞 Need Help?

1. **Check the logs**: The server provides detailed logging
2. **Review the main README.md**: Contains comprehensive documentation
3. **Check environment variables**: Most issues are configuration-related
4. **Verify MongoDB connection**: Use MongoDB Compass or CLI to test

## 🎉 You're Ready!

Your StudyControl backend is now running and ready to serve your frontend application. The API provides:

- ✅ User authentication with JWT
- ✅ Diary entries management
- ✅ Motivational quotes system
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Rate limiting
- ✅ CORS support

Happy coding! 🚀
