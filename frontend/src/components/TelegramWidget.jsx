import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';

const TelegramWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botUsername, setBotUsername] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');

  useEffect(() => {
    // Get bot username from environment or API
    const username = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
    if (username) {
      setBotUsername(username);
      setTelegramUrl(`https://t.me/${username}`);
    }
  }, []);

  const handleStartChat = () => {
    if (telegramUrl) {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Don't render if no bot username is configured
  if (!botUsername) {
    return null;
  }

  return (
    <>
      {/* Floating Telegram Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-colors duration-200 relative"
          aria-label="Open Telegram chat"
        >
          <MessageCircle className="h-6 w-6" />
          
          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.button>
      </motion.div>

      {/* Telegram Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Telegram Chat</h3>
                  <p className="text-blue-100 text-sm">@{botUsername}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-blue-100 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-blue-500" />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Chat with me on Telegram
                </h4>
                
                <p className="text-gray-600 mb-6 text-sm">
                  Get instant responses and stay connected! Click the button below to start a conversation on Telegram.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Instant messaging</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>File sharing</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Quick responses</span>
                  </div>
                </div>

                <motion.button
                  onClick={handleStartChat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Start Chat on Telegram</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.button>

                <p className="text-xs text-gray-400 mt-3">
                  You'll be redirected to Telegram app or web
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Powered by Telegram • End-to-end encrypted
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TelegramWidget;