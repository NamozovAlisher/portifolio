# 🚀 Complete Deployment Guide for Alisher Namozov's Portfolio

## Overview
This guide will walk you through deploying your full-stack portfolio to:
- **Frontend**: Netlify (free hosting)
- **Backend**: Render (free tier available)

## Prerequisites
1. GitHub account
2. Netlify account (free at [netlify.com](https://netlify.com))
3. Render account (free at [render.com](https://render.com))
4. Telegram Bot Token (optional but recommended)

## Step 1: Prepare Backend for Deployment

### 1.1 Update Backend Environment Variables
Update your `backend/.env` file with production values:

```
# Environment Configuration
NODE_ENV=production
PORT=5000

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRES_IN=7d

# Telegram Bot Configuration (optional)
# Get your bot token from @BotFather on Telegram
# TELEGRAM_BOT_TOKEN=your_actual_telegram_bot_token_here

# Your Telegram chat ID where notifications will be sent
# TELEGRAM_CHAT_ID=your_actual_telegram_chat_id_here

# Optional: Your bot username (without @)
# TELEGRAM_BOT_USERNAME=your_bot_username
```

### 1.2 Update CORS Configuration
In `backend/server.js`, update the CORS configuration to include your Netlify domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-netlify-domain.netlify.app'],
  credentials: true
}));
```

(You'll replace `your-netlify-domain` with your actual Netlify domain after deploying the frontend)

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account

### 2.2 Create Web Service
1. Click "New+" → "Web Service"
2. Connect your portfolio repository
3. Configure settings:
   - **Name**: alisher-portfolio-backend (or any name you prefer)
   - **Root Directory**: backend
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `JWT_SECRET` = `your_secure_jwt_secret_here`
   - `TELEGRAM_BOT_TOKEN` = `your_telegram_bot_token` (if using Telegram)
   - `TELEGRAM_CHAT_ID` = `your_telegram_chat_id` (if using Telegram)
5. Click "Create Web Service"
6. Wait for deployment to complete (takes 5-10 minutes)
7. Note your backend URL (e.g., `https://alisher-portfolio-backend.onrender.com`)

## Step 3: Prepare Frontend for Deployment

### 3.1 Update Frontend Environment Variables
Update your `frontend/.env` file:

```
# Backend API URL - Replace with your Render backend URL
VITE_API_URL=https://your-backend-url.onrender.com/api

# Telegram Configuration
VITE_TELEGRAM_BOT_USERNAME=your_bot_username
```

### 3.2 Update Portfolio Information
Update your personal information in:
- `frontend/src/components/About.jsx`
- `frontend/src/components/Hero.jsx`
- `README.md`

## Step 4: Deploy Frontend to Netlify

### 4.1 Using Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Navigate to your project root and deploy:
```bash
netlify deploy --prod
```

4. When prompted:
   - Set the publish directory to: `frontend/dist`
   - Set the build command to: `npm run build`

### 4.2 Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and login
2. Click "New site from Git"
3. Connect to your GitHub repository
4. Set deployment settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables:
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - `VITE_TELEGRAM_BOT_USERNAME` = `your_bot_username`
6. Deploy site

## Step 5: Final Configuration

### 5.1 Update Backend CORS
After your Netlify site is deployed, update your backend CORS configuration in `backend/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-netlify-domain.netlify.app',
    'https://your-custom-domain.com'  // If you have a custom domain
  ],
  credentials: true
}));
```

Then redeploy your backend on Render.

### 5.2 Set Up Custom Domain (Optional)
1. In Netlify dashboard, go to your site settings
2. Navigate to "Domain Management"
3. Add your custom domain
4. Follow Netlify's DNS configuration instructions

## Step 6: Testing Your Deployment

1. Visit your Netlify URL
2. Test all functionality:
   - Navigation between sections
   - Contact form submission
   - Authentication (login/register)
   - Project gallery
   - Telegram integration (if configured)

## Step 7: Telegram Integration (Optional but Recommended)

### 7.1 Create Your Telegram Bot
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Use `/newbot` command to create a new bot
3. Follow instructions to get your bot token

### 7.2 Get Your Chat ID
1. Start a conversation with your bot
2. Send any message to your bot
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find your chat ID in the response

### 7.3 Configure Telegram in Your Applications
1. Add your bot token and chat ID to Render environment variables
2. Add your bot username to Netlify environment variables
3. Redeploy both applications

## Troubleshooting

### Common Issues

1. **API calls failing**: Ensure your backend URL is correctly set in frontend environment variables
2. **CORS errors**: Make sure your backend CORS configuration includes your Netlify domain
3. **Environment variables not loading**: Verify that VITE-prefixed variables are in the frontend `.env` file
4. **Build errors**: Check that all dependencies are correctly installed

### Checking Deployment Status

1. **Netlify**: Check your deployment status and logs in the Netlify dashboard under your site's "Deploys" tab
2. **Render**: Check your deployment status and logs in the Render dashboard

## Maintenance

1. Regularly update dependencies for security
2. Monitor your applications for errors
3. Update your portfolio content regularly
4. Check Telegram notifications are working

## Congratulations! 🎉

Your portfolio is now live on the internet! Share your Netlify URL with friends, family, and potential employers.

Remember to:
- Keep your applications updated
- Monitor for any issues
- Continue adding new projects to your portfolio