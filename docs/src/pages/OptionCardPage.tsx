import { OptionCard, Tag } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function OptionCardPage() {
  return (
    <div>
      <h1>OptionCard</h1>
      <p>Selectable option card for presenting choices in a list or grid.</p>

      <h2>Default</h2>
      <Demo direction="column" code={`<OptionCard label="Option A" onClick={() => {}} />\n<OptionCard label="Option B" onClick={() => {}} />`}>
        <OptionCard label="Option A" onClick={() => {}} />
        <OptionCard label="Option B" onClick={() => {}} />
      </Demo>

      <h2>Primary</h2>
      <Demo direction="column" code={`<OptionCard variant="primary" label="Confirm selection" onClick={() => {}} />`}>
        <OptionCard variant="primary" label="Confirm selection" onClick={() => {}} />
      </Demo>

      <h2>Danger</h2>
      <Demo direction="column" code={`<OptionCard variant="danger" label="Delete account" onClick={() => {}} />`}>
        <OptionCard variant="danger" label="Delete account" onClick={() => {}} />
      </Demo>

      <h2>With Description</h2>
      <Demo direction="column" code={`<OptionCard\n  label="Pro Plan"\n  description="Unlimited projects and priority support."\n  onClick={() => {}}\n/>`}>
        <OptionCard
          label="Pro Plan"
          description="Unlimited projects and priority support."
          onClick={() => {}}
        />
      </Demo>

      <h2>With Badge</h2>
      <Demo direction="column" code={`<OptionCard\n  label="Enterprise Plan"\n  description="Custom pricing and dedicated support."\n  badge={<Tag variant="accent">Popular</Tag>}\n  onClick={() => {}}\n/>`}>
        <OptionCard
          label="Enterprise Plan"
          description="Custom pricing and dedicated support."
          badge={<Tag variant="accent">Popular</Tag>}
          onClick={() => {}}
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'label', type: 'string', description: 'Card label (required).' },
          { name: 'description', type: 'string', description: 'Secondary description text.' },
          { name: 'badge', type: 'ReactNode', description: 'Badge element displayed on the card.' },
          { name: 'variant', type: "'default' | 'primary' | 'danger'", default: "'default'", description: 'Visual variant.' },
          { name: 'onClick', type: '() => void', description: 'Click handler (required).' },
        ]}
      />
    </div>
  );
}
