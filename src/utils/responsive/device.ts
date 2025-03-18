import { breakpoints } from './breakpoints';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function getDeviceType(): DeviceType {
  // Enhanced device detection with more precise breakpoints
  // Use more precise breakpoints with safety margins
  const width = Math.max(320, Math.min(window.innerWidth, window.document.documentElement.clientWidth));
  
  // Mobile: Up to md breakpoint (768px)
  if (width < breakpoints.md) return 'mobile';
  // Tablet: md to lg breakpoint (768px - 1024px)
  if (width < breakpoints.lg) return 'tablet';
  // Desktop: lg and above (1024px+)
  return 'desktop'; 
}

export function isTouchDevice(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

export const isMobileDevice = () => getDeviceType() === 'mobile';
export const isTabletDevice = () => getDeviceType() === 'tablet';
export const isDesktopDevice = () => getDeviceType() === 'desktop';