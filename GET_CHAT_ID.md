# 🔍 How to Get Your Telegram Chat ID

## Step 1: Message Your Bot
1. Open Telegram
2. Search for: `@food_lover838387_bot`
3. Start the bot by clicking "START" or sending `/start`
4. Send any message to your bot (e.g., "Hello")

## Step 2: Get Your Chat ID
After you've sent a message to your bot, run this command:

```bash
curl.exe "https://api.telegram.org/bot7703135140:AAGH0VOW5sJWUqIbcF8zYV1fueEe_jfD83w/getUpdates"
```

## Step 3: Find Your Chat ID
Look for something like this in the response:
```json
{
  "update_id": 123456789,
  "message": {
    "message_id": 1,
    "from": {
      "id": YOUR_CHAT_ID_HERE,
      "is_bot": false,
      "first_name": "Your Name"
    },
    "chat": {
      "id": YOUR_CHAT_ID_HERE,
      "first_name": "Your Name",
      "type": "private"
    }
  }
}
```

The number after `"id":` in the `"chat"` section is your Chat ID.

## Step 4: Update Environment
Once you have your Chat ID, update your backend/.env file:
```
TELEGRAM_CHAT_ID=your_actual_chat_id_number
```

## Quick Test Links
- **Message your bot:** https://t.me/food_lover838387_bot
- **Get updates:** curl.exe "https://api.telegram.org/bot7703135140:AAGH0VOW5sJWUqIbcF8zYV1fueEe_jfD83w/getUpdates"