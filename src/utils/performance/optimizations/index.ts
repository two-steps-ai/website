// Export all optimizations from a single entry point
export * from './bundleOptimization';
export * from './imageOptimizer';
export * from './cacheOptimizer';
export * from './iconOptimizer';

// Add type declaration for Node.js process.env
declare const process: {
  env: {
    NODE_ENV: string;
  };
};

// Performance monitoring
export const measurePerformance = (label: string, fn: () => void) => {
  if (process.env.NODE_ENV === 'development') {
    console.time(label);
    fn();
    console.timeEnd(label);
  } else {
    fn();
  }
};