import { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useAnimationOptimizer } from '../../utils/performance/hooks/useAnimationOptimizer';
import { useBreakpoint } from '../../utils/responsive/hooks/useBreakpoint';
import { Breakpoint } from '../../utils/responsive/breakpoints';
import { twMerge } from 'tailwind-merge';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: 'high' | 'medium' | 'low';
}

// Memoized mapping function
const getDeviceCategory = (breakpoint: Breakpoint): 'mobile' | 'tablet' | 'desktop' => {
  if (breakpoint === 'xs' || breakpoint === 'sm') return 'mobile';
  if (breakpoint === 'md') return 'tablet';
  return 'desktop';
};

// Pre-defined background patterns to avoid recalculation
const GRID_PATTERN = `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='%23FFFFFF' fill-opacity='0.05'/%3E%3C/svg%3E")`;

// Pre-defined gradient animations to avoid object recreation
const GRADIENT_ANIMATIONS = {
  background: [
    'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(168,85,247,0.05), rgba(59,130,246,0.05))',
    'linear-gradient(to bottom right, rgba(168,85,247,0.05), rgba(59,130,246,0.05), rgba(168,85,247,0.05))',
    'linear-gradient(to bottom right, rgba(59,130,246,0.05), rgba(168,85,247,0.05), rgba(59,130,246,0.05))'
  ]
};

const AnimatedBackground = ({
  className = '',
  children,
  intensity = 'medium'
}: AnimatedBackgroundProps) => {
  const animationQuality = useAnimationOptimizer();
  const prefersReducedMotion = useReducedMotion();
  const breakpoint = useBreakpoint();
  const deviceCategory = getDeviceCategory(breakpoint);

  // Compute effective intensity based on motion preferences and device type
  const effectiveIntensity = useMemo(() => {
    if (prefersReducedMotion || animationQuality === 'low') return 'low';
    if (deviceCategory === 'mobile' && intensity === 'high') return 'medium';
    return intensity;
  }, [prefersReducedMotion, animationQuality, deviceCategory, intensity]);

  // Map intensity to duration - constant values to avoid recalculation
  const durationMap = { low: 20, medium: 15, high: 10 };
  const animationDuration = durationMap[effectiveIntensity];

  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use IntersectionObserver to toggle animation when the container is in view
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Only animate if visible and motion is not reduced
  const shouldAnimate = isVisible && !prefersReducedMotion;

  return (
    <div ref={containerRef} className={twMerge('relative overflow-hidden', className)}>
      {/* Render animated or static background */}
      {shouldAnimate ? (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5"
          animate={GRADIENT_ANIMATIONS}
          transition={{
            duration: animationDuration,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse'
          }}
          style={{ willChange: 'background' }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5" />
      )}

      {/* Static grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: GRID_PATTERN,
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

export default memo(AnimatedBackground);