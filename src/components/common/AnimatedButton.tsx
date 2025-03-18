import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
  gradient?: string;
  animationData?: any;
  disabled?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  icon: Icon,
  gradient = 'from-blue-500 to-purple-500',
  animationData,
  disabled = false
}) => {
  // Memoize hover and tap scale values based on disabled state.
  const hoverScale = useMemo(() => (disabled ? 1 : 1.02), [disabled]);
  const tapScale = useMemo(() => (disabled ? 1 : 0.98), [disabled]);

  // Combine base button classes with any additional classes.
  const buttonClasses = clsx(
    'group relative overflow-hidden rounded-xl font-medium transition-all duration-300',
    className
  );

  return (
    <motion.button
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: tapScale }}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </div>

      {/* Lottie Animation Overlay */}
      {animationData && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Player
            autoplay
            loop
            src={animationData}
            className="w-full h-full"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className={clsx(
          'absolute inset-0 bg-gradient-to-r opacity-90 transition-opacity duration-300 group-hover:opacity-100',
          gradient
        )}
      />
    </motion.button>
  );
};

export default React.memo(AnimatedButton);