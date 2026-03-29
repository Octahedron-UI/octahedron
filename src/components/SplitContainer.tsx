import {
  Children,
  forwardRef,
  isValidElement,
  useMemo,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Panel, type PanelProps } from './Panel';
import { Resizer } from './Resizer';
import { CompactDetailView } from './CompactDetailView';
import type { BreadcrumbItem } from './Breadcrumbs';
import styles from './SplitLayout.module.css';

type PanelChild = ReactElement<PanelProps>;

type SplitContainerProps = {
  children: ReactNode;
  /** Whether to render in compact mode (master-detail instead of side-by-side) */
  isCompact?: boolean;
  /** In compact mode: the panel ID currently shown as full-screen detail */
  activeCompactPanel?: string | null;
  /** Called when navigating back from compact detail view */
  onNavigateBack?: () => void;
  /** Called to navigate to a specific panel (closes panels after it) */
  onNavigateToPanel?: (panelId: string) => void;
  /** Label for the main panel (used as back button label in compact mode) */
  mainPanelTitle?: string;
  /** Panel IDs that are currently open, in order (for multi-level breadcrumbs) */
  openPanelIds?: string[];
};

/**
 * Container for multi-panel split layouts.
 *
 * Renders Panel children with resizers between them in side-by-side mode,
 * or as a master-detail view in compact mode.
 *
 * Use `useSelection` for selection state and `usePanelLayout` for width/compact mode.
 *
 * @example
 * ```tsx
 * const selection = useSelection({ urlParam: 'itemId' });
 * const layout = usePanelLayout({
 *   panelId: 'inspector',
 *   isOpen: selection.selectedId != null,
 *   storagePrefix: 'mypage',
 * });
 *
 * <SplitContainer
 *   ref={layout.containerRef}
 *   isCompact={layout.isCompact}
 *   activeCompactPanel={selection.selectedId ? 'inspector' : null}
 *   onNavigateBack={selection.deselect}
 * >
 *   <Panel id="main" flex>
 *     <Table onRowClick={(row) => selection.toggle(row.id)} />
 *   </Panel>
 *   <Panel
 *     id="inspector"
 *     width={layout.width}
 *     open={selection.selectedId != null}
 *     title="Details"
 *     onClose={selection.deselect}
 *     onWidthChange={layout.setWidth}
 *   >
 *     {selection.selectedId && <Inspector id={selection.selectedId} />}
 *   </Panel>
 * </SplitContainer>
 * ```
 */
export const SplitContainer = forwardRef<HTMLDivElement, SplitContainerProps>(
  function SplitContainer(
    {
      children,
      isCompact = false,
      activeCompactPanel,
      onNavigateBack,
      onNavigateToPanel,
      mainPanelTitle,
      openPanelIds = [],
    },
    ref,
  ) {
    // Extract Panel children
    const panels: PanelChild[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === Panel) {
        panels.push(child as PanelChild);
      }
    });

    // Separate main (flex) panel from fixed panels
    const mainPanel = panels.find((p) => p.props.flex);
    const fixedPanels = panels.filter((p) => !p.props.flex);

    // Build panel lookup by ID
    const panelsById = useMemo(() => {
      const map = new Map<string, PanelChild>();
      for (const panel of fixedPanels) {
        map.set(panel.props.id, panel);
      }
      return map;
    }, [fixedPanels]);

    // Build breadcrumb chain for compact mode
    const breadcrumbs = useMemo((): BreadcrumbItem[] => {
      if (!activeCompactPanel) return [];

      const items: BreadcrumbItem[] = [];

      // Main panel is always first - clicking goes back to main
      if (mainPanelTitle) {
        items.push({
          label: mainPanelTitle,
          onClick: onNavigateBack ?? (() => {}),
        });
      }

      // Add intermediate panels (all open panels before the active one)
      for (const panelId of openPanelIds) {
        if (panelId === activeCompactPanel) break;
        const panel = panelsById.get(panelId);
        if (panel) {
          const label =
            panel.props.label ??
            (typeof panel.props.title === 'string' ? panel.props.title : panelId);
          items.push({
            label,
            onClick: () => onNavigateToPanel?.(panelId),
          });
        }
      }

      // Active panel is last - no onClick (current page)
      const activePanel = panelsById.get(activeCompactPanel);
      if (activePanel) {
        const label =
          activePanel.props.label ??
          (typeof activePanel.props.title === 'string'
            ? activePanel.props.title
            : activeCompactPanel);
        items.push({
          label,
        });
      }

      return items;
    }, [
      activeCompactPanel,
      mainPanelTitle,
      onNavigateBack,
      onNavigateToPanel,
      openPanelIds,
      panelsById,
    ]);

    // Compact mode: master-detail navigation
    // Show main panel, with active panel as full-screen overlay
    if (isCompact) {
      const activePanel = activeCompactPanel
        ? fixedPanels.find((p) => p.props.id === activeCompactPanel)
        : null;

      return (
        <div ref={ref} className={styles.container} style={{ position: 'relative' }}>
          {mainPanel}
          {activePanel && (
            <CompactDetailView breadcrumbs={breadcrumbs}>
              {activePanel.props.children}
            </CompactDetailView>
          )}
        </div>
      );
    }

    // Side-by-side mode: render all panels with resizers between fixed panels
    const elements: ReactNode[] = [];

    for (let i = 0; i < panels.length; i++) {
      const panel = panels[i];
      const isFixed = !panel.props.flex;
      const isOpen = panel.props.open ?? true;

      // Add resizer before fixed-width panels (except first panel)
      if (isFixed && i > 0) {
        elements.push(
          <Resizer
            key={`resizer-${panel.props.id}`}
            visible={isOpen}
            currentWidth={panel.props.width ?? 400}
            onWidthChange={panel.props.onWidthChange ?? (() => {})}
            onReset={panel.props.onWidthReset ?? (() => {})}
            controlsId={panel.props.id}
          />,
        );
      }

      elements.push(panel);
    }

    return (
      <div ref={ref} className={styles.container}>
        {elements}
      </div>
    );
  },
);
