import { NavItem } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function NavItemPage() {
  return (
    <div>
      <h1>NavItem</h1>
      <p>Clickable list item with a chevron for navigating into detail views.</p>

      <h2>Basic</h2>
      <Demo direction="column" code={`<NavItem onClick={() => alert('Clicked')}>Settings</NavItem>\n<NavItem onClick={() => alert('Clicked')}>Account</NavItem>`}>
        <NavItem onClick={() => alert('Clicked')}>Settings</NavItem>
        <NavItem onClick={() => alert('Clicked')}>Account</NavItem>
      </Demo>

      <h2>Selected</h2>
      <Demo direction="column" code={`<NavItem onClick={() => {}} selected>Selected item</NavItem>`}>
        <NavItem onClick={() => {}} selected>Selected item</NavItem>
      </Demo>

      <h2>Disabled</h2>
      <Demo direction="column" code={`<NavItem onClick={() => {}} disabled>Disabled item</NavItem>`}>
        <NavItem onClick={() => {}} disabled>Disabled item</NavItem>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Item content.' },
          { name: 'onClick', type: '() => void', description: 'Called when the item is clicked (required).' },
          { name: 'selected', type: 'boolean', description: 'Whether the item is in the selected state.' },
          { name: 'disabled', type: 'boolean', description: 'Disables the item.' },
          { name: 'className', type: 'string', description: 'Additional CSS class.' },
        ]}
      />
    </div>
  );
}
