import { useEffect } from 'react';

export function useScrollLock(lock: boolean) {
  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  useEffect(() => {
    if (lock) {
      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      return () => {
        // Restore body scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        document.body.style.paddingRight = '';
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [lock, scrollY]);
}