# 📧 📱 Email & SMS Notifications Setup Guide

This guide will help you set up email and SMS notifications for your TurfBook application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Email Setup (Nodemailer)](#email-setup)
3. [SMS Setup (Twilio)](#sms-setup)
4. [Environment Variables](#environment-variables)
5. [Testing Notifications](#testing-notifications)
6. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The notification system sends alerts to turf owners when:
- **New booking request** is received (Email + SMS)
- **Booking is approved/rejected** (Email + SMS to customer)

### Features:
✅ Beautiful HTML email templates  
✅ SMS notifications via Twilio  
✅ Non-blocking (async) - won't slow down bookings  
✅ Graceful error handling - notifications won't break booking flow  
✅ Support for multiple SMS providers (Twilio, MSG91, Fast2SMS)

---

## 📧 Email Setup (Nodemailer)

### Option 1: Gmail (Recommended for Testing)

#### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Settings](https://myaccount.google.com/security)
2. Enable **2-Step Verification**

#### Step 2: Generate App Password
1. Visit [App Passwords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Other (Custom name)**
3. Enter "TurfBook" as the name
4. Click **Generate**
5. Copy the 16-character password (it looks like: `xxxx xxxx xxxx xxxx`)

#### Step 3: Add to .env.local
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # The app password from step 2
```

### Option 2: SendGrid (Recommended for Production)

#### Step 1: Create SendGrid Account
1. Sign up at [SendGrid](https://signup.sendgrid.com/)
2. Free tier includes 100 emails/day

#### Step 2: Generate API Key
1. Go to **Settings** → **API Keys**
2. Create a new API key with **Mail Send** permission
3. Copy the API key

#### Step 3: Add to .env.local
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=your_sendgrid_api_key
```

### Option 3: Other Email Providers

**Mailgun:**
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your_username
EMAIL_PASSWORD=your_password
```

**Amazon SES:**
```env
EMAIL_HOST=email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=your_smtp_username
EMAIL_PASSWORD=your_smtp_password
```

---

## 📱 SMS Setup (Twilio)

### Step 1: Create Twilio Account

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Free trial includes $15 credit
3. Verify your phone number during signup

### Step 2: Get Your Credentials

1. Go to [Twilio Console](https://console.twilio.com/)
2. Copy your **Account SID** and **Auth Token**
3. Get a phone number:
   - Go to **Phone Numbers** → **Manage** → **Buy a number**
   - Or use the trial number provided

### Step 3: Add to .env.local

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio number
```

### Important Notes:
- **Trial Account Limitations:**
  - Can only send to verified phone numbers
  - Messages include "Sent from a Twilio trial account"
  - $15 free credit

- **Verified Numbers:**
  - Add numbers at: [Verified Caller IDs](https://console.twilio.com/us1/develop/phone-numbers/manage/verified)

---

## 🌍 Alternative SMS Providers (India)

### MSG91 (Popular in India)

1. Sign up at [MSG91](https://msg91.com/)
2. Get your Auth Key from dashboard
3. Uncomment MSG91 code in `/lib/sms.ts`

```env
MSG91_AUTH_KEY=your_auth_key
MSG91_SENDER_ID=TURFBK
```

### Fast2SMS

1. Sign up at [Fast2SMS](https://www.fast2sms.com/)
2. Get your API key

```env
FAST2SMS_API_KEY=your_api_key
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root:

```bash
cp .env.example .env.local
```

### Required Variables:

```env
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Optional: Toggle notifications
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_SMS_NOTIFICATIONS=true
```

---

## 🧪 Testing Notifications

### 1. Install Dependencies

```bash
npm install nodemailer twilio
# or
yarn add nodemailer twilio
```

### 2. Test Email Configuration

Create a test file `test-email.js`:

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_app_password',
  },
});

transporter.sendMail({
  from: '"Test" <your_email@gmail.com>',
  to: 'test_recipient@example.com',
  subject: 'Test Email',
  text: 'If you receive this, your email setup is working!',
})
.then(() => console.log('✅ Email sent successfully!'))
.catch((err) => console.error('❌ Error:', err));
```

Run: `node test-email.js`

### 3. Test SMS Configuration

Create a test file `test-sms.js`:

```javascript
const twilio = require('twilio');

const client = twilio(
  'your_account_sid',
  'your_auth_token'
);

client.messages.create({
  body: 'Test SMS from TurfBook!',
  from: '+1234567890',
  to: '+91xxxxxxxxxx',  // Your verified number
})
.then((message) => console.log('✅ SMS sent:', message.sid))
.catch((err) => console.error('❌ Error:', err));
```

Run: `node test-sms.js`

### 4. Test in Application

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Create a test booking through the UI

3. Check console logs for notification status:
   ```
   ✅ Email notification sent to owner
   ✅ SMS notification sent to owner
   ```

4. Check your email inbox and phone

---

## 🔧 Troubleshooting

### Email Issues

**Problem:** "Invalid login: 535 Authentication failed"
- **Solution:** 
  - Make sure 2FA is enabled on Google account
  - Use App Password, not your regular password
  - Remove spaces from app password in .env file

**Problem:** "Connection timeout"
- **Solution:**
  - Check firewall settings
  - Try different ports: 587, 465, or 25
  - Set `EMAIL_SECURE=true` for port 465

**Problem:** Emails go to spam
- **Solution:**
  - Use a professional email service (SendGrid, Mailgun)
  - Set up SPF and DKIM records
  - Include unsubscribe link

### SMS Issues

**Problem:** "Invalid phone number"
- **Solution:**
  - Use E.164 format: `+91xxxxxxxxxx`
  - Remove spaces, dashes, or parentheses
  - Include country code

**Problem:** "Unable to create record"
- **Solution:**
  - Verify the recipient number in Twilio console (trial account)
  - Check your Twilio balance
  - Ensure phone number is not blocked

**Problem:** SMS not received
- **Solution:**
  - Check Twilio logs in console
  - Verify phone number format
  - Check if number can receive SMS
  - Try with a different number

---

## 📊 Monitoring

### Check Notification Logs

In your server console, you'll see:
```
13. Booking created successfully, sending notifications...
✅ Email notification sent to owner
✅ SMS notification sent to owner
14. Notifications processing completed
```

### Twilio Dashboard
- View SMS logs: [Twilio Console](https://console.twilio.com/us1/monitor/logs/sms)
- Check delivery status
- Monitor costs

### Email Logs
- Gmail: Check "Sent" folder
- SendGrid: Dashboard → Activity Feed
- Mailgun: Dashboard → Logs

---

## 💰 Cost Estimates

### Email (Free Options):
- **Gmail**: Free (limited to ~500 emails/day)
- **SendGrid**: Free tier - 100 emails/day
- **Mailgun**: Free tier - 100 emails/day

### SMS:
- **Twilio**: $15 free credit, then ~₹0.50-₹1.50 per SMS
- **MSG91**: Starting at ₹0.15 per SMS
- **Fast2SMS**: Starting at ₹0.10 per SMS

---

## 🎉 You're All Set!

Your notification system is now configured! Test it by:
1. Creating a booking as a customer
2. Checking owner's email and phone
3. Approving/rejecting the booking
4. Checking customer's email and phone

Need help? Check the troubleshooting section or contact support!
