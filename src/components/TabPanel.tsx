import {
  createContext,
  useContext,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { cn } from '../lib/cn';
import styles from './TabPanel.module.css';

export type TabPanelOrientation = 'horizontal' | 'vertical';

// Context for sharing active tab state
type TabPanelContextValue = {
  value: string;
  onValueChange: (value: string) => void;
  baseId: string;
  orientation: TabPanelOrientation;
};

const TabPanelContext = createContext<TabPanelContextValue | null>(null);

function useTabPanelContext() {
  const context = useContext(TabPanelContext);
  if (!context) {
    throw new Error('TabPanel components must be used within a TabPanelGroup');
  }
  return context;
}

// TabPanelGroup - Container that provides context
export type TabPanelGroupProps = {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: TabPanelOrientation;
  children: ReactNode;
  className?: string;
};

export function TabPanelGroup({ value, onValueChange, orientation = 'horizontal', children, className }: TabPanelGroupProps) {
  const baseId = useId();
  return (
    <TabPanelContext.Provider value={{ value, onValueChange, baseId, orientation }}>
      <div className={cn(styles.group, orientation === 'vertical' && styles.groupVertical, className)}>{children}</div>
    </TabPanelContext.Provider>
  );
}

// TabPanelList - Container for tab buttons
export type TabPanelListProps = {
  children: ReactNode;
  className?: string;
};

export function TabPanelList({ children, className }: TabPanelListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { onValueChange, orientation } = useTabPanelContext();

  const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
  const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const list = listRef.current;
    if (!list) return;

    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')
    );
    const currentIndex = tabs.indexOf(event.target as HTMLButtonElement);
    if (currentIndex === -1) return;

    let nextIndex: number | null = null;

    switch (event.key) {
      case nextKey:
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case prevKey:
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    nextTab.focus();
    const tabValue = nextTab.dataset.value;
    if (tabValue) onValueChange(tabValue);
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation={orientation}
      className={cn(styles.tabList, orientation === 'vertical' && styles.tabListVertical, className)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}

// TabPanelTab - Individual tab button
export type TabPanelTabProps = {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
};

export function TabPanelTab({ value, children, disabled, className }: TabPanelTabProps) {
  const { value: activeValue, onValueChange, baseId } = useTabPanelContext();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      type="button"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      data-active={isActive}
      data-value={value}
      disabled={disabled}
      className={cn(styles.tab, className)}
      onClick={() => onValueChange(value)}
    >
      {children}
    </button>
  );
}

// TabPanelContent - Content panel that shows when tab is active
export type TabPanelContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

export function TabPanelContent({ value, children, className }: TabPanelContentProps) {
  const { value: activeValue, baseId } = useTabPanelContext();

  if (activeValue !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn(styles.content, className)}
    >
      {children}
    </div>
  );
}
