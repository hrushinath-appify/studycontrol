#!/bin/bash

# StudyControl Development Setup Script
echo "🚀 Setting up StudyControl for development..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is available (local or Atlas)
echo "ℹ️  Make sure MongoDB is running locally or configure MongoDB Atlas connection in .env files"

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

# Start the development services
echo "🚀 Starting development services..."

echo " Starting local development servers..."
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
echo "🗄️  MongoDB: Configure connection in server/.env"
echo ""
echo "Press Ctrl+C to stop the servers..."

# Wait for user to stop
trap "kill $SERVER_PID $CLIENT_PID; exit" INT
wait