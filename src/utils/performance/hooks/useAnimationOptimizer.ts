import { useEffect, useState, useMemo } from 'react';

type AnimationQuality = 'high' | 'medium' | 'low';

// Cache for device capability checks to avoid recalculations
const deviceCapabilities = {
  checked: false,
  isLowPower: false,
  prefersReducedMotion: false,
  isTouchDevice: false
};

export function useAnimationOptimizer(): AnimationQuality {
  const [quality, setQuality] = useState<AnimationQuality>('medium');

  useEffect(() => {
    // Only perform these checks once per session
    if (!deviceCapabilities.checked) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      deviceCapabilities.prefersReducedMotion = prefersReducedMotion.matches;
      
      // Check for low power device
      deviceCapabilities.isLowPower = 
        navigator.hardwareConcurrency <= 4 || 
        // Also check for mobile devices which might have more cores but lower GPU power
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Check for touch device
      deviceCapabilities.isTouchDevice = 'ontouchstart' in window;
      deviceCapabilities.checked = true;

      // Listen for changes to reduced motion preference
      prefersReducedMotion.addEventListener('change', (e) => {
        deviceCapabilities.prefersReducedMotion = e.matches;
        applyOptimizations();
      });
    }

    // Apply optimizations based on current capabilities
    applyOptimizations();
    
    function applyOptimizations() {
      // Determine quality
      let determinedQuality: AnimationQuality = 'high';
      
      if (deviceCapabilities.prefersReducedMotion) {
        determinedQuality = 'low';
      } else if (deviceCapabilities.isLowPower) {
        determinedQuality = 'medium';
      }
      
      // Update state
      setQuality(determinedQuality);
      
      // Set CSS variables
      const duration = deviceCapabilities.prefersReducedMotion || deviceCapabilities.isLowPower ? '0s' : '0.3s';
      document.documentElement.style.setProperty('--animation-duration', duration);
      document.documentElement.style.setProperty('--transition-duration', duration);
      
      // Toggle touch device class
      if (deviceCapabilities.isTouchDevice) {
        document.documentElement.classList.add('touch-device');
      } else {
        document.documentElement.classList.remove('touch-device');
      }
    }
  }, []);
  
  return quality;
}