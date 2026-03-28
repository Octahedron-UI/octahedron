/**
 * NumericStepper - Compact control for adjusting integer values with +/- buttons.
 *
 * Use for bounded integer values where users typically make small adjustments
 * (e.g., priority boost -10 to +10, quantity 1-99).
 *
 * For unbounded or large-range numbers, use Input with type="number" instead.
 */

import { cn } from '../lib/cn';

import styles from './NumericStepper.module.css';

export type NumericStepperProps = {
  /** Current value */
  value: number;
  /** Callback when value changes */
  onValueChange: (value: number) => void;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step amount for each button press */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show + prefix for positive values */
  showPlusSign?: boolean;
  /** Additional class name */
  className?: string;
};

export function NumericStepper({
  value,
  onValueChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  showPlusSign = false,
  className,
}: NumericStepperProps) {
  const canDecrement = value - step >= min;
  const canIncrement = value + step <= max;

  const handleDecrement = () => {
    if (!disabled && canDecrement) {
      onValueChange(value - step);
    }
  };

  const handleIncrement = () => {
    if (!disabled && canIncrement) {
      onValueChange(value + step);
    }
  };

  const displayValue = showPlusSign && value > 0 ? `+${value}` : String(value);

  return (
    <div className={cn(styles.stepper, disabled && styles.disabled, className)}>
      <button
        type="button"
        className={styles.button}
        onClick={handleDecrement}
        disabled={disabled || !canDecrement}
        aria-label="Decrease"
      >
        −
      </button>
      <span className={styles.value} role="status" aria-live="polite" aria-atomic="true">{displayValue}</span>
      <button
        type="button"
        className={styles.button}
        onClick={handleIncrement}
        disabled={disabled || !canIncrement}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}
