// ── Lib utilities ──
export { cn } from './lib/cn';
export {
  deterministicHue,
  deterministicColors,
  deterministicColorVars,
  avatarColor,
} from './lib/deterministic-colors';
export type {
  DeterministicColorMode,
  DeterministicColorPair,
  CSSVariableProperties,
} from './lib/deterministic-colors';
export {
  WEEKDAY_LABELS,
  MONTH_NAMES,
  getCalendarGrid,
  formatDateString,
  parseDateString,
  isSameDay,
  isToday,
  addMonths,
  addYears,
  isBefore,
  isAfter,
  formatInputDate,
  formatDateMask,
  extractDateDigits,
  parseMaskedDate,
} from './lib/calendar-utils';
export {
  useInputControl,
  useImperativeDefaultValue,
  useUncontrolledInput,
} from './lib/useInputControl';

// ── Components ──

// AppIcon
export {
  AppIcon,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FilterLines,
  Minus,
  Plus,
  RefreshCw,
  SearchLg,
  X,
} from './components/AppIcon';
export type { AppIconName, AppIconProps } from './components/AppIcon';

// BreadCrumbs
export { BreadCrumbs } from './components/BreadCrumbs';
export type { BreadCrumbItem } from './components/BreadCrumbs';

// Banner
export { Banner } from './components/Banner';
export type { BannerVariant, BannerIntent, BannerProps } from './components/Banner';

// CalloutBox
export { CalloutBox } from './components/CalloutBox';
export type { CalloutBoxIntent, CalloutBoxProps } from './components/CalloutBox';

// CardTable
export { CardTable } from './components/CardTable';
export type {
  CardTableColumn,
  CardTableProps,
  CardTableCollapsibleConfig,
  CollapsibleHeaderRenderProps,
} from './components/CardTable';

// Checkbox
export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';


// CollapsibleContent
export { CollapsibleContent } from './components/CollapsibleContent';
export type { CollapsibleContentProps } from './components/CollapsibleContent';

// CollapsibleSection
export { CollapsibleSection } from './components/CollapsibleSection';
export type { CollapsibleSectionProps } from './components/CollapsibleSection';

// CombinatorToggle
export { CombinatorToggle } from './components/CombinatorToggle';

// ConfirmDialog
export { ConfirmDialog } from './components/ConfirmDialog';
export type { ConfirmDialogIntent, ConfirmDialogProps } from './components/ConfirmDialog';

// ControlButton
export { ControlButton, ControlIconButton } from './components/ControlButton';
export type {
  ButtonColor,
  ButtonVariant,
  ControlButtonProps,
  ControlIconButtonProps,
} from './components/ControlButton';

// ControlIconLink
export { ControlIconLink } from './components/ControlIconLink';
export type { ControlIconLinkProps } from './components/ControlIconLink';

// ControlSpinner
export { ControlSpinner } from './components/ControlSpinner';
export type { ControlSpinnerProps } from './components/ControlSpinner';

// DataTable
export { DataTable } from './components/DataTable';
export type { DataTableColumn, DataTablePaginationConfig } from './components/DataTable';

// DatePicker
export { DatePicker } from './components/DatePicker';

// Divider
export { Divider } from './components/Divider';
export type { DividerProps } from './components/Divider';

// DrillDownItem
export { DrillDownItem } from './components/DrillDownItem';

// DropZone
export { DropZone } from './components/DropZone';
export type { DropZoneProps } from './components/DropZone';

// EmptyState
export { EmptyState } from './components/EmptyState';
export type { EmptyStateProps } from './components/EmptyState';

// FileInput
export { FileInput } from './components/FileInput';
export type { FileInputProps } from './components/FileInput';

// FilterPill
export { FilterPill } from './components/FilterPill';

// FloatingPortalProvider
export { FloatingPortalProvider, useFloatingPortalRoot } from './components/FloatingPortalProvider';

// HamburgerButton
export { HamburgerButton } from './components/HamburgerButton';
export type { HamburgerButtonProps } from './components/HamburgerButton';

// HorizontalScrollHint
export { HorizontalScrollHint } from './components/HorizontalScrollHint';
export type { HorizontalScrollHintProps } from './components/HorizontalScrollHint';

// Input
export { Input } from './components/Input';

// KeyValueList
export { KeyValueList } from './components/KeyValueList';
export type { KeyValueListItem, KeyValueListProps } from './components/KeyValueList';

// KeyValueTable
export { KeyValueTable } from './components/KeyValueTable';
export type { KeyValueTableItem, KeyValueTableProps } from './components/KeyValueTable';

// Link (LinkButton)
export { LinkButton } from './components/Link';

// Menu
export { Menu, MenuItem, MenuDivider } from './components/Menu';

