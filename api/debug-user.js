// Debug endpoint to check user status
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Email parameter is required'
    });
  }

  try {
    // Import the users map from backend (this is a simplified approach)
    // In a real app, this would query the database
    
    // For now, let's return what we can based on the backend's in-memory storage
    // Since we can't directly access the users Map from another file, 
    // let's create a simple response for debugging

    return res.json({
      success: true,
      message: 'User debug info',
      requestedEmail: email,
      note: 'This is a debug endpoint. Users are stored in memory in the backend.js file.',
      suggestion: 'Check the verification link in your email or use the frontend verify-email page.'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};