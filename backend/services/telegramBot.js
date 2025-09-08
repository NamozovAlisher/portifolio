const TelegramBot = require('node-telegram-bot-api');

class TelegramBotService {
  constructor() {
    this.bot = null;
    this.chatId = null;
    this.initialized = false;
  }

  init(token, chatId = null) {
    if (!token) {
      console.warn('⚠️ Telegram bot token not provided. Bot functionality disabled.');
      return false;
    }

    try {
      this.bot = new TelegramBot(token, { polling: false });
      this.chatId = chatId;
      this.initialized = true;
      console.log('✅ Telegram bot initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Telegram bot:', error.message);
      return false;
    }
  }

  async sendMessage(text, options = {}) {
    if (!this.initialized || !this.bot) {
      console.warn('⚠️ Telegram bot not initialized');
      return { success: false, error: 'Bot not initialized' };
    }

    if (!this.chatId) {
      console.warn('⚠️ No chat ID configured for Telegram notifications');
      return { success: false, error: 'No chat ID configured' };
    }

    try {
      const defaultOptions = {
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        ...options
      };

      const message = await this.bot.sendMessage(this.chatId, text, defaultOptions);
      return { success: true, messageId: message.message_id };
    } catch (error) {
      console.error('❌ Failed to send Telegram message:', error.message);
      return { success: false, error: error.message };
    }
  }

  async sendContactNotification(contactData) {
    const { name, email, subject, message } = contactData;
    
    const text = `
🔔 <b>New Contact Form Submission</b>

👤 <b>Name:</b> ${this.escapeHtml(name)}
📧 <b>Email:</b> ${this.escapeHtml(email)}
${subject ? `📋 <b>Subject:</b> ${this.escapeHtml(subject)}` : ''}

💬 <b>Message:</b>
${this.escapeHtml(message)}

⏰ <b>Time:</b> ${new Date().toLocaleString()}
    `.trim();

    return await this.sendMessage(text);
  }

  async handleWebhook(body) {
    if (!this.initialized || !this.bot) {
      return { success: false, error: 'Bot not initialized' };
    }

    try {
      await this.bot.processUpdate(body);
      return { success: true };
    } catch (error) {
      console.error('❌ Error processing webhook:', error.message);
      return { success: false, error: error.message };
    }
  }

  async setWebhook(url) {
    if (!this.initialized || !this.bot) {
      throw new Error('Bot not initialized');
    }

    try {
      const result = await this.bot.setWebHook(url);
      console.log('✅ Webhook set successfully:', url);
      return result;
    } catch (error) {
      console.error('❌ Failed to set webhook:', error.message);
      throw error;
    }
  }

  async deleteWebhook() {
    if (!this.initialized || !this.bot) {
      throw new Error('Bot not initialized');
    }

    try {
      const result = await this.bot.deleteWebHook();
      console.log('✅ Webhook deleted successfully');
      return result;
    } catch (error) {
      console.error('❌ Failed to delete webhook:', error.message);
      throw error;
    }
  }

  async getWebhookInfo() {
    if (!this.initialized || !this.bot) {
      throw new Error('Bot not initialized');
    }

    try {
      return await this.bot.getWebHookInfo();
    } catch (error) {
      console.error('❌ Failed to get webhook info:', error.message);
      throw error;
    }
  }

  async getBotInfo() {
    if (!this.initialized || !this.bot) {
      throw new Error('Bot not initialized');
    }

    try {
      return await this.bot.getMe();
    } catch (error) {
      console.error('❌ Failed to get bot info:', error.message);
      throw error;
    }
  }

  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  isInitialized() {
    return this.initialized;
  }

  getChatId() {
    return this.chatId;
  }

  setChatId(chatId) {
    this.chatId = chatId;
    console.log('✅ Telegram chat ID updated');
  }
}

// Create singleton instance
const telegramBotService = new TelegramBotService();

module.exports = telegramBotService;