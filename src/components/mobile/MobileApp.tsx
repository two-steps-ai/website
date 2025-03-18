import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../../components/ParticleBackground';
import {
  MobileNavbar,
  MobileHero,
  MobileServices,
  MobileWhyUs,
  MobileProcess,
  MobileTeam,
  MobileFAQ,
  MobileFooter,
  ScrollToTop
} from '../../components/mobile';

const MobileApp: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Background Effects */}
      <div className="fixed inset-0">
        {/* Primary Gradient Orb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_100%)]"
        />
        
        {/* Secondary Gradient Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-tr from-purple-500/[0.15] via-transparent to-blue-500/[0.15]"
        />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[200vw] aspect-square 
          bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-blue-500/20 
          rounded-full blur-[100px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" 
        />
        
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[200vw] aspect-square 
          bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-500/20 
          rounded-full blur-[100px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          style={{ animationDelay: '2s' }}
        />
        
        {/* Grid Pattern & Particles */}
        <ParticleBackground />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        
        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <MobileNavbar />
        <main className="flex-1">
          <MobileHero />
          <MobileServices />
          <MobileWhyUs />
          <MobileProcess />
          <MobileTeam />
          <MobileFAQ />
        </main>
        <MobileFooter />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default MobileApp;