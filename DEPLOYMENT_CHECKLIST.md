# ✅ Portfolio Deployment Checklist

## Prerequisites
- [ ] GitHub account
- [ ] Netlify account
- [ ] Render account
- [ ] Telegram Bot Token (optional)

## Backend Deployment (Render)

### Environment Setup
- [ ] Updated `backend/.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Set secure `JWT_SECRET`
- [ ] Added Telegram credentials (if using)

### Render Configuration
- [ ] Created Render account
- [ ] Connected GitHub repository
- [ ] Created Web Service with:
  - [ ] Name: `alisher-portfolio-backend`
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
- [ ] Added Environment Variables in Render:
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `5000`
  - [ ] `JWT_SECRET` = `your_secure_jwt_secret_here`
  - [ ] `TELEGRAM_BOT_TOKEN` (if using)
  - [ ] `TELEGRAM_CHAT_ID` (if using)
- [ ] Backend deployed successfully
- [ ] Noted backend URL (e.g., `https://alisher-portfolio-backend.onrender.com`)

## Frontend Deployment (Netlify)

### Environment Setup
- [ ] Updated `frontend/.env` with backend URL
- [ ] Set `VITE_API_URL` to your Render backend URL
- [ ] Updated personal information in components

### Netlify Configuration
- [ ] Created Netlify account
- [ ] Connected GitHub repository
- [ ] Set deployment settings:
  - [ ] Base directory: `frontend`
  - [ ] Build command: `npm run build`
  - [ ] Publish directory: `dist`
- [ ] Added Environment Variables in Netlify:
  - [ ] `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
  - [ ] `VITE_TELEGRAM_BOT_USERNAME` (if using)
- [ ] Frontend deployed successfully
- [ ] Noted Netlify URL (e.g., `https://your-portfolio.netlify.app`)

## Final Configuration

### CORS Update
- [ ] Updated `backend/server.js` CORS configuration with Netlify domain
- [ ] Redeployed backend on Render

### Testing
- [ ] Visited Netlify site
- [ ] Tested navigation between sections
- [ ] Tested contact form submission
- [ ] Tested authentication (login/register)
- [ ] Tested project gallery
- [ ] Tested Telegram integration (if configured)

## Optional Enhancements

### Custom Domain
- [ ] Purchased custom domain (if desired)
- [ ] Configured domain in Netlify
- [ ] Updated DNS settings
- [ ] Updated backend CORS with custom domain

### Telegram Integration
- [ ] Created Telegram bot with @BotFather
- [ ] Got chat ID from bot updates
- [ ] Configured Telegram in applications
- [ ] Tested Telegram notifications

## Completion
- [ ] Portfolio is live and functioning correctly
- [ ] All features working as expected
- [ ] Shared portfolio URL with others