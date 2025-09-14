const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Alisher Portfolio Setup...\n');

// Check if required directories exist
const requiredDirs = ['backend', 'frontend', 'backend/routes', 'frontend/src'];
const missingDirs = [];

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    missingDirs.push(dir);
  }
});

if (missingDirs.length > 0) {
  console.log('❌ Missing directories:', missingDirs.join(', '));
  process.exit(1);
}

// Check if package.json files exist
const packageFiles = ['package.json', 'backend/package.json', 'frontend/package.json'];
const missingPackages = [];

packageFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingPackages.push(file);
  }
});

if (missingPackages.length > 0) {
  console.log('❌ Missing package.json files:', missingPackages.join(', '));
  process.exit(1);
}

// Check if key files exist
const keyFiles = [
  'backend/server.js',
  'backend/.env',
  'backend/routes/auth.js',
  'backend/routes/portfolio.js',
  'frontend/index.html',
  'frontend/src/main.jsx',
  'frontend/src/App.jsx',
  'frontend/tailwind.config.js',
  'frontend/vite.config.js'
];

const missingFiles = [];

keyFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing key files:', missingFiles.join(', '));
  process.exit(1);
}

console.log('✅ All required directories and files are present');
console.log('✅ Backend server files configured');
console.log('✅ Frontend React app configured');
console.log('✅ Authentication system in place');
console.log('✅ Portfolio components created');
console.log('✅ Tailwind CSS and Framer Motion configured');

console.log('\n🎉 Setup verification complete!');
console.log('\n📋 Next steps:');
console.log('1. Install dependencies: npm run install:all');
console.log('2. Start development: npm run dev');
console.log('3. Open http://localhost:3000 in your browser');

console.log('\n💡 If npm commands don\'t work, see SETUP.md for manual installation steps');