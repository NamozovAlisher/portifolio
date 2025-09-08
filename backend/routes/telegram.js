const express = require('express');
const router = express.Router();
const telegramBotService = require('../services/telegramBot');

// GET /api/telegram/info - Get bot information
router.get('/info', async (req, res) => {
  try {
    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    const botInfo = await telegramBotService.getBotInfo();
    const webhookInfo = await telegramBotService.getWebhookInfo();

    res.json({
      success: true,
      data: {
        bot: botInfo,
        webhook: webhookInfo,
        chatId: telegramBotService.getChatId(),
        initialized: telegramBotService.isInitialized()
      }
    });
  } catch (error) {
    console.error('Error getting bot info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get bot information',
      error: error.message
    });
  }
});

// POST /api/telegram/webhook - Set webhook URL
router.post('/webhook', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'Webhook URL is required'
      });
    }

    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    await telegramBotService.setWebhook(url);

    res.json({
      success: true,
      message: 'Webhook set successfully',
      url: url
    });
  } catch (error) {
    console.error('Error setting webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set webhook',
      error: error.message
    });
  }
});

// DELETE /api/telegram/webhook - Delete webhook
router.delete('/webhook', async (req, res) => {
  try {
    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    await telegramBotService.deleteWebhook();

    res.json({
      success: true,
      message: 'Webhook deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete webhook',
      error: error.message
    });
  }
});

// POST /api/telegram/webhook/receive - Receive webhook updates
router.post('/webhook/receive', async (req, res) => {
  try {
    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    const result = await telegramBotService.handleWebhook(req.body);

    if (result.success) {
      res.json({ success: true, message: 'Webhook processed successfully' });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to process webhook',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process webhook',
      error: error.message
    });
  }
});

// POST /api/telegram/send - Send message to Telegram
router.post('/send', async (req, res) => {
  try {
    const { message, options } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message text is required'
      });
    }

    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    const result = await telegramBotService.sendMessage(message, options);

    if (result.success) {
      res.json({
        success: true,
        message: 'Message sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
      error: error.message
    });
  }
});

// POST /api/telegram/contact - Send contact form notification
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    if (!telegramBotService.isInitialized()) {
      return res.status(503).json({
        success: false,
        message: 'Telegram bot is not initialized'
      });
    }

    const result = await telegramBotService.sendContactNotification({
      name,
      email,
      subject,
      message
    });

    if (result.success) {
      res.json({
        success: true,
        message: 'Contact notification sent successfully',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send contact notification',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error sending contact notification:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send contact notification',
      error: error.message
    });
  }
});

// GET /api/telegram/chat - Get chat information
router.get('/chat', (req, res) => {
  try {
    const chatId = telegramBotService.getChatId();
    const botUsername = process.env.TELEGRAM_BOT_USERNAME;

    res.json({
      success: true,
      data: {
        chatId: chatId,
        botUsername: botUsername,
        chatUrl: botUsername ? `https://t.me/${botUsername}` : null,
        isConfigured: !!chatId
      }
    });
  } catch (error) {
    console.error('Error getting chat info:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat information',
      error: error.message
    });
  }
});

// POST /api/telegram/chat - Update chat ID
router.post('/chat', (req, res) => {
  try {
    const { chatId } = req.body;

    if (!chatId) {
      return res.status(400).json({
        success: false,
        message: 'Chat ID is required'
      });
    }

    telegramBotService.setChatId(chatId);

    res.json({
      success: true,
      message: 'Chat ID updated successfully',
      chatId: chatId
    });
  } catch (error) {
    console.error('Error updating chat ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update chat ID',
      error: error.message
    });
  }
});

module.exports = router;