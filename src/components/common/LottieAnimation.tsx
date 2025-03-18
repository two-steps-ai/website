import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import clsx from 'clsx';

interface LottieAnimationProps {
  /** The Lottie animation data object */
  animationData: any; // Ideally type this if you have a schema
  /** Additional classes for styling */
  className?: string;
  /** Whether the animation should loop */
  loop?: boolean;
  /** Whether the animation should autoplay */
  autoplay?: boolean;
  /** Playback speed of the animation */
  speed?: number;
  /** Additional inline styles for the component */
  style?: React.CSSProperties;
}

/**
 * A wrapper around the Lottie Player for displaying animations.
 */
const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  style = {}
}) => {
  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={animationData}
      speed={speed}
      className={clsx(className)}
      style={{
        willChange: 'transform',
        ...style
      }}
      aria-hidden="true"
    />
  );
};

export default React.memo(LottieAnimation);
