#!/bin/bash

# StudyControl Manual Startup Script
echo "🚀 Starting StudyControl Application..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}Port $1 is already in use${NC}"
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    echo -e "${YELLOW}Killing process on port $1...${NC}"
    kill -9 $(lsof -ti:$1) 2>/dev/null || true
}

# Check Node.js and npm
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) and npm $(npm --version) are available${NC}"

# Check if ports are available
if check_port 5000; then
    read -p "Kill process on port 5000? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 5000
    else
        echo -e "${RED}❌ Cannot start backend on port 5000${NC}"
        exit 1
    fi
fi

if check_port 3000; then
    read -p "Kill process on port 3000? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        kill_port 3000
    else
        echo -e "${RED}❌ Cannot start frontend on port 3000${NC}"
        exit 1
    fi
fi

# Install dependencies if node_modules don't exist
echo -e "${BLUE}Checking dependencies...${NC}"

if [ ! -d "server/node_modules" ]; then
    echo -e "${YELLOW}Installing server dependencies...${NC}"
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}Installing client dependencies...${NC}"
    cd client && npm install && cd ..
fi

# Check environment files
echo -e "${BLUE}Checking environment configuration...${NC}"

if [ ! -f "server/.env" ]; then
    echo -e "${YELLOW}Creating server environment file...${NC}"
    cp server/env.example server/.env
    echo -e "${RED}⚠️  Please update server/.env with your MongoDB Atlas connection string${NC}"
fi

if [ ! -f "client/.env.local" ]; then
    echo -e "${YELLOW}Creating client environment file...${NC}"
    cp client/.env.example client/.env.local
fi

# Start the applications
echo -e "${GREEN}🚀 Starting applications...${NC}"

# Start backend
echo -e "${BLUE}Starting backend server...${NC}"
cd server
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}Starting frontend application...${NC}"
cd client
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for services to start
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 5

# Check if services are running
echo -e "${GREEN}📊 Service Status:${NC}"
if check_port 5000; then
    echo -e "${GREEN}✅ Backend API: http://localhost:5000${NC}"
else
    echo -e "${RED}❌ Backend failed to start${NC}"
fi

if check_port 3000; then
    echo -e "${GREEN}✅ Frontend App: http://localhost:3000${NC}"
else
    echo -e "${RED}❌ Frontend failed to start${NC}"
fi

echo -e "${GREEN}"
echo "🎉 StudyControl is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo "📊 API Health: http://localhost:5000/health"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all services${NC}"

# Trap Ctrl+C and cleanup
cleanup() {
    echo -e "\n${YELLOW}🛑 Stopping services...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✅ All services stopped${NC}"
    exit 0
}

trap cleanup INT

# Wait for user to stop
wait