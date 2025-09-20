# JWT Security Configuration Guide for StudyControl

This guide explains JWT (JSON Web Token) setup, security best practices, and how to properly configure authentication for your StudyControl backend.

## 🔐 What Are JWT Tokens?

JWT tokens are secure, stateless tokens used for user authentication. Your StudyControl backend uses two types:

1. **Access Token** - Short-lived (7 days), used for API requests
2. **Refresh Token** - Long-lived (30 days), used to generate new access tokens

## ✅ Your Generated JWT Secrets

I've generated strong, cryptographically secure secrets for your production environment:

### Access Token Secret
```
IYYMO8kedvVljHo1EPSOtF0ymFMPZMo24oZ3xcO0Nufx4UgCutjFsW2J/7otixlJg6XxQWweam0FvIU/b78vew==
```

### Refresh Token Secret
```
Vc85OaH65hsGWb+Ai8xykkyF9+xPJcOt5kbabre6jwFU27fxk9IIwydffE/IIX1lts7b2EkdwQTjfdBtX/ILQQ==
```

⚠️ **IMPORTANT**: These secrets are already added to your `env.production.example` file!

## 🛠️ Environment Configuration

### For Development (.env)
```env
JWT_SECRET=dev-secret-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production
JWT_REFRESH_EXPIRES_IN=30d
```

### For Production (.env.production)
```env
JWT_SECRET=IYYMO8kedvVljHo1EPSOtF0ymFMPZMo24oZ3xcO0Nufx4UgCutjFsW2J/7otixlJg6XxQWweam0FvIU/b78vew==
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=Vc85OaH65hsGWb+Ai8xykkyF9+xPJcOt5kbabre6jwFU27fxk9IIwydffE/IIX1lts7b2EkdwQTjfdBtX/ILQQ==
JWT_REFRESH_EXPIRES_IN=30d
```

## 🔧 How JWT Works in StudyControl

### 1. User Registration/Login Flow
```
1. User submits credentials → POST /api/v1/auth/login
2. Backend validates credentials
3. Backend generates two tokens:
   - Access Token (expires in 7 days)
   - Refresh Token (expires in 30 days)
4. Both tokens sent to frontend
5. Frontend stores tokens securely
```

### 2. API Request Flow
```
1. Frontend sends request with Authorization header
2. Backend validates access token
3. If valid → process request
4. If expired → frontend uses refresh token
5. Backend generates new access token
```

### 3. Token Refresh Flow
```
1. Access token expires
2. Frontend sends refresh token → POST /api/v1/auth/refresh-token
3. Backend validates refresh token
4. Backend generates new access + refresh tokens
5. Frontend updates stored tokens
```

## 🛡️ Security Features in Your Backend

### 1. Token Structure
```javascript
// Access Token Payload
{
  userId: "user_id_here",
  email: "user@example.com", 
  role: "user",
  iat: 1640995200, // issued at
  exp: 1641600000  // expires at
}
```

### 2. Security Measures
- **Strong Secrets**: 64+ character cryptographically secure secrets
- **Short Expiration**: Access tokens expire in 7 days
- **Refresh Rotation**: New refresh token on each refresh
- **Role-based Access**: Admin/user role checking
- **Token Validation**: Comprehensive token verification

### 3. Password Security
- **bcrypt Hashing**: 12 rounds (very secure)
- **Salt**: Unique salt per password
- **No Plain Text**: Passwords never stored in plain text

## 🧪 Testing JWT Configuration

### 1. Test User Registration
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "TestPass123"
  }'
```

Expected Response:
```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "name": "Test User", "email": "test@example.com" },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully"
}
```

### 2. Test Protected Route
```bash
# Use the accessToken from registration response
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:5000/api/v1/auth/me
```

### 3. Test Token Refresh
```bash
curl -X POST http://localhost:5000/api/v1/auth/refresh-token \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "YOUR_REFRESH_TOKEN"}'
```

## ⚙️ JWT Configuration Options

### Token Expiration Times

**Current Settings (Recommended):**
- Access Token: 7 days
- Refresh Token: 30 days

**Alternative Options:**
```env
# More Secure (shorter expiration)
JWT_EXPIRES_IN=1h          # 1 hour
JWT_REFRESH_EXPIRES_IN=7d  # 7 days

