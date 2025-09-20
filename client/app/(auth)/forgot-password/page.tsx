"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { BookOpen, Mail, ArrowLeft, CheckCircle, AlertCircle, Edit2 } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"
import { toast } from "@/lib/toast"
import { useDebounce } from "@/hooks/use-debounce"

interface ValidationState {
  isValid: boolean
  message: string
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [errors, setErrors] = useState<{ email?: string }>({})
  const [isValidating, setIsValidating] = useState(false)
  const [emailValidation, setEmailValidation] = useState<ValidationState>({ isValid: false, message: "" })
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0)
  const [attemptCount, setAttemptCount] = useState(0)
  
  const auth = useAuth()
  const router = useRouter()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const debouncedEmail = useDebounce(email, 500)

  // Constants for rate limiting
  const RATE_LIMIT_WINDOW = 60000 // 1 minute
  const MAX_ATTEMPTS = 3
  const COOLDOWN_PERIOD = 300000 // 5 minutes

  // Email validation function
  const validateEmail = (emailValue: string): ValidationState => {
    if (!emailValue.trim()) {
      return { isValid: false, message: "" }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailValue)) {
      return { isValid: false, message: "Please enter a valid email address" }
    }

    return { isValid: true, message: "Valid email address" }
  }

  // Check if user is rate limited
  const isRateLimited = (): boolean => {
    const now = Date.now()
    if (attemptCount >= MAX_ATTEMPTS) {
      const timeSinceLastAttempt = now - lastSubmitTime
      return timeSinceLastAttempt < COOLDOWN_PERIOD
    }
    return false
  }

  // Get remaining cooldown time
  const getRemainingCooldown = (): number => {
    const now = Date.now()
    const timeSinceLastAttempt = now - lastSubmitTime
    return Math.max(0, COOLDOWN_PERIOD - timeSinceLastAttempt)
  }

  // Format time for display
  const formatTime = (ms: number): string => {
    const minutes = Math.ceil(ms / 60000)
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`
  }

  // Effect for real-time email validation
  useEffect(() => {
    if (debouncedEmail) {
      setIsValidating(true)
      const validation = validateEmail(debouncedEmail)
      setEmailValidation(validation)
      setIsValidating(false)
      
      // Clear errors when valid
      if (validation.isValid && errors.email) {
        setErrors({})
      }
    } else {
      setEmailValidation({ isValid: false, message: "" })
      setErrors({})
    }
  }, [debouncedEmail, errors.email])

  // Focus email input on mount
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus()
    }
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    // Clear errors when user starts typing
    if (errors.email) {
      setErrors({})
    }
  }

  const handleBackToLogin = () => {
    router.push("/login")
  }

  const handleEditEmail = () => {
    setIsSubmitted(false)
    setEmail(submittedEmail)
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus()
      }
    }, 100)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Clear previous errors
    setErrors({})

    // Check rate limiting
    if (isRateLimited()) {
      const remaining = getRemainingCooldown()
      const timeString = formatTime(remaining)
      toast.error(
        "Too many attempts", 
        `Please wait ${timeString} before trying again`
      )
      return
    }

    // Validate email
    const validation = validateEmail(email)
    if (!validation.isValid) {
      const errorMessage = validation.message || "Please enter a valid email address"
      setErrors({ email: errorMessage })
      toast.error("Invalid email", errorMessage)
      return
    }

    // Track attempt
    const now = Date.now()
    if (now - lastSubmitTime > RATE_LIMIT_WINDOW) {
      // Reset attempt count if outside rate limit window
      setAttemptCount(1)
    } else {
      setAttemptCount(prev => prev + 1)
    }
    setLastSubmitTime(now)

    try {
      await auth.forgotPassword(email)
      setSubmittedEmail(email)
      setIsSubmitted(true)
      // Reset attempt count on success
      setAttemptCount(0)
    } catch (error) {
      // Enhanced error handling
      if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase()
        
        if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
          toast.error(
            "Connection error", 
            "Please check your internet connection and try again"
          )
          setErrors({ email: "Network error - please try again" })
        } else if (errorMessage.includes('timeout')) {
          toast.error(
            "Request timeout", 
            "The request took too long. Please try again"
          )
          setErrors({ email: "Request timeout - please try again" })
        } else if (errorMessage.includes('email') && errorMessage.includes('not found')) {
          // Don't show this error to prevent email enumeration
          // The backend already handles this properly by not revealing if email exists
          setSubmittedEmail(email)
          setIsSubmitted(true)
        } else if (errorMessage.includes('rate limit') || errorMessage.includes('too many')) {
          toast.error(
            "Too many requests", 
            "Please wait a few minutes before trying again"
          )
          setErrors({ email: "Too many requests - please wait" })
        } else {
          toast.error(
            "Request failed", 
            "Please try again or contact support if the problem persists"
          )
          setErrors({ email: "An error occurred - please try again" })
        }
      } else {
        toast.error(
          "Unexpected error", 
          "Please try again or contact support"
        )
        setErrors({ email: "An unexpected error occurred" })
      }
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex aspect-square size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Check your email</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  We&apos;ve sent password reset instructions to:
                </p>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{submittedEmail}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-transparent"
                      onClick={handleEditEmail}
                      aria-label="Edit email address"
                    >
                      <Edit2 className="size-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  If you don&apos;t see the email in your inbox, please check your spam folder.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  The reset link will expire in 10 minutes for security.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3">
            <Button 
              onClick={handleBackToLogin} 
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
            <Button 
              onClick={handleEditEmail}
              variant="ghost" 
              className="w-full text-sm"
            >
              Try a different email address
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
          <CardTitle className="text-2xl text-center">Forgot password?</CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    ref={emailInputRef}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    className={`pl-10 ${errors.email ? "border-destructive focus:border-destructive" : emailValidation.isValid && email ? "border-green-500 focus:border-green-500" : ""}`}
                    aria-describedby={errors.email ? "email-error" : emailValidation.message ? "email-validation" : undefined}
                    aria-invalid={!!errors.email}
                    required
                    autoComplete="email"
                    autoFocus
                  />
                  {isValidating && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>
                
                {/* Validation feedback */}
                {errors.email && (
                  <div id="email-error" className="flex items-center gap-2 text-sm text-destructive" role="alert">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
                
                {!errors.email && emailValidation.message && email && (
                  <div 
                    id="email-validation" 
                    className={`flex items-center gap-2 text-sm ${emailValidation.isValid ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}
                  >
                    {emailValidation.isValid ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    {emailValidation.message}
                  </div>
                )}
                
                {/* Rate limiting warning */}
                {attemptCount >= 2 && attemptCount < MAX_ATTEMPTS && (
                  <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                    <AlertCircle className="h-4 w-4" />
                    Warning: {MAX_ATTEMPTS - attemptCount} attempt{MAX_ATTEMPTS - attemptCount !== 1 ? 's' : ''} remaining before cooldown
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={auth.isLoading || !emailValidation.isValid || isRateLimited()}
              aria-describedby={isRateLimited() ? "rate-limit-info" : undefined}
            >
              {auth.isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Sending reset link...
                </>
              ) : (
                "Send reset link"
              )}
            </Button>
            
            {/* Rate limit information */}
            {isRateLimited() && (
              <div id="rate-limit-info" className="text-center text-sm text-destructive" role="alert">
                Too many attempts. Please wait {formatTime(getRemainingCooldown())} before trying again.
              </div>
            )}
            
            <div className="text-center">
              <Link 
                href="/login" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
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

