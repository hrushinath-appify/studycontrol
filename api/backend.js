// Backend API with MongoDB and email functionality
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

// MongoDB connection singleton
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false,
    });
    isConnected = true;
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    throw error;
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system',
    },
    studyReminders: {
      type: Boolean,
      default: true,
    },
    appUpdates: {
      type: Boolean,
      default: true,
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    soundEnabled: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    },
  },
  profile: {
    timezone: {
      type: String,
      default: 'UTC',
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  lastLoginAt: {
    type: Date,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret.emailVerificationToken;
      return ret;
    },
  },
});

// Get User model (create if doesn't exist)
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Create email transporter
function createEmailTransporter() {
  console.log('🔧 Creating email transporter with config:', {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? process.env.SMTP_USER : 'missing',
    pass: process.env.SMTP_PASS ? '***' : 'missing'
  });

  if (process.env.SMTP_HOST === 'smtp.gmail.com') {
    // Gmail specific configuration
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    // Generic SMTP configuration
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
}

// Send verification email
async function sendVerificationEmail(email, name, token) {
  try {
    console.log('🔧 Attempting to send email to:', email);
    
    const transporter = createEmailTransporter();
    
    // Verify transporter configuration
    console.log('🔧 Verifying transporter...');
    await transporter.verify();
    console.log('✅ Transporter verified successfully');
    
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your StudyControl Account',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Welcome to StudyControl, ${name}!</h2>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p>Or copy and paste this link in your browser:</p>
          <p style="word-break: break-all; color: #6366f1;">${verificationUrl}</p>
          <p style="color: #666; font-size: 14px;">This verification link will expire in 24 hours.</p>
        </div>
      `
    };

    console.log('🔧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    });

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Email sending failed with error:', error.message);
    return false;
  }
}

// Generate avatar URL
function generateAvatarUrl(name) {
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
  
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200`;
}

module.exports = async function handler(req, res) {
  // Set CORS headers - Be specific about origins when using credentials
  const allowedOrigins = [
    'https://rishi4ammu.vercel.app',
    'https://rishi4ammu-m1qkemgox-hrushinath-appifys-projects.vercel.app',
    'https://rishi4ammu-9tcc3w65q-hrushinath-appifys-projects.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];
  
  const origin = req.headers.origin;
  console.log('[Backend] Request origin:', origin);
  console.log('[Backend] Request method:', req.method);
  console.log('[Backend] Request URL:', req.url);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Same-origin requests (no origin header) - allow them
    res.setHeader('Access-Control-Allow-Origin', req.headers.host ? `https://${req.headers.host}` : '*');
  } else {
    console.log('[Backend] Origin not in allowed list:', origin);
    res.setHeader('Access-Control-Allow-Origin', origin); // Allow for now during debugging
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    console.log('[Backend] Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  try {
    const { url, method } = req;
    const path = url.replace('/api/v1', '');

    console.log(`🔍 Backend API request: ${method} ${path}`);

    // Registration endpoint
    if (path === '/auth/register' && method === 'POST') {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and password are required'
        });
      }

      // Connect to database
      await connectToDatabase();

      // Check if user already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User already exists with this email'
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

      // Create user
      const user = new User({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        avatar: generateAvatarUrl(name),
        isEmailVerified: false,
        emailVerificationToken: hashedVerificationToken,
        emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      });

      // Save user to database
      await user.save();

      // Send verification email
      let emailSent = false;
      try {
        emailSent = await sendVerificationEmail(user.email, user.name, verificationToken);
      } catch (error) {
        console.error('Failed to send verification email:', error);
      }

      // Return success response (password is automatically excluded by toJSON transform)
      return res.status(201).json({
        success: true,
        data: {
          user: user.toJSON(),
          emailSent,
        },
        message: emailSent 
          ? 'Registration successful! Please check your email to verify your account before logging in.'
          : 'Registration successful! However, we could not send the verification email. Please contact support.'
      });
    }

    // Login endpoint  
    if (path === '/auth/login' && method === 'POST') {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }

      // Connect to database
      await connectToDatabase();

      // Find user and include password for comparison
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Check if email is verified
      if (!user.isEmailVerified) {
        return res.status(401).json({
          success: false,
          error: 'Please verify your email address before logging in. Check your email for the verification link.'
        });
      }

      // Generate tokens (mock for now)
      const accessToken = `jwt-${Date.now()}-${user._id}`;
      const refreshToken = `refresh-${Date.now()}-${user._id}`;

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      // Return success response (password is excluded by toJSON transform)
      return res.json({
        success: true,
        data: {
          accessToken,
          refreshToken,
          user: user.toJSON()
        },
        message: 'Login successful'
      });
    }

    // Email verification endpoint
    if (path === '/auth/verify-email' && method === 'POST') {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          error: 'Verification token is required'
        });
      }

      // Connect to database
      await connectToDatabase();

      // Hash the token to compare
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      // Find user with this token
      const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpires: { $gt: new Date() }
      });

      if (!user) {
        return res.status(400).json({
          success: false,
          error: 'Invalid or expired verification token'
        });
      }

      // Update user as verified
      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save();

      return res.json({
        success: true,
        data: { user: user.toJSON() },
        message: 'Email verified successfully! You can now log in to your account.'
      });
    }

    // Resend verification email endpoint
    if (path === '/auth/resend-verification' && method === 'POST') {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }

      // Connect to database
      await connectToDatabase();

      // Find user
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User not found'
        });
      }

      if (user.isEmailVerified) {
        return res.status(400).json({
          success: false,
          error: 'Email is already verified'
        });
      }

      // Generate new verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const hashedVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

      // Update user with new token
      user.emailVerificationToken = hashedVerificationToken;
      user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
      await user.save();

      // Send verification email
      let emailSent = false;
      try {
        emailSent = await sendVerificationEmail(user.email, user.name, verificationToken);
      } catch (error) {
        console.error('Failed to send verification email:', error);
      }

      return res.json({
        success: true,
        data: { emailSent },
        message: emailSent 
          ? 'Verification email sent! Please check your inbox.'
          : 'User found but failed to send verification email. Please try again.'
      });
    }

    // Auth check endpoint
    if (path === '/auth/me' && method === 'GET') {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Access token is required'
        });
      }

      // Extract token and find user (simple implementation)
      const token = authHeader.substring(7);
      const userId = token.split('-')[2]; // Extract user ID from token
      
      // Connect to database
      await connectToDatabase();
      
      // Find user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid token'
        });
      }

      return res.json({
        success: true,
        data: user.toJSON(),
        message: 'User data retrieved successfully'
      });
    }

    // Logout endpoint
    if (path === '/auth/logout' && method === 'POST') {
      return res.json({
        success: true,
        message: 'Logout successful'
      });
    }

    // Health check
    if (path === '/health' && method === 'GET') {
      let dbStats = { totalUsers: 0, verifiedUsers: 0, dbConnected: false };
      
      try {
        await connectToDatabase();
        const totalUsers = await User.countDocuments();
        const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
        dbStats = { totalUsers, verifiedUsers, dbConnected: true };
      } catch (error) {
        console.error('Database stats error:', error);
      }

      return res.json({
        success: true,
        message: 'Backend API is healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
        features: {
          email: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
          database: !!process.env.MONGODB_URI,
        },
        stats: dbStats
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