import React from 'react';
import { motion } from 'framer-motion';
import { useBreakpoint } from '../../../utils/responsive/hooks';
import { TYPOGRAPHY } from '../../../utils/typography/constants';
import clsx from 'clsx';

interface HeadingProps {
  children: React.ReactNode;
  level: 1 | 2 | 3;
  gradient?: boolean;
  className?: string;
  animate?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level,
  gradient = false,
  className = '',
  animate = false,
}) => {
  // Determine if the current viewport is mobile.
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'sm', 'md'].includes(breakpoint);

  // Use mobile or desktop typography settings.
  const typography = isMobile ? TYPOGRAPHY.mobile : TYPOGRAPHY.desktop;
  const variant = `h${level}` as 'h1' | 'h2' | 'h3';
  const styles = typography[variant];

  // Select the appropriate motion component based on heading level.
  const HeadingComponent = motion[`h${level}`];

  // Define motion props if animation is enabled.
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  // Combine class names for the heading.
  const headingClasses = clsx(
    isMobile ? `mobile-heading-${level}` : styles.size,
    'leading-[1.2]',
    styles.tracking,
    'font-bold',
    gradient && 'bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent',
    isMobile && 'text-left px-4',
    className
  );

  return (
    <HeadingComponent className={headingClasses} {...motionProps}>
      {children}
    </HeadingComponent>
  );
};

export default Heading;
