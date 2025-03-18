// Create a cache for memoized calculations
const memoizationCache = new Map<string, any>();

// Optimize heavy calculations with memoization
export function memoizeCalculation<T>(
  calculation: () => T,
  dependencies: any[]
): T {
  const key = JSON.stringify(dependencies);
  
  if (!memoizationCache.has(key)) {
    memoizationCache.set(key, calculation());
  }
  
  return memoizationCache.get(key) as T;
}

// Add cache property to the function
// @ts-ignore - Adding cache property to function
memoizeCalculation.cache = null;

// Batch DOM updates using requestAnimationFrame
export function batchDOMUpdates(updates: (() => void)[]) {
  if (typeof window === 'undefined') return;
  
  let scheduled = false;
  const batch: (() => void)[] = [];

  updates.forEach(update => {
    batch.push(update);
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(() => {
        batch.forEach(fn => fn());
        batch.length = 0;
        scheduled = false;
      });
    }
  });
}

// Debounce events with proper cleanup
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), wait);
  };
}

// Throttle expensive operations
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  let lastResult: ReturnType<T>;
  let frameId: number;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      lastResult = func(...args);
      inThrottle = true;
      
      // Use requestAnimationFrame for smoother performance
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      });
    }
    return lastResult;
  };
}

// Optimize event listeners with passive flag
export function addPassiveEventListener(
  element: HTMLElement | Window,
  event: string,
  handler: EventListenerOrEventListenerObject
) {
  element.addEventListener(event, handler, { passive: true });
  return () => element.removeEventListener(event, handler);
}