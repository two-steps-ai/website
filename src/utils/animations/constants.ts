/**
 * Animation timing constants in milliseconds
 */
export const TIMING = {
  default: 300,
  fast: 200,
  slow: 500
};

/**
 * Animation easing functions
 */
export const EASINGS = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)', // Standard material design easing
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)' // Added decelerate since it's used in optimized.ts
}; 