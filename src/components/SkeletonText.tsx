import { SkeletonBar } from './SkeletonBar';

import styles from './SkeletonText.module.css';

export type SkeletonTextProps = {
  /** Number of lines to render (default: 3) */
  lines?: number;
  /** Width of the last line (default: '60%') */
  lastLineWidth?: string;
  /** Size variant for the skeleton bars */
  size?: 'sm' | 'md' | 'lg';
};

/** Pseudo-random widths for skeleton lines to look natural */
const LINE_WIDTHS = ['100%', '95%', '85%', '90%', '80%'];

function getLineWidth(lineIndex: number, totalLines: number, lastLineWidth: string): string {
  if (lineIndex === totalLines - 1) return lastLineWidth;
  return LINE_WIDTHS[lineIndex % LINE_WIDTHS.length];
}

export function SkeletonText({ lines = 3, lastLineWidth = '60%', size = 'md' }: SkeletonTextProps) {
  return (
    <div className={styles.container} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBar key={i} width={getLineWidth(i, lines, lastLineWidth)} size={size} />
      ))}
    </div>
  );
}
