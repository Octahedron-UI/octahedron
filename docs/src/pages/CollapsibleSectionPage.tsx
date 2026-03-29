import { CollapsibleSection } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function CollapsibleSectionPage() {
  return (
    <div>
      <h1>CollapsibleSection</h1>
      <p>Expandable section with a clickable header. Supports default expansion state and localStorage persistence.</p>

      <h2>Basic (Collapsed)</h2>
      <Demo direction="column" code={`<CollapsibleSection title="Advanced Options">\n  <p>These are the advanced configuration options.</p>\n</CollapsibleSection>`}>
        <CollapsibleSection title="Advanced Options">
          <p>These are the advanced configuration options.</p>
        </CollapsibleSection>
      </Demo>

      <h2>Default Expanded</h2>
      <Demo direction="column" code={`<CollapsibleSection title="General Settings" defaultExpanded>\n  <p>General settings are visible by default.</p>\n</CollapsibleSection>`}>
        <CollapsibleSection title="General Settings" defaultExpanded>
          <p>General settings are visible by default.</p>
        </CollapsibleSection>
      </Demo>

      <h2>With Storage Key</h2>
      <Demo direction="column" code={`<CollapsibleSection title="Preferences" storageKey="docs-prefs">\n  <p>This section remembers its state across page reloads.</p>\n</CollapsibleSection>`}>
        <CollapsibleSection title="Preferences" storageKey="docs-prefs">
          <p>This section remembers its state across page reloads.</p>
        </CollapsibleSection>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'title', type: 'string', description: 'Header text for the collapsible section (required).' },
          { name: 'defaultExpanded', type: 'boolean', description: 'Whether the section is expanded on first render.' },
          { name: 'storageKey', type: 'string', description: 'localStorage key to persist the expanded/collapsed state.' },
          { name: 'children', type: 'ReactNode', description: 'Content revealed when expanded.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}
