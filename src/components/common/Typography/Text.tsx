import React from 'react';
import { motion } from 'framer-motion';
import { useBreakpoint } from '../../../utils/responsive/hooks';
import { TYPOGRAPHY } from '../../../utils/typography/constants';
import clsx from 'clsx';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  type?: 'textHeavy' | 'interactive';
  gradient?: boolean;
  className?: string;
  animate?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  type = 'textHeavy',
  gradient = false,
  className = '',
  animate = false,
}) => {
  // Determine if the current viewport is mobile.
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'sm', 'md'].includes(breakpoint);
  const typography = isMobile ? TYPOGRAPHY.mobile : TYPOGRAPHY.desktop;
  const mobileAlignment = isMobile ? 'text-left' : '';

  // Compute typography classes based on the variant and type.
  const getTypographyClasses = (): string => {
    const styles = typography[variant];

    if (variant === 'body') {
      // For body variant, select type-specific styles.
      const bodyStyles = styles as {
        textHeavy: string;
        interactive: string;
        tracking: string;
      };
      return clsx(bodyStyles[type], 'leading-[1.8]', bodyStyles.tracking, mobileAlignment);
    } else {
      // For heading variants, use size and tracking values.
      const headingStyles = styles as {
        size: string;
        tracking: string;
      };
      return clsx(headingStyles.size, 'leading-[1.5]', headingStyles.tracking, mobileAlignment);
    }
  };

  const typographyClasses = getTypographyClasses();

  // Choose the appropriate HTML element wrapped with framer-motion.
  const Component = motion[variant === 'body' ? 'p' : variant];

  // Define motion props if animation is enabled.
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  return (
    <Component
      className={clsx(
        typographyClasses,
        gradient &&
          'bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent',
        className
      )}
      {...motionProps}
    >
      {children}
    </Component>
  );
};

export default Text;
