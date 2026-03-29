# Octahedron

A React component library with light/dark themes, CSS custom properties, and 70+ production-ready components.

## Install

```bash
npm install octahedron
```

**Peer dependencies:** `react`, `react-dom`, [`@untitledui/icons`](https://www.untitledui.com/icons)

## Setup

Import the token stylesheet at your app's entry point:

```tsx
import 'octahedron/tokens.css';
```

Optionally import brand defaults (fonts, accent color, dark background palette):

```tsx
import 'octahedron/brand.css';
```

## Usage

```tsx
import { Button, Input, Card, Tag } from 'octahedron';

function App() {
  return (
    <Card>
      <Input placeholder="Email" />
      <Button color="primary" variant="solid">Subscribe</Button>
      <Tag color="success">Active</Tag>
    </Card>
  );
}
```

## Theming

Octahedron supports light and dark themes via the `data-theme` attribute. When unset, it follows the user's system preference.

```ts
// Dark
document.documentElement.setAttribute('data-theme', 'dark');

// Light
document.documentElement.setAttribute('data-theme', 'light');

// System preference (default)
document.documentElement.removeAttribute('data-theme');
```

All colors are CSS custom properties prefixed with `--octa-`. Override them to customize the palette:

```css
:root {
  --octa-brand: #6366f1;
  --octa-brand-hover: #818cf8;
}
```

## Components

**General** &mdash; Button, Text, Tag, TextLink, Divider

**Forms** &mdash; Input, TextArea, Select, Checkbox, Toggle, SearchInput, FileInput, DatePicker, NumericStepper, Slider, TimezoneSelect

**Navigation** &mdash; Breadcrumbs, Menu, TabPanel, TabButton, StepIndicator, CollapsibleSection, HamburgerButton, NavItem

**Data** &mdash; Table, DataTable, StackedBar, FilterPill, SelectionBanner, CombinatorToggle, ProgressBar

**Layout** &mdash; Card, OptionCard, EmptyState, DropZone, Selectable, UserAvatarButton, SplitContainer, Panel, PanelHeader, CompactDetailView, Resizer

**Feedback** &mdash; Callout, Banner, Modal, ConfirmDialog, Tooltip, Popover

**Loading** &mdash; Spinner, Skeleton, Shimmer

## Design Tokens

Import `octahedron/tokens.css` for the full token set:

| Category | Examples |
|----------|---------|
| Spacing | `--octa-space-1` (4px) through `--octa-space-6` (32px) |
| Typography | `--octa-font-size-sm` (11px), `--octa-font-size-body` (13px), `--octa-font-size-title` (18px) |
| Controls | `--octa-control-height` (28px), `--octa-control-radius` (6px) |
| Colors | `--octa-text`, `--octa-muted`, `--octa-surface`, `--octa-border`, `--octa-link` |
| Semantic | `--octa-success`, `--octa-warning`, `--octa-danger`, `--octa-info`, `--octa-accent` |
| Z-index | `--octa-z-base` (1) through `--octa-z-modal` (101) |

## License

MIT
