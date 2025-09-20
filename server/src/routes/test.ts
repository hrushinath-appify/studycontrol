import { Router } from 'express';
import crypto from 'crypto';
import { User } from '@/models/User';
import { createSuccessResponse, createErrorResponse } from '@/utils/response';
import { asyncHandler } from '@/utils/asyncHandler';

const router = Router();

// Test endpoint to manually verify a user (for development only)
router.post('/verify-user', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json(createErrorResponse('Not found'));
  }
  
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json(createErrorResponse('Email is required'));
  }
  
  try {
    const result = await User.updateOne(
      { 
        email: email.toLowerCase(),
        isEmailVerified: false 
      },
      { 
        $set: { isEmailVerified: true },
        $unset: { 
          emailVerificationToken: '',
          emailVerificationExpires: ''
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json(createErrorResponse('No unverified user found with that email'));
    }
    
    res.json(createSuccessResponse(
      null,
      `User ${email} has been manually verified for testing`
    ));
    
  } catch (error) {
    console.error('Manual verification error:', error);
    res.status(500).json(createErrorResponse('Failed to verify user'));
  }
}));

// Test endpoint to get user verification status
router.get('/user-status/:email', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json(createErrorResponse('Not found'));
  }
  
  const { email } = req.params;
  
  try {
    const user = await User.findOne(
      { email: email.toLowerCase() },
      { 
        name: 1, 
        email: 1, 
        isEmailVerified: 1, 
        emailVerificationExpires: 1,
        passwordResetExpires: 1,
        createdAt: 1 
      }
    );
    
    if (!user) {
      return res.status(404).json(createErrorResponse('User not found'));
    }
    
    res.json(createSuccessResponse({
      user: {
        name: user.name,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        emailVerificationExpires: user.emailVerificationExpires,
        passwordResetExpires: user.passwordResetExpires,
        createdAt: user.createdAt
      }
    }));
    
  } catch (error) {
    console.error('Get user status error:', error);
    res.status(500).json(createErrorResponse('Failed to get user status'));
  }
}));

// Test endpoint to test email sending
router.post('/send-test-email', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json(createErrorResponse('Not found'));
  }
  
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json(createErrorResponse('Email is required'));
  }
  
  try {
    // Import email service
    const { emailService } = await import('@/utils/emailService');
    
    // Test email connection first
    const connectionTest = await emailService.testConnection();
    
    if (!connectionTest) {
      return res.status(500).json(createErrorResponse('Email service connection failed'));
    }
    
    // Send test verification email
    const testToken = crypto.randomBytes(32).toString('hex');
    const emailSent = await emailService.sendVerificationEmail(email, 'Test User', testToken);
    
    res.json(createSuccessResponse({
      emailSent,
      connectionTest,
      testToken
    }, `Test email ${emailSent ? 'sent successfully' : 'failed to send'} to ${email}`));
    
  } catch (error) {
    console.error('Test email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json(createErrorResponse(`Failed to send test email: ${errorMessage}`));
  }
}));

// Test endpoint to generate password reset token
router.post('/generate-reset-token', asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json(createErrorResponse('Not found'));
  }
  
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json(createErrorResponse('Email is required'));
  }
  
  try {
    // Generate test token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    
    // Update user with test token
    const result = await User.updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          passwordResetToken: hashedResetToken,
          passwordResetExpires: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json(createErrorResponse('User not found'));
    }
    
    res.json(createSuccessResponse({
      resetToken,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      testResetCommand: `curl -X POST http://localhost:5000/api/v1/auth/reset-password -H "Content-Type: application/json" -d '{"token": "${resetToken}", "password": "NewStrongPass123!"}'`
    }, `Test reset token generated for ${email}`));
    
  } catch (error) {
    console.error('Generate reset token error:', error);
    res.status(500).json(createErrorResponse('Failed to generate reset token'));
  }
}));

export default router;