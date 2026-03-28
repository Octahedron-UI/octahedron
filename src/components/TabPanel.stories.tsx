import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabPanelGroup, TabPanelList, TabPanelTab, TabPanelContent } from './TabPanel';

const meta: Meta<typeof TabPanelGroup> = {
  title: 'Layout/TabPanel',
  component: TabPanelGroup,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TabPanelGroup>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState('general');
    return (
      <TabPanelGroup value={tab} onValueChange={setTab}>
        <TabPanelList>
          <TabPanelTab value="general">General</TabPanelTab>
          <TabPanelTab value="billing">Billing</TabPanelTab>
          <TabPanelTab value="notifications">Notifications</TabPanelTab>
        </TabPanelList>
        <TabPanelContent value="general">General settings content.</TabPanelContent>
        <TabPanelContent value="billing">Billing and payment details.</TabPanelContent>
        <TabPanelContent value="notifications">Notification preferences.</TabPanelContent>
      </TabPanelGroup>
    );
  },
};

export const WithDisabledTab: Story = {
  render: () => {
    const [tab, setTab] = useState('overview');
    return (
      <TabPanelGroup value={tab} onValueChange={setTab}>
        <TabPanelList>
          <TabPanelTab value="overview">Overview</TabPanelTab>
          <TabPanelTab value="analytics" disabled>Analytics</TabPanelTab>
          <TabPanelTab value="settings">Settings</TabPanelTab>
        </TabPanelList>
        <TabPanelContent value="overview">Overview content.</TabPanelContent>
        <TabPanelContent value="analytics">Analytics content.</TabPanelContent>
        <TabPanelContent value="settings">Settings content.</TabPanelContent>
      </TabPanelGroup>
    );
  },
};
