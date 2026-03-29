import { Callout, Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function CalloutPage() {
  return (
    <div>
      <h1>Callout</h1>
      <p>Callout box for highlighting contextual information. Supports semantic intents, titles, and action elements.</p>

      <h2>Intents</h2>
      <Demo direction="column" code={`<Callout>Default callout with no intent.</Callout>\n<Callout intent="info">This is an informational message.</Callout>\n<Callout intent="success">Operation completed successfully.</Callout>\n<Callout intent="warning">Proceed with caution.</Callout>\n<Callout intent="danger">Something went wrong.</Callout>`}>
        <Callout>Default callout with no intent.</Callout>
        <Callout intent="info">This is an informational message.</Callout>
        <Callout intent="success">Operation completed successfully.</Callout>
        <Callout intent="warning">Proceed with caution.</Callout>
        <Callout intent="danger">Something went wrong.</Callout>
      </Demo>

      <h2>With Title and Body</h2>
      <Demo direction="column" code={`<Callout intent="info" title="Tip">\n  You can use keyboard shortcuts to navigate faster.\n</Callout>\n<Callout intent="warning" title="Rate limit">\n  You are approaching your API rate limit. Consider upgrading your plan.\n</Callout>`}>
        <Callout intent="info" title="Tip">
          You can use keyboard shortcuts to navigate faster.
        </Callout>
        <Callout intent="warning" title="Rate limit">
          You are approaching your API rate limit. Consider upgrading your plan.
        </Callout>
      </Demo>

      <h2>With Action</h2>
      <Demo direction="column" code={`<Callout\n  intent="danger"\n  title="Payment failed"\n  action={<Button compact>Retry</Button>}\n>\n  We could not process your payment. Please try again.\n</Callout>`}>
        <Callout
          intent="danger"
          title="Payment failed"
          action={<Button compact>Retry</Button>}
        >
          We could not process your payment. Please try again.
        </Callout>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'intent', type: "'none' | 'success' | 'warning' | 'danger' | 'info'", default: "'none'", description: 'Semantic intent that controls color.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon displayed before the content.' },
          { name: 'title', type: 'ReactNode', description: 'Bold title line above the body.' },
          { name: 'children', type: 'ReactNode', description: 'Body content.' },
          { name: 'action', type: 'ReactNode', description: 'Action element displayed at the end of the callout.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
          { name: 'style', type: 'CSSProperties', description: 'Inline styles.' },
        ]}
      />
    </div>
  );
}
