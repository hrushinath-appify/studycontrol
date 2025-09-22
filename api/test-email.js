// Simple email test endpoint to check dependencies
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Check what's available in require.cache
    const availableModules = Object.keys(require.cache);
    
    // Try to require nodemailer
    let nodemailerStatus = 'not-available';
    let nodemailerError = null;
    
    try {
      const nodemailer = require('nodemailer');
      nodemailerStatus = typeof nodemailer;
      console.log('Nodemailer object:', nodemailer);
    } catch (error) {
      nodemailerError = error.message;
    }

    // Check if bcrypt is available
    let bcryptStatus = 'not-available';
    try {
      const bcrypt = require('bcryptjs');
      bcryptStatus = typeof bcrypt;
    } catch (error) {
      bcryptStatus = 'error: ' + error.message;
    }

    return res.json({
      success: true,
      dependencies: {
        nodemailer: nodemailerStatus,
        nodemailerError,
        bcrypt: bcryptStatus
      },
      environment: {
        nodeVersion: process.version,
        platform: process.platform,
        cwd: process.cwd(),
        moduleLoadPath: require.resolve.paths('nodemailer')
      },
      availableModulesCount: availableModules.length,
      sampleModules: availableModules.slice(0, 10)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};