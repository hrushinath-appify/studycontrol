# StudyControl Backend - Production Deployment Guide

This guide covers deploying your StudyControl backend to production with MongoDB Atlas.

## 🎯 Pre-Deployment Checklist

### ✅ MongoDB Atlas Setup Complete
- [ ] Atlas cluster created and running
- [ ] Database user created with appropriate permissions
- [ ] IP whitelist configured for your server
- [ ] Connection string obtained and tested

### ✅ Environment Configuration
- [ ] Production environment variables configured
- [ ] JWT secrets generated (strong, unique secrets)
- [ ] CORS origins set to your production domains
- [ ] Email SMTP configured (for password reset)

### ✅ Security Review
- [ ] All secrets are environment variables (not hardcoded)
- [ ] Rate limiting configured appropriately
- [ ] HTTPS enabled (SSL certificate)
- [ ] Database user has minimal required permissions

## 🚀 Deployment Steps

### Step 1: Prepare Production Environment

1. **Copy production environment template**:
   ```bash
   cp env.production.example .env.production
   ```

2. **Configure production variables**:
   ```bash
   # Generate strong JWT secrets
   openssl rand -base64 64  # Use for JWT_SECRET
   openssl rand -base64 64  # Use for JWT_REFRESH_SECRET
   ```

3. **Update .env.production with your values**:
   ```env
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://studycontrol-api:YOUR_PASSWORD@cluster.mongodb.net/studycontrol
   JWT_SECRET=your-generated-secret-here
   JWT_REFRESH_SECRET=your-different-generated-secret-here
   CORS_ORIGIN=https://yourdomain.com
   ```

### Step 2: Build for Production

```bash
# Install production dependencies only
npm ci --only=production

# Build the TypeScript application
npm run build

# The built application will be in the 'dist' folder
```

### Step 3: Database Initialization

```bash
# Set production environment
export NODE_ENV=production

# Load production environment variables
source .env.production  # Linux/macOS
# Or manually set each variable

# Seed the production database
npm run seed
```

### Step 4: Start Production Server

```bash
# Start with production environment
NODE_ENV=production npm start

# Or with PM2 (recommended)
pm2 start dist/index.js --name studycontrol-api
```

## 🌐 Deployment Platforms

### Option 1: DigitalOcean Droplet

1. **Create a Droplet**:
   - Ubuntu 22.04 LTS
   - At least 1GB RAM
   - Enable firewall

2. **Setup Node.js**:
   ```bash
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Install PM2 globally
   sudo npm install -g pm2
   ```

3. **Deploy your application**:
   ```bash
   # Clone your repository
   git clone https://github.com/yourusername/studycontrol.git
   cd studycontrol/server
   
   # Install dependencies and build
   npm ci --only=production
   npm run build
   
   # Start with PM2
   pm2 start dist/index.js --name studycontrol-api
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx (optional, for reverse proxy)**:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Heroku

1. **Create Heroku app**:
   ```bash
   heroku create studycontrol-api
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=your-secret
   heroku config:set JWT_REFRESH_SECRET=your-refresh-secret
   heroku config:set CORS_ORIGIN=https://yourdomain.com
   ```

3. **Create Procfile**:
   ```
   web: npm start
   ```

4. **Deploy**:
   ```bash
   git add .
   git commit -m "Production deployment"
   git push heroku main
   ```

### Option 3: Railway

1. **Connect GitHub repository**
2. **Set environment variables in Railway dashboard**
3. **Deploy automatically on push**

### Option 4: Render

1. **Create new Web Service**
2. **Connect GitHub repository**
3. **Set build command**: `npm run build`
4. **Set start command**: `npm start`
5. **Configure environment variables**

## 🔧 Production Environment Variables

### Critical Variables (Must Change)

```env
# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/studycontrol

# JWT Secrets (Generate unique, strong secrets)
JWT_SECRET=your-unique-64-char-secret
JWT_REFRESH_SECRET=your-different-64-char-secret

# CORS (Your actual domain)
CORS_ORIGIN=https://yourdomain.com

# Email (For password reset)
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### Security Best Practices

1. **Never commit .env files**
2. **Use different secrets for each environment**
3. **Rotate secrets periodically**
4. **Use HTTPS in production**
5. **Keep dependencies updated**

## 📊 Monitoring & Maintenance

### Health Monitoring

Your API includes health check endpoints:
- `GET /health` - Basic health check
- `GET /api/v1/health` - API health with database status

### Logging

Production logs include:
- Request/response logging
- Error tracking
- Performance metrics
- Database connection status

### Backup Strategy

1. **MongoDB Atlas Automated Backups** (recommended)
2. **Regular database exports**:
   ```bash
   mongodump --uri="mongodb+srv://..." --out=backup-$(date +%Y%m%d)
   ```

### Performance Optimization

1. **Enable compression**:
   ```javascript
   // Already included in middleware
   app.use(compression());
   ```

2. **Database indexing**:
   ```javascript
   // Already configured in models
   userSchema.index({ email: 1 });
   diaryEntrySchema.index({ userId: 1, createdAt: -1 });
   ```

3. **Connection pooling**:
   ```javascript
   // Already configured in database.ts
   maxPoolSize: 10
   ```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   ```bash
   # Check connection string
   # Verify IP whitelist in Atlas
   # Check database user permissions
   ```

2. **JWT Token Errors**:
   ```bash
   # Verify JWT secrets are set
   # Check token expiration times
   # Ensure secrets are consistent
   ```

3. **CORS Errors**:
   ```bash
   # Update CORS_ORIGIN to match frontend domain
   # Include both www and non-www versions
   ```

### Logs Analysis

```bash
# View PM2 logs
pm2 logs studycontrol-api

# View error logs
pm2 logs studycontrol-api --err

# Monitor in real-time
pm2 monit
```

## 🔄 Deployment Updates

### Zero-Downtime Deployment

```bash
# Pull latest code
git pull origin main

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Reload PM2 (zero downtime)
pm2 reload studycontrol-api
```

### Database Migrations

```bash
# Run any database updates
npm run migrate  # If you add migrations later

# Update indexes if needed
npm run update-indexes
```

## 📞 Support & Monitoring

### Essential Monitoring

1. **Uptime monitoring** (UptimeRobot, Pingdom)
2. **Error tracking** (Sentry, LogRocket)
3. **Performance monitoring** (New Relic, DataDog)
4. **Database monitoring** (MongoDB Atlas built-in)

### Maintenance Schedule

- **Weekly**: Check logs and performance metrics
- **Monthly**: Update dependencies and security patches  
- **Quarterly**: Review and rotate secrets
- **Annually**: Review and optimize database performance

Your StudyControl backend is now production-ready! 🚀
