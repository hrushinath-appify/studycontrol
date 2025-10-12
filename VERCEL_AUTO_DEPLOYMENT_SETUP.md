# Vercel Automatic Deployment Setup

This guide will help you set up automatic deployment to Vercel whenever you push code to your Git repository.

## Prerequisites

1. **Git Repository**: Your code should be in a Git repository (GitHub, GitLab, or Bitbucket)
2. **Vercel Account**: You need a Vercel account (free tier available)
3. **Vercel CLI**: Install Vercel CLI for local management

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

## Step 2: Link Your Project to Vercel

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Link your project** (run this in your project root):
   ```bash
   vercel link
   ```
   
   This will:
   - Create a `.vercel` folder with project configuration
   - Link your local project to a Vercel project
   - Ask you to choose or create a project name

## Step 3: Connect Git Repository to Vercel

### Option A: Through Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and login
2. Click **"New Project"**
3. Import your Git repository:
   - Click **"Import Git Repository"**
   - Select your Git provider (GitHub, GitLab, Bitbucket)
   - Choose your repository
   - Configure project settings:
     - **Framework Preset**: Next.js
     - **Root Directory**: `client` (for the Next.js app)
     - **Build Command**: `cd .. && npm run vercel-build`
     - **Output Directory**: `client/.next`
     - **Install Command**: `cd .. && npm run install:all`

### Option B: Through Vercel CLI

```bash
vercel --prod
```

This will deploy and automatically set up Git integration if your repository is connected.

## Step 4: Configure Build Settings

Your project is already configured with the correct build settings:

### Root Directory Structure
```
studyControl/
├── client/          # Next.js frontend
├── server/          # Express backend
├── api/             # Vercel serverless functions
└── vercel.json      # Vercel configuration
```

### Build Configuration
- **Build Command**: `npm run vercel-build`
- **Output Directory**: `client/.next`
- **Install Command**: `npm run install:all`

## Step 5: Environment Variables

Set up your environment variables in Vercel:

1. Go to your project in Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all required environment variables:

```bash
# Database
MONGODB_URI=mongodb+srv://...
DATABASE_URL=mongodb+srv://...

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# Email (Resend)
RESEND_API_KEY=re_...
FROM_EMAIL=noreply@yourdomain.com

# NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=https://your-app.vercel.app

# App Configuration
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-app.vercel.app/api
```

## Step 6: Automatic Deployment Configuration

Once connected to Git, Vercel will automatically:

1. **Deploy on every push** to your main branch (production)
2. **Create preview deployments** for pull requests
3. **Run build checks** before merging

### Branch Configuration
- **Production Branch**: `main` (or `master`)
- **Preview Branches**: All other branches and PRs

## Step 7: Custom Domain (Optional)

If you have a custom domain:

1. Go to **Settings** → **Domains**
2. Add your domain
3. Configure DNS records as instructed

## Step 8: Verify Deployment

1. **Push a test commit**:
   ```bash
   git add .
   git commit -m "Test automatic deployment"
   git push origin main
   ```

2. **Check Vercel Dashboard**:
   - Go to your project dashboard
   - You should see a new deployment starting
   - Wait for it to complete (usually 2-5 minutes)

3. **Test your deployed app**:
   - Visit your Vercel URL
   - Test key functionality (login, notes, etc.)

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check build logs in Vercel Dashboard
   - Ensure all dependencies are in `package.json`
   - Verify build commands are correct

2. **Environment Variables**:
   - Make sure all required env vars are set in Vercel
   - Check variable names match exactly

3. **Database Connection**:
   - Verify MongoDB Atlas allows connections from Vercel IPs
   - Check connection string format

4. **API Routes**:
   - Ensure serverless functions are in the correct directory
   - Check `vercel.json` routing configuration

### Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Redeploy manually
vercel --prod

# Check project info
vercel inspect
```

## Deployment Workflow

Once set up, your workflow will be:

1. **Develop locally**: Make changes to your code
2. **Commit and push**: `git add . && git commit -m "message" && git push`
3. **Automatic deployment**: Vercel detects the push and starts building
4. **Deploy**: Your app is automatically deployed to production

## Monitoring

- **Vercel Dashboard**: Monitor deployments, performance, and errors
- **Analytics**: Track usage and performance metrics
- **Logs**: Debug issues with detailed logs
- **Speed Insights**: Monitor Core Web Vitals

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **API Keys**: Store all keys in Vercel environment variables
3. **CORS**: Configure CORS properly for production
4. **Rate Limiting**: Implement rate limiting for API endpoints

## Next Steps

After setup:
1. Test the deployment process
2. Set up monitoring and alerts
3. Configure custom domain (if needed)
4. Set up staging environment (optional)
5. Implement CI/CD best practices

Your app will now automatically deploy to Vercel every time you push to your main branch! 🚀
