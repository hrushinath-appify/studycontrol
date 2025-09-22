// Simple email test endpoint to check nodemailer methods
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const nodemailer = require('nodemailer');
    
    return res.json({
      success: true,
      nodemailerType: typeof nodemailer,
      nodemailerKeys: Object.keys(nodemailer),
      hasCreateTransporter: typeof nodemailer.createTransporter,
      nodemailerMethods: Object.getOwnPropertyNames(nodemailer),
      nodemailerProto: Object.getPrototypeOf(nodemailer)
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};