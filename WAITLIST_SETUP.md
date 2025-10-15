# Waitlist Email Collection Setup

## Current Implementation

The waitlist currently stores emails in **localStorage** for demo purposes. This is NOT suitable for production.

### How it works now:
1. User clicks "Join Waitlist" button (Liquid Glass Button)
2. Modal opens with email input
3. Email is validated and stored in browser's localStorage
4. Console logs the signup for debugging

## Production Setup Options

### Option 1: Simple Backend (Recommended for MVP)

#### Using Google Sheets (No coding required)
1. Create a Google Form
2. Get the form submission URL
3. Replace the fetch call in `WaitlistModal.jsx` with:
```javascript
await fetch('YOUR_GOOGLE_FORM_URL', {
  method: 'POST',
  mode: 'no-cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email })
});
```

#### Using Mailchimp
1. Sign up at mailchimp.com
2. Create an audience
3. Get your API key and list ID
4. Install: `npm install @mailchimp/mailchimp_marketing`
5. Create API endpoint or use their form

#### Using ConvertKit
1. Sign up at convertkit.com
2. Create a form
3. Use their API: `https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe`

### Option 2: Custom Backend

#### Express.js Backend
```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/waitlist', async (req, res) => {
  const { email } = req.body;
  
  // Validate email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  
  // Store in database (PostgreSQL, MongoDB, etc.)
  // await db.collection('waitlist').insertOne({ email, timestamp: new Date() });
  
  // Send confirmation email (optional)
  // await sendConfirmationEmail(email);
  
  res.json({ success: true });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```

#### Supabase (PostgreSQL + Auth)
1. Sign up at supabase.com
2. Create a project
3. Create `waitlist` table:
```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```
4. Install: `npm install @supabase/supabase-js`
5. Update `WaitlistModal.jsx`:
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY')

const { data, error } = await supabase
  .from('waitlist')
  .insert([{ email }])
```

#### Firebase (Google)
1. Create Firebase project
2. Enable Firestore
3. Install: `npm install firebase`
4. Add to `WaitlistModal.jsx`:
```javascript
import { getFirestore, collection, addDoc } from 'firebase/firestore'

await addDoc(collection(db, 'waitlist'), {
  email,
  timestamp: new Date()
});
```

### Option 3: Third-Party Services

#### EmailOctopus (Affordable)
- Free for up to 2,500 subscribers
- API: `https://emailoctopus.com/api-documentation`

#### Beehiiv (Newsletter focused)
- Great for content creators
- Built-in landing pages

#### Loops.so (Developer friendly)
- Modern API
- Great for SaaS products

## Email Notifications

### SendGrid
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: email,
  from: 'hello@onyma.com',
  subject: 'Welcome to Onyma Waitlist!',
  html: '<p>Thanks for joining!</p>'
});
```

### Resend (Modern, Developer-First)
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'hello@onyma.com',
  to: email,
  subject: 'Welcome to Onyma!',
  html: '<p>Thanks for joining!</p>'
});
```

## Viewing Collected Emails

### Current (localStorage):
```javascript
// In browser console:
JSON.parse(localStorage.getItem('onyma_waitlist'))
```

### Production:
Set up an admin panel or export from your database/service.

## Security Considerations

1. **Rate Limiting**: Prevent spam submissions
2. **Email Validation**: Server-side validation
3. **CAPTCHA**: Add reCAPTCHA for bot protection
4. **Double Opt-in**: Send confirmation email
5. **GDPR Compliance**: Add privacy policy link
6. **Unsubscribe**: Allow users to remove themselves

## Recommended Quick Start

For fastest setup:
1. Use **Mailchimp** (free tier, no coding)
2. Or **Supabase** (free tier, requires minimal coding)
3. Add **Resend** for email notifications (beautiful emails, dev-friendly)

## Need Help?

- Mailchimp: https://mailchimp.com/developer/
- Supabase: https://supabase.com/docs
- Resend: https://resend.com/docs

---

**Current Status**: ✅ UI Complete | ⏳ Backend Pending
**Next Step**: Choose a backend option and implement email collection

