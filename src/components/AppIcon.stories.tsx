import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppIcon, type AppIconName } from './AppIcon';

const meta: Meta<typeof AppIcon> = {
  title: 'Display/AppIcon',
  component: AppIcon,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AppIcon>;

export const Default: Story = {
  args: { name: 'check', size: 14 },
};

const ALL_ICONS: AppIconName[] = [
  'add', 'archive', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up',
  'box', 'calendar', 'chat', 'check', 'chevron-down', 'chevron-left',
  'chevron-right', 'chevron-up', 'clean', 'code', 'cog', 'confirm', 'cross',
  'dashboard', 'database', 'disable', 'document', 'document-open', 'download',
  'duplicate', 'edit', 'endorsed', 'error', 'exchange', 'eye-open', 'filter',
  'floppy-disk', 'flows', 'git-branch', 'hand-right', 'heat-grid', 'history',
  'info-sign', 'key', 'layers', 'layout-grid', 'list', 'lock', 'log-out',
  'map', 'maximize', 'menu', 'minus', 'more', 'moon', 'office', 'panel-stats',
  'pin', 'play', 'plus', 'predictive-analysis', 'projects', 'properties',
  'random', 'record', 'refresh', 'reset', 'search', 'send-to', 'shield',
  'shopping-cart', 'sort', 'sun', 'th', 'tick', 'time', 'timeline-events',
  'trash', 'upload', 'user', 'warning-sign',
];

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 12 }}>
      {ALL_ICONS.map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
          <AppIcon name={name} size={16} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};
