import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SectionBackground from '../common/SectionBackground';
import { services } from '../../data/services';
import ServiceModal from '../ServiceModal';
import type { Service } from '../../types/services';

const MobileServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleBookCall = () => {
    window.open('https://calendly.com/yoniinsell/30min', '_blank');
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (
      (prevIndex + newDirection + services.length) % services.length
    ));
  };

  return (
    <SectionBackground
      id="services"
      className="py-12 px-4"
      gradient="from-purple-500/10 via-blue-500/10 to-purple-500/10"
    >
      <div className="text-center mb-12">
        {/* Subtle label / tagline */}
        <div
          className="group inline-flex px-4 py-2 
          bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent
          rounded-full backdrop-blur-sm border border-blue-500/10
          shadow-[0_0_20px_rgba(59,130,246,0.1)]
          hover:border-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]
          transition-all duration-300 mb-4"
        >
          <span className="text-blue-400 text-xs font-medium flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 animate-[pulse_2s_ease-in-out_infinite]" />
            OUR SERVICES
          </span>
        </div>
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] xs:text-[2rem] sm:text-[2.25rem] font-bold mb-4 block"
        >
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Automate Roles, Not Just Tasks
          </span>
        </motion.span>
      </div>

      <div className="relative h-[280px] overflow-hidden mb-8">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }} 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full" 
          >
            <div className="w-full px-4">
              <div className={`relative overflow-hidden rounded-2xl backdrop-blur-xl p-[2px] ${
                services[currentIndex].featured 
                  ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
                  : 'bg-gray-900/50 border border-gray-800/50'
              }`}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedService(services[currentIndex])}
                  className={`relative h-[220px] p-6 ${
                    services[currentIndex].featured
                      ? 'bg-[#0A0F1F]/95 rounded-2xl'
                      : 'bg-transparent'
                  }`}
                >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${services[currentIndex].gradient} p-[1px] flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
                      {React.createElement(services[currentIndex].icon, {
                        className: "w-5 h-5 text-white"
                      })}
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold bg-gradient-to-r ${services[currentIndex].gradient} bg-clip-text text-transparent`}>
                    {services[currentIndex].title}
                  </h3>
                </div>

                <p className="text-gray-400 text-base leading-relaxed mb-6">
                  {services[currentIndex].description}
                </p>

                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    className={`relative flex items-center text-sm font-medium bg-gradient-to-r ${services[currentIndex].gradient} bg-clip-text text-transparent hover:opacity-80 transition-colors group/btn`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transform -translate-x-2 group-hover/btn:translate-x-0 transition-all duration-300" />
                  </button>
                </div>
                
                {/* Hover Glow Effect */}
                <div className={`absolute -inset-2 bg-gradient-to-r ${services[currentIndex].gradient} rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10`} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center">
          <div className="flex items-center gap-3 mb-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-gray-900/60 border border-gray-800/50 flex items-center justify-center hover:bg-gray-800/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </motion.button>

            <div className="flex space-x-2">
              {services.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? `bg-gradient-to-r ${services[currentIndex].gradient}`
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full bg-gray-900/60 border border-gray-800/50 flex items-center justify-center hover:bg-gray-800/60 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        service={selectedService}
        onBookCall={handleBookCall}
      />
    </SectionBackground>
  );
};

export default MobileServices;