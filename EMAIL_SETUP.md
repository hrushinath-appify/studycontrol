# 📧 Email Service Setup Guide

## Overview

StudyControl requires email functionality for:
- ✅ Email verification during registration
- ✅ Password reset requests
- ✅ Important account notifications

This guide will help you set up email service in under 5 minutes.

---

## 🚀 Quick Setup

### Step 1: Install Required Package

```bash
cd client
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 2: Choose an Email Provider

Pick one of the following providers (all have free tiers):

| Provider | Free Tier | Setup Difficulty | Recommended For |
|----------|-----------|------------------|-----------------|
| **Gmail** | 500 emails/day | ⭐ Easy | Development & Testing |
| **SendGrid** | 100 emails/day | ⭐⭐ Medium | Production |
| **Mailgun** | 5,000 emails/month | ⭐⭐ Medium | Production |
| **Amazon SES** | 62,000 emails/month* | ⭐⭐⭐ Hard | Large Scale |

*Free with AWS Free Tier

---

## 📮 Provider-Specific Setup

### Option 1: Gmail (Easiest - Development)

**Perfect for development and testing**

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification"

#### Step 2: Generate App Password
1. Go to [App Passwords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Other (Custom name)"
3. Name it "StudyControl"
4. Copy the generated 16-character password

#### Step 3: Configure Environment Variables

Add to `client/.env.local`:

```bash
# Gmail SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password

EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=StudyControl
```

**⚠️ Important:** Use the App Password, NOT your regular Gmail password!

---

### Option 2: SendGrid (Production Recommended)

**Great for production with excellent deliverability**

#### Step 1: Sign Up
1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account (100 emails/day)
3. Verify your email address

#### Step 2: Create API Key
1. Go to Settings → [API Keys](https://app.sendgrid.com/settings/api_keys)
2. Click "Create API Key"
3. Choose "Full Access" or "Restricted Access" (Mail Send only)
4. Copy the API key (shown only once!)

#### Step 3: Verify Sender Identity
1. Go to Settings → [Sender Authentication](https://app.sendgrid.com/settings/sender_auth)
2. Choose "Single Sender Verification" (easiest)
3. Add your email and verify it

#### Step 4: Configure Environment Variables

Add to `client/.env.local`:

```bash
# SendGrid SMTP Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key

EMAIL_FROM=your-verified-email@domain.com
EMAIL_FROM_NAME=StudyControl
```

**Note:** The username is literally "apikey", and password is your API key.

---

### Option 3: Mailgun

**Great for developers, powerful API**

#### Step 1: Sign Up
1. Go to [Mailgun](https://www.mailgun.com/)
2. Sign up for free account
3. Verify your email

#### Step 2: Get SMTP Credentials
1. Go to Sending → [Domain Settings](https://app.mailgun.com/app/sending/domains)
2. Click on your sandbox domain
3. Find "SMTP Credentials" section
4. Note the username and password

#### Step 3: Configure Environment Variables

Add to `client/.env.local`:

```bash
# Mailgun SMTP Configuration
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@your-sandbox-domain.mailgun.org
SMTP_PASS=your-mailgun-password

EMAIL_FROM=noreply@your-domain.com
EMAIL_FROM_NAME=StudyControl
```

---

### Option 4: Outlook/Microsoft 365

**Good if you have Office 365**

#### Step 1: Enable SMTP Authentication
1. Go to [Outlook Security](https://outlook.live.com/owa/?path=/options/security)
2. Enable "Less secure app access" if needed

#### Step 2: Configure Environment Variables

Add to `client/.env.local`:

```bash
# Outlook SMTP Configuration
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password

EMAIL_FROM=your-email@outlook.com
EMAIL_FROM_NAME=StudyControl
```

---

## ✅ Testing Your Configuration

### Test 1: Start the Application

```bash
cd client
npm run dev
```

Check the console output:
- ✅ "Email service initialized successfully" - Perfect!
- ⚠️  "Email service not configured" - Check your .env.local file

### Test 2: Register a New User

1. Navigate to http://localhost:3000/signup
2. Fill in the registration form
3. Submit

**What to expect:**
- ✅ Email sent successfully → Check your inbox!
- ⚠️  Email not sent → Check console logs for errors

### Test 3: Verify Email Delivery

Check your email inbox for:
- Subject: "✅ Verify Your Email - StudyControl"
- From: Your configured EMAIL_FROM_NAME
- Content: Beautiful HTML email with verification link

---

## 🔧 Troubleshooting

### Problem: "Email service not configured"

**Solution:**
1. Check that all SMTP variables are in `client/.env.local`
2. Restart the dev server (`npm run dev`)
3. Variables must NOT have quotes around values

### Problem: "Authentication failed"

**Solutions:**

**For Gmail:**
- ✅ Use App Password, not regular password
- ✅ Enable 2-Factor Authentication first
- ✅ Check if "Less secure app access" is disabled (should be)

**For SendGrid:**
- ✅ Verify sender email address
- ✅ API key has "Mail Send" permission
- ✅ Username is literally "apikey"

**For Mailgun:**
- ✅ Using correct sandbox domain
- ✅ Password matches the one in dashboard

### Problem: "Connection timeout"

**Solutions:**
- ✅ Check firewall settings
- ✅ Try port 465 with `SMTP_SECURE=true`
- ✅ Verify internet connection

### Problem: Email goes to spam

**Solutions:**
- ✅ Verify sender domain with SPF/DKIM (production)
- ✅ Use verified email addresses
- ✅ Avoid spam trigger words in subject/content
- ✅ Consider using SendGrid or Mailgun for production

---

## 🎯 Development vs Production

### Development Setup
- Use Gmail or sandbox domains
- Email verification can be skipped
- Console logs show verification URLs
- 500 emails/day is plenty for testing

### Production Setup
- Use SendGrid, Mailgun, or Amazon SES
- Verify your domain (SPF, DKIM, DMARC)
- Monitor email deliverability
- Set up bounce/complaint handling
- Use transactional email templates

---

## 📝 Environment Variables Reference

### Required Variables

```bash
# SMTP Server
SMTP_HOST=smtp.example.com         # SMTP server hostname
SMTP_PORT=587                      # Usually 587 (TLS) or 465 (SSL)
SMTP_SECURE=false                  # true for 465, false for 587
SMTP_USER=your-username            # SMTP username or email
SMTP_PASS=your-password            # SMTP password or API key

# Sender Information
EMAIL_FROM=noreply@yourdomain.com  # Sender email address
EMAIL_FROM_NAME=StudyControl       # Sender name
```

### Optional Variables

```bash
# Base URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🔐 Security Best Practices

### 1. Never Commit Credentials
```bash
# Add to .gitignore (already done)
.env
.env.local
.env.*.local
```

### 2. Use Environment Variables
- ❌ Don't hardcode credentials in code
- ✅ Use process.env.SMTP_PASS
- ✅ Different credentials for dev/staging/prod

### 3. Rotate Credentials Regularly
- Change passwords every 90 days
- Revoke unused API keys
- Monitor for suspicious activity

### 4. Rate Limiting
- Implement rate limiting on email endpoints
- Prevent abuse and spam
- Monitor email send volume

---

## 📊 Email Service Status

The email service will gracefully degrade if not configured:

| Scenario | Behavior |
|----------|----------|
| SMTP configured correctly | ✅ Emails sent successfully |
| SMTP not configured | ⚠️  Logs verification URL to console |
| SMTP error | ⚠️  Logs error, shows URL in console |

**This means your app will work even without email configured!**

---

## 🎨 Email Templates

The email service includes beautiful, responsive HTML templates:

### Verification Email
- Modern gradient design
- Mobile-responsive
- Clear call-to-action button
- Expiration warning
- Fallback URL for copy-paste

### Password Reset Email
- Security-focused design
- 10-minute expiration
- Clear instructions
- Reassurance message

### Customization

To customize email templates, edit:
```
client/lib/email-service.ts
```

Look for the `html` variable in:
- `sendVerificationEmail()` method
- `sendPasswordResetEmail()` method

---

## 🚀 Next Steps

1. **Install nodemailer:**
   ```bash
   cd client
   npm install nodemailer @types/nodemailer
   ```

2. **Choose a provider** (Gmail for quick start)

3. **Configure .env.local** with SMTP settings

4. **Test registration** and check for emails

5. **Optional:** Set up custom domain for production

---

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid Documentation](https://docs.sendgrid.com/)
- [Mailgun Documentation](https://documentation.mailgun.com/)
- [Email Best Practices](https://sendgrid.com/blog/email-best-practices/)

---

## ✨ Summary

**For Development:** Use Gmail with App Password (5 minutes setup)

**For Production:** Use SendGrid or Mailgun (15 minutes setup)

**Remember:**
- ✅ Install `nodemailer` and `@types/nodemailer`
- ✅ Configure SMTP settings in `.env.local`
- ✅ Restart dev server after changing env variables
- ✅ Test with real email registration

**Need help?** Check the troubleshooting section or console logs!

---

*Last Updated: October 12, 2025*  
*Status: Email Service Ready ✅*
