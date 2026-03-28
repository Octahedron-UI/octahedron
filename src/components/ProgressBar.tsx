import { cn } from '../lib/cn';
import styles from './ProgressBar.module.css';

export type ProgressBarProps = {
  /** Progress value from 0 to 100 */
  value: number;
  /** Bar color (CSS value, defaults to --gs-info) */
  color?: string;
  /** Bar height in pixels (default: 6) */
  height?: number;
  className?: string;
};

/**
 * Simple linear progress bar.
 *
 * @example
 * <ProgressBar value={42} />
 * <ProgressBar value={80} color="var(--gs-success)" height={8} />
 */
export function ProgressBar({ value, color, height, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  const vars = {
    ...(color ? { '--progress-color': color } : {}),
    ...(height ? { '--progress-height': `${height}px` } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={cn(styles.track, className)}
      style={vars}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
  );
}
