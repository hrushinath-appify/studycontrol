// Manual user verification for testing
const mongoose = require('mongoose');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // Connect to database
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // User Schema (simplified for testing)
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      isEmailVerified: Boolean,
      emailVerificationToken: String,
      emailVerificationExpires: Date,
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Find and verify user
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.json({ 
        success: true, 
        message: 'User is already verified',
        user: { email: user.email, verified: user.isEmailVerified }
      });
    }

    // Manually verify the user
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return res.json({
      success: true,
      message: 'User manually verified for testing',
      user: { email: user.email, verified: user.isEmailVerified }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({ 
      error: 'Failed to verify user',
      details: error.message 
    });
  }
};