// Modal
export { Modal, ModalActions } from './components/Modal';
export type { ModalProps, ModalActionsProps } from './components/Modal';

// NumericStepper
export { NumericStepper } from './components/NumericStepper';
export type { NumericStepperProps } from './components/NumericStepper';

// OptionCard
export { OptionCard } from './components/OptionCard';
export type { OptionCardProps } from './components/OptionCard';

// Popover
export { Popover } from './components/Popover';
export type { PopoverPosition } from './components/Popover';

// ProgressBar
export { ProgressBar } from './components/ProgressBar';
export type { ProgressBarProps } from './components/ProgressBar';

// SearchInput
export { SearchInput } from './components/SearchInput';
export type { SearchInputProps } from './components/SearchInput';

// Selectable
export { Selectable } from './components/Selectable';
export type { SelectableProps } from './components/Selectable';

// Select
export { Select } from './components/Select';
export type {
  SelectVariant,
  SelectSize,
  SelectOption,
  SelectDivider,
  SelectEntry,
  SelectGroup,
  SelectProps,
} from './components/Select';

// SelectionBanner
export { SelectionBanner } from './components/SelectionBanner';

// Shimmer
export { Shimmer } from './components/Shimmer';
export type { ShimmerProps } from './components/Shimmer';

// SkeletonBar
export { SkeletonBar, Sk } from './components/SkeletonBar';
export type { SkeletonBarProps } from './components/SkeletonBar';

// SkeletonText
export { SkeletonText } from './components/SkeletonText';
export type { SkeletonTextProps } from './components/SkeletonText';

// Slider
export { Slider } from './components/Slider';
export type { SliderProps } from './components/Slider';

// StackedBar
export { StackedBar } from './components/StackedBar';
export type { Segment, StackedBarProps } from './components/StackedBar';

// StepIndicator
export { StepIndicator } from './components/StepIndicator';
export type { StepStatus, Step, StepIndicatorProps } from './components/StepIndicator';

// SurfaceCard
export { SurfaceCard } from './components/SurfaceCard';
export type { SurfaceCardProps } from './components/SurfaceCard';

// TabButton
export { TabButton } from './components/TabButton';
export type { TabButtonProps } from './components/TabButton';

// TabPanel
export { TabPanelGroup, TabPanelList, TabPanelTab, TabPanelContent } from './components/TabPanel';
export type {
  TabPanelGroupProps,
  TabPanelListProps,
  TabPanelTabProps,
  TabPanelContentProps,
} from './components/TabPanel';

// TableCard
export { TableCard } from './components/TableCard';
export type { TableCardProps } from './components/TableCard';

// TableSelectionCheckbox
export { TableSelectionCheckbox } from './components/TableSelectionCheckbox';

// Tag
export { Tag } from './components/Tag';
export type { TagVariant, TagProps } from './components/Tag';

// Text
export { Text } from './components/Text';
export type { TextIntent, TextProps } from './components/Text';

// TextArea
export { TextArea } from './components/TextArea';

// TextLink
export { TextLink } from './components/TextLink';
export type { TextLinkProps } from './components/TextLink';

// Toggle
export { Toggle } from './components/Toggle';
export type { ToggleProps } from './components/Toggle';

// Tooltip
export { Tooltip, TooltipContent } from './components/Tooltip';
export type { TooltipProps, TooltipContentProps } from './components/Tooltip';

// TimezoneSelect
export { TimezoneSelect } from './components/TimezoneSelect';
export type { TimezoneSelectProps } from './components/TimezoneSelect';

// UserAvatarButton
export { UserAvatarButton } from './components/UserAvatarButton';
export type { UserAvatarButtonProps } from './components/UserAvatarButton';

// ── Component utilities (non-React) ──

// column-helpers
export { EMPTY_CELL, booleanColumn, BooleanIndicator } from './components/column-helpers';

// createSelectionColumn
export { createSelectionColumn } from './components/createSelectionColumn';

// filter-schema
export { defineFilterColumns } from './components/filter-schema';

// pagination
export { computePaginationState } from './components/pagination';
export type { PaginationState } from './components/pagination';

// table-filters
export {
  formatTableFilterOperator,
  listTableFilterOperators,
  normalizeFilterToken,
  listColumnOptions,
  rowMatchesFilter,
  rowMatchesFilters,
  createFilterId,
  serializeFilter,
  parseFilter,
  serializeFiltersToParams,
  parseFiltersFromParams,
} from './components/table-filters';
export type {
  TableFilterOperator,
  TableFilterOperatorOption,
  FilterCombinator,
  TableFilter,
  TableFilterValueInput,
  TableFilterColumnDef,
} from './components/table-filters';

// useTablePageSelection
export { useTablePageSelection } from './components/useTablePageSelection';
export type { TablePageSelection } from './components/useTablePageSelection';
