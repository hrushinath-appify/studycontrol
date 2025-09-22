# StudyControl - Vercel Deployment Guide

This guide will walk you through deploying your StudyControl application to Vercel.

## 🚀 Quick Deployment Steps

### 1. Prerequisites
- GitHub repository with your code
- MongoDB Atlas database set up (see `MONGODB_ATLAS_SETUP.md`)
- Vercel account

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure Project Settings:**
   - Framework Preset: Next.js
   - Root Directory: `./` (keep default)
   - Build Command: `npm run vercel-build`
   - Output Directory: `client/.next`
   - Install Command: `npm install`

5. **Add Environment Variables** (see section below)
6. **Click "Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project's name? studycontrol
# - In which directory is your code located? ./
# - Link to existing project? No
# - Want to override the settings? Yes
# - Build Command: npm run vercel-build
# - Output Directory: client/.next
# - Development Command: npm run dev

# For production deployment
vercel --prod
```

## 🔧 Environment Variables Configuration

Configure these in Vercel Dashboard > Project > Settings > Environment Variables:

### Database Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studycontrol?retryWrites=true&w=majority
```

### JWT Security (Generate strong 64-character secrets)
```bash
# Generate secrets locally:
openssl rand -base64 64
```

```
JWT_SECRET=your-generated-64-character-secret
JWT_REFRESH_SECRET=your-different-64-character-secret
```

### Email Configuration (for password reset)
```
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### CORS & Security
```
CORS_ORIGIN=https://your-vercel-app.vercel.app
SESSION_SECRET=your-session-secret-64-characters
BCRYPT_ROUNDS=12
```

### Client Environment Variables
```
NEXT_PUBLIC_API_URL=https://your-vercel-app.vercel.app/api/v1
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
NEXT_PUBLIC_APP_NAME=StudyControl
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_UPLOAD_URL=https://your-vercel-app.vercel.app/uploads
```

### Optional Environment Variables (with defaults)
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

## 📁 Project Structure for Vercel

```
studyControl/
├── vercel.json                 # Vercel configuration
├── package.json               # Root package.json with build scripts
├── client/                    # Next.js frontend
│   ├── .env.production       # Client environment variables
│   └── next.config.ts        # Updated for production
└── server/                   # Express.js backend
    ├── src/
    │   ├── vercel.ts         # Vercel serverless entry point
    │   └── index.ts          # Original server entry
    └── env.production.example # Server environment template
```

## 🔍 Testing Your Deployment

### 1. Test API Health
```bash
curl https://your-app.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "StudyControl API is healthy",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

### 2. Test API Endpoints
```bash
# Test auth endpoint
curl https://your-app.vercel.app/api/v1/auth/health

# Test quotes endpoint
curl https://your-app.vercel.app/api/v1/quotes
```

### 3. Test Frontend
Visit `https://your-app.vercel.app` and verify:
- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] Authentication flows work
- [ ] API calls are successful

## 🐛 Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Error: Cannot find module
```
**Solution:** Check that all dependencies are in package.json

#### 2. Environment Variable Issues
```bash
# Error: JWT_SECRET is not defined
```
**Solution:** Verify all environment variables are set in Vercel dashboard

#### 3. Database Connection Errors
```bash
# Error: MongoServerError: bad auth
```
**Solution:** 
- Check MongoDB Atlas connection string
- Verify username/password
- Check IP whitelist (add 0.0.0.0/0 temporarily)

#### 4. CORS Errors
```bash
# Error: CORS policy
```
**Solution:** Update `CORS_ORIGIN` to match your Vercel domain

#### 5. API Route Not Found
```bash
# Error: 404 on /api/v1/...
```
**Solution:** Check `vercel.json` routes configuration

### Debug Commands

```bash
# Check Vercel logs
vercel logs your-deployment-url

# Check build logs in Vercel dashboard
# Go to Deployments > Click on deployment > View Function Logs
```

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to your main branch:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update for production"
   git push origin main
   ```

2. **Vercel automatically:**
   - Detects the push
   - Runs build process
   - Deploys to production
   - Updates your domain

### Preview Deployments
Every branch and PR gets a preview deployment:
- Preview URL: `https://studycontrol-git-feature-branch.vercel.app`
- Test features before merging

## 🚀 Production Optimizations

### 1. Enable Edge Caching
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=60, stale-while-revalidate"
        }
      ]
    }
  ]
}
```

### 2. Set up Custom Domain
1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add your custom domain
3. Configure DNS records as instructed

### 3. Enable Analytics
```bash
# Install Vercel Analytics
cd client
npm install @vercel/analytics

# Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
```

## 📊 Monitoring & Maintenance

### 1. Monitor Performance
- Use Vercel Analytics dashboard
- Monitor function execution times
- Check error rates

### 2. Database Monitoring
- Monitor MongoDB Atlas dashboard
- Set up alerts for high CPU/memory usage
- Check connection pool status

### 3. Regular Updates
```bash
# Update dependencies monthly
npm audit
npm update

# Test locally, then deploy
npm run dev
git add . && git commit -m "Update dependencies"
git push origin main
```

## 🎉 Success!

Your StudyControl application is now live on Vercel! 

### What's Working:
- ✅ **Frontend:** Next.js app with SSR/SSG
- ✅ **Backend:** Express.js API as serverless functions
- ✅ **Database:** MongoDB Atlas cloud database
- ✅ **Authentication:** JWT-based auth system
- ✅ **Security:** HTTPS, CORS, rate limiting
- ✅ **Performance:** Edge caching and optimization

### Your URLs:
- **Production:** `https://your-app.vercel.app`
- **API:** `https://your-app.vercel.app/api/v1`
- **Health Check:** `https://your-app.vercel.app/health`

### Next Steps:
1. **Custom Domain:** Set up your own domain
2. **Analytics:** Enable user tracking
3. **Monitoring:** Set up uptime monitoring
4. **Backup:** Regular database backups
5. **Scale:** Monitor usage and scale as needed

---

**Congratulations! Your StudyControl app is now live and ready for users! 🎓**