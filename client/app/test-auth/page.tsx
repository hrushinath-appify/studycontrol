'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/components/AuthProvider'

export default function AuthTestPage() {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  })
  
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  
  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    setResults(prev => [...prev, logMessage])
    console.log(logMessage)
  }
  
  const clearResults = () => {
    setResults([])
  }
  
  const testEnvironment = async () => {
    log('🧪 Testing environment...')
    
    try {
      const response = await fetch('/api/env-check')
      const data = await response.json()
      
      log(`📊 Environment check status: ${response.status}`)
      log(`📋 MongoDB connected: ${data.dbConnected}`)
      log(`🔑 JWT configured: ${data.jwtConfigured}`)
      log(`🌍 Environment: ${data.environment}`)
      
    } catch (error) {
      log(`❌ Environment check error: ${error}`)
    }
  }
  
  const testSignup = async () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      log('❌ Please fill all signup fields')
      return
    }
    
    setLoading(true)
    log(`📝 Testing signup for: ${signupForm.name} (${signupForm.email})`)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(signupForm)
      })
      
      const data = await response.json()
      
      log(`📊 Response status: ${response.status}`)
      log(`📋 Response data: ${JSON.stringify(data, null, 2)}`)
      
      if (response.ok) {
        log(`✅ Signup successful!`)
        log(`👤 User created: ${data.data.user.name} (${data.data.user.email})`)
        log(`🎟️ Token received: ${!!data.data.accessToken}`)
        
        // Auto-fill login form
        setLoginForm({
          email: signupForm.email,
          password: signupForm.password
        })
        log(`📋 Login form auto-filled`)
        
      } else {
        log(`❌ Signup failed: ${data.error}`)
      }
    } catch (error) {
      log(`❌ Signup error: ${error}`)
    }
    
    setLoading(false)
  }
  
  const testDirectLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      log('❌ Please fill email and password')
      return
    }
    
    setLoading(true)
    log(`🔐 Testing DIRECT login for: ${loginForm.email}`)
    log(`🔐 Password length: ${loginForm.password.length}`)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginForm)
      })
      
      log(`📊 Response status: ${response.status}`)
      log(`📊 Response headers: ${JSON.stringify([...response.headers.entries()])}`)
      
      const data = await response.json()
      log(`📋 Response data: ${JSON.stringify(data, null, 2)}`)
      
      if (response.ok) {
        log(`✅ DIRECT Login successful!`)
        log(`🎟️ Token received: ${!!data.data.accessToken}`)
        log(`👤 User: ${data.data.user.name} (${data.data.user.email})`)
        
        // Store token
        if (data.data.accessToken) {
          localStorage.setItem('auth-token', data.data.accessToken)
          log(`💾 Token stored in localStorage`)
        }
        
        log(`🎉 DIRECT AUTHENTICATION SUCCESSFUL!`)
        
      } else {
        log(`❌ DIRECT Login failed with status ${response.status}`)
        log(`❌ Error: ${data.error || 'Unknown error'}`)
        log(`❌ Full response: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      log(`❌ DIRECT Login error: ${error}`)
      log(`❌ Error type: ${typeof error}`)
      log(`❌ Error details: ${JSON.stringify(error)}`)
    }
    
    setLoading(false)
  }
  
  const testAuthProviderLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      log('❌ Please fill email and password')
      return
    }
    
    setLoading(true)
    log(`🔐 Testing AUTHPROVIDER login for: ${loginForm.email}`)
    log(`🔐 Password length: ${loginForm.password.length}`)
    
    try {
      log(`🚀 Calling auth.login()...`)
      await login(loginForm.email, loginForm.password)
      log(`✅ AUTHPROVIDER Login completed successfully!`)
      
    } catch (error) {
      log(`❌ AUTHPROVIDER Login error: ${error}`)
      log(`❌ Error type: ${typeof error}`)
      log(`❌ Error message: ${error instanceof Error ? error.message : 'Unknown'}`)
    }
    
    setLoading(false)
  }
  
  const redirectToHome = () => {
    log('🏠 Redirecting to /home...')
    window.location.href = '/home'
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🧪 Authentication Test Suite</CardTitle>
            <CardDescription>
              Test authentication flow with detailed logging
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Environment Check */}
            <div>
              <h3 className="font-semibold mb-3">🌍 Environment Check</h3>
              <Button onClick={testEnvironment} disabled={loading} className="w-full">
                Check Environment
              </Button>
            </div>
            
            {/* Signup Test */}
            <div>
              <h3 className="font-semibold mb-3">📝 Test Signup</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                />
                <Button onClick={testSignup} disabled={loading} className="w-full">
                  Test Signup
                </Button>
              </div>
            </div>
            
            {/* Login Tests */}
            <div>
              <h3 className="font-semibold mb-3">🔐 Test Login</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                />
                <div className="flex gap-2">
                  <Button onClick={testDirectLogin} disabled={loading} className="flex-1">
                    Direct API Test
                  </Button>
                  <Button onClick={testAuthProviderLogin} disabled={loading} className="flex-1">
                    AuthProvider Test
                  </Button>
                </div>
                <Button variant="outline" onClick={redirectToHome} className="w-full">
                  🏠 Go to Home (if authenticated)
                </Button>
              </div>
            </div>
            
            {/* Results */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">📋 Test Results</h3>
                <Button variant="outline" size="sm" onClick={clearResults}>
                  Clear
                </Button>
              </div>
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="text-gray-500">No tests run yet...</div>
                ) : (
                  results.map((result, index) => (
                    <div key={index} className="mb-1">
                      {result}
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {loading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="p-6 text-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p>Testing authentication...</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}