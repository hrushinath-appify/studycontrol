#!/bin/bash

# StudyControl API Authentication Test Script
BASE_URL="http://localhost:5000/api/v1"

echo "🧪 Testing StudyControl Authentication Flow"
echo "========================================="

# Test 1: Register a new user
echo -e "\n📝 Test 1: Registering new user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123!",
    "confirmPassword": "TestPassword123!"
  }')

echo "Register Response:"
echo $REGISTER_RESPONSE | jq '.' 2>/dev/null || echo $REGISTER_RESPONSE

# Extract token from register response
TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.data.accessToken' 2>/dev/null)

if [ "$TOKEN" != "null" ] && [ "$TOKEN" != "" ]; then
    echo "✅ Registration successful! Token received."
    
    # Test 2: Get current user
    echo -e "\n👤 Test 2: Getting current user profile..."
    USER_RESPONSE=$(curl -s -X GET "$BASE_URL/auth/me" \
      -H "Authorization: Bearer $TOKEN")
    
    echo "User Profile Response:"
    echo $USER_RESPONSE | jq '.' 2>/dev/null || echo $USER_RESPONSE
    
    # Test 3: Login with the new user
    echo -e "\n🔐 Test 3: Logging in with new user..."
    LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "test@example.com",
        "password": "TestPassword123!"
      }')
    
    echo "Login Response:"
    echo $LOGIN_RESPONSE | jq '.' 2>/dev/null || echo $LOGIN_RESPONSE
    
else
    echo "❌ Registration failed or no token received"
    echo "Make sure your server is running on port 5000"
fi

echo -e "\n🔍 Check MongoDB Atlas now - you should see 2 users!"
echo "1. John Doe (john.doe@example.com) - existing user"
echo "2. Test User (test@example.com) - newly created"