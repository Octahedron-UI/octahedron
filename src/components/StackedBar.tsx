import { useState, type ReactNode } from 'react';

import { Skeleton } from './Skeleton';
import styles from './StackedBar.module.css';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type Segment = {
  /** Unique identifier for click handling and list keys */
  id: string;
  /** Numeric value for this segment */
  value: number;
  /** Background color (CSS value) */
  color: string;
  /** Legend label - can be string or ReactNode for custom formatting */
  label?: ReactNode;
};

export type StackedBarProps = {
  /** Segments to render in the bar */
  segments: Segment[];
  /** Total value for percentage calculation (defaults to sum of segments) */
  total?: number;
  /** Bar height in pixels */
  height?: number;
  /** Title displayed above the bar */
  title?: string;
  /** Show legend with colored dots below the bar */
  showLegend?: boolean;
  /** Message to show when all segments are empty */
  emptyMessage?: string;
  /** Label to show on the right side of the bar (e.g., "60/100") */
  label?: string;
  /** Enable interactive mode (hover effects, click handlers) */
  interactive?: boolean;
  /** Called when a segment or legend item is clicked (requires interactive=true) */
  onSegmentClick?: (id: string, index: number) => void;
  /** Show skeleton placeholder instead of the bar (nullable props pattern) */
  loading?: boolean;
  className?: string;
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Low-level stacked bar primitive.
 *
 * Renders proportional colored segments with optional legend and label.
 * For semantic use cases (coverage, supply breakdown), use wrapper components
 * like CoverageBar that handle colors and labels automatically.
 *
 * @example
 * // Non-interactive (inspectors, tables)
 * <StackedBar segments={[...]} showLegend />
 *
 * @example
 * // Interactive (dashboards)
 * <StackedBar
 *   segments={[{ id: 'overdue', value: 5, color: 'red', label: <><b>5</b> Overdue</> }]}
 *   interactive
 *   onSegmentClick={(id) => filterBy(id)}
 *   showLegend
 * />
 */
export function StackedBar({
  segments,
  total: explicitTotal,
  height = 8,
  title,
  showLegend = false,
  emptyMessage,
  label,
  interactive = false,
  onSegmentClick,
  loading = false,
  className,
}: StackedBarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className={`${styles.container} ${className ?? ''}`}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.barRow}>
          <div className={styles.bar} style={{ height }} />
          {label && (
            <span className={styles.label}>
              <Skeleton width="40px" />
            </span>
          )}
        </div>
        {showLegend && (
          <div className={styles.legend}>
            <Skeleton width="80px" />
            <Skeleton width="60px" />
          </div>
        )}
      </div>
    );
  }

  const segmentTotal = segments.reduce((sum, seg) => sum + seg.value, 0);
  const total = explicitTotal ?? segmentTotal;

  // Calculate percentage width, ensuring visible segments get at least 2px
  const pct = (value: number) =>
    total > 0 ? Math.max((value / total) * 100, value > 0 ? 2 : 0) : 0;

  // Filter to segments with values > 0 for rendering in bar
  const visibleSegments = segments.filter((seg) => seg.value > 0);

  // Legend items (segments with labels)
  const legendItems = segments.filter((seg) => seg.label);

  const handleClick = (seg: Segment, index: number) => {
    if (interactive && onSegmentClick) {
      onSegmentClick(seg.id, index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, seg: Segment, index: number) => {
    if ((e.key === 'Enter' || e.key === ' ') && interactive && onSegmentClick) {
      e.preventDefault();
      onSegmentClick(seg.id, index);
    }
  };

  const hoverHandlers = (id: string) =>
    interactive
      ? { onMouseEnter: () => setHoveredId(id), onMouseLeave: () => setHoveredId(null) }
      : {};

  // Empty state
  if (total === 0) {
    return (
      <div className={`${styles.container} ${className ?? ''}`}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.barRow}>
          <div className={styles.bar} style={{ height }} />
          {label && <span className={styles.label}>{label}</span>}
        </div>
        {emptyMessage && <div className={styles.emptyMessage}>{emptyMessage}</div>}
      </div>
    );
  }

  // Build segment title from label (extract text if ReactNode)
  const getSegmentTitle = (seg: Segment): string => {
    if (typeof seg.label === 'string') return seg.label;
    return `${seg.value}`;
  };

  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.barRow}>
        <div className={styles.bar} style={{ height }}>
          {visibleSegments.map((seg, i) => {
            const isHighlighted = interactive && hoveredId === seg.id;
            return (
              <div
                key={seg.id}
                className={`${styles.segment} ${interactive ? styles.interactive : ''} ${isHighlighted ? styles.highlighted : ''}`}
                style={{ width: `${pct(seg.value)}%`, backgroundColor: seg.color }}
                title={getSegmentTitle(seg)}
                onClick={() => handleClick(seg, i)}
                onKeyDown={(e) => handleKeyDown(e, seg, i)}
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                {...hoverHandlers(seg.id)}
              />
            );
          })}
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </div>

      {showLegend && (
        <div className={`${styles.legend} ${legendItems.length === 2 ? styles.twoItems : ''}`}>
          {legendItems.map((seg, i) => {
            const isHighlighted = interactive && hoveredId === seg.id;
            return (
              <span
                key={seg.id}
                className={`${styles.legendItem} ${interactive ? styles.interactive : ''} ${isHighlighted ? styles.highlighted : ''}`}
                onClick={() => handleClick(seg, i)}
                onKeyDown={(e) => handleKeyDown(e, seg, i)}
                role={interactive ? 'button' : undefined}
                tabIndex={interactive ? 0 : undefined}
                {...hoverHandlers(seg.id)}
              >
                <span className={styles.legendDot} style={{ backgroundColor: seg.color }} />
                {seg.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
