#!/usr/bin/env node

/**
 * Test the deployed API to see what IDs are actually being returned
 */

const https = require('https');

function testApiResponse() {
  const options = {
    hostname: 'rishi4ammu-6wtbaz1he-hrushinath-appifys-projects.vercel.app',
    path: '/api/diary',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // You'll need to add your session cookie here
      'Cookie': 'your-session-cookie-here'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('API Response Status:', res.statusCode);
        console.log('Response Data:');
        console.log(JSON.stringify(response, null, 2));
        
        if (response.data && response.data.entries) {
          console.log('\n📋 Entry IDs:');
          response.data.entries.forEach((entry, index) => {
            console.log(`${index + 1}. ID: ${entry._id || entry.id}`);
            console.log(`   Length: ${(entry._id || entry.id).length} characters`);
            console.log(`   Valid ObjectId: ${/^[0-9a-fA-F]{24}$/.test(entry._id || entry.id) ? '✅' : '❌'}`);
          });
        }
      } catch (error) {
        console.log('Raw response:', data);
        console.error('Error parsing JSON:', error.message);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request error:', error.message);
  });

  req.end();
}

console.log('🧪 Testing API response...');
console.log('Note: This will fail without proper authentication cookies');
testApiResponse();
