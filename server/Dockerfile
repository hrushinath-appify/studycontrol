# StudyControl Server Dockerfile
FROM node:18-alpine AS base

# Install curl for health checks
RUN apk add --no-cache curl libc6-compat

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base AS development
WORKDIR /app

# Install all dependencies including dev dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Use nodemon for development
CMD ["npm", "run", "dev"]

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install dev dependencies for building
RUN npm ci
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 studycontrol

# Copy built application
COPY --from=builder --chown=studycontrol:nodejs /app/dist ./dist
COPY --from=builder --chown=studycontrol:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=studycontrol:nodejs /app/package.json ./package.json

# Create uploads directory
RUN mkdir -p uploads && chown studycontrol:nodejs uploads

USER studycontrol

EXPOSE 5000

ENV PORT 5000

CMD ["npm", "start"]