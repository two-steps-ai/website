import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import SectionBackground from '../common/SectionBackground';

const team = [
  {
    name: "Jonathan Insell",
    role: "CEO & Founder", 
    image: "/Yoni.jpg",
    gradient: "from-blue-500 to-indigo-500",
    social: {
      linkedin: "https://www.linkedin.com/in/jonathan-charles-insell/",
      instagram: "#"
    }
  },
  {
    name: "Shay Bushary",
    role: "Head Developer",
    image: "/Shay.jpeg",
    gradient: "from-purple-500 to-pink-500",
    social: {
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Ziv Edri",
    role: "CFO",
    image: "/Ziv.jpeg",
    gradient: "from-amber-500 to-orange-500",
    social: {
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Tal Sumroy",
    role: "Head of AI",
    image: "/Tal.jpeg",
    gradient: "from-green-500 to-emerald-500",
    social: {
      linkedin: "#",
      instagram: "#"
    }
  }
];

const MobileTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
      (prevIndex + newDirection + team.length) % team.length
    ));
  };

  return (
    <SectionBackground
      id="team"
      className="py-16 px-4"
      gradient="from-blue-500/10 via-purple-500/10 to-blue-500/10"
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
            THE TEAM
          </span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[1.75rem] xs:text-[2rem] sm:text-[2.25rem] font-bold mb-4 block"
        >
          <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            We Are Ready To Provide Solutions
          </span>
        </motion.span>
      </div>

      <div className="relative h-[450px] overflow-hidden">
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
              <div
                className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-72">
                  {/* Image */}
                  <img
                    src={team[currentIndex].image}
                    alt={team[currentIndex].name}
                    className="w-full h-full object-cover transition-all duration-700 
                      group-hover:scale-110 
                      filter 
                      brightness-90 
                      group-hover:brightness-100 
                      group-hover:contrast-125"
                    loading="lazy"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative p-6 -mt-16">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {team[currentIndex].name}
                  </h3>
                  <p className={`text-sm font-medium bg-gradient-to-r ${team[currentIndex].gradient} bg-clip-text text-transparent mb-4`}>
                    {team[currentIndex].role}
                  </p>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <motion.a
                      href={team[currentIndex].social.linkedin}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg bg-gradient-to-r ${team[currentIndex].gradient} bg-opacity-50 hover:bg-opacity-75 transition-all duration-300`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </motion.a>
                    <motion.a
                      href={team[currentIndex].social.instagram}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 rounded-lg bg-gradient-to-r ${team[currentIndex].gradient} bg-opacity-50 hover:bg-opacity-75 transition-all duration-300`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4 text-white" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center items-center px-4 py-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-gray-900/60 border border-gray-800/50 flex items-center justify-center hover:bg-gray-800/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </motion.button>

            {/* Dots */}
            <div className="flex space-x-2">
              {team.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? `bg-gradient-to-r ${team[currentIndex].gradient}`
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
    </SectionBackground>
  );
};

export default MobileTeam;