#!/bin/bash

# StudyControl Environment Variables for Vercel Dashboard
# Copy and paste these in Vercel Environment Variables section

echo "Environment Variables to set in Vercel Dashboard:"
echo "================================================="
echo ""

echo "MONGODB_URI"
echo "mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod"
echo ""

echo "JWT_SECRET"
echo "dInVgrJrSZa4YbW1uBB+Bq0iwACml8QM4rmJEjg1ZWHZH8/KNQ4KeyadkZzW5V8lbmHMdbwmgxHCbFAbv7D+DA=="
echo ""

echo "JWT_REFRESH_SECRET"
echo "4KXDHsQ6hSuRFblnf1vpyU6vQMsskB2JtbUqXXci0ZZ6GND7xymkPo9+NttvEGq8xARy9i0qypL7hh9cjJn0bg=="
echo ""

echo "SESSION_SECRET"
echo "5J80vSvRa2HJCZPIlVUwiy8OGC1GcioXwWP+989r/lJtprWwoaXTgMA5n4FOz9Vkt9MoXBGwVN0IDgtUa6W/iQ=="
echo ""

echo "NODE_ENV"
echo "production"
echo ""

echo "CORS_ORIGIN"
echo "https://rishi4ammu.vercel.app"
echo ""

echo "SMTP_HOST"
echo "smtp.gmail.com"
echo ""

echo "SMTP_PORT"
echo "587"
echo ""

echo "SMTP_USER"
echo "hrushinath29@gmail.com"
echo ""

echo "SMTP_PASS"
echo "yzelhwzvsuuhtosa"
echo ""

echo "EMAIL_FROM"
echo "noreply@studycontrol.com"
echo ""

echo "EMAIL_FROM_NAME"
echo "StudyControl"
echo ""

echo "API_PREFIX"
echo "/api/v1"
echo ""

echo "NEXT_PUBLIC_API_URL"
echo "https://rishi4ammu.vercel.app/api/v1"
echo ""

echo "NEXT_PUBLIC_APP_URL"
echo "https://rishi4ammu.vercel.app"
echo ""

echo "================================================="
echo "1. Go to: https://vercel.com/dashboard"
echo "2. Select your project (rishi4ammu)"
echo "3. Go to Settings → Environment Variables"
echo "4. Add each variable above (Name and Value)"
echo "5. Click 'Add' for each one"
echo "6. Trigger a new deployment"