# MongoDB Atlas Setup Guide for StudyControl

This step-by-step guide will help you set up MongoDB Atlas for your StudyControl production deployment.

## 🎯 Step 1: Create MongoDB Atlas Account

1. **Go to MongoDB Atlas**: [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. **Click "Sign Up"** 
3. **Fill in your details**:
   - Email address
   - Password (make it strong!)
   - First and Last name
4. **Verify your email** (check your inbox)
5. **Complete the welcome survey** (optional but helpful)

## 🏗️ Step 2: Create Your First Cluster

### 2.1 Choose Deployment Option
- Click **"Build a Database"**
- Select **"Shared"** (Free tier) or **"Dedicated"** (Production)

### 2.2 Cloud Provider & Region
- **Provider**: Choose **AWS** (most reliable)
- **Region**: Choose closest to your users:
  - **US East (N. Virginia)** - for North America
  - **Europe (Ireland)** - for Europe
  - **Asia Pacific (Singapore)** - for Asia
- **Cluster Tier**: 
  - **M0 Sandbox** (Free) - for development/testing
  - **M10** or higher - for production

### 2.3 Cluster Name
- Name: `studycontrol-prod` (or similar)
- Click **"Create Cluster"**
- ⏱️ Wait 1-3 minutes for cluster creation

## 🔐 Step 3: Database Security Setup

### 3.1 Create Database User

1. **Go to Database Access** (left sidebar)
2. **Click "Add New Database User"**
3. **Authentication Method**: Password
4. **Username**: `studycontrol-api`
5. **Password**: Click **"Autogenerate Secure Password"** and **SAVE IT!**
   ```
   Example: aB3$kL9mP2@vN8qR
   ```
6. **Database User Privileges**: 
   - Select **"Read and write to any database"**
7. **Click "Add User"**

### 3.2 Network Access (IP Whitelist)

1. **Go to Network Access** (left sidebar)
2. **Click "Add IP Address"**

**For Development:**
- Click **"Add Current IP Address"**
- Description: `My Development Machine`

**For Production:**
- Click **"Add IP Address"**
- Enter your server's IP address
- Description: `Production Server`

**Temporary Option (NOT recommended for production):**
- IP Address: `0.0.0.0/0`
- Description: `Allow Access from Anywhere` 
- ⚠️ **Only use this temporarily, then restrict to specific IPs**

3. **Click "Confirm"**

## 🔗 Step 4: Get Connection String

1. **Go to Database** (left sidebar)
2. **Click "Connect"** on your cluster
3. **Choose "Connect your application"**
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. **Copy the connection string**:

```
mongodb+srv://studycontrol-api:<password>@studycontrol-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

7. **Replace `<password>`** with the password you saved earlier
8. **Add database name** at the end:

```
mongodb+srv://studycontrol-api:aB3$kL9mP2@vN8qR@studycontrol-prod.xxxxx.mongodb.net/studycontrol?retryWrites=true&w=majority
```

## ⚙️ Step 5: Configure Your Application

### 5.1 Create Production Environment File

```bash
cd /Users/rishi/studyControl/server
cp env.production.example .env.production
```

### 5.2 Edit .env.production

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://studycontrol-api:YOUR_ACTUAL_PASSWORD@studycontrol-prod.xxxxx.mongodb.net/studycontrol?retryWrites=true&w=majority

# Generate these secrets using: openssl rand -base64 64
JWT_SECRET=your-super-long-secret-key-here-64-characters-minimum
JWT_REFRESH_SECRET=your-different-super-long-refresh-secret-here-64-characters

# CORS - Replace with your actual domain
CORS_ORIGIN=https://yourdomain.com

# Email Configuration (for password reset)
EMAIL_FROM=noreply@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 5.3 Generate Strong JWT Secrets

```bash
# Generate JWT_SECRET
openssl rand -base64 64

# Generate JWT_REFRESH_SECRET (different from above)
openssl rand -base64 64
```

Copy these generated secrets into your `.env.production` file.

## 🧪 Step 6: Test the Connection

### 6.1 Test Connection Locally

```bash
cd /Users/rishi/studyControl/server

# Install dependencies
npm install

# Load production environment and test
NODE_ENV=production npm run dev
```

### 6.2 Verify Connection

Check the console output. You should see:
```
✅ Connected to MongoDB: mongodb+srv://studycontrol-api:***@studycontrol-prod.xxxxx.mongodb.net/studycontrol
```

### 6.3 Test API Health

```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "success": true,
  "message": "StudyControl API is healthy",
  "timestamp": "2024-01-20T10:00:00.000Z"
}
```

## 🌱 Step 7: Seed Production Database

```bash
# Make sure you're using production environment
export NODE_ENV=production

