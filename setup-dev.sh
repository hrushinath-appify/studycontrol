#!/bin/bash

# StudyControl Development Setup Script
echo "🚀 Setting up StudyControl for development..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
echo "📄 Setting up environment files..."

if [ ! -f "server/.env" ]; then
    cp server/env.example server/.env
    echo "✅ Created server/.env from example"
fi

if [ ! -f "client/.env.local" ]; then
    cp client/.env.example client/.env.local
    echo "✅ Created client/.env.local from example"
fi

# Install dependencies
echo "📦 Installing dependencies..."

echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Dependencies installed successfully!"

# Build and start containers
echo "🐳 Starting Docker containers..."
docker-compose up -d mongo

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 10

# Start the services
echo "🚀 Starting development services..."

# Option 1: Run with Docker
echo "Choose how to run the services:"
echo "1) Docker containers (recommended for production-like environment)"
echo "2) Local development servers (recommended for development)"
read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        echo "🐳 Starting all services in Docker..."
        docker-compose up -d
        echo "✅ All services are running!"
        echo "🌐 Frontend: http://localhost:3000"
        echo "🔧 Backend API: http://localhost:5000"
        echo "🗄️  MongoDB: mongodb://localhost:27017"
        ;;
    2)
        echo "💻 Starting local development servers..."
        echo "Starting backend server..."
        cd server
        npm run dev &
        SERVER_PID=$!
        cd ..
        
        echo "Starting frontend server..."
        cd client
        npm run dev &
        CLIENT_PID=$!
        cd ..
        
        echo "✅ Development servers started!"
        echo "🌐 Frontend: http://localhost:3000"
        echo "🔧 Backend API: http://localhost:5000"
        echo "🗄️  MongoDB: mongodb://localhost:27017"
        echo ""
        echo "Press Ctrl+C to stop the servers..."
        
        # Wait for user to stop
        trap "kill $SERVER_PID $CLIENT_PID; docker-compose stop mongo; exit" INT
        wait
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac