import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const MobileHero: React.FC = () => {
  const handleBookCall = () => {
    window.open('https://calendly.com/yoniinsell/30min', '_blank');
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center px-4 xs:px-5 sm:px-6 pt-24 xs:pt-28 sm:pt-32 pb-8 xs:pb-10 sm:pb-12 overflow-hidden touch-manipulation">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.15),transparent_100%)]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/[0.05] via-transparent to-blue-500/[0.05]"
        />
      </div>

      <div className="relative text-center max-w-[540px] mx-auto">
        {/* Subtle label / tagline */}
        <div
          className="group inline-flex px-4 sm:px-5 py-2 
          bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent
          rounded-full backdrop-blur-sm border border-blue-500/10
          shadow-[0_0_20px_rgba(59,130,246,0.1)]
          hover:border-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]
          transition-all duration-300"
        >
          <span className="text-blue-400 text-xs sm:text-sm font-medium flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-4 h-4 animate-[pulse_2s_ease-in-out_infinite]" />
            AI Solutions Tailored for Your Business
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[2rem] xs:text-[2.2rem] sm:text-[2.5rem] font-bold tracking-tight leading-[1.1] mt-4 xs:mt-5 sm:mt-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient"
          >
            Always Be Ahead
          </span>
          <div className="h-2" />
          <span className="text-white">AI Built Just For You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-[15px] xs:text-[16px] sm:text-[18px] mt-4 mb-6 xs:mb-8 sm:mb-10 leading-[1.6] max-w-[440px] xs:max-w-[460px] sm:max-w-[480px] mx-auto"
        >
          At Two Steps, our process is simple:
          <br className="block h-1" />
          <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent block">
            You Bring The Vision, We Bring It To Life.
          </span>
          <br className="block h-1" />
          We craft custom AI solutions, turning complex challenges into seamless automation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col xs:flex-row items-stretch justify-center gap-3 xs:gap-4 max-w-[400px] mx-auto"
        >
          {/* Book Call Button */}
          <motion.button
            onClick={handleBookCall}
            whileTap={{ scale: 0.98 }}
            className="w-full xs:flex-1 h-[52px] bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 active:shadow-none transition-all duration-300 touch-manipulation"
          >
            Book a Call
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Case Studies Button */}
          <Link to="/case-studies" className="w-full xs:flex-1">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full h-[52px] rounded-xl font-medium border border-gray-700 text-white hover:border-blue-400 hover:bg-blue-500/10 active:bg-blue-500/5 transition-all duration-300 backdrop-blur-sm touch-manipulation"
            >
              Case Studies
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileHero;