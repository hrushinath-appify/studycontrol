# Vercel Environment Variables Configuration

This document lists all environment variables that need to be configured in Vercel for production deployment.

## How to Configure in Vercel

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable listed below with appropriate values

## Required Environment Variables

### Database Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### JWT Security (CRITICAL - Generate strong secrets)
```
JWT_SECRET=your-super-secure-jwt-secret-64-chars-long
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-64-chars-long
```

### Email Configuration (for password reset)
```
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### CORS Configuration
```
CORS_ORIGIN=https://your-app-name.vercel.app
```

### Additional Security
```
SESSION_SECRET=your-session-secret-64-chars-long
BCRYPT_ROUNDS=12
```

### Optional Settings (with defaults)
```
NODE_ENV=production
PORT=5000
JWT_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=30d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=5242880
LOG_LEVEL=info
API_VERSION=v1
API_PREFIX=/api/v1
```

## Client Environment Variables

The following should also be configured in Vercel:

```
NEXT_PUBLIC_API_URL=https://your-app-name.vercel.app/api/v1
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
NEXT_PUBLIC_APP_NAME=StudyControl
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_UPLOAD_URL=https://your-app-name.vercel.app/uploads
```

## Security Notes

1. **Generate Strong Secrets**: Use `openssl rand -base64 64` to generate JWT secrets
2. **MongoDB Atlas**: Set up MongoDB Atlas and whitelist Vercel's IP ranges (0.0.0.0/0 for simplicity or specific regions)
3. **Gmail App Password**: Use Gmail App Password, not your regular password
4. **CORS**: Only allow your actual domain in production

## Deployment Steps

1. Set up MongoDB Atlas database
2. Configure all environment variables in Vercel
3. Connect your GitHub repository to Vercel
4. Deploy from the main branch