import { useEffect, useState, useCallback } from 'react';
import { SearchInput, Text } from 'octahedron';

type NavItem = { id: string; label: string; group: string };

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  onSelect: (id: string) => void;
};

export function SearchModal({ open, onClose, items, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = { current: null as HTMLDialogElement | null };

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
    : [];

  useEffect(() => {
    if (!open) { setQuery(''); setActiveIndex(0); }
  }, [open]);

  useEffect(() => { setActiveIndex(0); }, [q]);

  const handleSelect = useCallback((id: string) => {
    onSelect(id);
    onClose();
  }, [onSelect, onClose]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && filtered[activeIndex]) { e.preventDefault(); handleSelect(filtered[activeIndex].id); }
  }

  let flatIndex = 0;

  return (
    <dialog
      ref={(el) => {
        dialogRef.current = el;
        if (el && open && !el.open) el.showModal();
        if (el && !open && el.open) el.close();
      }}
      className="docs-search-dialog"
      onCancel={onClose}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="docs-search-panel" onKeyDown={handleKeyDown}>
        <div className="docs-search-input-row">
          <SearchInput
            id="docs-search-input"
            value={query}
            onValueChange={setQuery}
            placeholder="Search components..."
            autoFocus
          />
        </div>
        <div className="docs-search-results">
          {filtered.length > 0 && Object.entries(
            filtered.reduce<Record<string, NavItem[]>>((acc, item) => {
              (acc[item.group] ??= []).push(item);
              return acc;
            }, {})
          ).map(([group, groupItems]) => (
            <div key={group}>
              <div className="docs-search-group-label">
                <Text variant="caption" intent="muted">{group}</Text>
              </div>
              {groupItems.map((item) => {
                const idx = flatIndex++;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    className="docs-search-item"
                    data-active={isActive || undefined}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleSelect(item.id)}
                    ref={(el) => { if (isActive && el) el.scrollIntoView({ block: 'nearest' }); }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
          {!q && (
            <div className="docs-search-empty">
              <Text intent="muted">Start typing to search...</Text>
            </div>
          )}
          {q && filtered.length === 0 && (
            <div className="docs-search-empty">
              <Text intent="muted">No results found.</Text>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
