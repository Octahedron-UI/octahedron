import type { ReactNode } from 'react';

import { Check } from '@untitledui/icons/Check';

import { cn } from '../lib/cn';
import styles from './StepIndicator.module.css';

export type StepStatus = 'completed' | 'current' | 'upcoming';

export type Step = {
  key: string;
  label: ReactNode;
  status: StepStatus;
};

export type StepIndicatorProps = {
  steps: Step[];
  /** Callback when a completed step is clicked */
  onStepClick?: (key: string) => void;
  /** Accessible label for the navigation */
  ariaLabel?: string;
  className?: string;
};

/**
 * Step indicator for wizard/multi-step flows.
 * Current step is visually emphasized; completed steps are clickable.
 */
export function StepIndicator({
  steps,
  onStepClick,
  ariaLabel = 'Progress',
  className,
}: StepIndicatorProps) {
  return (
    <nav className={cn(styles.container, className)} aria-label={ariaLabel}>
      <ol className={styles.steps}>
        {steps.map((step, index) => {
          const isClickable = step.status === 'completed' && !!onStepClick;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.key} className={styles.step}>
              {isClickable ? (
                <button
                  type="button"
                  className={cn(styles.label, styles.completed)}
                  onClick={() => onStepClick(step.key)}
                  aria-label={`Go back to ${step.label}`}
                >
                  <Check size={14} className={styles.checkmark} aria-hidden />
                  {step.label}
                </button>
              ) : (
                <span
                  className={cn(styles.label, styles[step.status])}
                  aria-current={step.status === 'current' ? 'step' : undefined}
                >
                  {step.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden>
                  ·
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