# Less Secure (longer expiration)
JWT_EXPIRES_IN=30d         # 30 days
JWT_REFRESH_EXPIRES_IN=90d # 90 days
```

### Algorithm Configuration
Your backend uses **HS256** (HMAC SHA-256):
- Symmetric encryption
- Fast and secure
- Perfect for single-service architecture

## 🚨 Security Best Practices

### ✅ What Your Backend Already Does Right

1. **Strong Secrets**: 64+ character random secrets
2. **Separate Secrets**: Different secrets for access and refresh tokens
3. **Token Rotation**: New refresh token on each refresh
4. **Secure Headers**: Proper JWT header validation
5. **Role Validation**: Admin/user role checking
6. **Password Hashing**: bcrypt with 12 rounds

### ⚠️ Additional Security Recommendations

1. **HTTPS Only**: Always use HTTPS in production
2. **Secure Storage**: Store tokens in httpOnly cookies (frontend improvement)
3. **Token Blacklisting**: Consider implementing token blacklist for logout
4. **Rate Limiting**: Already implemented (100 requests per 15 minutes)
5. **Regular Rotation**: Rotate JWT secrets every 6-12 months

## 🔄 Token Management in Frontend

Your frontend should handle tokens like this:

### 1. Store Tokens Securely
```javascript
// In localStorage (current implementation)
localStorage.setItem('auth-token', accessToken)
localStorage.setItem('refresh-token', refreshToken)

// Better: In httpOnly cookies (future improvement)
// Automatically handled by browser, more secure
```

### 2. Automatic Token Refresh
```javascript
// Your frontend API client already handles this
const apiClient = new ApiClient()
// Automatically refreshes tokens when access token expires
```

### 3. Handle Token Expiration
```javascript
// Your auth context already handles this
if (error.status === 401) {
  // Try to refresh token
  // If refresh fails, redirect to login
}
```

## 🔍 Debugging JWT Issues

### Common Problems & Solutions

**❌ "Invalid token" Error**
```bash
# Check if JWT_SECRET is set correctly
echo $JWT_SECRET

# Verify token format
# Should be: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**❌ "Token expired" Error**
```bash
# Normal behavior - frontend should refresh automatically
# Check if refresh token is being sent correctly
```

**❌ "JsonWebTokenError" in logs**
```bash
# Usually means JWT_SECRET mismatch between environments
# Ensure production and development use different secrets
```

### Debug JWT Tokens

You can decode (but not verify) JWT tokens at [jwt.io](https://jwt.io):

1. Copy your access token
2. Paste into jwt.io debugger
3. View payload (don't paste secret!)
4. Check expiration time

## 📊 Monitoring JWT Security

### Metrics to Watch

1. **Token Refresh Rate**: How often tokens are refreshed
2. **Failed Authentication**: Number of invalid tokens
3. **Token Expiration**: Users hitting expired tokens
4. **Suspicious Activity**: Multiple failed attempts

### Logging

Your backend logs:
- Successful logins
- Failed authentication attempts
- Token refresh events
- Invalid token attempts

## 🚀 Production Deployment

### Environment Variables Checklist

- [ ] `JWT_SECRET` set to strong, unique value
- [ ] `JWT_REFRESH_SECRET` set to different strong value
- [ ] `JWT_EXPIRES_IN` configured appropriately
- [ ] `JWT_REFRESH_EXPIRES_IN` configured appropriately
- [ ] Secrets are different from development
- [ ] HTTPS enabled for your domain

### Deployment Platform Setup

**Heroku:**
```bash
heroku config:set JWT_SECRET="IYYMO8kedvVljHo1EPSOtF0ymFMPZMo24oZ3xcO0Nufx4UgCutjFsW2J/7otixlJg6XxQWweam0FvIU/b78vew=="
heroku config:set JWT_REFRESH_SECRET="Vc85OaH65hsGWb+Ai8xykkyF9+xPJcOt5kbabre6jwFU27fxk9IIwydffE/IIX1lts7b2EkdwQTjfdBtX/ILQQ=="
```

**Railway/Render:**
- Add environment variables in dashboard
- Copy secrets from your `.env.production` file

## 🎯 Quick Setup Summary

### 1. Your Secrets Are Ready ✅
- Strong JWT secrets already generated
- Added to `env.production.example`
- Ready for production use

### 2. Test Locally
```bash
cd /Users/rishi/studyControl/server
cp env.production.example .env.production
# Edit MONGODB_URI with your Atlas connection string
npm run dev
```

### 3. Verify Authentication
```bash
# Test registration
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com", "password": "TestPass123"}'
```

## 🎉 You're All Set!

Your JWT configuration is production-ready with:

- ✅ **Cryptographically secure secrets**
- ✅ **Proper token expiration**
- ✅ **Automatic token refresh**
- ✅ **Role-based access control**
- ✅ **Secure password hashing**
- ✅ **Comprehensive error handling**

Your StudyControl authentication system is enterprise-grade! 🚀
