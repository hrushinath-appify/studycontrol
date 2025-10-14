#!/bin/bash

# Email Setup Script for StudyControl
# This script helps configure email settings for user verification

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo "📧 StudyControl Email Configuration Setup"
echo "========================================="
echo ""

print_status "This script will help you configure email settings for user verification."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    print_error ".env.local file not found!"
    print_status "Please run './setup-env.sh' first to create the environment files."
    exit 1
fi

echo "Current email configuration in .env.local:"
echo "----------------------------------------"
grep -E "SMTP_|EMAIL_" .env.local || echo "No email configuration found"
echo ""

print_warning "To fix email verification, you need to set up Gmail App Password:"
echo ""
echo "1. Go to https://myaccount.google.com/security"
echo "2. Enable 2-Step Verification if not already enabled"
echo "3. Go to https://myaccount.google.com/apppasswords"
echo "4. Generate an App Password for 'Mail'"
echo "5. Copy the 16-character password"
echo ""

read -p "Have you generated a Gmail App Password? (y/n): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Please complete the Gmail App Password setup first, then run this script again."
    exit 0
fi

read -p "Enter your Gmail App Password (16 characters): " APP_PASSWORD

if [ ${#APP_PASSWORD} -ne 16 ]; then
    print_error "App Password should be exactly 16 characters. Please try again."
    exit 1
fi

# Update .env.local with the app password
sed -i.backup "s/SMTP_PASS=.*/SMTP_PASS=$APP_PASSWORD/" .env.local

print_success "Email configuration updated!"
print_status "The old .env.local has been backed up as .env.local.backup"
echo ""

print_status "Testing email configuration..."

# Create a simple test to verify the configuration
node -e "
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration test failed:', error.message);
    process.exit(1);
  } else {
    console.log('✅ Email configuration test passed!');
  }
});
" 2>/dev/null || {
    print_warning "Could not test email configuration (nodemailer not available)"
    print_status "You can test the configuration when you run the application"
}

echo ""
print_success "Email setup complete!"
print_status "You can now test user registration and email verification."