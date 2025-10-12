# Authentication Flow Implementation

This document describes the complete authentication flow implementation based on the authentication flow diagram.

## 🏗️ Architecture Overview

The authentication system follows a comprehensive flow with:
- **Credentials-based authentication** (email/password)
- **OAuth authentication** (Google, GitHub)
- **JWT tokens** for session management
- **MongoDB sessions** for persistent session tracking
- **HTTP-only cookies** for secure token storage
- **Role-based access control** (RBAC)

## 📊 Flow Components

### 1. User Registration Flow

**Path**: `/api/auth/register`

**Steps**:
1. ✅ Receive and validate input (name, email, password)
2. ✅ Check email format and password requirements
3. ✅ Connect to MongoDB
4. ✅ Check if user already exists
5. ✅ Hash password with bcrypt (10 rounds as per diagram)
6. ✅ Generate email verification token
7. ✅ Save user to MongoDB (`users` collection)
8. ✅ Send verification email (optional - logging for now)
9. ✅ Return success response

**User Model Fields**:
- Basic: name, email, password (hashed), avatar
- Status: isEmailVerified, isActive, role
- OAuth: provider, providerId
- Preferences: theme, notifications, language
- Profile: bio, studyGoals, focusAreas, etc.
- Tracking: mysteryClicks, lastLogin, createdAt, updatedAt

### 2. Credentials Login Flow

**Path**: `/api/auth/login`

**Steps**:
1. ✅ Receive email and password
2. ✅ Connect to MongoDB
3. ✅ Find user by email
4. ✅ Check if user exists
5. ✅ Verify password using bcrypt.compare
6. ✅ Check if user is active
7. ✅ Check if email is verified
8. ✅ Create JWT token (HS256, 7 days expiry)
9. ✅ Save session to MongoDB (`sessions` collection)
10. ✅ Update last login timestamp
11. ✅ Set HTTP-Only cookie (Secure, SameSite=Lax)
12. ✅ Return user data and access token

**Session Model Fields**:
- userId: Reference to user
- token: JWT token string
- refreshToken: Optional refresh token
- expiresAt: Token expiration date
- userAgent: Browser/device info
- ipAddress: Client IP address
- isActive: Session status
- createdAt, updatedAt: Timestamps

### 3. OAuth Authentication Flow

**Providers**: Google, GitHub

**Initiation Paths**:
- Google: `/api/auth/oauth/google`
- GitHub: `/api/auth/oauth/github`

**Callback Paths**:
- Google: `/api/auth/oauth/google/callback`
- GitHub: `/api/auth/oauth/github/callback`

**Steps**:
1. ✅ Redirect to OAuth provider consent page
2. ✅ User grants consent
3. ✅ Provider redirects back with authorization code
4. ✅ Exchange code for access token
5. ✅ Fetch user profile from provider
6. ✅ Connect to MongoDB
7. ✅ Check if user exists (by email or providerId)
8. ✅ Create new user OR update existing user
9. ✅ Create JWT token
10. ✅ Save session to database
11. ✅ Set HTTP-Only cookie
12. ✅ Redirect to /home

**Environment Variables Required**:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 4. Session Validation (Middleware)

**File**: `client/middleware.ts`

**Steps**:
1. ✅ Get token from cookie
2. ✅ Validate JWT token signature
3. ✅ Check token expiration
4. ✅ Extract user info from token
5. ✅ Check role-based access (for admin routes)
6. ✅ Allow or deny access

**Protected Routes**:
- /home, /diary, /focus, /notes, /settings, /help, /news, /mystery, /todos

**Admin Routes** (require admin role):
- /admin, /developer-notes

**Auth Routes** (redirect if already authenticated):
- /login, /signup, /forgot-password, /reset-password, /verify-email

### 5. Protected API Routes

**Implementation Pattern**:

```typescript
import { getUserFromToken, hasRole } from '@/lib/auth-utils'

export async function GET(request: NextRequest) {
  // Step 1: Get session
  const user = await getUserFromToken(request)
  
  // Step 2: Verify session (checks JWT + database session)
  if (!user) {
    return createErrorResponse('Unauthorized', 401)
  }
  
  // Step 3: Check role/permissions (optional)
  if (requiresAdmin && !hasRole(user, 'admin')) {
    return createErrorResponse('Forbidden', 403)
  }
  
  // Step 4: Execute business logic
  const data = await queryUserData(user.id)
  
  // Step 5: Return response
  return NextResponse.json({ success: true, data })
}
```

**Session Validation includes**:
- JWT token verification
- Session exists in database
- Session is active
- Session is not expired
- User exists and is active

### 6. Session Refresh Flow

**Path**: `/api/auth/refresh`

**Steps**:
1. ✅ Get token from cookie or request body
2. ✅ Verify token signature (even if expired)
3. ✅ Connect to MongoDB
4. ✅ Check if session exists in database
5. ✅ Verify user is still active
6. ✅ Create new JWT token
7. ✅ Update session in database with new token
8. ✅ Update cookie
9. ✅ Return new token

**Use Case**: Automatically refresh expired tokens without requiring re-login

### 7. Logout Flow

**Path**: `/api/auth/logout`

**Steps**:
1. ✅ Get token from cookie
2. ✅ Connect to MongoDB
3. ✅ Delete session from database
4. ✅ Clear all authentication cookies
5. ✅ Return success

