import React, { memo, ElementType } from 'react';
import clsx from 'clsx';
import { useBreakpoint } from '../../utils/responsive/hooks';

interface ResponsiveContainerProps<T extends ElementType = 'div'> {
  /** Child elements to be displayed inside and centered in the container. */
  children: React.ReactNode;
  /** Additional class names for styling. */
  className?: string;
  /** The HTML tag or React element to render as (default: 'div'). */
  as?: T;
  /** Maximum width breakpoint (sm, md, lg, xl, 2xl, or full). */
  maxWidth?: keyof typeof maxWidthClasses;
}

/** Maps the maxWidth prop to Tailwind CSS max-width classes. */
const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
} as const;

/**
 * A responsive container that automatically applies horizontal padding,
 * sets max-width, and centers content based on breakpoints.
 */
const ResponsiveContainer = <T extends ElementType = 'div'>({
  children,
  className = '',
  as,
  maxWidth = '2xl',
}: ResponsiveContainerProps<T>) => {
  const Component = as || 'div';
  const breakpoint = useBreakpoint() || '';

  const maxWidthClass = maxWidthClasses[maxWidth] || maxWidthClasses['2xl'];

  return (
    <Component
      className={clsx(
        'w-full mx-auto overflow-hidden px-4 sm:px-6 lg:px-8',
        maxWidthClass,
        className
      )}
      data-breakpoint={breakpoint}
    >
      {children}
    </Component>
  );
};

export default memo(ResponsiveContainer);
