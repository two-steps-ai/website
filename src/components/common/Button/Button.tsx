import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { getButtonClasses, getIconClasses } from './utils';
import type { ButtonProps, ButtonVariant, ButtonSize } from './types';

const LoadingSpinner: React.FC = React.memo(() => (
  <div role="status" className="absolute inset-0 flex items-center justify-center">
    <svg
      className="animate-spin h-5 w-5 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
));

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon: Icon,
      iconPosition = 'right',
      fullWidth = false,
      responsive = true,
      loading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const buttonClasses = getButtonClasses({
      variant: variant as ButtonVariant,
      size: size as ButtonSize,
      fullWidth,
      responsive,
      loading,
      disabled: isDisabled,
    });

    // Pre-calculate animation props if not disabled
    const hoverAnimation = isDisabled ? undefined : { scale: 1.02 };
    const tapAnimation = isDisabled ? undefined : { scale: 0.98 };

    const combinedClasses = `group ${buttonClasses} ${className}`;

    // Prepare motion props
    const motionProps: HTMLMotionProps<'button'> = {
      ref,
      whileHover: hoverAnimation,
      whileTap: tapAnimation,
      className: combinedClasses,
      disabled: isDisabled,
      'aria-busy': loading,
      ...(props as any), // Using any cast to avoid type conflicts
    };

    return (
      <motion.button {...motionProps}>
        {loading && <LoadingSpinner />}
        <span
          aria-live="polite"
          className={`inline-flex items-center ${loading ? 'invisible' : ''}`}
        >
          {Icon && iconPosition === 'left' && (
            <Icon className={getIconClasses('left', size as ButtonSize)} />
          )}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon className={getIconClasses('right', size as ButtonSize)} />
          )}
        </span>
      </motion.button>
    );
  }
);

ButtonComponent.displayName = 'Button';

export default React.memo(ButtonComponent);
