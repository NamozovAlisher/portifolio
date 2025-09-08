import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Smartphone } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { refreshAOS } from '../utils/aos';
import useSectionTransition from '../hooks/useSectionTransition';

const About = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sectionProps } = useSectionTransition('about');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await portfolioAPI.getProfile();
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    refreshAOS();
  }, []);

  const specialties = [
    {
      icon: Code2,
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces with React.js, TypeScript, and modern CSS frameworks.'
    },
    {
      icon: Database,
      title: 'Backend Development',
      description: 'Building robust APIs and server-side applications using Node.js, Express.js, and database technologies.'
    },
    {
      icon: Globe,
      title: 'Full-Stack Solutions',
      description: 'Developing complete web applications from concept to deployment with modern development practices.'
    },
    {
      icon: Smartphone,
      title: 'Responsive Design',
      description: 'Ensuring optimal user experience across all devices with mobile-first design principles.'
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

  if (loading) {
    return (
      <section id="about" className="section bg-secondary-50">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-secondary-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...sectionProps} className="section about-bg">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      <div className="container about-content">
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
            About Me
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            className="section-subtitle max-w-3xl mx-auto text-white/90"
          >
            {profileData?.bio || "Passionate developer creating amazing web experiences"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-delay="600"
          >
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-primary-200">
                <img
                  src="https://telegra.ph/file/24ca4dab9a99abe94de62.jpg"
                  alt={profileData?.name || "Alisher Namozov"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                data-aos="zoom-in"
                data-aos-duration="800"
                data-aos-delay="1000"
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center"
              >
                <Code2 className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="800"
            className="space-y-6"
          >
            <div data-aos="fade-up" data-aos-delay="1000">
              <h3 className="text-2xl font-bold text-white mb-4">
                {profileData?.title || "Full-Stack Developer"}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {profileData?.bio || "I'm passionate about creating digital experiences that make a difference. With expertise in modern web technologies, I build applications that are not only functional but also beautiful and user-friendly."}
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="1200" className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/90">Location:</span>
                <span className="text-sm text-white/80">{profileData?.location || "Uzbekistan"}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white/90">Email:</span>
                <span className="text-sm text-white/80">{profileData?.email || "alisher.namozov@example.com"}</span>
              </div>
            </div>

            <motion.div
              data-aos="zoom-in"
              data-aos-delay="1400"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1600"
          className="mt-20"
        >
          <h3
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="1800"
            className="text-3xl font-bold text-center text-white mb-12"
          >
            What I Do
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty, index) => {
              const Icon = specialty.icon;
              return (
                <motion.div
                  key={index}
                  data-aos="flip-up"
                  data-aos-duration="800"
                  data-aos-delay={2000 + index * 200}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card text-center group"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors">
                    <Icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-900 mb-3">
                    {specialty.title}
                  </h4>
                  <p className="text-secondary-600">
                    {specialty.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;