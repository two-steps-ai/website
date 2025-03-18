import React, { memo } from 'react';
import clsx from 'clsx';
import { useBreakpoint } from '../../utils/responsive/hooks';

interface ResponsiveGridProps {
  children: React.ReactNode;
  /** Additional custom classes */
  className?: string;
  /** Number of columns for each breakpoint */
  cols?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl', number>>;
  /** Gap utility class (e.g., "gap-4", "gap-6") */
  gap?: string;
}

/** Default column configuration to prevent missing values */
const defaultCols: Required<ResponsiveGridProps['cols']> = {
  xs: 1,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 5
};

/** Converts a numeric col count into a Tailwind class (e.g., `grid-cols-3`). */
const getGridCols = (count?: number) =>
  count ? `grid-cols-${count}` : '';

/**
 * ResponsiveGrid applies a dynamic grid layout based on specified breakpoints.
 * Falls back to a default configuration when no `cols` prop is provided.
 */
const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = defaultCols,
  gap = 'gap-6'
}) => {
  const breakpoint = useBreakpoint();

  // Ensure safe column mapping
  const safeCols = { ...defaultCols, ...cols };

  // Build a string of classes like "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
  const gridColsClasses = Object.entries(safeCols)
    .map(([bp, count]) => (bp === 'xs' ? getGridCols(count) : `${bp}:${getGridCols(count)}`))
    .join(' ');

  return (
    <div
      className={clsx(
        'grid w-full max-w-full',
        gridColsClasses,
        breakpoint === 'xs' ? 'gap-3' : gap,
        className
      )}
      data-breakpoint={breakpoint}
    >
      {children}
    </div>
  );
};

export default memo(ResponsiveGrid);
