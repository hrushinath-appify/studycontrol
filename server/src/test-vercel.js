// Simple test function for Vercel
module.exports = (req, res) => {
  console.log('🔍 Test handler called:', req.method, req.url);
  
  try {
    // Basic response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
      success: true,
      message: 'Test handler working',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    });
  } catch (error) {
    console.error('❌ Test handler error:', error);
    res.status(500).json({
      success: false,
      message: 'Test handler failed',
      error: String(error)
    });
  }
};