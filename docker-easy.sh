#!/bin/bash

# StudyControl Docker Easy Management Script
# This script makes Docker operations simple and user-friendly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
}

# Function to setup environment files
setup_env() {
    print_status "Setting up environment files..."
    
    # Server environment
    if [ ! -f "server/.env" ]; then
        if [ -f "server/env.example" ]; then
            cp server/env.example server/.env
            print_success "Created server/.env from example"
        else
            print_warning "No server/env.example found, creating basic .env"
            cat > server/.env << EOF
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://studycontrol:studycontrol123@localhost:27017/studycontrol
JWT_SECRET=your-development-jwt-secret-key
JWT_REFRESH_SECRET=your-development-refresh-secret-key
CORS_ORIGIN=http://localhost:3000
EOF
        fi
    else
        print_status "Server .env already exists"
    fi
    
    # Client environment
    if [ ! -f "client/.env.local" ]; then
        cat > client/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=StudyControl
EOF
        print_success "Created client/.env.local"
    else
        print_status "Client .env.local already exists"
    fi
}

# Function to start the application
start_app() {
    print_status "Starting StudyControl application..."
    check_docker
    setup_env
    
    # Start with development override if it exists
    if [ -f "docker-compose.dev.yml" ]; then
        print_status "Using development configuration..."
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
    else
        docker-compose up -d
    fi
    
    print_success "Application is starting up!"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔌 Backend API: http://localhost:5000"
    echo "🗄️  MongoDB: mongodb://localhost:27017"
    echo ""
    print_status "Use './docker-easy.sh logs' to see application logs"
    print_status "Use './docker-easy.sh status' to check service health"
}

# Function to stop the application
stop_app() {
    print_status "Stopping StudyControl application..."
    check_docker
    
    if [ -f "docker-compose.dev.yml" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
    else
        docker-compose down
    fi
    
    print_success "Application stopped!"
}

# Function to restart the application
restart_app() {
    print_status "Restarting StudyControl application..."
    stop_app
    sleep 2
    start_app
}

# Function to show logs
show_logs() {
    check_docker
    
    if [ $# -eq 0 ]; then
        print_status "Showing logs for all services..."
        docker-compose logs -f --tail=50
    else
        print_status "Showing logs for service: $1"
        docker-compose logs -f --tail=50 "$1"
    fi
}

# Function to show status
show_status() {
    check_docker
    
    print_status "Service Status:"
    echo ""
    docker-compose ps
    echo ""
    
    # Check if services are responding
    print_status "Health Checks:"
    
    # Check MongoDB
    if docker-compose exec -T mongo mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; then
        print_success "✓ MongoDB is responding"
    else
        print_error "✗ MongoDB is not responding"
    fi
    
    # Check API
    if curl -s http://localhost:5000/health >/dev/null 2>&1; then
        print_success "✓ API is responding"
    else
        print_warning "✗ API is not responding (may still be starting)"
    fi
    
    # Check Frontend
    if curl -s http://localhost:3000 >/dev/null 2>&1; then
        print_success "✓ Frontend is responding"
    else
        print_warning "✗ Frontend is not responding (may still be starting)"
    fi
}

# Function to rebuild containers
rebuild_app() {
    print_status "Rebuilding StudyControl application..."
    check_docker
    
    print_status "Stopping containers..."
    stop_app
    
    print_status "Building containers..."
    if [ -f "docker-compose.dev.yml" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --no-cache
    else
        docker-compose build --no-cache
    fi
    
    print_status "Starting application..."
    start_app
}

# Function to clean up Docker resources
cleanup() {
    print_status "Cleaning up Docker resources..."
    check_docker
    
    # Stop and remove containers
    docker-compose down --remove-orphans
    
    # Remove unused images
    docker image prune -f
    
    # Remove unused volumes (be careful with this)
    read -p "Do you want to remove unused Docker volumes? This will delete data! (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker volume prune -f
        print_warning "Unused volumes removed - data may be lost!"
    fi
    
    print_success "Cleanup completed!"
}

# Function to open shell in container
shell() {
    check_docker
    
    if [ $# -eq 0 ]; then
        print_error "Please specify a service: web, api, or mongo"
        exit 1
    fi
    
    case $1 in
        "web"|"client")
            print_status "Opening shell in web container..."
            docker-compose exec web sh
            ;;
        "api"|"server")
            print_status "Opening shell in API container..."
            docker-compose exec api sh
            ;;
        "mongo"|"mongodb")
            print_status "Opening MongoDB shell..."
            docker-compose exec mongo mongosh studycontrol
            ;;
        *)
            print_error "Unknown service: $1"
            print_status "Available services: web, api, mongo"
            exit 1
            ;;
    esac
}

# Function to show help
show_help() {
    echo "StudyControl Docker Easy Management"
    echo ""
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  start, up        Start the application"
    echo "  stop, down       Stop the application"
    echo "  restart          Restart the application"
    echo "  status           Show service status and health"
    echo "  logs [service]   Show logs (optionally for specific service)"
    echo "  rebuild          Rebuild and restart containers"
    echo "  cleanup          Clean up Docker resources"
    echo "  shell <service>  Open shell in container (web/api/mongo)"
    echo "  setup-env        Set up environment files"
    echo "  help             Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start         # Start the application"
    echo "  $0 logs api      # Show API logs"
    echo "  $0 shell mongo   # Open MongoDB shell"
    echo "  $0 status        # Check service health"
}

# Main script logic
case "${1:-help}" in
    "start"|"up")
        start_app
        ;;
    "stop"|"down")
        stop_app
        ;;
    "restart")
        restart_app
        ;;
    "status")
        show_status
        ;;
    "logs")
        shift
        show_logs "$@"
        ;;
    "rebuild")
        rebuild_app
        ;;
    "cleanup")
        cleanup
        ;;
    "shell")
        shift
        shell "$@"
        ;;
    "setup-env")
        setup_env
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac