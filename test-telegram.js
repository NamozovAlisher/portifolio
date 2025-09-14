// Simple test script for Telegram bot
const https = require('https');

const BOT_TOKEN = '7703135140:AAGH0VOW5sJWUqIbcF8zYV1fueEe_jfD83w';

console.log('🤖 Testing Telegram Bot Integration...\n');

// Test 1: Get bot info
function getBotInfo() {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.ok) {
            console.log('✅ Bot Info:');
            console.log(`   Name: ${result.result.first_name}`);
            console.log(`   Username: @${result.result.username}`);
            console.log(`   ID: ${result.result.id}\n`);
            resolve(result.result);
          } else {
            reject(new Error('Failed to get bot info'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Test 2: Get updates
function getUpdates() {
  return new Promise((resolve, reject) => {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.ok) {
            console.log('📩 Recent Updates:');
            if (result.result.length === 0) {
              console.log('   No messages yet. Send a message to your bot first!\n');
              console.log('🔗 Message your bot: https://t.me/alishernamozovvv\n');
            } else {
              result.result.forEach((update, index) => {
                if (update.message) {
                  console.log(`   Message ${index + 1}:`);
                  console.log(`   From: ${update.message.from.first_name}`);
                  console.log(`   Chat ID: ${update.message.chat.id}`);
                  console.log(`   Text: ${update.message.text || 'No text'}\n`);
                }
              });
            }
            resolve(result.result);
          } else {
            reject(new Error('Failed to get updates'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

// Run tests
async function runTests() {
  try {
    await getBotInfo();
    await getUpdates();
    
    console.log('📋 Next Steps:');
    console.log('1. Message your bot: https://t.me/food_lover838387_bot');
    console.log('2. Send "/start" or any message');
    console.log('3. Run this script again to get your Chat ID');
    console.log('4. Update TELEGRAM_CHAT_ID in backend/.env');
    console.log('5. Restart your backend server');
    console.log('\n🎉 Your Telegram integration is ready!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

runTests();