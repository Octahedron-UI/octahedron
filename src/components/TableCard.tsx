import type { CSSProperties, ReactNode } from 'react';

import { HorizontalScrollHint } from './HorizontalScrollHint';

export type TableCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scrollerStyle?: CSSProperties;
  hideScrollbar?: boolean;
};

export function TableCard({
  children,
  className,
  style,
  scrollerStyle,
  hideScrollbar = true,
}: TableCardProps) {
  return (
    <div className={className} style={style}>
      <HorizontalScrollHint
        hideScrollbar={hideScrollbar}
        scrollerStyle={{
          overflowX: 'auto',
          overflowY: 'hidden',
          maxWidth: '100%',
          ...scrollerStyle,
        }}
      >
        {children}
      </HorizontalScrollHint>
    </div>
  );
}