**Cleans up**:
- Session from MongoDB
- auth-token cookie
- refresh-token cookie
- session-token cookie

### 8. Email Verification Flow

**Status**: ⚠️ Partially implemented (token generation done, email sending pending)

**Verification Path**: `/api/auth/verify-email`

**Steps**:
1. User clicks verification link in email
2. Extract token from URL
3. Hash token and find in database
4. Check if token is expired
5. Update user: isEmailVerified = true
6. Clear verification token
7. Redirect to login with success message

**Resend Verification Path**: `/api/auth/resend-verification`

## 🔐 Security Features

### JWT Token Security
- Algorithm: HS256
- Expiration: 7 days
- Stored in HTTP-Only cookies
- Includes: userId, email, role

### Cookie Security
- `httpOnly: true` - Not accessible via JavaScript
- `secure: true` - HTTPS only (production)
- `sameSite: 'lax'` - CSRF protection
- `path: '/'` - Available site-wide
- `maxAge: 7 days`

### Password Security
- Bcrypt hashing with 10 rounds
- Minimum 8 characters
- Stored with `select: false` in schema

### Session Security
- Stored in MongoDB for validation
- TTL index for automatic cleanup
- IP address and user agent tracking
- Can be invalidated server-side

## 🗄️ Database Schema

### Users Collection
```typescript
{
  name: string
  email: string (unique, indexed)
  password: string (hashed, select: false)
  avatar: string
  isEmailVerified: boolean
  isActive: boolean
  role: 'user' | 'admin' | 'moderator'
  provider: 'credentials' | 'google' | 'github'
  providerId: string (for OAuth)
  mysteryClicks: number
  preferences: { theme, notifications, etc. }
  profile: { bio, studyGoals, etc. }
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}
```

### Sessions Collection
```typescript
{
  userId: ObjectId (ref: User, indexed)
  token: string (unique, indexed)
  refreshToken: string (optional)
  expiresAt: Date (indexed, TTL)
  userAgent: string
  ipAddress: string
  isActive: boolean (indexed)
  createdAt: Date
  updatedAt: Date
}
```

## 📝 Environment Variables

```env
# Required
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=http://localhost:3000

# OAuth (Optional)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Email (For verification - to be implemented)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM=noreply@yourdomain.com
```

## 🧪 Testing the Flow

### 1. Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test Protected Route
```bash
curl http://localhost:3000/api/protected-example \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 4. Test OAuth
- Navigate to: http://localhost:3000/api/auth/oauth/google
- Or: http://localhost:3000/api/auth/oauth/github

### 5. Test Logout
```bash
curl -X POST http://localhost:3000/api/auth/logout \
  -b "auth-token=YOUR_JWT_TOKEN"
```

## 🎯 Role-Based Access Control

### Roles
- **user**: Default role, access to basic features
- **admin**: Full access, including admin routes
- **moderator**: Custom permissions (can be extended)

### Implementation
```typescript
// In middleware.ts
if (adminRoutes.some(route => pathname.startsWith(route))) {
  if (tokenPayload?.role !== 'admin') {
    return NextResponse.redirect('/unauthorized')
  }
}

// In API routes
if (!hasRole(user, 'admin')) {
  return createErrorResponse('Forbidden', 403)
}
```

## 🔄 Session Management

### Automatic Session Cleanup
- TTL index on `expiresAt` field
- MongoDB automatically deletes expired sessions
- Manual cleanup via: `Session.cleanupExpired()`

### Session Invalidation
- Logout: Deletes specific session
- User deactivation: Invalidates all user sessions
- Security breach: Can invalidate all sessions

### Active Sessions
- Users can have multiple active sessions
- Track device/browser via userAgent
- Track location via ipAddress

## 📚 Helper Functions

### `getUserFromToken(request)`
- Validates JWT token
- Checks session in database
- Returns authenticated user or null

### `hasRole(user, role)`
- Checks if user has specific role
- Admin always returns true

### `hasAnyRole(user, roles[])`
- Checks if user has any of the specified roles

## 🚀 Next Steps

1. ✅ Complete OAuth setup with environment variables
2. ⏳ Implement email service for verification
3. ⏳ Add password reset flow
4. ⏳ Add 2FA (Two-Factor Authentication)
5. ⏳ Add rate limiting for auth endpoints
6. ⏳ Add session management UI (view/revoke sessions)
7. ⏳ Add audit logging for security events

## 📖 Related Files

- `/client/middleware.ts` - Route protection
- `/client/lib/auth-utils.ts` - Authentication helpers
- `/client/lib/database.ts` - User model (client)
- `/client/lib/session-model.ts` - Session model (client)
- `/server/src/models/User.ts` - User model (server)
- `/server/src/models/Session.ts` - Session model (server)
- `/client/app/api/auth/*` - All auth endpoints

## 🐛 Troubleshooting

### "Session not found or expired"
- Check if MongoDB sessions collection has the token
- Verify token hasn't expired
- Check if user is still active

### "Invalid credentials"
- Verify email is correct
- Check if email is verified
- Ensure password is correct

### OAuth errors
- Verify OAuth credentials in environment variables
- Check redirect URIs in OAuth provider console
- Ensure callback URLs match exactly

### Middleware redirects
- Check token is in cookie
- Verify JWT_SECRET matches between login and middleware
- Check route is in protectedRoutes array
