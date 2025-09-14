# Portfolio Setup and Development Guide

## Quick Start (If you have execution permissions enabled)

1. **Install all dependencies:**
   ```powershell
   npm run install:all
   ```

2. **Start development servers:**
   ```powershell
   npm run dev
   ```

## Manual Setup (If npm execution is restricted)

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Step 1: Install Root Dependencies
```powershell
# In the root directory
npm install concurrently --save-dev
```

### Step 2: Install Backend Dependencies
```powershell
# Navigate to backend directory
cd backend

# Install dependencies manually
npm install express cors dotenv jsonwebtoken bcryptjs mongoose
npm install nodemon --save-dev

# Go back to root
cd ..
```

### Step 3: Install Frontend Dependencies
```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies manually
npm install react react-dom react-router-dom axios framer-motion lucide-react
npm install @vitejs/plugin-react vite tailwindcss postcss autoprefixer --save-dev

# Go back to root
cd ..
```

### Step 4: Start Development Servers

**Option A: Start both servers together (if root npm works):**
```powershell
npm run dev
```

**Option B: Start servers separately:**

Terminal 1 (Backend):
```powershell
cd backend
npm run dev
```

Terminal 2 (Frontend):
```powershell
cd frontend
npm run dev
```

## Accessing the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## Testing the Application

1. **Test Backend API:**
   - Visit: http://localhost:5000
   - Should see: "Welcome to Alisher Namozov Portfolio API"

2. **Test API Endpoints:**
   - Portfolio data: http://localhost:5000/api/portfolio
   - Projects: http://localhost:5000/api/portfolio/projects
   - Skills: http://localhost:5000/api/portfolio/skills

3. **Test Frontend:**
   - Visit: http://localhost:3000
   - Should see the complete portfolio website

4. **Test Authentication:**
   - Try registering a new user
   - Try logging in
   - Check if user menu appears in navigation

## Troubleshooting

### If npm commands don't work:
1. Enable PowerShell execution policy:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. Or use yarn instead:
   ```powershell
   yarn install
   yarn dev
   ```

### If ports are in use:
- Backend: Change PORT in backend/.env
- Frontend: Change port in frontend/vite.config.js

### If authentication doesn't work:
- Check that JWT_SECRET is set in backend/.env
- Verify backend is running on port 5000
- Check browser console for errors

## Development Notes

- Backend uses in-memory storage (users array) - data resets on server restart
- For production, replace with a real database (MongoDB recommended)
- Environment variables are set in backend/.env
- Frontend proxies API calls to backend via Vite config

## Production Deployment

1. **Build Frontend:**
   ```powershell
   cd frontend
   npm run build
   ```

2. **Configure Backend for Production:**
   - Set NODE_ENV=production in .env
   - Update CORS origins
   - Use a real database
   - Set secure JWT_SECRET

3. **Deploy:**
   - Frontend: Deploy dist/ folder to static hosting (Netlify, Vercel)
   - Backend: Deploy to cloud platform (Heroku, Railway, DigitalOcean)