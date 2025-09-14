# Deployment Instructions

> **Note**: For a more detailed and step-by-step deployment guide, see [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md)

## Netlify Deployment (Frontend)

1. **Prepare Your Project**:
   - Ensure all environment variables are set in Netlify dashboard
   - Update the backend URL in the Netlify environment variables

2. **Netlify Settings**:
   - Repository: Your portfolio repository
   - Base directory: `frontend/`
   - Build command: `npm run build`
   - Publish directory: `dist/`

3. **Environment Variables in Netlify**:
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-backend.onrender.com/api)
   - `VITE_TELEGRAM_BOT_USERNAME`: Your Telegram bot username (optional)

## Backend Deployment Options

### Render (Recommended)
1. Create a new Web Service
2. Connect your GitHub repository
3. Set:
   - Root Directory: `backend/`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment Variables from `backend/.env`

### Railway
1. Create a new project
2. Connect your GitHub repository
3. Set:
   - Root Directory: `backend/`
   - Build Command: `npm install`
   - Start Command: `npm start`

## Post-Deployment Steps

1. Update CORS in `backend/server.js` to include your Netlify domain
2. Test all functionality:
   - Authentication
   - Contact form
   - Project gallery
   - Animations

## Common Issues

- **API calls failing**: Check backend URL in environment variables
- **CORS errors**: Update CORS configuration in backend
- **Routing issues**: Verify _redirects file in frontend/public