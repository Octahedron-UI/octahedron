import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';

import { cn } from '../lib/cn';
import { deterministicColorVars } from '../lib/deterministic-colors';
import { ChevronDown as ChevronDownIcon } from './AppIcon';
import { Menu, MenuDivider, MenuItem } from './Menu';
import { Popover, type PopoverPosition } from './Popover';
import { SearchInput } from './SearchInput';
import styles from './Select.module.css';

export type SelectVariant = 'default' | 'badge';
export type SelectSize = 'default' | 'compact';

export type SelectOption = {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** Override: called instead of onValueChange */
  onClick?: () => void;
};

export type SelectDivider = { divider: true };

export type SelectEntry = SelectOption | SelectDivider;

export type SelectGroup = {
  /** Optional group header (omit for unlabeled group) */
  label?: string;
  options: SelectOption[];
};

/** Internal normalized group structure for rendering */
type NormalizedGroup = {
  label?: string;
  entries: readonly SelectEntry[];
};

type SelectDataProps =
  | { options: readonly SelectEntry[]; groups?: never }
  | { groups: readonly SelectGroup[]; options?: never };

export type SelectProps = SelectDataProps & {
  /** Current value (omit for action menus) */
  value?: string;
  /** Called when a non-onClick option is selected */
  onValueChange?: (value: string) => void;

  /** Custom trigger element (escape hatch - overrides variant) */
  trigger?: ReactElement;
  /** Placeholder shown when no value selected */
  placeholder?: string;

  /** Trigger style variant */
  variant?: SelectVariant;
  /** Trigger size */
  size?: SelectSize;
  /** Seed for deterministic colors (badge variant). Falls back to value if omitted. */
  colorSeed?: string;

  /** Fill available width */
  fill?: boolean;
  disabled?: boolean;
  position?: PopoverPosition;

  /** Controlled popover state */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  /** Form integration */
  id?: string;
  className?: string;
  menuClassName?: string;

  /** Enable search input for filtering options */
  searchable?: boolean;
  /** Custom filter function (default: case-insensitive substring on label/value) */
  filterOption?: (option: SelectOption, query: string) => boolean;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  /** Message shown when no options match filter */
  noResultsMessage?: ReactNode;
};

function isDivider(entry: SelectEntry): entry is SelectDivider {
  return 'divider' in entry && entry.divider === true;
}

function isOption(entry: SelectEntry): entry is SelectOption {
  return !isDivider(entry);
}

/** Extract text from a ReactNode label for filtering */
function getLabelText(label: ReactNode): string {
  if (typeof label === 'string') return label;
  if (typeof label === 'number') return String(label);
  return '';
}

/** Default filter: case-insensitive substring match on label or value */
function defaultFilterOption(option: SelectOption, query: string): boolean {
  const q = query.toLowerCase();
  const labelText = getLabelText(option.label).toLowerCase();
  const valueText = option.value.toLowerCase();
  return labelText.includes(q) || valueText.includes(q);
}

/** Extract enabled (non-disabled) options from a list of entries */
function getSelectableOptions(entries: readonly SelectEntry[]): SelectOption[] {
  return entries.filter(isOption).filter((opt) => !opt.disabled);
}

/** Extract all options from normalized groups */
function getAllOptions(groups: readonly NormalizedGroup[]): SelectOption[] {
  return groups.flatMap((g) => g.entries.filter(isOption));
}

/** Extract all selectable options from normalized groups */
function getSelectableOptionsFromGroups(groups: readonly NormalizedGroup[]): SelectOption[] {
  return groups.flatMap((g) => getSelectableOptions(g.entries));
}

/** Normalize flat options or groups into unified structure */
function normalizeToGroups(
  options?: readonly SelectEntry[],
  groups?: readonly SelectGroup[],
): NormalizedGroup[] {
  if (groups && groups.length > 0) {
    return groups.map((g) => ({ label: g.label, entries: g.options }));
  }
  if (options && options.length > 0) {
    return [{ entries: options }];
  }
  return [];
}

