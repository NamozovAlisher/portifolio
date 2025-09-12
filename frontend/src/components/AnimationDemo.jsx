import React, { useEffect } from 'react';
import { refreshAOS } from '../utils/aos';

const AnimationDemo = () => {
  useEffect(() => {
    refreshAOS();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 py-20">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-20">
          <h1 
            data-aos="fade-down"
            data-aos-duration="1000"
            data-aos-delay="0"
            className="text-5xl font-bold text-white mb-4"
          >
            AOS Animation Demo
          </h1>
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            className="text-xl text-white/80"
          >
            Sequential appear and disappear animations
          </p>
        </div>

        {/* Sequential Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={item}
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={400 + index * 150}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Card {item}
              </h3>
              <p className="text-white/70">
                This card appears with a {150 * index}ms delay
              </p>
            </div>
          ))}
        </div>

        {/* Different Animation Types */}
        <div className="space-y-20">
          {/* Slide animations */}
          <div>
            <h2 
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="1400"
              className="text-3xl font-bold text-white mb-8"
            >
              Slide Animations
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div
                data-aos="slide-right"
                data-aos-duration="800"
                data-aos-delay="1600"
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Slide Right</h3>
                <p className="text-white/70">Animates from left to center</p>
              </div>
              <div
                data-aos="slide-left"
                data-aos-duration="800"
                data-aos-delay="1800"
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Slide Left</h3>
                <p className="text-white/70">Animates from right to center</p>
              </div>
            </div>
          </div>

          {/* Flip animations */}
          <div>
            <h2 
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="2000"
              className="text-3xl font-bold text-white mb-8"
            >
              Flip Animations
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div
                data-aos="flip-left"
                data-aos-duration="800"
                data-aos-delay="2200"
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Flip Left</h3>
                <p className="text-white/70">Rotates from Y-axis</p>
              </div>
              <div
                data-aos="flip-up"
                data-aos-duration="800"
                data-aos-delay="2400"
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Flip Up</h3>
                <p className="text-white/70">Rotates from X-axis</p>
              </div>
            </div>
          </div>

          {/* Zoom animations */}
          <div>
            <h2 
              data-aos="zoom-in"
              data-aos-duration="1000"
              data-aos-delay="2600"
              className="text-3xl font-bold text-white mb-8"
            >
              Zoom Animations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item, index) => (
                <div
                  key={item}
                  data-aos="zoom-in"
                  data-aos-duration="600"
                  data-aos-delay={2800 + index * 200}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{item}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Item {item}</h3>
                  <p className="text-white/70 text-sm">Zooms in with {200 * index}ms delay</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final message */}
        <div className="text-center mt-20">
          <p 
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="3600"
            className="text-2xl text-white/90 font-light"
          >
            ✨ All animations appear sequentially with perfect timing ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo;