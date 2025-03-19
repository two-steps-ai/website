// Enhanced image optimization utilities
export interface ImageOptimizationConfig {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  priority?: 'high' | 'low' | 'auto';
  sizes?: string;
  placeholder?: boolean;
}

// Pre-defined size configurations for different viewports
export const RESPONSIVE_SIZES = {
  mobile: '100vw',
  tablet: '50vw',
  desktop: '33vw',
  hero: '100vw',
  thumbnail: '350px',
  card: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw'
};

// Cache for optimized URLs to prevent redundant processing
const urlCache = new Map<string, string>();

/**
 * Generates an optimized image URL with transformation parameters
 */
export function getOptimizedImageUrl(
  url: string,
  config: ImageOptimizationConfig = {}
): string {
  // Return early for external URLs that can't be optimized
  if (url.startsWith('http') && !url.includes(window.location.hostname)) {
    return url;
  }
  
  // Default configuration
  const {
    quality = 80,
    format = 'webp',
    width,
    height
  } = config;

  // Generate cache key
  const cacheKey = `${url}|${quality}|${format}|${width || ''}|${height || ''}`;
  
  // Return from cache if available
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!;
  }

  // Add optimization parameters to URL
  const params = new URLSearchParams();
  params.append('q', quality.toString());
  params.append('fm', format);
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  
  const separator = url.includes('?') ? '&' : '?';
  const optimizedUrl = `${url}${separator}${params.toString()}`;
  
  // Cache the result
  urlCache.set(cacheKey, optimizedUrl);
  
  return optimizedUrl;
}

/**
 * Generate responsive srcset with multiple widths
 */
export function generateResponsiveSrcSet(
  url: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536, 1920],
  format: 'webp' | 'avif' = 'webp'
): string {
  // Create a unique cache key for this srcset
  const cacheKey = `srcset:${url}|${widths.join('-')}|${format}`;
  
  if (urlCache.has(cacheKey)) {
    return urlCache.get(cacheKey)!;
  }
  
  const srcSet = widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, { width, format });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
  
  // Cache the result
  urlCache.set(cacheKey, srcSet);
  
  return srcSet;
}

/**
 * Generate complete image attributes for responsive images
 */
export function generateImageAttributes(
  src: string,
  config: ImageOptimizationConfig = {}
): {
  src: string;
  srcSet: string;
  sizes: string;
  loading: 'lazy' | 'eager';
  decoding: 'async' | 'sync';
  fetchPriority: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  style?: Record<string, any>;
  onLoad?: () => void;
} {
  // Default configuration with better defaults
  const {
    priority = 'low',
    sizes = RESPONSIVE_SIZES.card,
    width,
    height,
    placeholder = false,
  } = config;

  // Determine appropriate widths based on usage
  const widths = width && width < 1000 
    ? [width/2, width, width*2].filter(w => w <= 1920)
    : [320, 640, 768, 1024, 1280, 1536, 1920];
  
  const srcSet = generateResponsiveSrcSet(src, widths);
  const optimizedSrc = getOptimizedImageUrl(src, config);

  // Properly typed loading and decoding values
  const loadingValue = priority === 'high' ? 'eager' as const : 'lazy' as const;
  const decodingValue = priority === 'high' ? 'sync' as const : 'async' as const;

  // Basic attributes
  const attributes = {
    src: optimizedSrc,
    srcSet,
    sizes,
    loading: loadingValue,
    decoding: decodingValue,
    fetchPriority: priority,
    width,
    height,
  };

  // Add blur placeholder functionality if requested
  if (placeholder) {
    return {
      ...attributes,
      style: { 
        backgroundColor: 'rgba(0,0,0,0.1)',
        transition: 'filter 0.3s ease-out'
      },
      onLoad: () => {
        // Clear the blur effect when image loads
        const img = document.querySelector(`img[src="${optimizedSrc}"]`) as HTMLImageElement;
        if (img) {
          img.style.filter = 'none';
          img.style.backgroundColor = 'transparent';
        }
      }
    };
  }

  return attributes;
}

/**
 * Preload critical images
 */
export function preloadCriticalImages(urls: string[]): void {
  if (typeof document === 'undefined') return;
  
  // Don't preload too many images
  const imagesToPreload = urls.slice(0, 3);
  
  imagesToPreload.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageUrl(url, { 
      format: 'webp',
      quality: 60, // Lower quality for faster loading
      width: 1280 
    });
    
    document.head.appendChild(link);
  });
}

/**
 * Image placeholder component properties
 */
export function getLQIPProps(src: string, width?: number, height?: number) {
  return {
    src: getOptimizedImageUrl(src, { 
      width: width ? Math.min(width, 40) : 40, 
      height: height ? Math.min(height, 40) : 40,
      quality: 20 
    }),
    style: {
      filter: 'blur(20px)',
      transform: 'scale(1.1)',
      objectFit: 'cover' as const,
      width: '100%',
      height: '100%',
    }
  };
}