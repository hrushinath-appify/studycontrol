# StudyControl Backend API

A comprehensive Node.js/Express backend API for the StudyControl application, featuring user authentication, diary management, task tracking, note-taking, and motivational content.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based authentication with refresh tokens
- **Diary Management**: CRUD operations with advanced filtering and search
- **Task Management**: Priority-based task system with subtasks
- **Note Taking**: Rich note-taking with tagging and categorization
- **Quotes System**: Motivational quotes with categories and search
- **News & Articles**: Educational content management
- **Pomodoro Timer**: Focus session tracking

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **MongoDB**: Robust data persistence with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting, input validation
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Input validation with express-validator
- **API Documentation**: RESTful API design
- **Environment Configuration**: Flexible environment-based configuration

## 📋 Prerequisites

- **Node.js**: v18.0.0 or higher
- **MongoDB**: v5.0 or higher (local installation or MongoDB Atlas)
- **npm**: v8.0.0 or higher

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   cd /path/to/studyControl/server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   ```bash
   cp env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/studycontrol
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_REFRESH_SECRET=your-refresh-token-secret-change-this
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start MongoDB** (if running locally):
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

6. **Seed the database** (optional):
   ```bash
   npm run seed
   ```

7. **Start the development server**:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
Development: http://localhost:5000/api/v1
Production: https://your-domain.com/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <access_token>
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "preferences": {
    "theme": "dark"
  }
}
```

### Diary Endpoints

#### Get Diary Entries
```http
GET /diary?page=1&limit=10&sortBy=createdAt&sortOrder=desc
Authorization: Bearer <access_token>
```

#### Create Diary Entry
```http
POST /diary
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "My Day",
  "content": "Today was a great day...",
  "mood": "good",
  "tags": ["personal", "reflection"]
}
```

#### Get Diary Statistics
```http
GET /diary/stats
Authorization: Bearer <access_token>
```

### Quotes Endpoints

#### Get Random Quote
```http
GET /quotes/random?category=motivation
```

#### Get Quote of the Day
```http
GET /quotes/quote-of-the-day
```

#### Search Quotes
```http
GET /quotes/search?search=success&page=1&limit=10
```

### Health Check
```http
GET /health
```

## 🗂️ Project Structure

```
server/
├── src/
│   ├── config/           # Configuration files
│   │   ├── database.ts   # MongoDB connection
│   │   └── environment.ts # Environment variables
│   ├── controllers/      # Request handlers
│   │   ├── authController.ts
│   │   ├── diaryController.ts
│   │   └── quotesController.ts
│   ├── middleware/       # Custom middleware
│   │   ├── auth.ts       # Authentication middleware
│   │   ├── validation.ts # Input validation
│   │   ├── errorHandler.ts
│   │   └── index.ts      # Middleware setup
│   ├── models/          # MongoDB models
│   │   ├── User.ts
│   │   ├── DiaryEntry.ts
│   │   ├── Quote.ts
│   │   └── index.ts
│   ├── routes/          # API routes
│   │   ├── auth.ts
│   │   ├── diary.ts
│   │   ├── quotes.ts
│   │   └── index.ts
│   ├── scripts/         # Utility scripts
│   │   └── seed.ts      # Database seeding
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   └── response.ts  # API response helpers
│   └── index.ts         # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run seed         # Seed database with sample data

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run type-check   # Run TypeScript type checking

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
```

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Secure access and refresh token system
- **Password Hashing**: bcrypt with configurable salt rounds
- **Role-based Access**: User and admin roles
- **Token Refresh**: Automatic token renewal

### API Security
- **Rate Limiting**: Configurable request rate limiting
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers middleware
- **Input Validation**: Comprehensive request validation
- **SQL Injection Protection**: MongoDB with Mongoose ODM

### Data Protection
- **Password Requirements**: Strong password enforcement
- **Data Sanitization**: Input sanitization and validation
- **Error Handling**: Secure error messages (no sensitive data leakage)

## 🌍 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | No |
| `NODE_ENV` | Environment | `development` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `JWT_SECRET` | JWT signing secret | - | Yes |
| `JWT_EXPIRES_IN` | Access token expiry | `7d` | No |
| `JWT_REFRESH_SECRET` | Refresh token secret | - | Yes |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `30d` | No |
| `CORS_ORIGIN` | Allowed CORS origins | `http://localhost:3000` | No |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | No |
| `BCRYPT_ROUNDS` | Password hashing rounds | `12` | No |

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: 'user', 'admin'),
  avatar: String (URL),
  preferences: {
    theme: String,
    studyReminders: Boolean,
    appUpdates: Boolean,
    emailNotifications: Boolean,
    soundEnabled: Boolean,
    language: String
  },
  profile: {
    bio: String,
    studyGoals: [String],
    focusAreas: [String],
    dailyStudyHours: Number,
    timezone: String
  },
  isEmailVerified: Boolean,
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### DiaryEntry Collection
```javascript
{
  _id: ObjectId,
  userId: String (ref: User),
  title: String,
  content: String,
  preview: String,
  date: String,
  mood: String (enum),
  tags: [String],
  wordCount: Number,
  isPrivate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Production Setup

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Set production environment variables**:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studycontrol
   JWT_SECRET=your-production-jwt-secret
   JWT_REFRESH_SECRET=your-production-refresh-secret
   CORS_ORIGIN=https://your-frontend-domain.com
   ```

3. **Start the production server**:
   ```bash
   npm start
   ```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP address
4. Update `MONGODB_URI` with the connection string

## 🔍 Monitoring & Logging

### Health Checks
- **Basic Health**: `GET /health`
- **API Health**: `GET /api/v1/health`
- **Database Health**: Included in health responses

### Logging
- **Request Logging**: Morgan middleware
- **Error Logging**: Console and file-based logging
- **Performance Monitoring**: Request timing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Run the test suite: `npm test`
6. Commit your changes: `git commit -am 'Add new feature'`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Add JSDoc comments for functions
- Validate inputs and handle errors gracefully
- Write tests for new features
- Update documentation as needed

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Check MongoDB is running
   - Verify connection string in `.env`
   - Ensure network connectivity

2. **JWT Token Error**:
   - Verify JWT secrets are set
   - Check token expiration
   - Ensure proper Authorization header format

3. **Port Already in Use**:
   ```bash
   # Kill process using port 5000
   lsof -ti:5000 | xargs kill -9
   ```

4. **Permission Errors**:
   ```bash
   # Fix npm permissions
   npm config set prefix ~/.npm-global
   export PATH=~/.npm-global/bin:$PATH
   ```

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API examples

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**StudyControl Backend API** - Built with ❤️ using Node.js, Express, TypeScript, and MongoDB.
