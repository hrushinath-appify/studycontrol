import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

interface Config {
  // Server
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  
  // Database
  MONGODB_URI: string;
  MONGODB_TEST_URI: string;
  
  // JWT
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  
  // Email
  EMAIL_FROM: string;
  EMAIL_FROM_NAME: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  SMTP_SECURE: boolean;
  
  // CORS
  CORS_ORIGIN: string;
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX_REQUESTS: number;
  
  // File Upload
  MAX_FILE_SIZE: number;
  UPLOAD_PATH: string;
  
  // Security
  BCRYPT_ROUNDS: number;
  SESSION_SECRET: string;
  
  // API
  API_VERSION: string;
  API_PREFIX: string;
  
  // Logging
  LOG_LEVEL: string;
}

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET'
];

// Validate required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const config: Config = {
  // Server Configuration
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: (process.env.NODE_ENV as Config['NODE_ENV']) || 'development',
  
  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI!,
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/studycontrol_test',
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  
  // Email Configuration
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@studycontrol.com',
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || 'StudyControl',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  SMTP_SECURE: process.env.SMTP_SECURE === 'true',
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:3001,http://localhost:3002',
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  
  // File Upload
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || '5242880', 10), // 5MB
  UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/',
  
  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  SESSION_SECRET: process.env.SESSION_SECRET || 'your-session-secret-change-this',
  
  // API Configuration
  API_VERSION: process.env.API_VERSION || 'v1',
  API_PREFIX: process.env.API_PREFIX || '/api/v1',
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// Validate configuration
export const validateConfig = (): void => {
  if (config.PORT < 1 || config.PORT > 65535) {
    throw new Error('PORT must be between 1 and 65535');
  }
  
  if (config.BCRYPT_ROUNDS < 8 || config.BCRYPT_ROUNDS > 15) {
    throw new Error('BCRYPT_ROUNDS must be between 8 and 15');
  }
  
  if (config.MAX_FILE_SIZE < 1024 || config.MAX_FILE_SIZE > 104857600) { // 1KB to 100MB
    throw new Error('MAX_FILE_SIZE must be between 1KB and 100MB');
  }
  
  console.log(`✅ Configuration loaded for ${config.NODE_ENV} environment`);
};

// Export individual config values for convenience
export const {
  PORT,
  NODE_ENV,
  MONGODB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  CORS_ORIGIN,
  API_PREFIX,
} = config;

export default config;
