import {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import styles from './FloatingPortalProvider.module.css';

/**
 * Context for providing a custom portal root for floating elements (popovers, tooltips, etc.).
 *
 * By default, floating-ui portals to document.body. When floating elements are triggered
 * from inside overlays (Modal, Drawer), they need to portal to a container within that
 * overlay's stacking context to appear correctly above the overlay content.
 *
 * Usage:
 * - Wrap overlay content with <FloatingPortalProvider>
 * - Floating elements (Popover, etc.) automatically use the nearest portal root
 */
const FloatingPortalContext = createContext<HTMLElement | null>(null);

/**
 * Hook to get the nearest floating portal root.
 * Returns null when outside any provider (floating-ui falls back to document.body).
 */
export function useFloatingPortalRoot(): HTMLElement | null {
  return useContext(FloatingPortalContext);
}

type FloatingPortalProviderProps = {
  children: ReactNode;
};

/**
 * Provides a portal root for floating elements within overlays.
 *
 * Place this around content that may contain floating elements (popovers, tooltips)
 * and needs them to render within a specific stacking context.
 */
export function FloatingPortalProvider({ children }: FloatingPortalProviderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    setPortalRoot(ref.current);
  }, []);

  return (
    <FloatingPortalContext.Provider value={portalRoot}>
      {children}
      <div ref={ref} className={styles.portalRoot} />
    </FloatingPortalContext.Provider>
  );
}
