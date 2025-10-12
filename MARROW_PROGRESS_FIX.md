# Marrow Progress Authentication Fix

## Problem Summary

The "Invalid token" error occurs because your application has **two separate authentication systems**:

1. **Frontend (Next.js)** - Handles authentication in `/client/app/api/auth/login`
2. **Backend (Express)** - Separate server running on port 5000

When the marrow-progress page tries to fetch data, it calls the **backend Express API** which validates JWT tokens with its own `JWT_SECRET`. If the secrets don't match or the backend isn't running, you get the "Invalid token" error.

## What Was Fixed

###  1. Updated API Routes to Use `callBackendAPI`

Changed the marrow-progress API routes to properly retrieve auth tokens from cookies:

- ✅ `/client/app/api/marrow-progress/route.ts`
- ✅ `/client/app/api/marrow-progress/bulk/route.ts`
- ✅ `/client/app/api/marrow-progress/stats/route.ts`

### 2. Enhanced Error Handling

Added better error messages in `backend-api.ts` to identify:
- Missing auth tokens
- Backend connection failures
- Timeout issues

## Required Steps to Fully Fix

### Step 1: Ensure JWT_SECRET Matches

The **most critical fix**: Both frontend and backend must use the SAME `JWT_SECRET`.

#### Frontend (.env in `/client`)
```env
JWT_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

#### Backend (.env in `/server`)
```env
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
MONGODB_URI=your-mongodb-connection-string
PORT=5000
```

**⚠️ IMPORTANT**: The `JWT_SECRET` values MUST be identical!

### Step 2: Start the Backend Server

The Express backend must be running for marrow-progress to work:

```bash
# Navigate to server directory
cd server

# Install dependencies (if not already done)
npm install

# Start the server
npm run dev
# OR
npm start
```

The server should start on port 5000. You should see:
```
✅ Configuration loaded for development environment
🚀 Server running on port 5000
✅ MongoDB Connected: ...
```

### Step 3: Verify Backend is Running

Test the backend health endpoint:

```bash
curl http://localhost:5000/api/v1/health
```

Should return:
```json
{
  "success": true,
  "message": "API is healthy",
  "data": {
    "status": "ok",
    "timestamp": "..."
  }
}
```

### Step 4: Test Authentication

After logging in through the frontend, check that the auth token is set:

1. Open browser DevTools → Application → Cookies
2. Look for `auth-token` cookie
3. Verify it has a value (long JWT string)

### Step 5: Check Server Logs

When you visit the marrow-progress page, check the backend logs. You should see:

```
🔐 Auth middleware called for: /marrow-progress
🔐 Token found: true length: XXX
✅ Token verified, userId: ...
✅ User found: user@example.com verified: true
✅ Auth successful, proceeding to next middleware
```

## Common Issues & Solutions

### Issue 1: "Cannot connect to backend server"

**Cause**: Backend Express server isn't running

**Solution**: 
```bash
cd server && npm run dev
```

### Issue 2: "Invalid token"

**Causes**:
1. JWT_SECRET mismatch between frontend and backend
2. Token expired
3. User not found in database

**Solutions**:
1. Verify JWT_SECRET matches in both .env files
2. Log out and log in again to get a fresh token
3. Check MongoDB connection

### Issue 3: "Access token not found in cookies"

**Cause**: User isn't logged in or cookie expired

**Solution**: Log in again through the frontend

### Issue 4: "Backend server is not responding"

**Causes**:
1. Server crashed
2. MongoDB connection failed
3. Port 5000 is blocked or in use

**Solutions**:
1. Check server logs for errors
2. Verify MongoDB is running and accessible
3. Check if another process is using port 5000: `lsof -i :5000`

## Testing the Fix

1. **Start both servers**:
   ```bash
   # Terminal 1 - Frontend
   cd client && npm run dev

   # Terminal 2 - Backend
   cd server && npm run dev
   ```

2. **Log in** through the frontend (http://localhost:3000/login)

3. **Navigate to Marrow Progress** (http://localhost:3000/marrow-progress)

4. **Check for errors** in:
   - Browser console
   - Frontend terminal logs
   - Backend terminal logs

## Architecture Notes

This application uses a hybrid architecture:

```
┌─────────────────────────────────────┐
│     Frontend (Next.js :3000)        │
│  - Client-side React components     │
│  - API routes (/app/api/*)          │
│  - Handles login UI                 │
└────────────┬────────────────────────┘
             │
             │ HTTP Requests
             │ (with auth-token cookie)
             ↓
┌─────────────────────────────────────┐
│    Backend (Express :5000)          │
│  - RESTful API (/api/v1/*)          │
│  - JWT validation                   │
│  - MongoDB operations               │
│  - Marrow progress endpoints        │
└─────────────────────────────────────┘
```

### Authentication Flow

1. User logs in via frontend → `/api/auth/login`
2. Frontend validates credentials against MongoDB
3. Frontend creates JWT token with `JWT_SECRET`
4. Token stored in `auth-token` cookie
5. Frontend API routes extract token from cookie
6. Token sent to backend with `Authorization: Bearer <token>`
7. Backend validates token with same `JWT_SECRET`
8. Backend returns data if valid

## Environment Variables Checklist

### Frontend (`/client/.env`)
- [ ] `JWT_SECRET` - Must match backend
- [ ] `NEXT_PUBLIC_API_URL` - Backend URL (http://localhost:5000/api/v1)
- [ ] `SESSION_SECRET` - For session management
- [ ] `MONGODB_URI` - MongoDB connection

### Backend (`/server/.env`)
- [ ] `JWT_SECRET` - Must match frontend
- [ ] `JWT_REFRESH_SECRET` - For refresh tokens
- [ ] `JWT_EXPIRES_IN` - Token expiration (default: 7d)
- [ ] `MONGODB_URI` - MongoDB connection (must match frontend if using same DB)
- [ ] `PORT` - Server port (default: 5000)
- [ ] `CORS_ORIGIN` - Allowed origins (http://localhost:3000)

## Need More Help?

If you're still experiencing issues:

1. Share the **complete error message** from browser console
2. Share **backend server logs** when the error occurs
3. Verify both JWT_SECRET values match
4. Confirm backend server is running and accessible
5. Test the backend health endpoint

## Files Modified

- ✅ `client/app/api/marrow-progress/route.ts`
- ✅ `client/app/api/marrow-progress/bulk/route.ts`
- ✅ `client/app/api/marrow-progress/stats/route.ts`
- ✅ `client/lib/backend-api.ts`

