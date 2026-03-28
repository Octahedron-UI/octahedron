import { type ElementType, type ComponentPropsWithRef } from 'react';

import { cn } from '../lib/cn';
import styles from './Text.module.css';

type TextVariant = 'title' | 'label' | 'body' | 'caption' | 'overline';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

export type TextIntent = 'muted' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

export type TextProps<T extends ElementType = 'span'> = {
  variant?: TextVariant;
  as?: T;
  truncate?: boolean;
  intent?: TextIntent;
  mono?: boolean;
  italic?: boolean;
} & Omit<ComponentPropsWithRef<T>, 'as' | 'variant' | 'truncate' | 'intent' | 'mono' | 'italic'>;

const defaultElement: Record<TextVariant, TextElement> = {
  title: 'h1',
  label: 'span',
  body: 'p',
  caption: 'span',
  overline: 'span',
};

export function Text<T extends ElementType = 'span'>({
  variant = 'body',
  as,
  truncate,
  intent,
  mono,
  italic,
  className,
  ref,
  ...rest
}: TextProps<T>) {
  const Component = as ?? defaultElement[variant];

  return (
    <Component
      ref={ref}
      className={cn(
        styles[variant],
        truncate && styles.truncate,
        intent && styles[intent],
        mono && styles.mono,
        italic && styles.italic,
        className,
      )}
      {...rest}
    />
  );
}
