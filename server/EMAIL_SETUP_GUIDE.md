# Email Verification Setup Guide

## Problem
Users are not receiving email verification emails after registration due to Gmail SMTP authentication failure.

## Current Error
```
535-5.7.8 Username and Password not accepted. For more information, go to
535 5.7.8  https://support.google.com/mail/?p=BadCredentials
```

## Root Cause
The Gmail SMTP password in the `.env` file is not valid for authentication. Gmail requires proper app passwords or OAuth2 for SMTP access.

## Solutions

### Option 1: Fix Gmail SMTP (Recommended)

1. **Enable 2-Step Verification** on your Google Account:
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Copy the 16-character app password

3. **Update .env file**:
   ```env
   SMTP_USER=hrushinath29@gmail.com
   SMTP_PASS=your-16-character-app-password
   ```

### Option 2: Use Ethereal Email (Development Only)

For development and testing, use Ethereal Email which provides fake SMTP:

1. **Update .env file**:
   ```env
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=generated-user@ethereal.email
   SMTP_PASS=generated-password
   ```

2. **Generate credentials**: Run the script below to get test credentials.

### Option 3: Use Alternative Email Services

Consider using dedicated email services like:
- **SendGrid**: More reliable for production
- **Mailgun**: Good developer experience
- **Amazon SES**: Cost-effective for high volume

## Quick Fix Script

I've created a script to help you set up email configuration: