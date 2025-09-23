// Test script to verify complete signup and login flow
const testEmail = `test${Date.now()}@example.com`;
const testPassword = 'TestPassword123!';
const testName = 'Test User';

console.log('🧪 Starting complete authentication flow test...');
console.log('📧 Test email:', testEmail);

async function testSignupFlow() {
  try {
    console.log('\n1️⃣ Testing Signup...');
    
    const signupResponse = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword
      })
    });
    
    const signupData = await signupResponse.json();
    console.log('Signup Response:', signupData);
    
    if (!signupData.success) {
      throw new Error(`Signup failed: ${signupData.error}`);
    }
    
    console.log('✅ Signup successful!');
    return signupData;
    
  } catch (error) {
    console.error('❌ Signup failed:', error);
    throw error;
  }
}

async function testLoginFlow() {
  try {
    console.log('\n2️⃣ Testing Login...');
    
    const loginResponse = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    
    if (!loginData.success) {
      throw new Error(`Login failed: ${loginData.error}`);
    }
    
    console.log('✅ Login successful!');
    console.log('🎟️ Token received:', !!loginData.data.accessToken);
    
    return loginData;
    
  } catch (error) {
    console.error('❌ Login failed:', error);
    throw error;
  }
}

async function runCompleteTest() {
  try {
    const signupResult = await testSignupFlow();
    const loginResult = await testLoginFlow();
    
    console.log('\n🎉 Complete authentication flow test PASSED!');
    console.log('✅ User created:', signupResult.data.user.email);
    console.log('✅ Login successful:', loginResult.data.user.email);
    console.log('✅ Token generated:', !!loginResult.data.accessToken);
    
    // Test redirect by attempting to access a protected route
    console.log('\n3️⃣ Testing protected route access...');
    const token = loginResult.data.accessToken;
    
    const protectedResponse = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (protectedResponse.ok) {
      console.log('✅ Protected route access successful!');
    } else {
      console.log('⚠️ Protected route access failed');
    }
    
  } catch (error) {
    console.error('\n❌ Authentication flow test FAILED:', error);
  }
}

// Run the test
runCompleteTest();