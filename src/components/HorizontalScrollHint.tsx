import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './HorizontalScrollHint.module.css';

export type HorizontalScrollHintProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scrollerClassName?: string;
  scrollerStyle?: CSSProperties;
  hideScrollbar?: boolean;
};

function computeCanScroll(el: HTMLElement) {
  const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
  if (maxScrollLeft <= 1) return { canScrollLeft: false, canScrollRight: false };

  const scrollLeft = el.scrollLeft;
  const canScrollLeft = scrollLeft > 1;
  const canScrollRight = scrollLeft < maxScrollLeft - 1;
  return { canScrollLeft, canScrollRight };
}

export function HorizontalScrollHint({
  children,
  className,
  style,
  scrollerClassName,
  scrollerStyle,
  hideScrollbar = false,
}: HorizontalScrollHintProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const { canScrollLeft: nextLeft, canScrollRight: nextRight } = computeCanScroll(el);
      setCanScrollLeft(nextLeft);
      setCanScrollRight(nextRight);
    };

    update();

    const onScroll = () => update();
    el.addEventListener('scroll', onScroll, { passive: true });

    const roSupported = typeof ResizeObserver !== 'undefined';
    const ro = roSupported ? new ResizeObserver(() => update()) : null;
    if (ro) {
      ro.observe(el);
      const content = el.firstElementChild;
      if (content instanceof HTMLElement) ro.observe(content);
    }

    const onWindowResize = ro ? null : () => update();
    if (onWindowResize) window.addEventListener('resize', onWindowResize, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScroll);
      ro?.disconnect();
      if (onWindowResize) window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  const rootClassName = useMemo(() => {
    return cn(
      styles.root,
      canScrollLeft && styles.canScrollLeft,
      canScrollRight && styles.canScrollRight,
      className,
    );
  }, [canScrollLeft, canScrollRight, className]);

  const scrollerCombined = useMemo(() => {
    return cn(styles.scroller, hideScrollbar && styles.hideScrollbar, scrollerClassName);
  }, [hideScrollbar, scrollerClassName]);

  return (
    <div className={rootClassName} style={style}>
      <div ref={scrollRef} className={scrollerCombined} style={scrollerStyle}>
        {children}
      </div>
    </div>
  );
}
