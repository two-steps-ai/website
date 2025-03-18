import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/navigation/Navbar';
import Footer from '../../components/Footer/Footer';
import BackgroundGradient from '../../components/common/BackgroundGradient';
import CaseStudyCard from '../../components/CaseStudies/CaseStudyCard';
import CaseStudyModal from '../../components/CaseStudies/CaseStudyModal';
import { caseStudies } from '../../components/CaseStudies/data';
import { CaseStudy } from '../../components/CaseStudies/types';

// Inline CaseStudyGrid component
const CaseStudyGrid: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const handleCardClick = (study: CaseStudy) => {
    setSelectedCase(study);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  const handleBookCall = () => {
    console.log('Book a call clicked');
    // Implement booking functionality or navigation
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {caseStudies.map((study, index) => (
          <CaseStudyCard
            key={`case-study-${index}`}
            study={study}
            index={index}
            onSelect={() => handleCardClick(study)}
          />
        ))}
      </motion.div>

      {selectedCase && (
        <CaseStudyModal
          study={selectedCase}
          onClose={closeModal}
          onBookCall={handleBookCall}
        />
      )}
    </>
  );
};

const CaseStudies: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      
      <main className="flex-1 relative w-full">
        <BackgroundGradient>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-16">
            <motion.header
              className="text-center mb-12 sm:mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-4 block"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                CASE STUDIES
              </motion.span>
              
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                  Our Success Stories
                </span>
              </motion.h1>
              
              <motion.p
                className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover how we've helped businesses transform with AI
              </motion.p>
            </motion.header>

            <CaseStudyGrid />
          </div>
        </BackgroundGradient>
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(CaseStudies);