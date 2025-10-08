# 🚀 Quick Start: Email & SMS Notifications

## 📦 Installation

```bash
npm install nodemailer twilio
# or
yarn add nodemailer twilio
```

## ⚙️ Configuration

### 1. Copy Environment Template

```bash
cp .env.example .env.local
```

### 2. Configure Email (Gmail - Easiest for Testing)

1. **Enable 2FA** on your Google account: https://myaccount.google.com/security
2. **Generate App Password**: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other"
   - Name it "TurfBook"
   - Copy the 16-character password

3. **Add to .env.local:**
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # App password from step 2
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configure SMS (Twilio - Optional)

1. **Sign up**: https://www.twilio.com/try-twilio (Free $15 credit)
2. **Get credentials** from https://console.twilio.com/
3. **Get a phone number** (or use trial number)

4. **Add to .env.local:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
```

**Note:** During Twilio trial, you can only send to verified phone numbers. Verify at: https://console.twilio.com/us1/develop/phone-numbers/manage/verified

## 🧪 Test It

```bash
npm run dev
```

1. **Create a booking** through the customer UI
2. **Check turf owner's email** - Should receive notification
3. **Check turf owner's phone** (if SMS configured) - Should receive SMS
4. **Approve/Reject** the booking from owner dashboard
5. **Check customer's email & phone** - Should receive status update

## 📋 What Gets Sent

### Owner Receives (on new booking):
- ✉️ **Email**: Beautiful HTML email with booking details
- 📱 **SMS**: Short text with customer info and booking link

### Customer Receives (on approval/rejection):
- ✉️ **Email**: Booking confirmation or rejection notice
- 📱 **SMS**: Quick status update

## 🎨 Email Templates

Emails include:
- Professional HTML design
- All booking details
- Customer information
- Payment verification reminder
- Direct link to dashboard
- Responsive design

## 🔧 Troubleshooting

### Email not working?
- ✅ Check you're using **App Password**, not regular password
- ✅ 2FA must be enabled on Gmail
- ✅ Check spam folder
- ✅ Remove spaces from app password in .env file

### SMS not working?
- ✅ Trial account can only send to verified numbers
- ✅ Phone must be in E.164 format: `+91xxxxxxxxxx`
- ✅ Check Twilio console for error logs

### Notifications not being sent?
- ✅ Check server console for error messages
- ✅ Ensure .env.local file exists and has correct values
- ✅ Restart dev server after changing .env.local

## 💡 Tips

1. **Testing without SMS**: Comment out SMS lines in booking API - emails will still work
2. **Free alternatives**: SendGrid (100 emails/day free), Mailgun (100 emails/day free)
3. **Production**: Use professional email service (SendGrid, Mailgun, AWS SES)
4. **SMS alternatives**: MSG91 (India), Fast2SMS (India) - cheaper than Twilio

## 📚 Full Documentation

See [NOTIFICATIONS_SETUP.md](./NOTIFICATIONS_SETUP.md) for detailed setup instructions.

## 🆘 Need Help?

Check the [Troubleshooting section](./NOTIFICATIONS_SETUP.md#troubleshooting) in the full documentation.
