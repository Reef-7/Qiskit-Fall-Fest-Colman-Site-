# Email and Calendar Integration Setup Guide

## Overview
The registration form now sends a confirmation email with an attached calendar event (ICS file) when users register using Gmail + Nodemailer.

## Setup Instructions

### 1. Get Gmail App Password
1. Enable 2-factor authentication on your Gmail account (if not already enabled)
2. Go to [Google Account Settings](https://myaccount.google.com/security)
3. Navigate to "Security" > "2-Step Verification"
4. Scroll down to "App passwords" section
5. Click on "App passwords"
6. Select "Mail" and "Other (Custom name)"
7. Enter a name like "Qiskit Fall Fest"
8. Click "Generate"
9. Copy the 16-character password (it will look like: `abcd efgh ijkl mnop`)

### 2. Configure Environment Variables
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Gmail credentials to `.env.local`:
   ```
   GMAIL_USER=your_gmail_address@gmail.com
   GMAIL_APP_PASSWORD=your_16_character_app_password
   ```

3. Make sure to remove any spaces from the app password (use: `abcdefghijklmnop` instead of `abcd efgh ijkl mnop`)

## How It Works

### API Route
- **Endpoint**: `/api/register` (POST)
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "institution": "University Name",
    "level": "beginner"
  }
  ```

### Email Features
- **Confirmation Email**: HTML-formatted email with event details
- **Calendar Attachment**: ICS file that can be opened in:
  - Google Calendar
  - Outlook
  - Apple Calendar
  - Any other calendar application
- **Sent via Gmail**: Uses your Gmail account through Nodemailer

### Calendar Event Details
- **Event**: Qiskit Fall Fest - Quantum Computing Event
- **Date**: October 13, 2026
- **Time**: 4:00 PM - 8:00 PM
- **Location**: The College of Management, Rishon LeZion
- **Reminder**: 15 minutes before event

## Testing

### Local Testing
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Fill out the registration form on the website

3. Check your email for:
   - Confirmation message
   - Calendar attachment (qiskit-fall-fest-event.ics)

### Manual API Testing
You can test the API directly using curl or any HTTP client:

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your_email@example.com",
    "institution": "Test University",
    "level": "beginner"
  }'
```

## Customization

### Change Event Date
Edit `src/app/api/register/route.ts`:
```typescript
const eventDate = new Date('2026-10-13T16:00:00');
```

### Modify Email Template
Edit the HTML template in the `resend.emails.send()` call in `src/app/api/register/route.ts`

### Change Calendar Details
Modify the `generateICS` function to update:
- Event summary
- Description
- Location
- Times
- Reminder settings

## Troubleshooting

### Email Not Sending
- Check that `GMAIL_USER` and `GMAIL_APP_PASSWORD` are correct in `.env.local`
- Make sure 2-factor authentication is enabled on your Gmail account
- Verify the app password was generated correctly (16 characters, no spaces)
- Check that "Less secure app access" is not blocking the connection
- Gmail may block sign-in attempts from new locations - check your Gmail for security alerts

### Calendar Not Working
- Ensure ICS file format is correct
- Check that date/time format is valid
- Verify calendar application supports ICS files

### Form Submission Errors
- Check browser console for JavaScript errors
- Verify API route is responding correctly
- Check network tab in browser dev tools

## Security Notes
- Never commit `.env.local` to version control
- Keep Gmail app passwords secure
- Use environment variables for all sensitive data
- Consider adding rate limiting to prevent abuse
- Gmail app passwords give full access to your Gmail account - keep them safe