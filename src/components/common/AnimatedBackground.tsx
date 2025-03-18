import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAnimationOptimizer } from '../../utils/performance/hooks/useAnimationOptimizer';
import { useBreakpoint } from '../../utils/responsive/hooks/useBreakpoint';
import { Breakpoint } from '../../utils/responsive/breakpoints';
import clsx from 'clsx';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'high' | 'medium' | 'low';
}

// Map breakpoints to device categories
const getDeviceCategory = (breakpoint: Breakpoint): 'mobile' | 'tablet' | 'desktop' => {
  if (breakpoint === 'xs' || breakpoint === 'sm') return 'mobile';
  if (breakpoint === 'md') return 'tablet';
  return 'desktop';
};

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className = '',
  children,
  intensity = 'medium'
}) => {
  const animationQuality = useAnimationOptimizer();
  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useBreakpoint();
  const deviceCategory = getDeviceCategory(breakpoint);

  // Compute effective intensity based on motion preferences and device type.
  const effectiveIntensity = useMemo<'high' | 'medium' | 'low'>(() => {
    if (prefersReducedMotion || animationQuality === 'low') return 'low';
    if (deviceCategory === 'mobile' && intensity === 'high') return 'medium';
    return intensity;
  }, [prefersReducedMotion, animationQuality, deviceCategory, intensity]);

  // Memoize animation duration based on effective intensity.
  const animationDuration = useMemo<number>(() => {
    switch (effectiveIntensity) {
      case 'low': return 20;
      case 'medium': return 15;
      case 'high': 
      default: return 10;
    }
  }, [effectiveIntensity]);

  const [shouldAnimate, setShouldAnimate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to toggle animation when the container is in view.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldAnimate(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(container);
    
    return () => {
      observer.unobserve(container);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={clsx('relative overflow-hidden', className)}>
      {/* Animated Gradient Background */}
      {shouldAnimate && !prefersReducedMotion ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5"
          animate={{
            background: [
              'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(168,85,247,0.05), rgba(59,130,246,0.05))',
              'linear-gradient(to bottom right, rgba(168,85,247,0.05), rgba(59,130,246,0.05), rgba(168,85,247,0.05))',
              'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(168,85,247,0.05), rgba(59,130,246,0.05))'
            ]
          }}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse'
          }}
          style={{ willChange: 'background' }}
        />
      ) : (
        // Static gradient when animation is off or reduced motion is preferred.
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5" />
      )}

      {/* Static grid pattern for added texture */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px'
        }} 
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default React.memo(AnimatedBackground);
