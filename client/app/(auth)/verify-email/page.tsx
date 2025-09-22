'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail, RefreshCw, AlertCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  // Handler functions to avoid arrow functions in JSX
  const handleBackToRegister = useCallback(() => router.push('/signup'), [router]);
  const handleContinueToLogin = useCallback(() => router.push('/login'), [router]);
  const handleBackToLogin = useCallback(() => router.push('/login'), [router]);

  const verifyEmail = useCallback(async (verificationToken: string) => {
    setStatus('verifying');
    
    try {
      const response = await fetch('/api/v1/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: verificationToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Your email has been verified successfully! Redirecting to login...');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login?verified=true');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || 'Verification failed. The link may have expired.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  }, [router]);

  const resendVerificationEmail = useCallback(async () => {
    if (!email || !canResend) return;

    setIsResending(true);
    setCanResend(false);
    setResendCooldown(60); // 60 second cooldown

    try {
      const response = await fetch('/api/v1/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Verification email sent! Please check your inbox and spam folder.');
        setIsResending(false);
      } else {
        setMessage(data.message || 'Failed to resend verification email.');
        setIsResending(false);
        setStatus('error');
        setCanResend(true);
        setResendCooldown(0);
      }
    } catch {
      setMessage('Network error. Please try again.');
      setIsResending(false);
      setStatus('error');
      setCanResend(true);
      setResendCooldown(0);
    }
  }, [email, canResend]);

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }

    // If there's a token in the URL, automatically verify it
    if (token) {
      verifyEmail(token);
    }
  }, [token, emailParam, verifyEmail]);

  useEffect(() => {
    // Cooldown timer for resend button
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
    return undefined;
  }, [resendCooldown]);

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />;
      case 'error':
        return <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />;
      case 'verifying':
        return <RefreshCw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />;
      default:
        return <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'verifying':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className={`w-full max-w-md ${getStatusColor()}`}>
        <CardHeader className="text-center">
          {getStatusIcon()}
          <CardTitle className="text-2xl font-bold">
            {status === 'success' ? 'Email Verified!' : 
             status === 'verifying' ? 'Verifying...' :
             status === 'error' ? 'Verification Failed' :
             'Verify Your Email'}
          </CardTitle>
          <CardDescription>
            {status === 'success' ? 'Your account is now active' :
             status === 'verifying' ? 'Please wait while we verify your email' :
             status === 'error' ? 'There was a problem with verification' :
             'Check your email for the verification link'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {message && (
            <Alert className={status === 'error' ? 'border-red-200 bg-red-50' : 'border-blue-200 bg-blue-50'}>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          {status === 'idle' && (
            <>
              <div className="text-center text-gray-600">
                <p className="mb-4">
                  We&apos;ve sent a verification link to your email address.
                  {email && (
                    <span className="block font-medium text-gray-800 mt-1">{email}</span>
                  )}
                </p>
                <p className="text-sm">
                  Please check your inbox and spam folder, then click the verification link to activate your account.
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-600 mb-3">
                  Didn&apos;t receive the email?
                </p>
                <Button
                  onClick={resendVerificationEmail}
                  disabled={!canResend || isResending}
                  className="w-full"
                  variant="outline"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : canResend ? (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Resend Verification Email
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend in {resendCooldown}s
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          {status === 'error' && !token && (
            <div className="space-y-3">
              <Button
                onClick={resendVerificationEmail}
                disabled={!canResend || !email}
                className="w-full"
                variant="outline"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Resend Verification Email
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleBackToRegister}
                className="w-full"
                variant="ghost"
              >
                Back to Registration
              </Button>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <Button
                onClick={handleContinueToLogin}
                className="w-full"
              >
                Continue to Login
              </Button>
            </div>
          )}

          <div className="text-center border-t pt-4">
            <Button
              onClick={handleBackToLogin}
              variant="ghost"
              className="text-sm"
            >
              Already verified? Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}