/** Filter groups based on search query, removing empty groups */
function filterGroups(
  groups: readonly NormalizedGroup[],
  query: string,
  filterFn: (option: SelectOption, query: string) => boolean,
): NormalizedGroup[] {
  return groups
    .map((group) => ({
      label: group.label,
      entries: group.entries.filter((entry) => {
        if (isDivider(entry)) return false;
        return filterFn(entry, query);
      }),
    }))
    .filter((group) => group.entries.length > 0);
}

/** Find the index of a value in a list of selectable options, or -1 if not found */
function findOptionIndex(options: SelectOption[], value: string | undefined): number {
  if (value === undefined) return -1;
  return options.findIndex((opt) => opt.value === value);
}

export function Select({
  options,
  groups,
  value,
  onValueChange,
  trigger,
  placeholder = 'Select...',
  variant = 'default',
  size = 'default',
  colorSeed,
  fill,
  disabled = false,
  position = 'bottom-left',
  open,
  onOpenChange,
  id,
  className,
  menuClassName,
  searchable = false,
  filterOption,
  searchPlaceholder = 'Search...',
  noResultsMessage = 'No options found',
}: SelectProps) {
  // Popover state
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchId = useId();

  // Normalize options/groups into unified structure
  const normalizedGroups = useMemo(() => normalizeToGroups(options, groups), [options, groups]);

  // Reset search state when popover closes, initialize highlight to selected value when opening
  useEffect(() => {
    if (isOpen) {
      const allOptions = getSelectableOptionsFromGroups(normalizedGroups);
      setHighlightedIndex(findOptionIndex(allOptions, value));
    } else {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  }, [isOpen, normalizedGroups, value]);

  const handleOpenChange = useCallback(
    (nextOpenState: boolean) => {
      if (disabled && nextOpenState) return;
      if (isControlled) {
        onOpenChange?.(nextOpenState);
      } else {
        setInternalOpen(nextOpenState);
      }
    },
    [isControlled, onOpenChange, disabled],
  );

  const handleOptionClick = useCallback(
    (option: SelectOption) => {
      if (option.onClick) {
        option.onClick();
      } else {
        onValueChange?.(option.value);
      }
      handleOpenChange(false);
    },
    [onValueChange, handleOpenChange],
  );

  // Filter groups based on search query
  const filteredGroups = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return normalizedGroups;
    }

    const query = searchQuery.trim();
    const filterFn = filterOption ?? defaultFilterOption;
    return filterGroups(normalizedGroups, query, filterFn);
  }, [normalizedGroups, searchQuery, searchable, filterOption]);

  // Get only selectable options for keyboard navigation (flattened across all groups)
  const selectableOptions = useMemo(
    () => getSelectableOptionsFromGroups(filteredGroups),
    [filteredGroups],
  );

  // When filtered groups change (due to search), update highlight to selected value or first item
  useEffect(() => {
    if (!isOpen || !searchable) return;
    const selectedIdx = findOptionIndex(selectableOptions, value);
    // If selected value is in filtered results, highlight it; otherwise highlight first item
    setHighlightedIndex(selectedIdx >= 0 ? selectedIdx : selectableOptions.length > 0 ? 0 : -1);
  }, [selectableOptions, value, isOpen, searchable]);

  // Option IDs for aria-activedescendant
  const optionId = useCallback(
    (value: string) => `${searchId}-option-${value}`,
    [searchId],
  );

  // Scroll highlighted item into view when it changes
  useEffect(() => {
    if (highlightedIndex >= 0 && selectableOptions[highlightedIndex]) {
      const el = document.getElementById(optionId(selectableOptions[highlightedIndex].value));
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex, selectableOptions, optionId]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < 0 ? 0 : Math.min(prev + 1, selectableOptions.length - 1),
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < 0 ? selectableOptions.length - 1 : Math.max(prev - 1, 0),
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            const selectedOpt = selectableOptions[highlightedIndex];
            if (selectedOpt) {
              handleOptionClick(selectedOpt);
            }
          }
          break;
        case 'Escape':
          e.preventDefault();
          handleOpenChange(false);
          break;
      }
    },
    [selectableOptions, highlightedIndex, handleOptionClick, handleOpenChange],
  );

  // Find current selection for default trigger display
  const allOptions = useMemo(() => getAllOptions(normalizedGroups), [normalizedGroups]);
  const selectedOption = allOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;

  // Compute badge color style
  const badgeColorStyle =
    variant === 'badge' && (colorSeed ?? value)
      ? deterministicColorVars(colorSeed ?? value ?? '')
      : undefined;

  // Build trigger classes (composable: base + size + variant)
  const sizeClass = size === 'compact' ? styles.sizeCompact : styles.sizeDefault;
  const variantClass = variant === 'badge' ? styles.badgeTrigger : styles.trigger;

  const activeDescendant =
    highlightedIndex >= 0 && selectableOptions[highlightedIndex]
      ? optionId(selectableOptions[highlightedIndex].value)
      : undefined;

  // Render trigger based on variant (custom trigger takes precedence)
  const triggerElement =
    trigger ??
    (variant === 'badge' ? (
      <button
        type="button"
        className={cn(
          styles.triggerBase,
          sizeClass,
          variantClass,
          disabled && styles.disabled,
          className,
        )}
        style={badgeColorStyle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-activedescendant={isOpen ? activeDescendant : undefined}
        onKeyDown={isOpen ? handleKeyDown : undefined}
      >
        <span className={styles.label}>{displayLabel}</span>
        <ChevronDownIcon className={styles.chevron} aria-hidden />
      </button>
    ) : (
      <button
        type="button"
        id={id}
        className={cn(
          styles.triggerBase,
          sizeClass,
          variantClass,
          disabled && styles.disabled,
          fill && styles.fill,
          className,
        )}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-activedescendant={isOpen ? activeDescendant : undefined}
        onKeyDown={isOpen ? handleKeyDown : undefined}
      >
        <span className={styles.label}>{displayLabel}</span>
        <ChevronDownIcon className={styles.chevron} aria-hidden />
      </button>
    ));

  // Render menu content with groups
  const renderMenuContent = () => {
    // Check if all groups are empty
    const totalOptions = filteredGroups.reduce((sum, g) => sum + g.entries.length, 0);
    if (totalOptions === 0) {
      return <div className={styles.noResults}>{noResultsMessage}</div>;
    }

    return filteredGroups.map((group, groupIndex) => {
      const groupKey = group.label ?? `group-${groupIndex}`;

      return (
        <div key={groupKey} className={styles.group}>
          {group.label && <div className={styles.groupHeader}>{group.label}</div>}
          {group.entries.map((entry, entryIndex) => {
            if (isDivider(entry)) {
              return <MenuDivider key={`${groupKey}-divider-${entryIndex}`} />;
            }

            // Determine if this option is highlighted for keyboard nav
            const flatIndex = selectableOptions.indexOf(entry);
            const isHighlighted = flatIndex === highlightedIndex;

            return (
              <MenuItem
                key={entry.value}
                id={optionId(entry.value)}
                role="option"
                icon={entry.icon}
                disabled={entry.disabled}
                active={value !== undefined && entry.value === value}
                highlighted={isHighlighted}
                onClick={() => handleOptionClick(entry)}
              >
                {entry.label}
              </MenuItem>
            );
          })}
        </div>
      );
    });
  };

  const popover = (
    <Popover
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={triggerElement}
      position={position}
      matchWidth={fill}
    >
      {searchable ? (
        <div className={styles.menuWrapper} onKeyDown={handleKeyDown}>
          <div className={styles.searchContainer}>
            <SearchInput
              id={searchId}
              value={searchQuery}
              onValueChange={setSearchQuery}
              placeholder={searchPlaceholder}
              autoFocus
              aria-activedescendant={activeDescendant}
            />
          </div>
          <div className={styles.menuContent} role="listbox">
            <Menu className={menuClassName} role="presentation">{renderMenuContent()}</Menu>
          </div>
        </div>
      ) : (
        <div role="listbox">
          <Menu className={menuClassName} role="presentation">{renderMenuContent()}</Menu>
        </div>
      )}
    </Popover>
  );

  if (fill) {
    return <div className={styles.fillWrapper}>{popover}</div>;
  }

  return popover;
}
