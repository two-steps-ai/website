import { useState, useEffect, useCallback, useRef } from 'react';

interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(options: IntersectionOptions = {}) {
  const [ref, setRef] = useState<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const frozen = useRef(false);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    // If we want to freeze the state once it becomes visible and it's already frozen, do nothing
    if (options.freezeOnceVisible && frozen.current) return;
    
    // Update visible state
    setIsVisible(entry.isIntersecting);
    
    // If we should freeze the state and the element is visible, freeze it
    if (options.freezeOnceVisible && entry.isIntersecting) {
      frozen.current = true;
    }
  }, []);

  useEffect(() => {
    if (!ref) return;

    // Reset frozen state when ref changes
    frozen.current = false;

    const observer = new IntersectionObserver(callback, {
      threshold: options.threshold || 0,
      rootMargin: options.rootMargin || '0px',
      root: options.root || null
    });

    // Use requestAnimationFrame to batch DOM reads/writes
    requestAnimationFrame(() => {
    observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [ref, callback, options.threshold, options.rootMargin, options.root]);

  return [setRef, isVisible] as const;
}