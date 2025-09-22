// Simple backend API for authentication
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
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

      // Return mock user for now
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

      // Mock login response
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
        environment: process.env.NODE_ENV,
        mongoConnected: !!process.env.MONGODB_URI
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