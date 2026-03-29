import { useEffect, useRef, useState } from 'react';
import { Button, CollapsibleSection, HamburgerButton } from 'octahedron';
import { Octahedron } from './components/Octahedron';
import { TableOfContents } from './components/TableOfContents';
import { SearchModal } from './components/SearchModal';

// Overview
import { GettingStartedPage } from './pages/GettingStartedPage';
import { TokensPage } from './pages/TokensPage';

// General
import { TextPage } from './pages/TextPage';
import { ButtonPage } from './pages/ButtonPage';
import { TagPage } from './pages/TagPage';
import { TextLinkPage } from './pages/TextLinkPage';
import { DividerPage } from './pages/DividerPage';

// Forms
import { InputPage } from './pages/InputPage';
import { TextAreaPage } from './pages/TextAreaPage';
import { SelectPage } from './pages/SelectPage';
import { CheckboxPage } from './pages/CheckboxPage';
import { TogglePage } from './pages/TogglePage';
import { SearchInputPage } from './pages/SearchInputPage';
import { FileInputPage } from './pages/FileInputPage';
import { DatePickerPage } from './pages/DatePickerPage';
import { NumericStepperPage } from './pages/NumericStepperPage';
import { SliderPage } from './pages/SliderPage';

// Navigation
import { BreadcrumbsPage } from './pages/BreadcrumbsPage';
import { MenuPage } from './pages/MenuPage';
import { TabPanelPage } from './pages/TabPanelPage';
import { TabButtonPage } from './pages/TabButtonPage';
import { StepIndicatorPage } from './pages/StepIndicatorPage';
import { CollapsibleSectionPage } from './pages/CollapsibleSectionPage';
import { HamburgerButtonPage } from './pages/HamburgerButtonPage';
import { NavItemPage } from './pages/NavItemPage';

// Data Display
import { TablePage } from './pages/TablePage';
import { DataTablePage } from './pages/DataTablePage';
import { StackedBarPage } from './pages/StackedBarPage';
import { FilterPillPage } from './pages/FilterPillPage';
import { SelectionBannerPage } from './pages/SelectionBannerPage';
import { CombinatorTogglePage } from './pages/CombinatorTogglePage';

// Layout
import { CardPage } from './pages/CardPage';
import { OptionCardPage } from './pages/OptionCardPage';
import { EmptyStatePage } from './pages/EmptyStatePage';
import { DropZonePage } from './pages/DropZonePage';
import { SelectablePage } from './pages/SelectablePage';
import { UserAvatarButtonPage } from './pages/UserAvatarButtonPage';

// Feedback
import { CalloutPage } from './pages/CalloutPage';
import { BannerPage } from './pages/BannerPage';
import { ModalPage } from './pages/ModalPage';
import { TooltipPage } from './pages/TooltipPage';
import { ConfirmDialogPage } from './pages/ConfirmDialogPage';
import { PopoverPage } from './pages/PopoverPage';
import { LoadingPage } from './pages/LoadingPage';

type NavItem = { id: string; label: string; group: string };

const NAV: NavItem[] = [
  // Overview
  { id: 'getting-started', label: 'Getting Started', group: 'Overview' },
  { id: 'tokens', label: 'Design Tokens', group: 'Overview' },

  // General
  { id: 'text', label: 'Text', group: 'General' },
  { id: 'button', label: 'Button', group: 'General' },
  { id: 'tag', label: 'Tag', group: 'General' },
  { id: 'text-link', label: 'TextLink', group: 'General' },
  { id: 'divider', label: 'Divider', group: 'General' },

  // Forms
  { id: 'input', label: 'Input', group: 'Forms' },
  { id: 'text-area', label: 'TextArea', group: 'Forms' },
  { id: 'select', label: 'Select', group: 'Forms' },
  { id: 'checkbox', label: 'Checkbox', group: 'Forms' },
  { id: 'toggle', label: 'Toggle', group: 'Forms' },
  { id: 'search-input', label: 'SearchInput', group: 'Forms' },
  { id: 'file-input', label: 'FileInput', group: 'Forms' },
  { id: 'date-picker', label: 'DatePicker', group: 'Forms' },
  { id: 'numeric-stepper', label: 'NumericStepper', group: 'Forms' },
  { id: 'slider', label: 'Slider', group: 'Forms' },

  // Navigation
  { id: 'breadcrumbs', label: 'Breadcrumbs', group: 'Navigation' },
  { id: 'menu', label: 'Menu', group: 'Navigation' },
  { id: 'tab-panel', label: 'TabPanel', group: 'Navigation' },
  { id: 'tab-button', label: 'TabButton', group: 'Navigation' },
  { id: 'step-indicator', label: 'StepIndicator', group: 'Navigation' },
  { id: 'collapsible-section', label: 'CollapsibleSection', group: 'Navigation' },
  { id: 'hamburger-button', label: 'HamburgerButton', group: 'Navigation' },
  { id: 'nav-item', label: 'NavItem', group: 'Navigation' },

  // Data Display
  { id: 'table', label: 'Table', group: 'Data Display' },
  { id: 'data-table', label: 'DataTable', group: 'Data Display' },
  { id: 'stacked-bar', label: 'StackedBar', group: 'Data Display' },
  { id: 'filter-pill', label: 'FilterPill', group: 'Data Display' },
  { id: 'selection-banner', label: 'SelectionBanner', group: 'Data Display' },
  { id: 'combinator-toggle', label: 'CombinatorToggle', group: 'Data Display' },

  // Layout
  { id: 'card', label: 'Card', group: 'Layout' },
  { id: 'option-card', label: 'OptionCard', group: 'Layout' },
  { id: 'empty-state', label: 'EmptyState', group: 'Layout' },
  { id: 'drop-zone', label: 'DropZone', group: 'Layout' },
  { id: 'selectable', label: 'Selectable', group: 'Layout' },
  { id: 'user-avatar-button', label: 'UserAvatarButton', group: 'Layout' },

  // Feedback
  { id: 'callout', label: 'Callout', group: 'Feedback' },
  { id: 'banner', label: 'Banner', group: 'Feedback' },
  { id: 'modal', label: 'Modal', group: 'Feedback' },
  { id: 'confirm-dialog', label: 'ConfirmDialog', group: 'Feedback' },
  { id: 'tooltip', label: 'Tooltip', group: 'Feedback' },
  { id: 'popover', label: 'Popover', group: 'Feedback' },
  { id: 'loading', label: 'Loading & Skeletons', group: 'Feedback' },
];

