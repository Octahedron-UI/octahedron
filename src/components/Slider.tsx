import { cn } from '../lib/cn';
import styles from './Slider.module.css';

export type SliderProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onValueChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
};

export function Slider({ min, max, step, value, onValueChange, className, disabled }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      disabled={disabled}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className={cn(styles.slider, className)}
    />
  );
}
