import { useState, useRef, useCallback, useMemo, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useIntersectionObserver } from '../../utils/performance/hooks/useIntersectionObserver';
import { useAnimationOptimizer } from '../../utils/performance/hooks/useAnimationOptimizer';
import { twMerge } from 'tailwind-merge';

// Define props interface
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animationData?: any;
  onClick?: () => void;
  animationDelay?: number;
}

// Pre-defined styles for better performance
const CARD_WRAPPER_CLASS = 'relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300';
const ANIMATION_OVERLAY_BASE_CLASS = 'absolute inset-0 transition-opacity duration-300';
const GLOW_EFFECT_BASE_CLASS = 'absolute -inset-2 bg-gradient-to-r rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10';

const AnimatedCard = ({
  children,
  className = '',
  gradient = 'from-blue-500 to-purple-500',
  animationData,
  onClick,
  animationDelay = 0,
}: AnimatedCardProps) => {
  // State and refs
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [setRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px 0px',
  });
  const animationQuality = useAnimationOptimizer();
  const prefersReducedMotion = useReducedMotion();
  const [animationLoaded, setAnimationLoaded] = useState(false);

  // Optimization flags
  const isAnimationDisabled = animationQuality === 'low' || prefersReducedMotion;
  
  // Combine refs using a callback ref pattern
  const setRefs = useCallback(
    (element: HTMLDivElement) => {
      setRef(element);
      cardRef.current = element;
    },
    [setRef]
  );

  // Performance optimization: only create animation variants once
  const cardVariants = useMemo(
    () => ({
      initial: { scale: 1 },
      hover: { scale: isAnimationDisabled ? 1 : 1.02 },
    }),
    [isAnimationDisabled]
  );

  // Memoize transition settings
  const transition = useMemo(
    () => ({
      type: 'spring',
      stiffness: 300,
      damping: 20,
      delay: animationDelay,
    }),
    [animationDelay]
  );

  // Optimized event handlers
  const handleAnimationLoad = useCallback(() => {
    setAnimationLoaded(true);
  }, []);

  const handlePlayerEvent = useCallback(
    (event: string) => {
      if (event === 'load') {
        handleAnimationLoad();
      }
    },
    [handleAnimationLoad]
  );

  // Efficient state updates for hover
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  // Calculate whether animation should be rendered
  const shouldRenderAnimation = useMemo(
    () => Boolean(isVisible && isHovered && animationData && !isAnimationDisabled),
    [isVisible, isHovered, animationData, isAnimationDisabled]
  );

  // Prepare class names
  const glowEffectClass = twMerge(GLOW_EFFECT_BASE_CLASS, gradient);
  const animationOverlayClass = twMerge(
    ANIMATION_OVERLAY_BASE_CLASS,
    animationLoaded ? 'opacity-10' : 'opacity-0'
  );

  return (
    <motion.div
      ref={setRefs}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={transition}
      className={twMerge('relative group', className)}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={CARD_WRAPPER_CLASS}>
        {children}

        {/* Only render the Player when needed */}
        {shouldRenderAnimation && (
          <div className={animationOverlayClass} style={{ willChange: 'opacity' }}>
            <Player
              autoplay
              loop
              src={animationData}
              className="w-full h-full"
              style={{ position: 'absolute', top: 0, left: 0 }}
              onEvent={handlePlayerEvent}
              rendererSettings={{
                progressiveLoad: true,
                hideOnTransparent: true,
              }}
            />
          </div>
        )}
      </div>

      {/* Only render the glow effect if animations are enabled */}
      {!isAnimationDisabled && (
        <div className={glowEffectClass} style={{ willChange: 'opacity' }} />
      )}
    </motion.div>
  );
};

export default memo(AnimatedCard);