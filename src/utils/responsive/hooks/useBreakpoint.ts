import { useState, useEffect } from 'react';
import { breakpoints, type Breakpoint } from '../breakpoints';

// Get current breakpoint based on window width
function getBreakpoint(): Breakpoint {
  const width = window.innerWidth;
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  if (width < breakpoints['2xl']) return 'xl';
  return '2xl';
}

export function useBreakpoint() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>(getBreakpoint());

  useEffect(() => {
    let timeoutId: number;

    function handleResize() {
      // Debounce resize events
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setCurrentBreakpoint(getBreakpoint());
      }, 100);
    }

    // Set initial breakpoint
    setCurrentBreakpoint(getBreakpoint());
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return currentBreakpoint;
}