import { Banner, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function BannerPage() {
  return (
    <div>
      <h1>Banner</h1>
      <p>Full-width notification bar for page-level messages. Supports a callout variant for inline contextual messaging.</p>

      <h2>Default</h2>
      <Demo direction="column" code={`<Banner>This is a default banner with no intent.</Banner>`}>
        <Banner>This is a default banner with no intent.</Banner>
      </Demo>

      <h2>Intents</h2>
      <Demo direction="column" code={`<Banner intent="success">Operation completed successfully.</Banner>\n<Banner intent="warning">Your subscription expires soon.</Banner>\n<Banner intent="danger">Failed to save changes.</Banner>\n<Banner intent="info">A new version is available.</Banner>`}>
        <Banner intent="success">Operation completed successfully.</Banner>
        <Banner intent="warning">Your subscription expires soon.</Banner>
        <Banner intent="danger">Failed to save changes.</Banner>
        <Banner intent="info">A new version is available.</Banner>
      </Demo>

      <h2>Callout Variant</h2>
      <Demo direction="column" code={`<Banner variant="callout" intent="info">\n  This is an inline callout for contextual information.\n</Banner>\n<Banner variant="callout" intent="warning">\n  Check your input before proceeding.\n</Banner>`}>
        <Banner variant="callout" intent="info">This is an inline callout for contextual information.</Banner>
        <Banner variant="callout" intent="warning">Check your input before proceeding.</Banner>
      </Demo>

      <h2>With Title</h2>
      <Demo direction="column" code={`<Banner intent="danger" title="Payment failed">\n  We could not process your card. Please update your billing information.\n</Banner>`}>
        <Banner intent="danger" title="Payment failed">
          We could not process your card. Please update your billing information.
        </Banner>
      </Demo>

      <h2>With Action</h2>
      <Demo direction="column" code={`<Banner\n  intent="info"\n  title="New update"\n  action={<Button compact>Update now</Button>}\n>\n  Version 2.1 is available with bug fixes and improvements.\n</Banner>`}>
        <Banner
          intent="info"
          title="New update"
          action={<Button compact>Update now</Button>}
        >
          Version 2.1 is available with bug fixes and improvements.
        </Banner>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'variant', type: "'banner' | 'callout'", default: "'banner'", description: 'Visual variant. Callout is used for inline contextual messages.' },
          { name: 'intent', type: "'none' | 'success' | 'warning' | 'danger' | 'info'", default: "'none'", description: 'Semantic intent that controls color.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon displayed before the content.' },
          { name: 'title', type: 'ReactNode', description: 'Bold title line above the body.' },
          { name: 'children', type: 'ReactNode', description: 'Body content.' },
          { name: 'action', type: 'ReactNode', description: 'Action element displayed at the end of the banner.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]}
      />
    </div>
  );
}
