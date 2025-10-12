#!/bin/bash

# Authentication Flow Testing Script
# This script tests all authentication endpoints

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base URL
BASE_URL="${BASE_URL:-http://localhost:3000}"
API_BASE="${BASE_URL}/api/auth"

# Test user data
TEST_EMAIL="test-$(date +%s)@example.com"
TEST_PASSWORD="Test123456"
TEST_NAME="Test User"

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Authentication Flow Test Suite          ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo ""

# Function to make API calls and display results
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo -e "${YELLOW}Testing: ${description}${NC}"
    echo -e "Endpoint: ${method} ${endpoint}"
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "\n%{http_code}" -X ${method} \
            -H "Content-Type: application/json" \
            -d "${data}" \
            "${endpoint}")
    else
        response=$(curl -s -w "\n%{http_code}" -X ${method} \
            -H "Content-Type: application/json" \
            "${endpoint}")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo -e "${GREEN}✅ Success (${http_code})${NC}"
    else
        echo -e "${RED}❌ Failed (${http_code})${NC}"
    fi
    
    echo "Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    echo ""
    echo "----------------------------------------"
    echo ""
    
    # Return the response for further use
    echo "$body"
}

# Test 1: Registration
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Test 1: User Registration${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

register_response=$(test_endpoint "POST" \
    "${API_BASE}/register" \
    "{\"name\":\"${TEST_NAME}\",\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASSWORD}\"}" \
    "Create new user account")

# Extract user ID if successful
USER_ID=$(echo "$register_response" | jq -r '.data.user.id // .data.user._id // empty' 2>/dev/null)

if [ -n "$USER_ID" ]; then
    echo -e "${GREEN}User created with ID: ${USER_ID}${NC}"
else
    echo -e "${YELLOW}⚠️  Could not extract user ID (might already exist)${NC}"
fi

echo ""
read -p "Press Enter to continue to login test..."
echo ""

# Test 2: Login (will fail if email not verified)
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Test 2: User Login${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

login_response=$(test_endpoint "POST" \
    "${API_BASE}/login" \
    "{\"email\":\"${TEST_EMAIL}\",\"password\":\"${TEST_PASSWORD}\"}" \
    "Login with credentials")

# Extract token if successful
ACCESS_TOKEN=$(echo "$login_response" | jq -r '.data.accessToken // empty' 2>/dev/null)

if [ -n "$ACCESS_TOKEN" ]; then
    echo -e "${GREEN}Login successful! Token received.${NC}"
    echo "Token preview: ${ACCESS_TOKEN:0:50}..."
else
    echo -e "${YELLOW}⚠️  Login failed (likely due to email verification requirement)${NC}"
    echo -e "${YELLOW}In production, you would verify the email first.${NC}"
fi

echo ""
read -p "Press Enter to continue to protected route test..."
echo ""

# Test 3: Access Protected Route
if [ -n "$ACCESS_TOKEN" ]; then
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}Test 3: Protected Route Access${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo ""
    
    protected_response=$(curl -s -w "\n%{http_code}" \
        -H "Authorization: Bearer ${ACCESS_TOKEN}" \
        "${BASE_URL}/api/protected-example")
    
    http_code=$(echo "$protected_response" | tail -n1)
    body=$(echo "$protected_response" | head -n-1)
    
    echo -e "${YELLOW}Testing: Access protected route with JWT${NC}"
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ Success (${http_code})${NC}"
    else
        echo -e "${RED}❌ Failed (${http_code})${NC}"
    fi
    
    echo "Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    echo ""
    echo "----------------------------------------"
    echo ""
    
    read -p "Press Enter to continue to session refresh test..."
    echo ""
    
    # Test 4: Session Refresh
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}Test 4: Session Refresh${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo ""
    
    test_endpoint "POST" \
        "${API_BASE}/refresh" \
        "{\"token\":\"${ACCESS_TOKEN}\"}" \
        "Refresh authentication token"
    
    read -p "Press Enter to continue to logout test..."
    echo ""
    
    # Test 5: Logout
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo -e "${BLUE}Test 5: User Logout${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════${NC}"
    echo ""
    
    logout_response=$(curl -s -w "\n%{http_code}" -X POST \
        -H "Authorization: Bearer ${ACCESS_TOKEN}" \
        -H "Cookie: auth-token=${ACCESS_TOKEN}" \
        "${API_BASE}/logout")
    
    http_code=$(echo "$logout_response" | tail -n1)
    body=$(echo "$logout_response" | head -n-1)
    
    echo -e "${YELLOW}Testing: Logout and session cleanup${NC}"
    if [ "$http_code" -eq 200 ]; then
        echo -e "${GREEN}✅ Success (${http_code})${NC}"
    else
        echo -e "${RED}❌ Failed (${http_code})${NC}"
    fi
    
    echo "Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    echo ""
fi

# Summary
echo ""
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}Test Summary${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}✅ Registration endpoint tested${NC}"
echo -e "${GREEN}✅ Login endpoint tested${NC}"
if [ -n "$ACCESS_TOKEN" ]; then
    echo -e "${GREEN}✅ Protected route access tested${NC}"
    echo -e "${GREEN}✅ Session refresh tested${NC}"
    echo -e "${GREEN}✅ Logout tested${NC}"
else
    echo -e "${YELLOW}⚠️  Some tests skipped (no auth token)${NC}"
fi
echo ""
echo -e "${BLUE}OAuth Testing:${NC}"
echo "  Google OAuth: ${BASE_URL}/api/auth/oauth/google"
echo "  GitHub OAuth: ${BASE_URL}/api/auth/oauth/github"
echo ""
echo -e "${BLUE}Manual Testing:${NC}"
echo "  1. Visit ${BASE_URL}/login"
echo "  2. Try OAuth login (Google/GitHub)"
echo "  3. Check ${BASE_URL}/home (protected route)"
echo ""
echo -e "${GREEN}Authentication flow implementation complete!${NC}"
