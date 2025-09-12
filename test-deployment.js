#!/usr/bin/env node

/**
 * Deployment Test Script
 * This script checks if all necessary deployment files exist
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Portfolio Deployment Test');
console.log('=============================\n');

const requiredFiles = [
  'DEPLOYMENT.md',
  'DEPLOYMENT_STEPS.md',
  'NETLIFY_DEPLOYMENT_GUIDE.md',
  'README.md',
  'deploy.js',
  'backend/.env',
  'frontend/.env',
  'backend/server.js',
  'frontend/package.json',
  'backend/package.json'
];

let allFilesExist = true;

console.log('🔍 Checking required files...\n');

requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

console.log('\n' + '='.repeat(40) + '\n');

if (allFilesExist) {
  console.log('🎉 All deployment files are present!');
  console.log('\nNext steps:');
  console.log('1. Review DEPLOYMENT_STEPS.md for detailed instructions');
  console.log('2. Run "npm run deploy" for deployment guidance');
  console.log('3. Follow the step-by-step deployment process');
} else {
  console.log('⚠️  Some deployment files are missing.');
  console.log('Please ensure all files are in place before deployment.');
}

console.log('\nFor detailed deployment instructions, see DEPLOYMENT_STEPS.md');