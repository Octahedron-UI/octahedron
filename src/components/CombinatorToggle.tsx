import { cn } from '../lib/cn';
import type { FilterCombinator } from './table-filters';
import styles from './CombinatorToggle.module.css';

type CombinatorToggleProps = {
  value: FilterCombinator | undefined;
  onValueChange: (value: FilterCombinator) => void;
  className?: string;
};

export function CombinatorToggle({ value = 'and', onValueChange, className }: CombinatorToggleProps) {
  const handleClick = () => {
    onValueChange(value === 'and' ? 'or' : 'and');
  };

  return (
    <button
      type="button"
      className={cn(styles.pill, className)}
      onClick={handleClick}
      aria-label={`${value.toUpperCase()} - click to toggle`}
    >
      {value.toUpperCase()}
    </button>
  );
}
