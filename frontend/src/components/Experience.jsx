import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { portfolioAPI } from '../services/api';
import { refreshAOS } from '../utils/aos';
import useSectionTransition from '../hooks/useSectionTransition';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('experience');
  const { sectionProps } = useSectionTransition('experience');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expResponse, eduResponse] = await Promise.all([
          portfolioAPI.getExperience(),
          portfolioAPI.getEducation()
        ]);
        setExperience(expResponse.data);
        setEducation(eduResponse.data);
      } catch (error) {
        console.error('Error fetching experience/education:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    refreshAOS();
  }, []);

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <section id="experience" className="section">
        <div className="container">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-secondary-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-secondary-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-secondary-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section {...sectionProps} className="section experience-bg">
      <div className="floating-elements">
        <div className="floating-element"></div>
        <div className="floating-element"></div>
        <div className="floating-element"></div>
      </div>
      <div className="container experience-content">
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
            Experience & Education
          </h2>
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            className="section-subtitle text-white/90"
          >
            My professional journey and academic background
          </p>
        </div>

        {/* Tab Navigation */}
        <div 
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
          className="flex justify-center mb-12"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-1 flex border border-white/30">
            <button
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay="800"
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-white hover:text-white/80'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Experience
            </button>
            <button
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay="900"
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-white hover:text-white/80'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Education
            </button>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {activeTab === 'experience' && (
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={exp.id}
                  data-aos="slide-right"
                  data-aos-duration="800"
                  data-aos-delay={1000 + index * 200}
                  className="relative pl-8 border-l-2 border-primary-200 last:border-l-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="card ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <Calendar className="h-4 w-4" />
                        {exp.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-4 w-4 text-primary-600" />
                      <span className="text-lg font-medium text-primary-600">
                        {exp.company}
                      </span>
                    </div>
                    
                    <p className="text-secondary-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  data-aos="slide-right"
                  data-aos-duration="800"
                  data-aos-delay={1000 + index * 200}
                  className="relative pl-8 border-l-2 border-primary-200 last:border-l-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="card ml-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <h3 className="text-xl font-semibold text-secondary-900">
                        {edu.degree}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-secondary-500">
                        <Calendar className="h-4 w-4" />
                        {edu.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <GraduationCap className="h-4 w-4 text-primary-600" />
                      <span className="text-lg font-medium text-primary-600">
                        {edu.institution}
                      </span>
                    </div>
                    
                    <p className="text-secondary-600 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Timeline Summary */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1800"
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div 
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="2000"
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-2xl font-bold text-secondary-900 mb-2">
              {experience.length}+
            </h4>
            <p className="text-secondary-600">Years Experience</p>
          </div>
          
          <div 
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="2200"
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-2xl font-bold text-secondary-900 mb-2">
              {education.length}
            </h4>
            <p className="text-secondary-600">Education</p>
          </div>
          
          <div 
            data-aos="zoom-in"
            data-aos-duration="800"
            data-aos-delay="2400"
            className="text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h4 className="text-2xl font-bold text-secondary-900 mb-2">
              2+
            </h4>
            <p className="text-secondary-600">Companies</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;