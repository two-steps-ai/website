import React, { Suspense, lazy, useEffect, useState, memo, forwardRef } from 'react';
import clsx from 'clsx';

// Create a fallback component that aligns with expected Spline structure
const SplineFallback = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="w-full h-full flex items-center justify-center text-gray-400">
    Failed to load 3D scene
  </div>
));
SplineFallback.displayName = 'SplineFallback';

/**
 * Lazy-load the @splinetool/react-spline component,
 * providing a fallback UI for loading errors.
 */
const Spline = lazy(() =>
  import('@splinetool/react-spline').catch(error => {
    console.error('Failed to load Spline component:', error);
    return { default: SplineFallback };
  })
);

/** Props for SplineScene component. */
interface SplineSceneProps {
  /** The URL or identifier for the 3D scene. */
  scene: string;
  /** Additional class names for styling the embedded scene. */
  className?: string;
  /** Eager or lazy loading of the 3D scene. */
  loading?: 'eager' | 'lazy';
  /** Quality setting placeholder (not currently used by the library). */
  quality?: 'low' | 'medium' | 'high';
}

/**
 * SplineScene loads a 3D scene from Spline (@splinetool/react-spline).
 * - If loading="lazy", IntersectionObserver triggers loading when it enters the viewport.
 * - If loading="eager", it loads immediately.
 */
function BaseSplineScene({
  scene,
  className = '',
  loading = 'lazy'
  // quality param removed since it's not used
}: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(loading === 'eager');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (loading === 'lazy' && !shouldLoad) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin: '50px' }
      );

      // Observe the documentElement (or consider a containerRef).
      observer.observe(document.documentElement);
      return () => observer.disconnect();
    }
  }, [loading, shouldLoad]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Failed to load 3D scene
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      {shouldLoad && (
        <Spline
          scene={scene}
          className={clsx(className)}
          onError={(event: React.SyntheticEvent<HTMLDivElement>) => {
            console.error('Spline error:', event);
            setError(new Error('Failed to load 3D scene'));
          }}
        />
      )}
    </Suspense>
  );
}

export const SplineScene = memo(BaseSplineScene);