# Netlify Deployment Guide for Alisher Namozov's Portfolio

This guide will help you deploy your full-stack portfolio to Netlify and a Node.js hosting service.

## Prerequisites

1. A Netlify account (free at [netlify.com](https://netlify.com))
2. A hosting service for your backend (Render, Heroku, or Railway)
3. Your project code ready

## Deployment Steps

### 1. Backend Deployment (Node.js Server)

First, you need to deploy your backend to a service that supports Node.js:

#### Option A: Render (Recommended)
1. Go to [render.com](https://render.com) and create an account
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the following configuration:
   - Build Command: `npm install && cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables (from your `.env` file):
     - `PORT=5000`
     - `JWT_SECRET=your_jwt_secret_here`
     - `TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here` (if using Telegram)
     - `TELEGRAM_CHAT_ID=your_telegram_chat_id_here` (if using Telegram)
5. Deploy and note the URL (e.g., `https://your-app-name.onrender.com`)

#### Option B: Railway
1. Go to [railway.app](https://railway.app) and create an account
2. Create a new project
3. Connect your GitHub repository
4. Set the root directory to `/backend`
5. Set environment variables as needed
6. Deploy and note the URL

### 2. Update Frontend Configuration

Before deploying to Netlify, update your frontend environment variables:

1. Create a `.env` file in the `frontend/` directory:
```
VITE_API_URL=https://your-backend-url.com/api
VITE_TELEGRAM_BOT_USERNAME=your_bot_username_here
```

Replace `https://your-backend-url.com` with your actual backend URL from step 1.

### 3. Frontend Deployment to Netlify

#### Option A: Deploy with Netlify CLI (Recommended)

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to your Netlify account:
```bash
netlify login
```

3. Navigate to your project root and deploy:
```bash
netlify deploy --prod
```

4. When prompted:
   - Set the base directory to: `frontend`
   - Set the publish directory to: `frontend/dist`
   - Set the build command to: `npm run build`

#### Option B: Deploy via Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and login
2. Click "New site from Git"
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your portfolio repository
5. Set the following deployment settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
6. Add environment variables:
   - `VITE_API_URL` = `https://your-backend-url.com/api`
   - `VITE_TELEGRAM_BOT_USERNAME` = `your_bot_username_here`
7. Deploy site

### 4. Update Backend CORS Configuration

Update your backend CORS settings in `backend/server.js` to allow your Netlify domain:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-netlify-domain.netlify.app'],
  credentials: true
}));
```

Replace `https://your-netlify-domain.netlify.app` with your actual Netlify domain.

### 5. Final Steps

1. After deployment, test all functionality:
   - Navigation between sections
   - Contact form submission
   - Authentication (login/register)
   - Project gallery

2. Update your portfolio information:
   - In `frontend/src/components/About.jsx`
   - In `frontend/src/components/Hero.jsx`
   - In `README.md`

## Troubleshooting

### Common Issues

1. **API calls failing**: Ensure your backend URL is correctly set in the frontend environment variables
2. **CORS errors**: Make sure your backend CORS configuration includes your Netlify domain
3. **Environment variables not loading**: Verify that VITE-prefixed variables are in the frontend `.env` file
4. **Build errors**: Check that all dependencies are correctly installed

### Checking Deployment Status

You can check your deployment status and logs in the Netlify dashboard under your site's "Deploys" tab.

## Custom Domain (Optional)

To use a custom domain:

1. In Netlify dashboard, go to your site settings
2. Navigate to "Domain Management"
3. Add your custom domain
4. Follow Netlify's DNS configuration instructions
5. Update your backend CORS settings to include your custom domain

## Conclusion

Your portfolio should now be live on Netlify with the backend running on a separate service. Remember to:

- Keep your backend service running
- Monitor your deployments
- Update your portfolio content regularly
- Check for any security updates to dependencies

For any issues, refer to the Netlify documentation or the specific documentation for your chosen backend hosting service.