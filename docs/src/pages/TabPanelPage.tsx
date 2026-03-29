import { useState } from 'react';
import { TabPanelGroup, TabPanelList, TabPanelTab, TabPanelContent } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TabPanelPage() {
  const [tab, setTab] = useState('overview');
  const [tab2, setTab2] = useState('general');
  const [tab3, setTab3] = useState('profile');

  return (
    <div>
      <h1>TabPanel</h1>
      <p>Compound tab component for switching between content panels. Composed of TabPanelGroup, TabPanelList, TabPanelTab, and TabPanelContent.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`const [tab, setTab] = useState('overview');\n\n<TabPanelGroup value={tab} onValueChange={setTab}>\n  <TabPanelList>\n    <TabPanelTab value="overview">Overview</TabPanelTab>\n    <TabPanelTab value="details">Details</TabPanelTab>\n    <TabPanelTab value="history">History</TabPanelTab>\n  </TabPanelList>\n  <TabPanelContent value="overview">Overview content goes here.</TabPanelContent>\n  <TabPanelContent value="details">Details content goes here.</TabPanelContent>\n  <TabPanelContent value="history">History content goes here.</TabPanelContent>\n</TabPanelGroup>`}>
        <TabPanelGroup value={tab} onValueChange={setTab}>
          <TabPanelList>
            <TabPanelTab value="overview">Overview</TabPanelTab>
            <TabPanelTab value="details">Details</TabPanelTab>
            <TabPanelTab value="history">History</TabPanelTab>
          </TabPanelList>
          <TabPanelContent value="overview">Overview content goes here.</TabPanelContent>
          <TabPanelContent value="details">Details content goes here.</TabPanelContent>
          <TabPanelContent value="history">History content goes here.</TabPanelContent>
        </TabPanelGroup>
      </Demo>

      <h2>With Disabled Tab</h2>
      <Demo direction="column" code={`const [tab, setTab] = useState('general');\n\n<TabPanelGroup value={tab} onValueChange={setTab}>\n  <TabPanelList>\n    <TabPanelTab value="general">General</TabPanelTab>\n    <TabPanelTab value="security">Security</TabPanelTab>\n    <TabPanelTab value="billing" disabled>Billing</TabPanelTab>\n  </TabPanelList>\n  <TabPanelContent value="general">General settings.</TabPanelContent>\n  <TabPanelContent value="security">Security settings.</TabPanelContent>\n  <TabPanelContent value="billing">Billing settings.</TabPanelContent>\n</TabPanelGroup>`}>
        <TabPanelGroup value={tab2} onValueChange={setTab2}>
          <TabPanelList>
            <TabPanelTab value="general">General</TabPanelTab>
            <TabPanelTab value="security">Security</TabPanelTab>
            <TabPanelTab value="billing" disabled>Billing</TabPanelTab>
          </TabPanelList>
          <TabPanelContent value="general">General settings.</TabPanelContent>
          <TabPanelContent value="security">Security settings.</TabPanelContent>
          <TabPanelContent value="billing">Billing settings.</TabPanelContent>
        </TabPanelGroup>
      </Demo>

      <h2>Vertical</h2>
      <Demo direction="column" code={`<TabPanelGroup value={tab} onValueChange={setTab} orientation="vertical">\n  <TabPanelList>\n    <TabPanelTab value="profile">Profile</TabPanelTab>\n    <TabPanelTab value="account">Account</TabPanelTab>\n    <TabPanelTab value="notifications">Notifications</TabPanelTab>\n  </TabPanelList>\n  <TabPanelContent value="profile">Profile settings.</TabPanelContent>\n  <TabPanelContent value="account">Account settings.</TabPanelContent>\n  <TabPanelContent value="notifications">Notification preferences.</TabPanelContent>\n</TabPanelGroup>`}>
        <TabPanelGroup value={tab3} onValueChange={setTab3} orientation="vertical">
          <TabPanelList>
            <TabPanelTab value="profile">Profile</TabPanelTab>
            <TabPanelTab value="account">Account</TabPanelTab>
            <TabPanelTab value="notifications">Notifications</TabPanelTab>
          </TabPanelList>
          <TabPanelContent value="profile">Profile settings.</TabPanelContent>
          <TabPanelContent value="account">Account settings.</TabPanelContent>
          <TabPanelContent value="notifications">Notification preferences.</TabPanelContent>
        </TabPanelGroup>
      </Demo>

      <h2>TabPanelGroup Props</h2>
      <PropsTable
        props={[
          { name: 'value', type: 'string', description: 'The currently active tab value (required).' },
          { name: 'onValueChange', type: '(value: string) => void', description: 'Called when the active tab changes (required).' },
          { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction. Vertical stacks tabs on the left with content on the right.' },
          { name: 'children', type: 'ReactNode', description: 'TabPanelList and TabPanelContent elements.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>TabPanelTab Props</h2>
      <PropsTable
        props={[
          { name: 'value', type: 'string', description: 'Unique value identifying this tab (required).' },
          { name: 'children', type: 'ReactNode', description: 'Tab label content.' },
          { name: 'disabled', type: 'boolean', description: 'Prevents selecting this tab.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>TabPanelContent Props</h2>
      <PropsTable
        props={[
          { name: 'value', type: 'string', description: 'Matches the corresponding TabPanelTab value (required).' },
          { name: 'children', type: 'ReactNode', description: 'Content displayed when this tab is active.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}
