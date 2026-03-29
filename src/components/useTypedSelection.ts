import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Config mapping logical type names to URL param names.
 * Key order determines read priority (first param found wins).
 *
 * IMPORTANT: Pass a stable reference (module-level constant or useMemo'd value)
 * to avoid unnecessary re-renders.
 */
export type TypedSelectionConfig = Record<string, string>;

export type TypedSelection<K extends string = string> = {
  /** Currently selected entity, or null */
  selected: { type: K; id: string } | null;
  /** Select an entity by type and id. Clears all other config params. */
  select: (type: K, id: string) => void;
  /** Clear all config params from the URL. */
  deselect: () => void;
};

/**
 * URL-backed typed selection for split layout panel 3.
 *
 * Maps logical entity types to URL param names. Reading uses priority order
 * (first matching param wins). Writing clears all config params, then sets one.
 *
 * @example
 * ```tsx
 * const DETAIL_CONFIG = { source: 'sourceId', purchaseOrder: 'orderId' } as const;
 *
 * const detail = useTypedSelection(DETAIL_CONFIG);
 * // detail.selected → { type: 'source', id: 'alloc-abc' } | null
 * // detail.select('purchaseOrder', 'ord-123') → ?orderId=ord-123
 * // detail.deselect() → removes sourceId and orderId
 * ```
 */
export function useTypedSelection<T extends TypedSelectionConfig>(
  config: T,
): TypedSelection<Extract<keyof T, string>> {
  type K = Extract<keyof T, string>;

  const [searchParams, setSearchParams] = useSearchParams();

  const entries = useMemo(() => Object.entries(config) as [K, string][], [config]);
  const paramNames = useMemo(() => entries.map(([, param]) => param), [entries]);

  const selected = useMemo((): { type: K; id: string } | null => {
    for (const [type, param] of entries) {
      const value = searchParams.get(param);
      if (value != null) return { type, id: value };
    }
    return null;
  }, [entries, searchParams]);

  const select = useCallback(
    (type: K, id: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const param of paramNames) next.delete(param);
          next.set(config[type], id);
          return next;
        },
        { replace: true },
      );
    },
    [config, paramNames, setSearchParams],
  );

  const deselect = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const param of paramNames) next.delete(param);
        return next;
      },
      { replace: true },
    );
  }, [paramNames, setSearchParams]);

  return useMemo(() => ({ selected, select, deselect }), [selected, select, deselect]);
}
