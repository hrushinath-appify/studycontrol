#!/bin/bash

# Marrow Progress Diagnostic Script
# This script helps diagnose authentication issues

echo "🔍 Marrow Progress Diagnostic Tool"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo "1️⃣  Checking if backend server is running..."
if curl -s http://localhost:5000/api/v1/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend server is running on port 5000${NC}"
    
    # Get health response
    HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/v1/health)
    echo "   Response: $HEALTH_RESPONSE"
else
    echo -e "${RED}❌ Backend server is NOT running on port 5000${NC}"
    echo "   Solution: Run 'cd server && npm run dev'"
    echo ""
fi

echo ""

# Check if frontend is running
echo "2️⃣  Checking if frontend server is running..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend server is running on port 3000${NC}"
else
    echo -e "${RED}❌ Frontend server is NOT running on port 3000${NC}"
    echo "   Solution: Run 'cd client && npm run dev'"
fi

echo ""

# Check environment files
echo "3️⃣  Checking environment configuration..."

# Check client .env
if [ -f "client/.env" ] || [ -f "client/.env.local" ]; then
    echo -e "${GREEN}✅ Client .env file found${NC}"
    
    # Check for JWT_SECRET in client
    if [ -f "client/.env" ]; then
        if grep -q "JWT_SECRET" client/.env; then
            echo -e "${GREEN}   ✅ JWT_SECRET found in client/.env${NC}"
        else
            echo -e "${RED}   ❌ JWT_SECRET missing in client/.env${NC}"
        fi
        
        if grep -q "NEXT_PUBLIC_API_URL" client/.env; then
            API_URL=$(grep "NEXT_PUBLIC_API_URL" client/.env | cut -d '=' -f2)
            echo -e "${GREEN}   ✅ NEXT_PUBLIC_API_URL: $API_URL${NC}"
        else
            echo -e "${YELLOW}   ⚠️  NEXT_PUBLIC_API_URL not set (will default to http://localhost:5000/api/v1)${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Client .env file NOT found${NC}"
    echo "   Solution: Create client/.env with required variables"
fi

echo ""

# Check server .env
if [ -f "server/.env" ] || [ -f "server/.env.local" ]; then
    echo -e "${GREEN}✅ Server .env file found${NC}"
    
    # Check for JWT_SECRET in server
    if [ -f "server/.env" ]; then
        if grep -q "JWT_SECRET" server/.env; then
            echo -e "${GREEN}   ✅ JWT_SECRET found in server/.env${NC}"
        else
            echo -e "${RED}   ❌ JWT_SECRET missing in server/.env${NC}"
        fi
        
        if grep -q "MONGODB_URI" server/.env; then
            echo -e "${GREEN}   ✅ MONGODB_URI configured${NC}"
        else
            echo -e "${RED}   ❌ MONGODB_URI missing in server/.env${NC}"
        fi
    fi
else
    echo -e "${RED}❌ Server .env file NOT found${NC}"
    echo "   Solution: Create server/.env with required variables"
fi

echo ""

# Check MongoDB connection (if mongo is installed)
echo "4️⃣  Checking MongoDB..."
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    echo -e "${GREEN}✅ MongoDB client is installed${NC}"
    echo "   Note: Ensure your MongoDB server is running"
else
    echo -e "${YELLOW}⚠️  MongoDB client not found in PATH${NC}"
    echo "   This is okay if you're using MongoDB Atlas"
fi

echo ""

# Check Node.js version
echo "5️⃣  Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"
    
    # Check if version is 18 or higher
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$MAJOR_VERSION" -ge 18 ]; then
        echo -e "${GREEN}   ✅ Version is 18+ (recommended)${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Version is below 18 (may cause issues)${NC}"
    fi
else
    echo -e "${RED}❌ Node.js is not installed${NC}"
fi

echo ""

# Port usage check
echo "6️⃣  Checking port usage..."

if command -v lsof &> /dev/null; then
    # Check port 3000
    if lsof -i :3000 > /dev/null 2>&1; then
        PROCESS_3000=$(lsof -i :3000 | grep LISTEN | awk '{print $1}')
        echo -e "${GREEN}✅ Port 3000 in use by: $PROCESS_3000${NC}"
    else
        echo -e "${YELLOW}⚠️  Port 3000 is not in use${NC}"
        echo "   Frontend might not be running"
    fi
    
    # Check port 5000
    if lsof -i :5000 > /dev/null 2>&1; then
        PROCESS_5000=$(lsof -i :5000 | grep LISTEN | awk '{print $1}')
        echo -e "${GREEN}✅ Port 5000 in use by: $PROCESS_5000${NC}"
    else
        echo -e "${RED}❌ Port 5000 is not in use${NC}"
        echo "   Backend server is not running"
    fi
else
    echo -e "${YELLOW}⚠️  lsof command not available${NC}"
fi

echo ""
echo "===================================="
echo "📝 Summary"
echo "===================================="
echo ""
echo "To fix the 'Invalid token' error:"
echo "1. Ensure both servers are running (frontend & backend)"
echo "2. Verify JWT_SECRET matches in both .env files"
echo "3. Make sure you're logged in (check for auth-token cookie)"
echo "4. Check server logs for detailed error messages"
echo ""
echo "For detailed instructions, see: MARROW_PROGRESS_FIX.md"
echo ""

# Offer to test the marrow-progress endpoint
echo "===================================="
read -p "Would you like to test the backend marrow-progress endpoint? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Testing backend endpoint..."
    echo "Note: This test will fail with 401 if you don't provide a valid token"
    echo ""
    
    RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" http://localhost:5000/api/v1/marrow-progress)
    HTTP_BODY=$(echo "$RESPONSE" | sed -e 's/HTTP_STATUS\:.*//g')
    HTTP_STATUS=$(echo "$RESPONSE" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
    
    echo "Status: $HTTP_STATUS"
    echo "Response: $HTTP_BODY"
    echo ""
    
    if [ "$HTTP_STATUS" = "401" ]; then
        echo -e "${YELLOW}⚠️  Expected: 401 Unauthorized (no token provided)${NC}"
        echo "This is correct - the endpoint requires authentication"
    elif [ "$HTTP_STATUS" = "200" ]; then
        echo -e "${GREEN}✅ Success! Endpoint is working${NC}"
    else
        echo -e "${RED}❌ Unexpected status code${NC}"
    fi
fi

echo ""
echo "Diagnostic complete! ✨"

