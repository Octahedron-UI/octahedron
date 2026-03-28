import { cn } from '../lib/cn';
import styles from './HamburgerButton.module.css';

export type HamburgerButtonProps = {
  open: boolean;
  onClick: () => void;
  className?: string;
};

export function HamburgerButton({ open, onClick, className }: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className={cn(styles.button, open && styles.open, className)}
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
    >
      <span className={styles.bar} />
      <span className={styles.bar} />
      <span className={styles.bar} />
    </button>
  );
}
