"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BookOpen, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import { toast } from "@/lib/toast"
import { API_CONFIG, API_ENDPOINTS } from "@/lib/constants"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      toast.error("Invalid reset link", "Please check your email for a valid reset link")
      router.push('/forgot-password')
      return
    }
    setToken(tokenParam)
  }, [searchParams, router])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      toast.error("Invalid reset token")
      return
    }

    // Validate password
    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.RESET_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        const errorMessage = data.error || 'Failed to reset password'
        toast.error("Password reset failed", errorMessage)
        
        // If token is invalid/expired, redirect to forgot password
        if (response.status === 400) {
          setTimeout(() => {
            router.push('/forgot-password')
          }, 2000)
        }
        return
      }
      
      toast.success("Password reset successful", "You can now login with your new password")
      setIsSuccess(true)
      
      // Redirect to login after success
      setTimeout(() => {
        router.push('/login')
      }, 3000)
      
    } catch {
      toast.error("Network error", "Please check your connection and try again")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                <CheckCircle className="size-6" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Password Reset Complete</CardTitle>
            <CardDescription className="text-center">
              Your password has been successfully reset. You can now login with your new password.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              onClick={() => router.push('/login')} 
              className="w-full"
            >
              Continue to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Invalid Reset Link</CardTitle>
            <CardDescription className="text-center">
              The password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button 
              onClick={() => router.push('/forgot-password')} 
              className="w-full"
            >
              Request New Reset Link
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="size-6" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Enter your new password below to complete the reset process.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showConfirmPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>Password must contain:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Resetting..." : "Reset Password"}
            </Button>
            
            <div className="text-center">
              <Link 
                href="/login" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}