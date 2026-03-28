import { cn } from '../lib/cn';
import styles from './Divider.module.css';

export type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <hr className={cn(styles.divider, className)} />;
}
