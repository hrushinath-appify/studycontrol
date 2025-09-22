// Backend API proxy for authentication
const mongoose = require('mongoose');

// User schema (simplified)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  avatar: String,
  isEmailVerified: { type: Boolean, default: false },
  preferences: {
    theme: { type: String, default: 'system' },
    studyReminders: { type: Boolean, default: true },
    appUpdates: { type: Boolean, default: true },
    emailNotifications: { type: Boolean, default: true },
    soundEnabled: { type: Boolean, default: true },
    language: { type: String, default: 'en' }
  },
  profile: {
    timezone: { type: String, default: 'UTC' }
  },
  refreshTokens: [String],
  lastLoginAt: Date,
  createdAt: { type: Date, default: Date.now }
});

// Connect to MongoDB
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Get or create User model
function getUserModel() {
  return mongoose.models.User || mongoose.model('User', userSchema);
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectDB();
    
    const { url, method } = req;
    const path = url.replace('/api/v1', '');

    console.log(`🔍 Backend API request: ${method} ${path}`);

    // Auth endpoints
    if (path === '/auth/me' && method === 'GET') {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Access token is required'
        });
      }

      // For now, return a mock user (you can implement JWT verification later)
      return res.json({
        success: true,
        data: {
          id: 'mock-user-id',
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
          avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random&color=fff&size=200',
          preferences: {
            theme: 'system',
            studyReminders: true,
            appUpdates: true,
            emailNotifications: true,
            soundEnabled: true,
            language: 'en'
          }
        },
        message: 'User data retrieved successfully'
      });
    }

    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      // Mock login response (you can implement real authentication later)
      return res.json({
        success: true,
        data: {
          accessToken: 'mock-jwt-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          user: {
            id: 'mock-user-id',
            name: 'Test User',
            email: email,
            role: 'user',
            avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random&color=fff&size=200'
          }
        },
        message: 'Login successful'
      });
    }

    if (path === '/auth/register' && method === 'POST') {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and password are required'
        });
      }

      // Mock registration response
      return res.status(201).json({
        success: true,
        data: {
          user: {
            id: 'mock-user-id',
            name: name,
            email: email,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=200`
          }
        },
        message: 'Registration successful! Please check your email to verify your account.'
      });
    }

    if (path === '/auth/logout' && method === 'POST') {
      return res.json({
        success: true,
        message: 'Logout successful'
      });
    }

    // Health check
    if (path === '/health' && method === 'GET') {
      return res.json({
        success: true,
        message: 'Backend API is healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      });
    }

    // Default 404
    res.status(404).json({
      success: false,
      error: `Route ${method} ${path} not found`
    });

  } catch (error) {
    console.error('Backend API error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}