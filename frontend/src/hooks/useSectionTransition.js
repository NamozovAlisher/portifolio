import { useEffect, useRef, useState } from 'react';
import { refreshAOS } from '../utils/aos';

export const useSectionTransition = (sectionId) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setIsExiting(false);
            // Refresh AOS when section becomes visible
            setTimeout(() => {
              refreshAOS();
            }, 100);
          } else if (isVisible) {
            // Section is leaving viewport
            setIsExiting(true);
            // Add exit animation
            if (sectionRef.current) {
              const aosElements = sectionRef.current.querySelectorAll('[data-aos]');
              aosElements.forEach((element, index) => {
                setTimeout(() => {
                  element.classList.add('aos-exit-animate');
                }, index * 50);
              });
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionId, isVisible]);

  // Clean up exit animations when section enters again
  useEffect(() => {
    if (isVisible && !isExiting && sectionRef.current) {
      const aosElements = sectionRef.current.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        element.classList.remove('aos-exit-animate');
      });
    }
  }, [isVisible, isExiting]);

  return {
    sectionRef,
    isVisible,
    isExiting,
    sectionProps: {
      ref: sectionRef,
      id: sectionId,
      className: `section ${isExiting ? 'section-exiting' : ''}`
    }
  };
};

export default useSectionTransition;