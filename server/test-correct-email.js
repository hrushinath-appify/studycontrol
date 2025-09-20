const fetch = require('node-fetch');

async function testCorrectEmail() {
  console.log('=== Testing Password Reset with Correct Email ===');
  
  const correctUserEmail = 'hrushinath143@gmail.com'; // This is the actual user in database
  const backendUrl = 'http://localhost:5000';
  
  console.log('Testing forgot password for CORRECT email:', correctUserEmail);
  
  try {
    const response = await fetch(`${backendUrl}/api/v1/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: correctUserEmail }),
    });

    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Password reset should work now!');
      console.log('📧 Check your email inbox for the reset link');
    } else {
      console.log('❌ Still having issues');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCorrectEmail();