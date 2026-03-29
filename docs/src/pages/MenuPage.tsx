import { Menu, MenuItem, MenuDivider } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function MenuPage() {
  return (
    <div>
      <h1>Menu</h1>
      <p>Vertical menu for actions and navigation. Supports icons, dividers, intents, and active/disabled states.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`<Menu>\n  <MenuItem>Cut</MenuItem>\n  <MenuItem>Copy</MenuItem>\n  <MenuItem>Paste</MenuItem>\n</Menu>`}>
        <Menu>
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </Menu>
      </Demo>

      <h2>With Icons</h2>
      <Demo direction="column" code={`<Menu>\n  <MenuItem icon={<span>\u270f\ufe0f</span>}>Edit</MenuItem>\n  <MenuItem icon={<span>\ud83d\udcc4</span>}>Duplicate</MenuItem>\n  <MenuItem icon={<span>\ud83d\udce6</span>}>Archive</MenuItem>\n</Menu>`}>
        <Menu>
          <MenuItem icon={<span>&#9999;&#65039;</span>}>Edit</MenuItem>
          <MenuItem icon={<span>&#128196;</span>}>Duplicate</MenuItem>
          <MenuItem icon={<span>&#128230;</span>}>Archive</MenuItem>
        </Menu>
      </Demo>

      <h2>With Divider and Danger Intent</h2>
      <Demo direction="column" code={`<Menu>\n  <MenuItem>Rename</MenuItem>\n  <MenuItem>Move</MenuItem>\n  <MenuDivider />\n  <MenuItem intent="danger">Delete</MenuItem>\n</Menu>`}>
        <Menu>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem>
          <MenuDivider />
          <MenuItem intent="danger">Delete</MenuItem>
        </Menu>
      </Demo>

      <h2>Active and Disabled States</h2>
      <Demo direction="column" code={`<Menu>\n  <MenuItem active>Dashboard</MenuItem>\n  <MenuItem>Settings</MenuItem>\n  <MenuItem disabled>Billing (coming soon)</MenuItem>\n</Menu>`}>
        <Menu>
          <MenuItem active>Dashboard</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem disabled>Billing (coming soon)</MenuItem>
        </Menu>
      </Demo>

      <h2>Menu Props</h2>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Menu items and dividers.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />

      <h2>MenuItem Props</h2>
      <PropsTable
        props={[
          { name: 'id', type: 'string', description: 'Unique identifier for the item.' },
          { name: 'icon', type: 'ReactNode', description: 'Icon displayed before the label.' },
          { name: 'disabled', type: 'boolean', description: 'Prevents interaction.' },
          { name: 'active', type: 'boolean', description: 'Marks the item as currently active.' },
          { name: 'highlighted', type: 'boolean', description: 'Visually highlights the item.' },
          { name: 'intent', type: "'default' | 'danger'", default: "'default'", description: 'Semantic intent. Danger is used for destructive actions.' },
          { name: 'title', type: 'string', description: 'HTML title attribute for hover text.' },
          { name: 'onClick', type: '() => void', description: 'Called when the item is clicked.' },
          { name: 'children', type: 'ReactNode', description: 'Item label content.' },
        ]}
      />

      <h2>MenuDivider Props</h2>
      <PropsTable props={[]} />
    </div>
  );
}
