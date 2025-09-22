#!/bin/bash

echo "🚀 Starting StudyControl deployment process..."

# Build the server TypeScript files
echo "📦 Building server..."
cd server
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Server build failed!"
    exit 1
fi
cd ..

# Build the client
echo "📦 Building client..."
cd client
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Client build failed!"
    exit 1
fi
cd ..

echo "✅ Build completed successfully!"
echo ""
echo "🔧 Configuration checklist:"
echo "1. Ensure environment variables are set in Vercel dashboard"
echo "2. MongoDB Atlas connection string is correct"
echo "3. JWT secrets are properly configured"
echo "4. CORS origin matches your domain"
echo ""
echo "📋 Environment variables to set in Vercel:"
echo "- MONGODB_URI"
echo "- JWT_SECRET"
echo "- JWT_REFRESH_SECRET"
echo "- SESSION_SECRET"
echo "- CORS_ORIGIN"
echo "- NEXT_PUBLIC_API_URL"
echo ""
echo "🚀 Ready for deployment!"