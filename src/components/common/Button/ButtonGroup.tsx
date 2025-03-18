import { FC, memo } from 'react';
import clsx from 'clsx';
import type { ButtonGroupProps } from './types';

// Predefined spacing classes based on orientation and size.
const spacingClasses = {
  horizontal: {
    sm: 'space-x-2 md:space-x-2',
    md: 'space-x-3 md:space-x-4',
    lg: 'space-x-4 md:space-x-6',
  },
  vertical: {
    sm: 'space-y-2',
    md: 'space-y-3',
    lg: 'space-y-4',
  },
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'md',
  className = '',
  responsive = true,
}) => {
  const baseClasses =
    orientation === 'horizontal'
      ? responsive
        ? 'flex flex-col md:flex-row w-full md:w-auto'
        : 'flex flex-row w-auto'
      : 'flex flex-col w-full md:w-auto';

  const spacingClass = spacingClasses[orientation][spacing];

  return (
    <div className={clsx(baseClasses, spacingClass, className)}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default memo(ButtonGroup);