const PAGES: Record<string, () => JSX.Element> = {
  'getting-started': GettingStartedPage,
  tokens: TokensPage,
  text: TextPage,
  button: ButtonPage,
  tag: TagPage,
  'text-link': TextLinkPage,
  divider: DividerPage,
  input: InputPage,
  'text-area': TextAreaPage,
  select: SelectPage,
  checkbox: CheckboxPage,
  toggle: TogglePage,
  'search-input': SearchInputPage,
  'file-input': FileInputPage,
  'date-picker': DatePickerPage,
  'numeric-stepper': NumericStepperPage,
  slider: SliderPage,
  breadcrumbs: BreadcrumbsPage,
  menu: MenuPage,
  'tab-panel': TabPanelPage,
  'tab-button': TabButtonPage,
  'step-indicator': StepIndicatorPage,
  'collapsible-section': CollapsibleSectionPage,
  'hamburger-button': HamburgerButtonPage,
  'nav-item': NavItemPage,
  table: TablePage,
  'data-table': DataTablePage,
  'stacked-bar': StackedBarPage,
  'filter-pill': FilterPillPage,
  'selection-banner': SelectionBannerPage,
  'combinator-toggle': CombinatorTogglePage,
  card: CardPage,
  'option-card': OptionCardPage,
  'empty-state': EmptyStatePage,
  'drop-zone': DropZonePage,
  selectable: SelectablePage,
  'user-avatar-button': UserAvatarButtonPage,
  callout: CalloutPage,
  banner: BannerPage,
  modal: ModalPage,
  'confirm-dialog': ConfirmDialogPage,
  tooltip: TooltipPage,
  popover: PopoverPage,
  loading: LoadingPage,
};

function useHashPage() {
  const read = () => location.hash.replace('#', '') || 'getting-started';
  const [page, setPageState] = useState(read);

  useEffect(() => {
    const handler = () => setPageState(read());
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const setPage = (id: string) => {
    location.hash = id;
  };

  return [page, setPage] as const;
}

export function App() {
  const [page, setPage] = useHashPage();
  const [dark, setDark] = useState(() => localStorage.getItem('octa-docs-theme') !== 'light');
  const Page = PAGES[page] ?? GettingStartedPage;
  const mainRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('octa-docs-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Group nav items
  const groups = NAV.reduce<Record<string, NavItem[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  // Ctrl/Cmd+K to open search
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);


  return (
    <div className="docs-layout">
      <header className="docs-header">
        <HamburgerButton
          open={sidebarOpen}
          onClick={() => setSidebarOpen((o) => !o)}
          className="docs-hamburger"
        />
        <div className="docs-header-brand">
          <Octahedron className="docs-logo-icon" />
          <div className="docs-logo">Octahedron</div>
        </div>
        <div style={{ flex: 1 }} />
        <Button
          icon={
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          }
          onClick={() => setSearchOpen(true)}
        >
          {/Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K'}
        </Button>
        <Button
          ariaLabel={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={() => setDark((d) => !d)}
          icon={<span style={{ fontSize: 12 }}>{dark ? '☀️' : '🌙'}</span>}
        />
      </header>
      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        items={NAV}
        onSelect={setPage}
      />
      <div className="docs-below-header">
        <div
          className="docs-sidebar-overlay"
          data-open={sidebarOpen || undefined}
          onClick={() => setSidebarOpen(false)}
        />
        <aside className="docs-sidebar" data-open={sidebarOpen || undefined}>
          {Object.entries(groups).map(([group, items]) => (
            <CollapsibleSection
              key={group}
              title={group}
              defaultExpanded
              storageKey={`octa-docs-nav-${group}`}
              className="docs-nav-section"
            >
              {items.map((item) => (
                <button
                  key={item.id}
                  className="docs-nav-item"
                  data-active={page === item.id}
                  onClick={() => {
                    setPage(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  {item.label}
                </button>
              ))}
            </CollapsibleSection>
          ))}
        </aside>
        <div className="docs-body" ref={mainRef}>
          <div className="docs-body-inner">
            <main className="docs-main">
              <Page />
            </main>
            <TableOfContents containerRef={mainRef} key={page} />
          </div>
        </div>
      </div>
    </div>
  );
}
