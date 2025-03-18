import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import { useBreakpoint } from '../../utils/responsive/hooks';

interface ResponsiveGridProps {
  children: React.ReactNode;
  /** Additional custom classes */
  className?: string;
  /** Number of columns for each breakpoint */
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  /** Gap utility class (e.g., "gap-4", "gap-6") */
  gap?: string;
}

/** Converts a numeric col count into a Tailwind class (e.g., `grid-cols-3`). */
const getGridCols = (count: number) => `grid-cols-${count}`;

/**
 * ResponsiveGrid applies a dynamic grid layout based on specified breakpoints.
 * Falls back to a default config of 1 col on xs, 2 cols on sm, and 3 cols on lg.
 */
const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className = '',
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = 'gap-6',
}) => {
  const breakpoint = useBreakpoint();

  const gridColsClasses = useMemo(() => {
    const validBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

    return validBreakpoints
      .filter(bp => cols[bp as keyof typeof cols] !== undefined)
      .map(bp => {
        const count = cols[bp as keyof typeof cols];
        return bp === 'xs'
          ? getGridCols(count!)
          : `${bp}:${getGridCols(count!)}`;
      })
      .join(' ');
  }, [cols]);

  const gapClass = useMemo(() => {
    return breakpoint === 'xs' ? 'gap-3' : gap;
  }, [breakpoint, gap]);

  return (
    <div
      className={clsx(
        'grid w-full max-w-full',
        gridColsClasses,
        gapClass,
        className
      )}
      data-breakpoint={breakpoint}
    >
      {children}
    </div>
  );
};

export default memo(ResponsiveGrid);
