import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronDown } from 'lucide-react';
import { refreshAOS } from '../utils/aos';
import useSectionTransition from '../hooks/useSectionTransition';

const Hero = () => {
  const { sectionProps } = useSectionTransition('home');
  
  useEffect(() => {
    refreshAOS();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      name: 'Email',
      icon: Mail,
      href: 'mailto:alisher.namozov@example.com',
      color: 'hover:text-red-600'
    }
  ];

  return (
    <section
      {...sectionProps}
      className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center text-white">
          {/* Title */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="0">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm{' '}
              <span
                data-aos="fade-in"
                data-aos-duration="1000"
                data-aos-delay="500"
                className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"
              >
                Alisher Namozov
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <p className="text-xl sm:text-2xl lg:text-3xl mb-4 text-white/90">
              Full-Stack Developer
            </p>
            <p className="text-lg sm:text-xl mb-8 text-white/80 max-w-3xl mx-auto">
              I create beautiful, functional, and user-friendly web applications
              using modern technologies like React.js, Node.js, and Express.js
            </p>
          </div>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download CV
            </motion.button>
          </div>

          {/* Social Links */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="900"
            className="flex items-center justify-center gap-6 mb-16"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos="zoom-in"
                  data-aos-duration="800"
                  data-aos-delay={900 + index * 100}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/10 backdrop-blur-sm rounded-lg text-white ${social.color} transition-colors hover:bg-white/20`}
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              );
            })}
          </div>

          {/* Scroll Down Icon */}
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="1200"
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ChevronDown className="h-8 w-8" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
