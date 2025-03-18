import { useEffect, useState } from 'react';

type AnimationQuality = 'high' | 'medium' | 'low';

export function useAnimationOptimizer(): AnimationQuality {
  const [quality, setQuality] = useState<AnimationQuality>('medium');

  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Optimize animations based on device capabilities
    const isLowPowerDevice = navigator.hardwareConcurrency <= 4;
    const isReducedMotion = prefersReducedMotion.matches;
    
    // Determine quality based on device capabilities
    let determinedQuality: AnimationQuality = 'high';
    
    if (isReducedMotion) {
      determinedQuality = 'low';
    } else if (isLowPowerDevice) {
      determinedQuality = 'medium';
    }
    
    // Update state
    setQuality(determinedQuality);
    
    // Apply optimizations
    document.documentElement.style.setProperty(
      '--animation-duration',
      isReducedMotion || isLowPowerDevice ? '0s' : '0.3s'
    );
    
    document.documentElement.style.setProperty(
      '--transition-duration',
      isReducedMotion || isLowPowerDevice ? '0s' : '0.3s'
    );
    
    // Disable hover effects on touch devices
    if ('ontouchstart' in window) {
      document.documentElement.classList.add('touch-device');
    }
  }, []);
  
  return quality;
}