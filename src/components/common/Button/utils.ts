import { BUTTON_VARIANTS, BUTTON_SIZES, BUTTON_LAYOUT, BUTTON_STATES } from './constants';
import type { ButtonVariant, ButtonSize } from './types';

interface GetButtonClassesParams {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
  responsive: boolean;
  loading: boolean;
  disabled: boolean;
}

/**
 * Returns a string of classes for a button based on the given parameters.
 *
 * @param params - The parameters for button styling.
 * @returns The final className string.
 */
export const getButtonClasses = ({
  variant,
  size,
  fullWidth,
  responsive,
  loading,
  disabled,
}: GetButtonClassesParams): string => {
  const { base: variantBase, hover, active, focus, disabled: variantDisabled } = BUTTON_VARIANTS[variant];
  const { height, padding, fontSize } = BUTTON_SIZES[size];

  const classes: string[] = [];

  // Base layout styles.
  classes.push(BUTTON_LAYOUT.base);

  // Variant styles.
  classes.push(variantBase, hover, active, focus, variantDisabled);

  // Size styles.
  classes.push(height, padding, fontSize);

  // Layout adjustments.
  if (fullWidth) {
    classes.push(BUTTON_LAYOUT.fullWidth);
  }
  if (responsive) {
    classes.push(BUTTON_LAYOUT.responsive);
  }

  // State-based classes.
  if (loading) {
    classes.push(BUTTON_STATES.loading.base);
  }
  if (disabled) {
    classes.push(BUTTON_STATES.disabled.base);
  }

  return classes.join(' ');
};

/**
 * Returns a string of classes for an icon based on its position and button size.
 *
 * @param position - The position of the icon ('left' or 'right').
 * @param size - The size variant of the button.
 * @returns The final className string for the icon.
 */
export const getIconClasses = (position: 'left' | 'right', size: ButtonSize): string => {
  const { iconSize } = BUTTON_SIZES[size];
  const positionClass = position === 'left' ? BUTTON_LAYOUT.icon.left : BUTTON_LAYOUT.icon.right;
  return [iconSize, positionClass].join(' ');
};
