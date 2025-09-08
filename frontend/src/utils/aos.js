import AOS from 'aos';

// Enhanced AOS configuration with exit animations
export const aosConfig = {
  // Main sections with enter and exit animations
  heroSection: {
    title: { animation: 'fade-up', duration: 1000, delay: 0, exit: 'fade-down' },
    subtitle: { animation: 'fade-in', duration: 1000, delay: 500, exit: 'fade-out' },
    description: { animation: 'fade-up', duration: 1000, delay: 300, exit: 'fade-down' },
    buttons: { animation: 'fade-up', duration: 1000, delay: 600, exit: 'fade-down' },
    social: { animation: 'fade-up', duration: 1000, delay: 900, exit: 'fade-down' },
    scroll: { animation: 'fade-up', duration: 1000, delay: 1200, exit: 'fade-down' }
  },

  aboutSection: {
    title: { animation: 'fade-down', duration: 1000, delay: 200, exit: 'fade-up' },
    subtitle: { animation: 'fade-up', duration: 1000, delay: 400, exit: 'fade-down' },
    image: { animation: 'fade-right', duration: 1200, delay: 600, exit: 'fade-left' },
    content: { animation: 'fade-left', duration: 1200, delay: 800, exit: 'fade-right' },
    icon: { animation: 'zoom-in', duration: 800, delay: 1000, exit: 'zoom-out' },
    button: { animation: 'zoom-in', duration: 800, delay: 1400, exit: 'zoom-out' },
    specialties: { animation: 'flip-up', duration: 800, delayStart: 2000, stagger: 200, exit: 'flip-down' }
  },

  skillsSection: {
    title: { animation: 'fade-down', duration: 1000, delay: 200, exit: 'fade-up' },
    subtitle: { animation: 'fade-up', duration: 1000, delay: 400, exit: 'fade-down' },
    filters: { animation: 'fade-up', duration: 800, delay: 600, exit: 'fade-down' },
    filterButtons: { animation: 'zoom-in', duration: 600, delayStart: 700, stagger: 100, exit: 'zoom-out' },
    skills: { animation: 'flip-left', duration: 800, delayStart: 1000, stagger: 150, exit: 'flip-right' },
    summary: { animation: 'fade-up', duration: 1000, delay: 1800, exit: 'fade-down' },
    summaryCards: { animation: 'zoom-in', duration: 800, delayStart: 2000, stagger: 200, exit: 'zoom-out' }
  },

  projectsSection: {
    title: { animation: 'fade-down', duration: 1000, delay: 200, exit: 'fade-up' },
    subtitle: { animation: 'fade-up', duration: 1000, delay: 400, exit: 'fade-down' },
    filters: { animation: 'fade-up', duration: 800, delay: 600, exit: 'fade-down' },
    filterButtons: { animation: 'zoom-in', duration: 600, delayStart: 700, stagger: 100, exit: 'zoom-out' },
    projects: { animation: 'fade-up', duration: 800, delayStart: 1000, stagger: 200, exit: 'fade-down' },
    viewAll: { animation: 'fade-up', duration: 800, delay: 1800, exit: 'fade-down' }
  },

  experienceSection: {
    title: { animation: 'fade-down', duration: 1000, delay: 200, exit: 'fade-up' },
    subtitle: { animation: 'fade-up', duration: 1000, delay: 400, exit: 'fade-down' },
    tabs: { animation: 'fade-up', duration: 800, delay: 600, exit: 'fade-down' },
    tabButtons: { animation: 'zoom-in', duration: 600, delayStart: 800, stagger: 100, exit: 'zoom-out' },
    items: { animation: 'slide-right', duration: 800, delayStart: 1000, stagger: 200, exit: 'slide-left' },
    summary: { animation: 'fade-up', duration: 1000, delay: 1800, exit: 'fade-down' },
    summaryCards: { animation: 'zoom-in', duration: 800, delayStart: 2000, stagger: 200, exit: 'zoom-out' }
  },

  contactSection: {
    title: { animation: 'fade-down', duration: 1000, delay: 200, exit: 'fade-up' },
    subtitle: { animation: 'fade-up', duration: 1000, delay: 400, exit: 'fade-down' },
    info: { animation: 'fade-right', duration: 1200, delay: 600, exit: 'fade-left' },
    infoTitle: { animation: 'fade-up', duration: 800, delay: 800, exit: 'fade-down' },
    infoDesc: { animation: 'fade-up', duration: 800, delay: 1000, exit: 'fade-down' },
    infoItems: { animation: 'slide-right', duration: 800, delayStart: 1200, stagger: 150, exit: 'slide-left' },
    socialTitle: { animation: 'fade-up', duration: 800, delay: 1600, exit: 'fade-down' },
    socialLinks: { animation: 'zoom-in', duration: 600, delayStart: 1700, stagger: 100, exit: 'zoom-out' },
    form: { animation: 'fade-left', duration: 1200, delay: 800, exit: 'fade-right' },
    formTitle: { animation: 'fade-up', duration: 800, delay: 1000, exit: 'fade-down' },
    formFields: { animation: 'fade-up', duration: 800, delay: 1200, exit: 'fade-down' }
  }
};

