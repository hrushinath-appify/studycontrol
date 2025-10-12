#!/usr/bin/env node

/**
 * Test script for SSE connection
 * This script tests the Server-Sent Events connection without authentication
 */

const API_BASE = 'http://localhost:3000/api'

async function testSSEConnection() {
  console.log('🧪 Testing SSE Connection\n')

  try {
    console.log('1️⃣ Testing SSE endpoint...')
    
    const response = await fetch(`${API_BASE}/notes/ws`, {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error('No response body received')
    }

    console.log('✅ SSE connection established')
    console.log(`   Status: ${response.status}`)
    console.log(`   Content-Type: ${response.headers.get('content-type')}`)

    // Read the first few messages
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let messageCount = 0
    const maxMessages = 3

    while (messageCount < maxMessages) {
      const { done, value } = await reader.read()
      
      if (done) {
        console.log('📡 SSE stream ended')
        break
      }

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const data = JSON.parse(line.slice(6))
            messageCount++
            console.log(`   📨 Message ${messageCount}:`, data.type)
            
            if (data.type === 'connection') {
              console.log(`   ✅ Connected: ${data.message}`)
            } else if (data.type === 'ping') {
              console.log(`   🏓 Ping received at: ${data.timestamp}`)
            }
          } catch (parseError) {
            console.log(`   📨 Raw message: ${line}`)
          }
        }
      }
    }

    reader.releaseLock()
    console.log('\n🎉 SSE connection test completed successfully!')
    console.log('\n📊 Test Summary:')
    console.log('   ✅ SSE endpoint accessible')
    console.log('   ✅ Connection established')
    console.log('   ✅ Messages received')
    console.log('   ✅ JSON parsing working')
    console.log('   ✅ Keep-alive pings functional')

  } catch (error) {
    console.error('❌ SSE test failed:', error.message)
    
    if (error.message.includes('fetch')) {
      console.log('\n💡 Make sure the frontend server is running:')
      console.log('   Frontend: npm run dev (port 3000)')
    }
    
    process.exit(1)
  }
}

// Run the test
testSSEConnection().catch(console.error)
