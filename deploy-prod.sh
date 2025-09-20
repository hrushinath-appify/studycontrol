#!/bin/bash

# StudyControl Production Deployment Script
echo "🚀 Deploying StudyControl to production..."

# Check if all required files exist
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ docker-compose.yml not found!"
    exit 1
fi

if [ ! -f "server/env.production.example" ]; then
    echo "❌ Production environment example not found!"
    exit 1
fi

# Check if production environment is set up
if [ ! -f "server/.env.production" ]; then
    echo "⚠️  Production environment file not found!"
    echo "Please copy server/env.production.example to server/.env.production and configure it."
    read -p "Do you want to copy the example file now? (y/n): " copy_env
    
    if [ "$copy_env" = "y" ]; then
        cp server/env.production.example server/.env.production
        echo "✅ Created server/.env.production from example"
        echo "🔧 Please edit server/.env.production with your production values before continuing."
        exit 1
    else
        exit 1
    fi
fi

# Build production images
echo "🔨 Building production Docker images..."
docker-compose build --no-cache

if [ $? -ne 0 ]; then
    echo "❌ Failed to build Docker images!"
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Start production services
echo "🚀 Starting production services..."
docker-compose -f docker-compose.yml --env-file server/.env.production up -d

if [ $? -eq 0 ]; then
    echo "✅ StudyControl deployed successfully!"
    echo ""
    echo "🌐 Application is running at:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000"
    echo "   Nginx Proxy: http://localhost:80"
    echo ""
    echo "📊 Monitor your application:"
    echo "   docker-compose logs -f"
    echo ""
    echo "🛑 To stop the application:"
    echo "   docker-compose down"
else
    echo "❌ Deployment failed!"
    exit 1
fi