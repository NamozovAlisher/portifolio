import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { refreshAOS } from '../utils/aos';
import useSectionTransition from '../hooks/useSectionTransition';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const { sectionProps } = useSectionTransition('contact');

  useEffect(() => {
    refreshAOS();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user starts typing
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      setLoading(false);
      return;
    }

    try {
      const response = await portfolioAPI.sendContactMessage(formData);
      const successMessage = telegramUsername 
        ? `${response.message} I'll also get notified on Telegram instantly!`
        : response.message;
      setStatus({ type: 'success', message: successMessage });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Failed to send message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'alishernamozov286@gmail.com',
      href: 'mailto:alisher.namozov@example.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+998 XX XXX XX XX',
      href: 'tel:+998XXXXXXXXX'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Bukhara, Uzbekistan',
      href: 'https://maps.google.com/?q=Tashkent,Uzbekistan'
    }
  ];

  // Add Telegram to contact info if configured
  const telegramUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
  if (telegramUsername) {
    contactInfo.push({
      icon: MessageCircle,
      title: 'Telegram',
      value: `@${telegramUsername}`,
      href: `https://t.me/${telegramUsername}`
    });
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/alisher-namozov',
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/alisher-namozov',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/alisher_namozov',
      color: 'hover:text-blue-400'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section {...sectionProps} className="section contact-bg">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      <div className="container contact-content">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="0"
          className="text-center mb-16"
        >
          <h2 
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="section-title text-white"
          >
            Get In Touch
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            className="section-subtitle text-white/90"
          >
            Let's work together to bring your ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="600"
          >
            <h3 
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="800"
              className="text-2xl font-bold text-white mb-6"
            >
              Let's Connect
            </h3>
            <p 
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="1000"
              className="text-white/80 mb-8 text-lg"
            >
              I'm always interested in hearing about new opportunities, creative projects, 
              or just having a chat about technology and development.
            </p>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-aos="slide-right"
                    data-aos-duration="800"
                    data-aos-delay={1200 + index * 150}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all group border border-white/30"
                  >
                    <div className="w-12 h-12 bg-white/30 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                      <Icon className="h-6 w-6 text-white group-hover:text-primary-600 transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{info.title}</h4>
                      <p className="text-white/80">{info.value}</p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="1600"
                className="text-lg font-semibold text-white mb-4"
              >
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-aos="zoom-in"
                      data-aos-duration="600"
                      data-aos-delay={1700 + index * 100}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-white/20 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all text-white border border-white/30 ${social.color}`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="800"
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="1000"
              className="text-2xl font-bold text-secondary-900 mb-6"
            >
              Send a Message
            </h3>

            {status.message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-6 p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700' 
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}
              >
                {status.message}
              </motion.div>
            )}

            <form 
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="1200"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="textarea"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;