# Run the production seeding script
npm run seed

# Or use the production-specific seeder
npx ts-node src/scripts/seedProduction.ts
```

You should see output like:
```
🌱 Starting production database seeding...
✅ Admin user created
✅ 15 quotes seeded successfully

📊 Production Database Status:
• Users: 1
• Quotes: 15
```

## 🔍 Step 8: Verify in Atlas Dashboard

1. **Go to your Atlas cluster**
2. **Click "Browse Collections"**
3. **You should see**:
   - `studycontrol` database
   - Collections: `users`, `quotes`
   - Sample data in each collection

## 🚀 Step 9: Production Deployment Options

### Option A: Heroku (Easiest)

```bash
# Install Heroku CLI
# Create Heroku app
heroku create studycontrol-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="mongodb+srv://studycontrol-api:YOUR_PASSWORD@studycontrol-prod.xxxxx.mongodb.net/studycontrol?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="your-jwt-secret"
heroku config:set JWT_REFRESH_SECRET="your-refresh-secret"
heroku config:set CORS_ORIGIN="https://your-frontend-domain.com"

# Deploy
git add .
git commit -m "Production deployment"
git push heroku main
```

### Option B: Railway (Modern & Easy)

1. **Go to [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Add environment variables** in Railway dashboard
4. **Deploy automatically**

### Option C: DigitalOcean/AWS/VPS

Follow the detailed instructions in `PRODUCTION_DEPLOYMENT.md`

## 🔧 Step 10: Atlas Production Optimization

### 10.1 Enable Backups

1. **Go to your cluster**
2. **Click "Backup"** tab
3. **Enable "Continuous Backup"** (recommended for production)

### 10.2 Set Up Monitoring

1. **Go to "Monitoring"** tab
2. **Set up alerts** for:
   - High CPU usage
   - High memory usage
   - Connection spikes
   - Slow queries

### 10.3 Performance Optimization

1. **Go to "Performance Advisor"**
2. **Review suggested indexes**
3. **Your StudyControl models already have optimized indexes**

## 🛡️ Security Best Practices

### ✅ Security Checklist

- [ ] **Strong database user password** (generated, not guessed)
- [ ] **IP whitelist configured** (not 0.0.0.0/0 in production)
- [ ] **Strong JWT secrets** (64+ characters, randomly generated)
- [ ] **HTTPS enabled** on your domain
- [ ] **CORS configured** to your specific domains only
- [ ] **Admin password changed** from default

### 🔒 Additional Security

1. **Enable Database Audit Logs** (in Atlas Security tab)
2. **Set up Connection Limits** (in Atlas Network Access)
3. **Regular Security Updates** (keep dependencies updated)

## 📊 Monitoring & Maintenance

### Daily Checks
- Check Atlas dashboard for any alerts
- Monitor application logs
- Verify API health endpoints

### Weekly Checks
- Review performance metrics
- Check backup status
- Monitor storage usage

### Monthly Checks
- Update dependencies
- Review and rotate secrets
- Performance optimization

## 🆘 Troubleshooting

### Common Issues

**❌ "MongoServerError: bad auth"**
- Check username/password in connection string
- Verify database user exists and has correct permissions

**❌ "MongoTimeoutError"**
- Check IP whitelist in Network Access
- Verify internet connection

**❌ "CORS Error"**
- Update CORS_ORIGIN in environment variables
- Include both www and non-www versions of your domain

**❌ "JWT Token Invalid"**
- Ensure JWT_SECRET is set correctly
- Check if secrets match between environments

### Getting Help

1. **Atlas Support**: Available in Atlas dashboard
2. **MongoDB Community**: [MongoDB Community Forums](https://community.mongodb.com)
3. **Documentation**: [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)

## 🎉 You're Ready!

Your MongoDB Atlas setup is complete! Your StudyControl backend now has:

- ✅ **Production-ready database** in the cloud
- ✅ **Secure authentication** and access control
- ✅ **Automated backups** and monitoring
- ✅ **Scalable infrastructure** that grows with your app
- ✅ **Global availability** with multiple regions

Your connection string is ready to use in production! 🚀

---

**Next Steps:**
1. Deploy your backend to your chosen platform
2. Update your frontend to use the production API URL
3. Test the complete application end-to-end
4. Monitor performance and scale as needed
