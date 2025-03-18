import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlowEffectProps {
  /** Color key for the glow effect */
  color?: 'blue' | 'purple' | 'cyan';
  /** Base opacity value for the glow effect */
  opacity?: number;
  /** Blur amount for the glow effect (any valid CSS blur value) */
  blur?: string;
  /** Additional custom classes */
  className?: string;
}

/**
 * GlowEffect renders an animated, blurred glow using Framer Motion.
 * It supports color, opacity, blur, and additional styling via className.
 */
const GlowEffect: React.FC<GlowEffectProps> = ({
  color = 'blue',
  opacity = 0.1,
  blur = '100px',
  className = ''
}) => {
  const colors: Record<'blue' | 'purple' | 'cyan', string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500'
  };

  const glowColor = colors[color] || colors.blue; // Fallback in case of unexpected input

  return (
    <motion.div
      className={clsx('absolute rounded-full', glowColor, className)}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [opacity * 0.5, opacity, opacity * 0.5],
        scale: [0.9, 1.1, 0.9]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        filter: `blur(${blur})`,
        willChange: 'transform, opacity'
      }}
    />
  );
};

export default React.memo(GlowEffect);
