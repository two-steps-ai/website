import React, { memo } from 'react';
import clsx from 'clsx';
import { useImagePreload } from '../../utils/performance/hooks';
import {
  getOptimalImageSize,
  generateSrcSet,
  imageLoadingPriority
} from '../../utils/performance/imageOptimization';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** The image source (path or URL) */
  src: string;
  /** Alt text for the image */
  alt: string;
  /** The sizes attribute for responsive images (default: "100vw") */
  sizes?: string;
  /** Priority for loading (maps to loading attributes) */
  priority?: 'high' | 'low';
  /** Additional class names */
  className?: string;
  /** Fallback container width for SSR (default: 1920) */
  fallbackWidth?: number;
}

/**
 * OptimizedImage utilizes dynamic srcsets and preloading to provide
 * a responsive, performance-friendly image component.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  priority = 'low',
  className = '',
  fallbackWidth = 1920,
  ...props
}) => {
  // Preload status from hook
  const isLoaded = useImagePreload(src);

  // Determine container width (client-side or fallback)
  const containerWidth =
    typeof window !== 'undefined' ? window.innerWidth : fallbackWidth;

  // Get optimal size for current container width
  const optimalSize = getOptimalImageSize(containerWidth);

  // Generate sizes up to 2x optimal size for high-res displays
  const imageSizes = [320, 640, 768, 1024, 1280, 1536, 1920].filter(
    size => size <= optimalSize * 2
  );

  // Create responsive srcSet
  const srcSet = generateSrcSet(src, imageSizes);

  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      srcSet={srcSet}
      className={clsx(
        'transition-opacity duration-300 ease-in-out',
        className,
        isLoaded ? 'opacity-100' : 'opacity-0'
      )}
      {...imageLoadingPriority[priority]}
      {...props}
    />
  );
};

export default memo(OptimizedImage);
