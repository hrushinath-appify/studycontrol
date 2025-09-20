# 🚀 Docker Quick Start Guide

This guide will get you up and running with StudyControl using Docker in just a few simple steps!

## Prerequisites

- Docker Desktop installed and running
- Basic terminal/command line knowledge

## 🎯 Super Quick Start (3 steps!)

1. **Setup environment files**
   ```bash
   ./setup-env.sh
   ```

2. **Start the application**
   ```bash
   ./docker-easy.sh start
   ```

3. **Access your app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

That's it! 🎉

## 📋 Common Commands

| Command | What it does |
|---------|-------------|
| `./docker-easy.sh start` | Start the application |
| `./docker-easy.sh stop` | Stop the application |
| `./docker-easy.sh restart` | Restart the application |
| `./docker-easy.sh status` | Check if everything is running |
| `./docker-easy.sh logs` | See application logs |
| `./docker-easy.sh logs api` | See only API logs |
| `./docker-easy.sh rebuild` | Rebuild and restart everything |
| `./docker-easy.sh shell mongo` | Open MongoDB shell |
| `./docker-easy.sh cleanup` | Clean up Docker resources |

## 🔧 Development vs Production

### Development Mode (Default)
- Hot reload for code changes
- Development database
- Debug logging enabled
- Source code mounted for live editing

### Production Mode
```bash
# Remove or rename docker-compose.dev.yml
mv docker-compose.dev.yml docker-compose.dev.yml.disabled

# Then start normally
./docker-easy.sh start
```

## 🐛 Troubleshooting

### Application not starting?
```bash
# Check Docker is running
docker info

# Check service status
./docker-easy.sh status

# Check logs for errors
./docker-easy.sh logs
```

### Port already in use?
```bash
# Stop any running containers
./docker-easy.sh stop

# Check what's using the ports
lsof -i :3000
lsof -i :5000
lsof -i :27017
```

### Database connection issues?
```bash
# Check if MongoDB is healthy
./docker-easy.sh shell mongo

# Reset database (WARNING: deletes data!)
./docker-easy.sh stop
docker volume rm studycontrol_mongo-data
./docker-easy.sh start
```

### Need fresh containers?
```bash
./docker-easy.sh rebuild
```

## 🔍 Understanding the Setup

### What gets created:
- `server/.env` - Server configuration
- `client/.env.local` - Client configuration
- Docker containers for web, API, and database
- Docker volumes for persistent data

### Services:
- **mongo** - MongoDB database (port 27017)
- **api** - Node.js/Express backend (port 5000)
- **web** - Next.js frontend (port 3000)
- **nginx** - Reverse proxy (optional, port 80/443)

### Development Features:
- Code hot-reload
- Live database inspection
- Detailed logging
- Health checks

## 🎓 Next Steps

1. **Customize your environment**
   - Edit `server/.env` for API settings
   - Edit `client/.env.local` for frontend settings

2. **Start developing**
   - Frontend code: `client/` directory
   - Backend code: `server/src/` directory
   - Changes auto-reload in development mode

3. **Production deployment**
   - Copy `.env.production.example` files
   - Update with production values
   - Deploy using `./deploy-prod.sh`

## 💡 Pro Tips

- Use `./docker-easy.sh status` regularly to check health
- Use `./docker-easy.sh logs api` to debug backend issues
- Use `./docker-easy.sh shell mongo` to inspect database
- Keep `docker-compose.dev.yml` for development
- Remove it for production-like testing

Happy coding! 🚀