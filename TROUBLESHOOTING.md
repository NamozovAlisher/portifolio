# 🛠️ Troubleshooting Guide - Alisher Portfolio

## ❓ Common Issues and Solutions

### 1. PowerShell Execution Policy Error
**Error:** `cannot be loaded because running scripts is disabled`

**Solution:**
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. npm commands don't work
**Error:** npm is not recognized or restricted

**Solutions:**
- **Option A:** Use manual installation from SETUP.md
- **Option B:** Use yarn instead of npm
- **Option C:** Enable execution policy (see #1)

### 3. Backend won't start
**Possible Issues:**
- Missing dependencies
- Port 5000 already in use
- Missing .env file

**Solutions:**
```powershell
# Install backend dependencies
cd backend
npm install express cors dotenv jsonwebtoken bcryptjs mongoose nodemon

# Check if port is in use
netstat -ano | findstr :5000

# Change port in backend/.env if needed
PORT=5001
```

### 4. Frontend won't start
**Possible Issues:**
- Missing dependencies
- Port 3000 already in use
- Node.js version compatibility

**Solutions:**
```powershell
# Install frontend dependencies
cd frontend
npm install react react-dom react-router-dom axios framer-motion lucide-react
npm install @vitejs/plugin-react vite tailwindcss postcss autoprefixer --save-dev

# Change port in vite.config.js if needed
server: { port: 3001 }
```

### 5. API Connection Errors
**Error:** `Network Error` or `Cannot connect to backend`

**Solutions:**
1. Make sure backend is running on http://localhost:5000
2. Check CORS configuration in backend/server.js
3. Verify API_BASE_URL in frontend/src/services/api.js
4. Check browser console for detailed errors

### 6. Authentication Not Working
**Possible Issues:**
- JWT_SECRET not set
- Token storage issues
- API endpoints not accessible

**Solutions:**
1. Check JWT_SECRET in backend/.env
2. Clear browser localStorage: `localStorage.clear()`
3. Check network tab in browser dev tools
4. Verify auth routes are working: http://localhost:5000/api/auth

### 7. Styling/CSS Issues
**Error:** Styles not loading or broken layout

**Solutions:**
1. Make sure Tailwind CSS is configured properly
2. Check if PostCSS is processing styles
3. Restart development server
4. Clear browser cache

### 8. Animation/Framer Motion Errors
**Error:** Framer Motion components not working

**Solutions:**
1. Check if framer-motion is installed
2. Verify component imports
3. Check browser console for errors
4. Ensure React version compatibility

## 🔧 Quick Diagnostic Commands

Run these to check your setup:

```powershell
# Check if everything is set up correctly
node fix-errors.js

# Check Node.js version (should be 18+)
node --version

# Check if ports are free
netstat -ano | findstr :3000
netstat -ano | findstr :5000

# Check if dependencies are installed
cd backend && npm list
cd frontend && npm list
```

## 🆘 Emergency Reset

If nothing works, try this complete reset:

```powershell
# 1. Delete node_modules everywhere
rm -r node_modules, backend/node_modules, frontend/node_modules -Force

# 2. Delete package-lock.json files
rm package-lock.json, backend/package-lock.json, frontend/package-lock.json -Force

# 3. Reinstall everything
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

# 4. Try starting again
npm run dev
```

## 📧 Still Having Issues?

1. Check the browser console (F12) for JavaScript errors
2. Check the terminal for server errors
3. Verify all files are in the correct locations
4. Make sure you're using Node.js version 18 or higher
5. Try running on a different port if there are conflicts

## 🔍 Debug Mode

To get more detailed error information:

```powershell
# Backend debug mode
cd backend
DEBUG=* npm run dev

# Frontend with verbose logging
cd frontend
npm run dev -- --verbose
```

Remember: The error messages in the console usually provide the best clues for fixing issues!