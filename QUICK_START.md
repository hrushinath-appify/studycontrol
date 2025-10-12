# 🚀 Authentication Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or Atlas)
- Git

## 1. Environment Setup

### Copy Environment Template

```bash
cp .env.example .env.local
```

### Required Environment Variables

Edit `.env.local` and set these **required** variables:

```env
# Database - Get from MongoDB Atlas or use local MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studycontrol

# JWT Secret - Generate a secure random string
JWT_SECRET=your-super-secret-key-min-32-characters

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Generate JWT Secret

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## 2. Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies (if using separate backend)
cd ../server
npm install
```

## 3. Start the Application

```bash
# From the client directory
npm run dev
```

Application will start on `http://localhost:3000`

## 4. Test Authentication

### Option 1: Use the Test Script

```bash
# From the root directory
./test-auth-flow.sh
```

### Option 2: Manual Testing

1. **Visit Login Page**
   - Navigate to: `http://localhost:3000/login`

2. **Create an Account**
   - Click "Sign Up"
   - Fill in: Name, Email, Password
   - Submit

3. **Verify Email** (Currently disabled for development)
   - Check console logs for verification token
   - Note: Email verification is bypassed in development

4. **Login**
   - Enter your email and password
   - Click "Login"

5. **Access Protected Routes**
   - You'll be redirected to `/home`
   - Try accessing: `/diary`, `/notes`, `/focus`, etc.

6. **Test Logout**
   - Click logout button
   - You'll be redirected to login page

## 5. Optional: OAuth Setup

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   ```
   http://localhost:3000/api/auth/oauth/google/callback
   ```
6. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: StudyControl
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/oauth/github/callback`
4. Add to `.env.local`:
   ```env
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   ```

### Test OAuth

- Google: Navigate to `http://localhost:3000/api/auth/oauth/google`
- GitHub: Navigate to `http://localhost:3000/api/auth/oauth/github`

## 6. API Endpoints

### Authentication Endpoints

```
POST   /api/auth/register          - Create new account
POST   /api/auth/login             - Login with credentials
POST   /api/auth/logout            - Logout and clear session
POST   /api/auth/refresh           - Refresh expired token
GET    /api/auth/me                - Get current user info

GET    /api/auth/oauth/google      - Initiate Google OAuth
GET    /api/auth/oauth/github      - Initiate GitHub OAuth
```

### Protected Endpoints (Require Authentication)

```
GET    /api/protected-example      - Example protected route
GET    /api/tasks                  - Get user tasks
POST   /api/tasks                  - Create new task
GET    /api/diary                  - Get diary entries
GET    /api/notes                  - Get notes
```

## 7. Using the API

### Register

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Access Protected Route

```bash
curl http://localhost:3000/api/protected-example \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Logout

```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -H "Cookie: auth-token=YOUR_JWT_TOKEN"
```

## 8. Database Collections

The authentication system creates two collections:

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  isEmailVerified: Boolean,
  isActive: Boolean,
  role: String, // 'user', 'admin', 'moderator'
  provider: String, // 'credentials', 'google', 'github'
  providerId: String,
  preferences: Object,
  profile: Object,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Sessions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  token: String (JWT),
  expiresAt: Date,
  userAgent: String,
  ipAddress: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 9. Troubleshooting

### "Session not found or expired"
- Check if MongoDB is running
- Verify MONGODB_URI in `.env.local`
- Check if sessions collection exists

### "Invalid credentials"
- Verify email is correct
- Check if password is correct
- Ensure user exists in database

### "JWT_SECRET not configured"
- Add JWT_SECRET to `.env.local`
- Restart the application

### OAuth not working
- Verify OAuth credentials in `.env.local`
- Check redirect URIs match exactly
- Ensure OAuth app is enabled

### Cannot access protected routes
- Check if token is in cookie
- Verify token hasn't expired
- Check middleware configuration

## 10. Security Checklist

- [x] Passwords hashed with bcrypt (10 rounds)
- [x] JWT tokens with 7-day expiration
- [x] HTTP-Only cookies for token storage
- [x] Secure cookies in production (HTTPS)
- [x] SameSite=Lax for CSRF protection
- [x] Database-backed session validation
- [x] Role-based access control
- [x] Session cleanup on logout
- [ ] Email verification (pending)
- [ ] Rate limiting (pending)
- [ ] 2FA (pending)

## 11. Development Tips

### View MongoDB Data

```bash
# Using MongoDB Compass
# Connect to: your-mongodb-uri

# Using mongo shell
mongosh "your-mongodb-uri"
use studycontrol
db.users.find()
db.sessions.find()
```

### Clear All Sessions

```bash
# In mongo shell
db.sessions.deleteMany({})
```

### Reset Test User

```bash
# In mongo shell
db.users.deleteOne({ email: "test@example.com" })
```

## 12. Next Steps

1. ✅ Authentication working
2. Set up email service for verification
3. Implement password reset flow
4. Add rate limiting
5. Set up monitoring
6. Deploy to production

## 📚 Documentation

- Complete Flow: See `AUTHENTICATION_FLOW.md`
- Implementation Details: See `AUTHENTICATION_IMPLEMENTATION.md`
- Visual Diagram: See `IMPLEMENTATION_VISUAL.md`

## 🆘 Need Help?

- Check the logs in console
- Review MongoDB collections
- Test with the provided test script
- Check environment variables
- Verify MongoDB connection

---

**Your authentication system is ready to use!** 🎉