// Initialize AOS with custom configuration for exit animations
export const initAOS = () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out-cubic',
    once: false, // Changed to false to allow exit animations
    mirror: true, // Enable mirror for exit animations
    offset: 100,
    delay: 0,
    anchorPlacement: 'top-bottom',
    startEvent: 'DOMContentLoaded'
  });
};

// Refresh AOS (useful for dynamic content)
export const refreshAOS = () => {
  AOS.refresh();
};

// Section visibility manager
export class SectionManager {
  constructor() {
    this.currentSection = null;
    this.sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    this.init();
  }

  init() {
    // Create intersection observer for sections
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            this.handleSectionChange(sectionId);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of section is visible
        rootMargin: '-20% 0px -20% 0px' // Offset to trigger earlier
      }
    );

    // Observe all sections
    this.sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        this.observer.observe(section);
      }
    });
  }

  handleSectionChange(newSection) {
    if (this.currentSection && this.currentSection !== newSection) {
      this.exitSection(this.currentSection);
    }
    this.currentSection = newSection;
    this.enterSection(newSection);
  }

  exitSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      // Add exit animation class
      section.classList.add('aos-exit');
      
      // Find all AOS elements in the section and trigger exit animations
      const aosElements = section.querySelectorAll('[data-aos]');
      aosElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('aos-exit-animate');
        }, index * 50); // Stagger exit animations
      });
    }
  }

  enterSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      // Remove exit animation class
      section.classList.remove('aos-exit');
      
      // Find all AOS elements and reset them
      const aosElements = section.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        element.classList.remove('aos-exit-animate');
      });
      
      // Refresh AOS for this section
      AOS.refresh();
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Global section manager instance
let sectionManager = null;

// Initialize section manager
export const initSectionManager = () => {
  if (typeof window !== 'undefined') {
    sectionManager = new SectionManager();
  }
};

// Get section manager instance
export const getSectionManager = () => sectionManager;

// Generate AOS attributes for an element
export const getAOSProps = (config) => {
  return {
    'data-aos': config.animation,
    'data-aos-duration': config.duration,
    'data-aos-delay': config.delay,
    'data-aos-easing': config.easing || 'ease-in-out-cubic'
  };
};

// Generate staggered AOS props for list items
export const getStaggeredAOSProps = (config, index) => {
  const delay = config.delayStart + (index * config.stagger);
  return {
    'data-aos': config.animation,
    'data-aos-duration': config.duration,
    'data-aos-delay': delay,
    'data-aos-easing': config.easing || 'ease-in-out-cubic'
  };
};

// Sequential animations helper
export const createSequentialAnimation = (elements, baseDelay = 0, stagger = 200) => {
  return elements.map((element, index) => ({
    ...element,
    delay: baseDelay + (index * stagger)
  }));
};

// Animation presets for common patterns
export const animationPresets = {
  slideInSequence: (items, startDelay = 0) => 
    items.map((_, index) => ({
      animation: 'slide-right',
      duration: 800,
      delay: startDelay + (index * 150)
    })),
    
  fadeInStagger: (items, startDelay = 0) =>
    items.map((_, index) => ({
      animation: 'fade-up',
      duration: 600,
      delay: startDelay + (index * 100)
    })),
    
  zoomInSequence: (items, startDelay = 0) =>
    items.map((_, index) => ({
      animation: 'zoom-in',
      duration: 500,
      delay: startDelay + (index * 150)
    }))
};

export default {
  initAOS,
  refreshAOS,
  getAOSProps,
  getStaggeredAOSProps,
  aosConfig,
  animationPresets,
  createSequentialAnimation,
  SectionManager,
  initSectionManager,
  getSectionManager
};