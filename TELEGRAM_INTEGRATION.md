# 📱 Telegram Bot Integration

Your portfolio now includes complete Telegram bot integration! This allows visitors to contact you directly through Telegram and sends you instant notifications when someone fills out the contact form.

## 🚀 Features

### ✅ Implemented Features

1. **Telegram Chat Widget** - Floating chat button in bottom-right corner
2. **Navbar Telegram Button** - Quick access to start a Telegram conversation
3. **Contact Form Integration** - Automatic Telegram notifications for new messages
4. **Responsive Design** - Works on all devices
5. **Environment Configuration** - Easy setup with environment variables

### 📋 Integration Components

- **Backend Service** (`/backend/services/telegramBot.js`) - Core Telegram bot functionality
- **API Routes** (`/backend/routes/telegram.js`) - RESTful endpoints for bot management
- **Frontend Widget** (`/frontend/src/components/TelegramWidget.jsx`) - Interactive chat widget
- **Contact Integration** - Enhanced contact form with Telegram notifications
- **Navbar Integration** - Direct Telegram access from navigation

## 🔧 Setup Instructions

### Step 1: Create Your Telegram Bot

1. **Message @BotFather** on Telegram
2. **Create a new bot** with `/newbot` command
3. **Choose a name** for your bot (e.g., "Alisher Portfolio Bot")
4. **Choose a username** (e.g., "alisher_portfolio_bot")
5. **Copy the bot token** you receive

### Step 2: Get Your Chat ID

1. **Start a conversation** with your bot
2. **Send any message** to your bot
3. **Visit** `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. **Find your chat ID** in the response (look for "chat":{"id":XXXXXXX})

### Step 3: Configure Environment Variables

#### Backend Configuration (`/backend/.env`)
```env
# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN=your_actual_bot_token_here
TELEGRAM_CHAT_ID=your_actual_chat_id_here
TELEGRAM_BOT_USERNAME=your_bot_username_without_@
```

#### Frontend Configuration (`/frontend/.env`)
```env
# Telegram Configuration
VITE_TELEGRAM_BOT_USERNAME=your_bot_username_without_@
```

### Step 4: Start Your Servers

```bash
# Backend (from /backend directory)
npm run dev

# Frontend (from /frontend directory)
npm run dev
```

## 🎯 How It Works

### Contact Form Flow
1. User fills out contact form on your portfolio
2. Form data is sent to your backend API
3. Backend automatically sends notification to your Telegram
4. You receive instant notification with all contact details
5. User receives confirmation message

### Direct Chat Flow
1. User clicks Telegram widget or navbar button
2. User is redirected to your bot on Telegram
3. Direct conversation starts between you and the user

## 🔍 Testing Your Integration

### 1. Test the Chat Widget
- Look for the floating blue chat button (bottom-right)
- Click it to open the chat widget
- Click "Start Chat on Telegram" button
- Should open Telegram with your bot

### 2. Test the Navbar Button
- Look for "Telegram" button in the navbar
- Click it to open Telegram chat
- Should redirect to your bot

### 3. Test Contact Form Notifications
- Fill out the contact form on your portfolio
- Submit the form
- Check your Telegram for instant notification
- Notification should include all form details

### 4. Test API Endpoints

```bash
# Check bot status
curl http://localhost:5000/api/telegram/info

# Check chat configuration
curl http://localhost:5000/api/telegram/chat

# Test manual message (optional)
curl -X POST http://localhost:5000/api/telegram/send \\
  -H "Content-Type: application/json" \\
  -d '{"message": "Test message from portfolio"}'
```

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/telegram/info` | Get bot and webhook information |
| GET | `/api/telegram/chat` | Get chat configuration |
| POST | `/api/telegram/send` | Send manual message |
| POST | `/api/telegram/contact` | Send contact form notification |
| POST | `/api/telegram/webhook` | Set webhook URL |
| DELETE | `/api/telegram/webhook` | Delete webhook |

## 🎨 Customization Options

### Widget Styling
Edit `/frontend/src/components/TelegramWidget.jsx`:
- Change colors (currently blue theme)
- Modify positioning
- Update text content
- Add more features

### Notification Format
Edit `/backend/services/telegramBot.js`:
- Customize message templates
- Add more contact form fields
- Include additional formatting

### Integration Points
- Add more social media buttons to navbar
- Include Telegram in footer
- Create admin dashboard for bot management

## 🔐 Security Considerations

1. **Keep bot token secret** - Never commit to version control
2. **Validate chat ID** - Ensure notifications go to correct chat
3. **Rate limiting** - Consider implementing for API endpoints
4. **Input validation** - All form inputs are sanitized

## 🚨 Troubleshooting

### Common Issues

#### Bot Token Issues
- Verify token is correct and active
- Check if bot was deleted or regenerated
- Ensure no extra spaces in environment variables

#### Chat ID Issues
- Verify you've messaged the bot first
- Double-check the chat ID format (should be numeric)
- Use `/getUpdates` to find correct chat ID

#### Widget Not Showing
- Check if `VITE_TELEGRAM_BOT_USERNAME` is set
- Verify environment variables are loaded
- Check browser console for errors

#### Notifications Not Working
- Verify backend can reach Telegram API
- Check server logs for error messages
- Test API endpoints manually

### Debug Commands

```bash
# Check environment variables
node -e "console.log(process.env.TELEGRAM_BOT_TOKEN ? 'Token loaded' : 'No token')"

# Test bot connection
node -e "
const telegramBot = require('./services/telegramBot');
telegramBot.init(process.env.TELEGRAM_BOT_TOKEN);
telegramBot.getBotInfo().then(console.log).catch(console.error);
"
```

## 📚 Additional Resources

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [BotFather Commands](https://core.telegram.org/bots#6-botfather)
- [Webhook Setup Guide](https://core.telegram.org/bots/api#setwebhook)

## 🎉 Congratulations!

Your portfolio now has complete Telegram integration! Visitors can easily reach you through multiple channels, and you'll get instant notifications for all contact form submissions.

### Next Steps
1. Set up your bot token and chat ID
2. Test all functionality
3. Customize the design to match your brand
4. Consider adding webhook for production deployment

---

*Need help? The integration includes comprehensive error handling and logging to help you troubleshoot any issues.*