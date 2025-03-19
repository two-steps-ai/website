import { ComponentType } from 'react';

// Chunk loading states - use a more efficient data structure
const chunkState = new Map<string, 'loading' | 'loaded'>();

/**
 * Optimizes dynamic imports with efficient chunk management and retry logic
 */
export function optimizeDynamicImport<T>(
  importFn: () => Promise<{ default: T }>,
  chunkName?: string,
  retries = 2
): Promise<{ default: T }> {
  // Early return if chunk is already loaded
  if (chunkName && chunkState.get(chunkName) === 'loaded') {
    return importFn();
  }
  
  return new Promise((resolve, reject) => {
    const attempt = (retriesLeft: number) => {
      // Track chunk loading
      if (chunkName) {
        chunkState.set(chunkName, 'loading');
      }

      importFn()
        .then((module) => {
          if (chunkName) {
            chunkState.set(chunkName, 'loaded');
          }
          resolve(module);
        })
        .catch((error) => {
          if (retriesLeft === 0) {
            console.error(`Dynamic import failed${chunkName ? ` for ${chunkName}` : ''}:`, error);
            if (chunkName) {
              chunkState.delete(chunkName);
            }
            reject(error);
            return;
          }
          
          // Exponential backoff with jitter for better network resilience
          const baseDelay = Math.pow(2, 2 - retriesLeft) * 500;
          const jitter = Math.random() * 300;
          setTimeout(() => attempt(retriesLeft - 1), baseDelay + jitter);
        });
    };
    
    attempt(retries);
  });
}

/**
 * Preload components based on priority
 */
export function preloadComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  priority: 'high' | 'low' = 'low'
): void {
  const preloader = () => {
    importFn().catch(() => {
      // Silent catch to avoid console errors for preloads
    });
  };

  if (priority === 'high') {
    // Use microtask for high priority to load even sooner
    queueMicrotask(preloader);
  } else {
    // Use native requestIdleCallback with timeout fallback
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(preloader, { timeout: 2000 });
    } else {
      setTimeout(preloader, 100);
    }
  }
}

/**
 * Prefetches JS chunks using resource hints
 * Uses modern link preload for critical assets
 */
export function prefetchChunk(chunk: string, isPriority = false): void {
  if (chunkState.has(chunk)) {
    return;
  }

  const link = document.createElement('link');
  // Use preload for high priority assets (more immediate than prefetch)
  link.rel = isPriority ? 'preload' : 'prefetch';
  link.as = 'script';
  link.href = `/assets/${chunk}.js`;
  
  // Add to DOM and record state
  document.head.appendChild(link);
  chunkState.set(chunk, 'loading');
  
  // Clean up link element after it's done (for preload)
  if (isPriority) {
    link.onload = () => {
      chunkState.set(chunk, 'loaded');
      // Optional: remove the link element after loading
      // document.head.removeChild(link);
    };
    link.onerror = () => {
      chunkState.delete(chunk);
      // Optional: remove the link element after error
      // document.head.removeChild(link);
    };
  }
}

/**
 * Batch prefetch multiple chunks at once
 */
export function prefetchChunks(chunks: string[]): void {
  if (chunks.length === 0) return;
  
  // Use requestIdleCallback to avoid impacting main thread
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      chunks.forEach(chunk => prefetchChunk(chunk));
    });
  } else {
    setTimeout(() => {
      chunks.forEach(chunk => prefetchChunk(chunk));
    }, 200);
  }
}