import { createContext, useContext, type ReactNode } from 'react';

import { cn } from '../lib/cn';
import styles from './TabPanel.module.css';

// Context for sharing active tab state
type TabPanelContextValue = {
  value: string;
  onValueChange: (value: string) => void;
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
  children: ReactNode;
  className?: string;
};

export function TabPanelGroup({ value, onValueChange, children, className }: TabPanelGroupProps) {
  return (
    <TabPanelContext.Provider value={{ value, onValueChange }}>
      <div className={cn(styles.group, className)}>{children}</div>
    </TabPanelContext.Provider>
  );
}

// TabPanelList - Container for tab buttons
export type TabPanelListProps = {
  children: ReactNode;
  className?: string;
};

export function TabPanelList({ children, className }: TabPanelListProps) {
  return (
    <div role="tablist" className={cn(styles.tabList, className)}>
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
  const { value: activeValue, onValueChange } = useTabPanelContext();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      data-active={isActive}
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
  const { value: activeValue } = useTabPanelContext();

  if (activeValue !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={cn(styles.content, className)}>
      {children}
    </div>
  );
}
