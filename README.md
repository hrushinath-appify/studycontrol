# StudyControl - Full-Stack Study Management Application

A comprehensive study management platform built with Next.js, Node.js, Express, and MongoDB.

## 🎉 NEW: Complete Authentication System Implemented!

The application now has a **production-ready authentication system** with:
- ✅ Credentials-based login (email/password)
- ✅ OAuth integration (Google & GitHub)
- ✅ JWT tokens with database-backed sessions
- ✅ Role-based access control (User/Admin/Moderator)
- ✅ Session management and refresh
- ✅ Complete security features

**📚 See Authentication Documentation:**
- **[Quick Start Guide](./QUICK_START.md)** - Setup and testing
- **[Complete Flow Documentation](./AUTHENTICATION_FLOW.md)** - Technical details
- **[Implementation Summary](./AUTHENTICATION_COMPLETE.md)** - Overview
- **[Implementation Checklist](./IMPLEMENTATION_CHECKLIST.md)** - Status
- **[Cleanup Summary](./CLEANUP_SUMMARY.md)** - Code cleanup and consolidation
- **[Email Setup Guide](./EMAIL_SETUP.md)** - Email service configuration
- **[Email Fix](./EMAIL_ISSUE_FIXED.md)** - Email verification issue resolved

**🧪 Test Authentication:**
```bash
./test-auth-flow.sh
```

## 🚀 Quick Start

### Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd studyControl
   ./setup-dev.sh
   ```

2. **Manual Setup (Alternative)**
   ```bash
   # Install dependencies
   cd server && npm install && cd ..
   cd client && npm install && cd ..
   
   # Set up environment files
   cp server/env.example server/.env
   cp client/.env.example client/.env.local
   
   # Start MongoDB (install locally or use MongoDB Atlas)
   # For local installation: brew install mongodb/brew/mongodb-community
   # mongod --dbpath /usr/local/var/mongodb
   
   # Start development servers
   cd server && npm run dev &
   cd client && npm run dev &
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: mongodb://localhost:27017

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **State Management**: React hooks with local storage fallback
- **Authentication**: JWT-based with refresh tokens
- **Type Safety**: Full TypeScript coverage

### Backend (Node.js/Express)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Express-validator middleware
- **Security**: Helmet, CORS, rate limiting
- **File Upload**: Multer for handling attachments
- **Logging**: Morgan for request logging

### Database (MongoDB)
- **User Management**: Authentication, profiles, preferences
- **Diary Entries**: Rich text content with mood tracking
- **Notes System**: Archived and categorized notes
- **Quotes Collection**: Curated motivational content
- **Focus Sessions**: Pomodoro timer tracking
- **Mystery Topics**: Educational content exploration

## 📁 Project Structure

```
studyControl/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── components/        # Reusable UI components
│   ├── lib/              # Utilities and API clients
│   └── hooks/            # Custom React hooks
├── server/               # Express.js backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API route definitions
│   │   ├── middleware/   # Custom middleware
│   │   └── types/        # TypeScript type definitions
│   └── uploads/          # File upload storage
└── deployment scripts   # Automated setup scripts
```

## 🔐 Environment Configuration

### Server Environment Variables
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/studycontrol

# Authentication
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Email (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_MAX_REQUESTS=100
```

### Client Environment Variables
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StudyControl
```

## 🚀 Production Deployment

### Manual Deployment
```bash
# Build frontend
cd client
npm run build
npm start

# Build and start backend
cd server
npm run build
npm start
```

### Server Deployment Options
1. **Traditional VPS/Server**
   - Install Node.js and MongoDB
   - Clone repository and install dependencies
   - Configure environment variables
   - Use PM2 for process management
   - Set up nginx for reverse proxy

2. **Cloud Platforms**
   - Deploy frontend to Vercel/Netlify
   - Deploy backend to Railway/Render/Heroku
   - Use MongoDB Atlas for database

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh-token` - Refresh access token

### Diary Management
- `GET /api/v1/diary` - Get diary entries
- `POST /api/v1/diary` - Create diary entry
- `PUT /api/v1/diary/:id` - Update diary entry
- `DELETE /api/v1/diary/:id` - Delete diary entry

### Notes System
- `GET /api/v1/notes` - Get notes with filtering
- `POST /api/v1/notes` - Create new note
- `PUT /api/v1/notes/:id` - Update note
- `DELETE /api/v1/notes/:id` - Delete note
- `PATCH /api/v1/notes/:id/pin` - Toggle pin status

### Focus & Productivity
- `GET /api/v1/focus/sessions` - Get focus sessions
- `POST /api/v1/focus/sessions` - Start focus session
- `PATCH /api/v1/focus/sessions/:id/complete` - Complete session
- `GET /api/v1/focus/stats` - Get focus statistics

### Content & Learning
- `GET /api/v1/quotes` - Get motivational quotes
- `GET /api/v1/news` - Get latest news articles
- `GET /api/v1/mystery` - Get mystery topics
- `GET /api/v1/mystery/random` - Get random topic

## 🛡️ Security Features

- **Authentication**: JWT-based with refresh tokens
- **Password Security**: bcrypt hashing with configurable rounds
- **Rate Limiting**: Configurable per-endpoint limits
- **CORS Protection**: Configurable origin restrictions
- **Input Validation**: Express-validator on all inputs
- **Security Headers**: Helmet.js for security headers
- **SQL Injection Protection**: MongoDB with Mongoose ODM
- **XSS Protection**: Input sanitization and CSP headers

## 🔧 Development Tools

### Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Database
npm run seed         # Seed database with sample data
```

## 📝 Features

### ✅ Core Features
- **User Authentication** - Registration, login, profile management
- **Diary Management** - Rich text entries with mood tracking
- **Notes System** - Organized note-taking with categories
- **Focus Timer** - Pomodoro technique implementation
- **Content Discovery** - News articles and mystery topics
- **Quote Collection** - Daily motivational quotes

### ✅ Technical Features
- **Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme switching
- **Real-time Updates** - Instant UI feedback
- **Offline Support** - localStorage fallbacks
- **Type Safety** - Full TypeScript coverage
- **Error Handling** - Graceful error boundaries
- **Loading States** - Skeleton screens and spinners
- **Form Validation** - Client and server-side validation

## 🚦 Production Checklist

### Before Deployment
- [ ] Update environment variables
- [ ] Configure MongoDB Atlas connection
- [ ] Set up SSL certificates
- [ ] Configure email service (SMTP)
- [ ] Update CORS origins
- [ ] Set strong JWT secrets
- [ ] Configure rate limiting
- [ ] Set up monitoring and logging
- [ ] Test all API endpoints
- [ ] Run security audit

### Monitoring & Maintenance
- [ ] Set up health checks
- [ ] Configure log aggregation
- [ ] Monitor database performance
- [ ] Set up automated backups
- [ ] Configure alerting
- [ ] Plan scaling strategy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

---

**StudyControl** - Your comprehensive study management companion! 🎓# Force deployment
