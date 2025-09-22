# Pre-Deployment Checklist

## ✅ Completed Tasks
- [x] Created `vercel.json` configuration
- [x] Set up serverless function entry point (`server/src/vercel.ts`)
- [x] Updated Next.js configuration for production
- [x] Created root `package.json` with build scripts
- [x] Prepared environment variable templates
- [x] Created MongoDB Atlas setup guide
- [x] Created comprehensive deployment guide

## 🔄 Manual Steps Required

### 1. Set up MongoDB Atlas (Required)
Follow the guide in `MONGODB_ATLAS_SETUP.md` to:
- Create MongoDB Atlas account
- Set up cluster
- Create database user
- Get connection string

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `client/.next`
5. Add environment variables (see list below)
6. Deploy

#### Option B: Using CLI (Advanced)
```bash
# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts and configure settings
```

### 3. Required Environment Variables

Add these in Vercel Dashboard > Settings > Environment Variables:

**Database:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studycontrol
```

**Security (generate with `openssl rand -base64 64`):**
```
JWT_SECRET=your-64-character-secret
JWT_REFRESH_SECRET=your-different-64-character-secret
SESSION_SECRET=your-session-secret
```

**CORS & API:**
```
CORS_ORIGIN=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api/v1
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Email (optional - for password reset):**
```
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 4. Testing Deployment
After deployment, test these URLs:
- Homepage: `https://your-app.vercel.app`
- Health check: `https://your-app.vercel.app/health`
- API health: `https://your-app.vercel.app/api/v1/health`

## 📚 Documentation Created
- `VERCEL_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- `VERCEL_DEPLOYMENT.md` - Environment variables reference
- `MONGODB_ATLAS_SETUP.md` - Database setup guide

## 🎯 Next Steps
1. Set up MongoDB Atlas database
2. Deploy using Vercel Dashboard
3. Configure environment variables
4. Test the deployment
5. Optionally set up custom domain

Your StudyControl app is ready for deployment! 🚀