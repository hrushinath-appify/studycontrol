const { default: fetch } = require('node-fetch');

async function testLogin() {
  try {
    console.log('Testing login endpoint locally...');
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'hrushinath29@gmail.com',
        password: '123456'
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers));
    
    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ Login test successful!');
    } else {
      console.log('❌ Login test failed');
    }
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testLogin();