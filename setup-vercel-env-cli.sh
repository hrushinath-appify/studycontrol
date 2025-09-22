#!/bin/bash

echo "🚀 Setting up Vercel environment variables..."

# Make sure we're in the right project
echo "📁 Linking to Vercel project..."
vercel link --yes

echo ""
echo "🔧 Adding environment variables to production..."

# Database
echo "Adding MONGODB_URI..."
echo 'mongodb+srv://hrushi_db_user:jnKOzxatVHhTivUg@studycontrol-prod.nk56e6h.mongodb.net/studycontrol?retryWrites=true&w=majority&appName=studycontrol-prod' | vercel env add MONGODB_URI production

# JWT Security
echo "Adding JWT_SECRET..."
echo 'dInVgrJrSZa4YbW1uBB+Bq0iwACml8QM4rmJEjg1ZWHZH8/KNQ4KeyadkZzW5V8lbmHMdbwmgxHCbFAbv7D+DA==' | vercel env add JWT_SECRET production

echo "Adding JWT_REFRESH_SECRET..."
echo '4KXDHsQ6hSuRFblnf1vpyU6vQMsskB2JtbUqXXci0ZZ6GND7xymkPo9+NttvEGq8xARy9i0qypL7hh9cjJn0bg==' | vercel env add JWT_REFRESH_SECRET production

echo "Adding SESSION_SECRET..."
echo '5J80vSvRa2HJCZPIlVUwiy8OGC1GcioXwWP+989r/lJtprWwoaXTgMA5n4FOz9Vkt9MoXBGwVN0IDgtUa6W/iQ==' | vercel env add SESSION_SECRET production

# Environment
echo "Adding NODE_ENV..."
echo 'production' | vercel env add NODE_ENV production

# CORS
echo "Adding CORS_ORIGIN..."
echo 'https://rishi4ammu.vercel.app' | vercel env add CORS_ORIGIN production

# SMTP Configuration
echo "Adding SMTP_HOST..."
echo 'smtp.gmail.com' | vercel env add SMTP_HOST production

echo "Adding SMTP_PORT..."
echo '587' | vercel env add SMTP_PORT production

echo "Adding SMTP_USER..."
echo 'hrushinath29@gmail.com' | vercel env add SMTP_USER production

echo "Adding SMTP_PASS..."
echo 'yzelhwzvsuuhtosa' | vercel env add SMTP_PASS production

echo "Adding EMAIL_FROM..."
echo 'noreply@studycontrol.com' | vercel env add EMAIL_FROM production

echo "Adding EMAIL_FROM_NAME..."
echo 'StudyControl' | vercel env add EMAIL_FROM_NAME production

# API Configuration
echo "Adding API_PREFIX..."
echo '/api/v1' | vercel env add API_PREFIX production

# Client Environment Variables
echo "Adding NEXT_PUBLIC_API_URL..."
echo 'https://rishi4ammu.vercel.app/api/v1' | vercel env add NEXT_PUBLIC_API_URL production

echo "Adding NEXT_PUBLIC_APP_URL..."
echo 'https://rishi4ammu.vercel.app' | vercel env add NEXT_PUBLIC_APP_URL production

echo "Adding NEXT_PUBLIC_APP_NAME..."
echo 'StudyControl' | vercel env add NEXT_PUBLIC_APP_NAME production

echo ""
echo "✅ All environment variables added!"
echo ""
echo "🚀 Triggering production deployment..."
vercel --prod

echo ""
echo "🎉 Setup complete! Your app should be deployed with all environment variables."
echo "🔗 Visit: https://rishi4ammu.vercel.app"