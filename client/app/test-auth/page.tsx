'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthTestPage() {
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const [loginForm, setLoginForm] = useState({
    email: 'hrushinath29@gmail.com',
    password: 'Chinnu@1'
  })
  
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const log = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setResults(prev => [...prev, `[${timestamp}] ${message}`])
  }

  const testEnvironment = async () => {
    setLoading(true)
    log('🧪 Testing environment variables...')
    
    try {
      const response = await fetch('/api/env-check')
      const data = await response.json()
      
      if (response.ok) {
        log(`✅ Environment check: ${JSON.stringify(data.environment)}`)
      } else {
        log(`❌ Environment check failed: ${data.error}`)
      }
    } catch (error) {
      log(`❌ Environment check error: ${error}`)
    }
    
    setLoading(false)
  }

  const testLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      log('❌ Please fill email and password')
      return
    }
    
    setLoading(true)
    log(`🔐 Testing login for: ${loginForm.email}`)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(loginForm)
      })
      
      const data = await response.json()
      
      log(`📊 Response status: ${response.status}`)
      log(`📋 Response data: ${JSON.stringify(data, null, 2)}`)
      
      if (response.ok) {
        log(`✅ Login successful!`)
        log(`🎟️ Token received: ${!!data.data.accessToken}`)
        log(`👤 User: ${data.data.user.name} (${data.data.user.email})`)
        
        // Store token
        if (data.data.accessToken) {
          localStorage.setItem('auth-token', data.data.accessToken)
          log(`💾 Token stored in localStorage`)
        }
        
        log(`🎉 AUTHENTICATION SUCCESSFUL - READY TO REDIRECT!`)
        
      } else {
        log(`❌ Login failed: ${data.error}`)
      }
    } catch (error) {
      log(`❌ Login error: ${error}`)
    }
    
    setLoading(false)
  }

  const testSignup = async () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password) {
      log('❌ Please fill all signup fields')
      return
    }
    
    setLoading(true)
    log(`🔨 Testing signup for: ${signupForm.email}`)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupForm)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        log(`✅ Signup successful: ${data.data.user.email}`)
        log(`📧 User verified: ${data.data.user.isEmailVerified}`)
        setLoginForm({ 
          email: signupForm.email, 
          password: signupForm.password 
        })
      } else {
        log(`❌ Signup failed: ${data.error}`)
      }
    } catch (error) {
      log(`❌ Signup error: ${error}`)
    }
    
    setLoading(false)
  }

  const clearResults = () => setResults([])

  const redirectToHome = () => {
    log('🏠 Redirecting to home page...')
    window.location.href = '/home'
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>🧪 Authentication Flow Test</CardTitle>
          <CardDescription>
            Test the complete signup and login flow to debug authentication issues
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Check</CardTitle>
            <CardDescription>Verify environment variables</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={testEnvironment} disabled={loading} className="w-full">
              Test Environment Variables
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Signup</CardTitle>
            <CardDescription>Create a new user account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Full Name"
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
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Test Login</CardTitle>
          <CardDescription>Test login with existing credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Button onClick={testLogin} disabled={loading} className="flex-1">
              Test Login
            </Button>
            <Button variant="outline" onClick={redirectToHome} className="flex-1">
              Go to Home
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Test Results</CardTitle>
          <Button variant="outline" size="sm" onClick={clearResults}>
            Clear
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm max-h-96 overflow-y-auto">
            {results.length === 0 ? (
              <div className="text-gray-500">No test results yet. Run a test to see output.</div>
            ) : (
              results.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="animate-spin h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <div>Running test...</div>
          </div>
        </div>
      )}
    </div>
  )
}