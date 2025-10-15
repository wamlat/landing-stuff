# Quick Start Guide - Onyma Landing Page

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will automatically open at `http://localhost:3000`

### Step 3: Build for Production
```bash
npm run build
```

The production-ready files will be in the `dist` folder.

---

## 🎯 What You'll See

When you run the dev server, you'll see:

1. **Header** with the Onyma logo
2. **Hero Section** with:
   - Headline: "Welcome to Onyma"
   - Tagline: "The Future of Innovation"
   - Description text
   - Email input field
   - "Join Waitlist" button
3. **Footer** with copyright and links

## 🧪 Testing the Waitlist Form

1. Enter an email address (e.g., `test@example.com`)
2. Click "Join Waitlist"
3. Watch the button show a loading spinner
4. After 1-2 seconds, you'll see a success message (95% of the time)
5. The form automatically resets after 5 seconds

### What Happens During Submission:
- ⏳ Button shows "Loading..." with spinner
- ✅ Success: Green message "🎉 Success! You're on the waitlist!"
- ❌ Error: Red message explaining the issue
- 🔄 Form auto-resets after success

## 🎨 Customizing Your Landing Page

### Change the Headline
Edit `src/components/HeroSection.jsx`, line 76-78:
```jsx
<h1 className="hero-headline">
  Your Custom Headline Here
</h1>
```

### Change the Tagline
Edit line 81-83:
```jsx
<p className="hero-tagline">
  Your Custom Tagline
</p>
```

### Change Colors
Edit `src/styles/globals.css`, lines 11-21:
```css
:root {
  --color-primary: #2563eb;        /* Your brand color */
  --color-primary-dark: #1e40af;   /* Darker shade */
  --color-primary-light: #3b82f6;  /* Lighter shade */
}
```

### Change Logo
Edit `src/components/Header.jsx`, line 15:
```jsx
<span className="logo-text">Your Brand</span>
```

Or add an image:
```jsx
<img src="/assets/logo.png" alt="Your Brand" />
```

## 🔧 Connecting to Your Backend

### Step 1: Update the API URL
Create a `.env` file:
```env
REACT_APP_API_URL=https://your-api.com
```

### Step 2: Disable Mock Mode
Edit `src/services/waitlistService.js`, line 11:
```javascript
const MOCK_MODE = false;  // Change true to false
```

### Step 3: Your API Should Accept
**Endpoint**: `POST /waitlist`

**Request Body**:
```json
{
  "email": "user@example.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "email": "user@example.com"
  }
}
```

## 📱 Testing Responsive Design

### Desktop View (>768px)
- Horizontal form layout
- Large text sizes
- Wide container

### Tablet View (≤768px)
- Vertical form layout
- Medium text sizes

### Mobile View (≤480px)
- Full-width buttons
- Smaller text
- Optimized spacing

**How to Test:**
1. Open browser DevTools (F12)
2. Click device toolbar icon
3. Try different device sizes

## 🚢 Deploying to Production

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option 2: Netlify
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload the `dist` folder contents to your server
3. Point your domain to the `dist` folder

## 🐛 Troubleshooting

### Issue: "Module not found"
**Solution**: Run `npm install` again

### Issue: Port 3000 already in use
**Solution**: 
```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill -9
# Or change the port in vite.config.js
```

### Issue: Blank page after build
**Solution**: Check console for errors, ensure all imports are correct

### Issue: API not working
**Solution**: 
1. Check MOCK_MODE is set correctly
2. Verify API_BASE_URL in .env
3. Check browser console for errors
4. Verify CORS is enabled on your backend

## ✅ Pre-Launch Checklist

- [ ] Update headline, tagline, and description
- [ ] Replace logo/favicon with brand assets
- [ ] Update footer links (Privacy, Terms, Contact)
- [ ] Configure production API endpoint
- [ ] Set MOCK_MODE to false
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on mobile devices
- [ ] Test form submission
- [ ] Verify all links work
- [ ] Check page load speed
- [ ] Add analytics tracking
- [ ] Set up error monitoring
- [ ] Test production build locally

## 📞 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for architecture details
- Check browser console for error messages
- Verify all files are in the correct locations

---

**Ready to Launch! 🚀**

Your Onyma landing page is production-ready and waiting for you to customize it with your brand.

