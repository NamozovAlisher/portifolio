#!/usr/bin/env node

console.log('🔧 Checking for common website errors...\n');

const fs = require('fs');
const path = require('path');

// 1. Check if all required files exist
const requiredFiles = [
  'backend/.env',
  'frontend/.env',
  'backend/package.json',
  'frontend/package.json',
  'backend/server.js',
  'frontend/src/App.jsx'
];

console.log('📂 Checking required files...');
let hasErrors = false;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ Missing: ${file}`);
    hasErrors = true;
  }
});

// 2. Check backend environment variables
console.log('\n🔐 Checking backend environment...');
try {
  const envContent = fs.readFileSync('backend/.env', 'utf8');
  if (envContent.includes('JWT_SECRET=your-super-secret-jwt-key-change-this-in-production')) {
    console.log('⚠️  Warning: Using default JWT_SECRET (should be changed for production)');
  } else {
    console.log('✅ JWT_SECRET is configured');
  }
  
  if (envContent.includes('PORT=5000')) {
    console.log('✅ Backend port configured (5000)');
  } else {
    console.log('⚠️  Warning: Backend port not explicitly set');
  }
} catch (error) {
  console.log('❌ Cannot read backend .env file');
  hasErrors = true;
}

// 3. Check frontend configuration
console.log('\n🌐 Checking frontend configuration...');
try {
  const viteConfig = fs.readFileSync('frontend/vite.config.js', 'utf8');
  if (viteConfig.includes('port: 3000')) {
    console.log('✅ Frontend port configured (3000)');
  }
  
  if (viteConfig.includes('http://localhost:5000')) {
    console.log('✅ API proxy configured');
  }
} catch (error) {
  console.log('❌ Cannot read frontend vite.config.js');
  hasErrors = true;
}

// 4. Check package.json files
console.log('\n📦 Checking package configurations...');
try {
  const rootPkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (rootPkg.scripts && rootPkg.scripts.dev) {
    console.log('✅ Root development script configured');
  }
  
  const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
  if (backendPkg.dependencies && backendPkg.dependencies.express) {
    console.log('✅ Backend dependencies configured');
  }
  
  const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  if (frontendPkg.dependencies && frontendPkg.dependencies.react) {
    console.log('✅ Frontend dependencies configured');
  }
} catch (error) {
  console.log('❌ Error reading package.json files');
  hasErrors = true;
}

console.log('\n🔍 Final Status:');
if (hasErrors) {
  console.log('❌ Some errors found! Please check the issues above.');
  console.log('\n💡 To fix issues:');
  console.log('1. Make sure all files are in place');
  console.log('2. Install dependencies: npm run install:all');
  console.log('3. Check environment configurations');
  process.exit(1);
} else {
  console.log('✅ No critical errors found!');
  console.log('\n🚀 To start the website:');
  console.log('1. npm run install:all (if not done)');
  console.log('2. npm run dev');
  console.log('3. Open http://localhost:3000');
}

console.log('\n📚 For detailed setup: check SETUP.md or PROJECT_COMPLETE.md');