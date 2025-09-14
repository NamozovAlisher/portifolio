import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioAPI } from '../services/api';
import { refreshAOS } from '../utils/aos';
import useSectionTransition from '../hooks/useSectionTransition';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const { sectionProps } = useSectionTransition('skills');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await portfolioAPI.getSkills();
        setSkills(response.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
    refreshAOS();
  }, []);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <section id="skills" className="section">
        <div className="container">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-secondary-200 rounded w-96 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-20 bg-secondary-200 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...sectionProps} className="section skills-bg">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      <div className="container skills-content">
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
            Skills & Expertise
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            className="section-subtitle text-white/90"
          >
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Category Filter */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay={700 + index * 100}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-white text-primary-600 shadow-lg'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              data-aos="flip-left"
              data-aos-duration="800"
              data-aos-delay={1000 + index * 150}
              whileHover={{ scale: 1.02, y: -2 }}
              className="card group"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {skill.name}
                </h3>
                <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                  {skill.level}%
                </span>
              </div>
              
              <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-secondary-500 font-medium">
                  {skill.category}
                </span>
                <span className="text-xs text-secondary-400">
                  {skill.level >= 90 ? 'Expert' : 
                   skill.level >= 80 ? 'Advanced' : 
                   skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1800"
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="2000"
              className="card"
            >
              <h4 className="text-2xl font-bold text-primary-600 mb-2">
                {skills.length}+
              </h4>
              <p className="text-secondary-600">Technologies</p>
            </div>
            <div 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="2200"
              className="card"
            >
              <h4 className="text-2xl font-bold text-primary-600 mb-2">
                {categories.length - 1}
              </h4>
              <p className="text-secondary-600">Specializations</p>
            </div>
            <div 
              data-aos="zoom-in"
              data-aos-duration="800"
              data-aos-delay="2400"
              className="card"
            >
              <h4 className="text-2xl font-bold text-primary-600 mb-2">
                {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
              </h4>
              <p className="text-secondary-600">Average Proficiency</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;