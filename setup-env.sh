#!/bin/bash

# StudyControl Environment Setup Script
# Automatically creates environment files with sensible defaults

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

# Function to generate a random secret
generate_secret() {
    openssl rand -hex 32 2>/dev/null || echo "$(date +%s | sha256sum | base64 | head -c 64)"
}

print_status "Setting up StudyControl environment files..."

# Create server environment file
print_status "Creating server environment file..."
if [ -f "server/.env" ]; then
    print_warning "server/.env already exists. Creating backup..."
    cp server/.env server/.env.backup.$(date +%s)
fi

cat > server/.env << EOF
# StudyControl Server Environment Configuration
# Generated on $(date)

# Application
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://studycontrol:studycontrol123@localhost:27017/studycontrol

# JWT Configuration (Auto-generated secrets)
JWT_SECRET=$(generate_secret)
JWT_REFRESH_SECRET=$(generate_secret)

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration (Optional - for password reset)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# Logging
LOG_LEVEL=debug

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
EOF

print_success "Created server/.env with auto-generated JWT secrets"

# Create client environment file
print_status "Creating client environment file..."
if [ -f "client/.env.local" ]; then
    print_warning "client/.env.local already exists. Creating backup..."
    cp client/.env.local client/.env.local.backup.$(date +%s)
fi

cat > client/.env.local << EOF
# StudyControl Client Environment Configuration
# Generated on $(date)

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StudyControl

# Development
NEXT_PUBLIC_DEV_MODE=true

# Analytics (Optional)
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
EOF

print_success "Created client/.env.local"

# Create production environment template
print_status "Creating production environment template..."
cat > server/.env.production.example << EOF
# StudyControl Production Environment Template
# Copy this to .env.production and update with your production values

# Application
NODE_ENV=production
PORT=5000

# Database Configuration (Use MongoDB Atlas for production)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studycontrol?retryWrites=true&w=majority

# JWT Configuration (Generate new secrets for production!)
JWT_SECRET=your-super-secure-jwt-secret-for-production
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-for-production

# CORS Configuration
CORS_ORIGIN=https://yourdomain.com

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-production-app-password

# Logging
LOG_LEVEL=info

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Security
SECURE_COOKIES=true
TRUST_PROXY=true
EOF

print_success "Created server/.env.production.example template"

# Create client production environment template
cat > client/.env.production.example << EOF
# StudyControl Client Production Environment Template
# Set these environment variables in your hosting platform

# API Configuration
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1

# App Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_APP_NAME=StudyControl

# Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id
EOF

print_success "Created client/.env.production.example template"

echo ""
print_success "Environment setup completed!"
echo ""
echo "📁 Files created:"
echo "   ✓ server/.env (development configuration)"
echo "   ✓ client/.env.local (development configuration)"
echo "   ✓ server/.env.production.example (production template)"
echo "   ✓ client/.env.production.example (production template)"
echo ""
print_status "Next steps:"
echo "1. Review the generated environment files"
echo "2. Update email configuration if needed"
echo "3. For production, copy the .example files and update with your values"
echo "4. Run './setup-dev.sh' to start the application"
echo ""
print_warning "Important: The JWT secrets have been auto-generated for development."
print_warning "For production, generate new secrets and keep them secure!"