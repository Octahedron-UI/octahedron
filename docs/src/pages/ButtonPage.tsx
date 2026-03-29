import { Button } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function ButtonPage() {
  return (
    <div>
      <h1>Button</h1>
      <p>A versatile button component with variant, color, icon, and loading support.</p>

      <h2>Default</h2>
      <Demo code={`<Button>Click me</Button>`}>
        <Button>Click me</Button>
      </Demo>

      <h2>Variants</h2>
      <Demo code={`<Button variant="solid" color="primary">Solid</Button>\n<Button variant="soft" color="primary">Soft</Button>\n<Button variant="ghost" color="primary">Ghost</Button>`}>
        <Button variant="solid" color="primary">Solid</Button>
        <Button variant="soft" color="primary">Soft</Button>
        <Button variant="ghost" color="primary">Ghost</Button>
      </Demo>

      <h2>Colors</h2>
      <Demo code={`<Button color="primary">Primary</Button>\n<Button color="success">Success</Button>\n<Button color="warning">Warning</Button>\n<Button color="danger">Danger</Button>\n<Button color="accent">Accent</Button>`}>
        <Button color="primary">Primary</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
        <Button color="accent">Accent</Button>
      </Demo>

      <h2>With Icon</h2>
      <Demo code={`<Button icon={<span>+</span>}>Add item</Button>\n<Button rightIcon={<span>\u2192</span>}>Continue</Button>`}>
        <Button icon={<span>+</span>}>Add item</Button>
        <Button rightIcon={<span>{'\u2192'}</span>}>Continue</Button>
      </Demo>

      <h2>Compact</h2>
      <Demo code={`<Button compact>Compact</Button>\n<Button>Regular</Button>`}>
        <Button compact>Compact</Button>
        <Button>Regular</Button>
      </Demo>

      <h2>Loading</h2>
      <Demo code={`<Button loading>Saving...</Button>\n<Button loading color="primary">Saving...</Button>`}>
        <Button loading>Saving...</Button>
        <Button loading color="primary">Saving...</Button>
      </Demo>

      <h2>Icon Only</h2>
      <Demo code={`<Button icon={<span>\u2715</span>} ariaLabel="Close" />\n<Button icon={<span>\u270E</span>} ariaLabel="Edit" />\n<Button icon={<span>\u2715</span>} ariaLabel="Close" loading />`}>
        <Button icon={<span>{'\u2715'}</span>} ariaLabel="Close" />
        <Button icon={<span>{'\u270E'}</span>} ariaLabel="Edit" />
        <Button icon={<span>{'\u2715'}</span>} ariaLabel="Close" loading />
      </Demo>

      <h2>Button Props</h2>
      <PropsTable
        props={[
          { name: 'variant', type: "'solid' | 'soft' | 'ghost'", description: 'Visual treatment. Defaults to solid when color is set.' },
          { name: 'color', type: "'primary' | 'success' | 'warning' | 'danger' | 'accent'", description: 'Color family.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon rendered before the label.' },
          { name: 'rightIcon', type: 'ReactNode', description: 'Icon rendered after the label.' },
          { name: 'inverted', type: 'boolean', default: 'false', description: 'Inverted style for use on colored backgrounds.' },
          { name: 'compact', type: 'boolean', default: 'false', description: 'Strips fixed height so the button flows inline with text.' },
          { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner overlay and disables the button.' },
          { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML button type attribute.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
          { name: 'ariaLabel', type: 'string', description: 'Accessible label. When set without children, renders as icon-only.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>Icon Only Props</h2>
      <p>
        When <code>ariaLabel</code> is provided without children, Button renders as a square icon-only button.
      </p>
    </div>
  );
}
