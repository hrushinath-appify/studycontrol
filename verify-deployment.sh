#!/bin/bash

# StudyControl Deployment Verification Script
# This script verifies that the deployment is working correctly

echo "🚀 StudyControl Deployment Verification"
echo "========================================"

BASE_URL="https://rishi4ammu.vercel.app"

# Function to check HTTP status
check_endpoint() {
    local url=$1
    local expected_status=${2:-200}
    local description=$3
    
    echo -n "Testing $description... "
    
    status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$status" -eq "$expected_status" ]; then
        echo "✅ ($status)"
        return 0
    else
        echo "❌ ($status, expected $expected_status)"
        return 1
    fi
}

# Function to check if response contains expected content
check_content() {
    local url=$1
    local expected_content=$2
    local description=$3
    
    echo -n "Testing $description... "
    
    response=$(curl -s "$url")
    
    if echo "$response" | grep -q "$expected_content"; then
        echo "✅"
        return 0
    else
        echo "❌ (content not found)"
        echo "Response: $response"
        return 1
    fi
}

echo ""
echo "📋 Frontend Endpoints:"
echo "---------------------"

check_endpoint "$BASE_URL" 200 "Main page"
check_endpoint "$BASE_URL/login" 200 "Login page"
check_endpoint "$BASE_URL/signup" 200 "Signup page"
check_endpoint "$BASE_URL/forgot-password" 200 "Forgot password page"

echo ""
echo "🔧 API Endpoints:"
echo "----------------"

check_endpoint "$BASE_URL/health" 200 "Health check"
check_endpoint "$BASE_URL/api/debug/env" 200 "Environment debug"
check_endpoint "$BASE_URL/api/v1/health" 200 "Backend health"

echo ""
echo "🔐 Auth Endpoints (should return 401 without token):"
echo "---------------------------------------------------"

check_endpoint "$BASE_URL/api/auth/me" 401 "Auth me (unauthorized)"

echo ""
echo "📊 Content Verification:"
echo "------------------------"

check_content "$BASE_URL/api/debug/env" "success" "Environment API response"
check_content "$BASE_URL/health" "status" "Health endpoint response"

echo ""
echo "🎯 Git Status:"
echo "-------------"

cd "$(dirname "$0")"
echo "Current branch: $(git branch --show-current)"
echo "Latest commit: $(git log --oneline -1)"
echo "Remote status: $(git status --porcelain)"

if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Working directory clean"
else
    echo "⚠️  Uncommitted changes found"
fi

echo ""
echo "🌐 Environment Check:"
echo "--------------------"

if [ -f "vercel.env" ]; then
    echo "✅ vercel.env file exists"
    echo "MongoDB URI configured: $(grep -q MONGODB_URI vercel.env && echo "Yes" || echo "No")"
    echo "JWT Secret configured: $(grep -q JWT_SECRET vercel.env && echo "Yes" || echo "No")"
else
    echo "❌ vercel.env file not found"
fi

echo ""
echo "📁 Build Configuration:"
echo "----------------------"

if [ -f "vercel.json" ]; then
    echo "✅ vercel.json exists"
else
    echo "❌ vercel.json not found"
fi

if [ -f "client/package.json" ]; then
    echo "✅ client/package.json exists"
    echo "Build script: $(grep -o '"build":[^,]*' client/package.json)"
    echo "Vercel build script: $(grep -o '"vercel-build":[^,]*' client/package.json)"
else
    echo "❌ client/package.json not found"
fi

echo ""
echo "🏁 Deployment Verification Complete!"
echo "===================================="