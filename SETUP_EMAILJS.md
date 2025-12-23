# EmailJS Setup Guide for Contact Form

This guide will help you configure EmailJS for your contact form on GitHub Pages.

## Why EmailJS?

EmailJS is perfect for static sites like GitHub Pages because:
- ✅ No backend required
- ✅ Works entirely client-side
- ✅ Free tier: 200 emails/month
- ✅ Easy to set up
- ✅ Stays in your code forever

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** and create a free account
3. Verify your email address

### 2. Add Email Service

1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Best for personal use
   - **Outlook**: Good alternative
   - Or any other supported service
4. Click **"Connect Account"** and follow the authentication steps
5. **Copy the Service ID** (e.g., `service_abc123`)

### 3. Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up your template with these exact variable names:

**Subject:**
```
New Contact Form Message: {{subject}}
```

**Content:**
```html
<h2>New Contact Form Message</h2>

<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Subject:</strong> {{subject}}</p>

<hr>

<p><strong>Message:</strong></p>
<p>{{message}}</p>

<hr>

<p><em>This email was sent from your website contact form.</em></p>
```

**Settings:**
- **To Email:** `aurelian.epuras@gmail.com` (or use `{{to_email}}` to receive it from template params)
- **From Name:** `{{from_name}}`
- **Reply To:** `{{from_email}}`

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy the Public Key** (e.g., `AbCdEfGhIjKlMnOp`)

### 5. Update Your Code

Open the file: `src/components/ContactForm.svelte`

Find these lines at the top (lines 4-8):

```typescript
const EMAILJS_CONFIG = {
	PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY',    // ← Replace this
	SERVICE_ID: 'YOUR_SERVICE_ID',             // ← Replace this
	TEMPLATE_ID: 'YOUR_TEMPLATE_ID'            // ← Replace this
};
```

Replace them with your actual values:

```typescript
const EMAILJS_CONFIG = {
	PUBLIC_KEY: 'AbCdEfGhIjKlMnOp',    // Your Public Key from Step 4
	SERVICE_ID: 'service_abc123',      // Your Service ID from Step 2
	TEMPLATE_ID: 'template_xyz789'     // Your Template ID from Step 3
};
```

### 6. Test Locally

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Go to the contact page: `http://localhost:4321/contact`

3. Fill out the form and submit

4. Check your email inbox at `aurelian.epuras@gmail.com`

### 7. Deploy to GitHub Pages

Once testing works:

1. Build the project:
   ```bash
   npm run build
   ```

2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Configure EmailJS for contact form"
   git push
   ```

3. Your contact form will work on GitHub Pages!

## Important Notes

### ✅ What's Already Configured

- **Recipient Email:** Set to `aurelian.epuras@gmail.com` (line 144)
- **Rate Limiting:** 1 message per minute per user
- **Email Validation:** Built-in regex validation
- **Security:** Input sanitization to prevent XSS attacks
- **Loading States:** Spinner animation during submission
- **Error Handling:** User-friendly error messages in Romanian

### 🔒 Security

- The Public Key is safe to include in your code (it's meant to be public)
- EmailJS has built-in spam protection
- Rate limiting prevents abuse
- Input sanitization prevents malicious code injection

### 📊 Email Quota

EmailJS free tier includes:
- **200 emails/month**
- If you need more, upgrade to a paid plan

### 🎨 Customization

To change the recipient email, edit line 144 in `ContactForm.svelte`:

```typescript
to_email: 'your-new-email@example.com'
```

### 🌐 Template Variables

The form sends these variables to your EmailJS template:
- `from_name` - Visitor's name
- `from_email` - Visitor's email
- `subject` - Message subject
- `message` - Message content
- `to_email` - Recipient email (aurelian.epuras@gmail.com)

Make sure your EmailJS template uses these exact variable names!

## Troubleshooting

### Form not sending emails?

1. **Check browser console** for errors
2. **Verify credentials** in `ContactForm.svelte` (lines 4-8)
3. **Check EmailJS dashboard** for error logs
4. **Verify template variables** match exactly

### "EmailJS not loaded" error?

- Check your internet connection
- EmailJS CDN might be blocked by ad blockers
- Try disabling browser extensions

### Emails going to spam?

- Add your domain to EmailJS "Allowed Origins"
- Ask recipients to whitelist the sender email

## Support

- **EmailJS Documentation:** [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- **EmailJS Dashboard:** [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

---

**That's it!** Your contact form will work forever on GitHub Pages without any backend. 🎉
