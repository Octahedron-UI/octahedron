import { Breadcrumbs } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function BreadcrumbsPage() {
  return (
    <div>
      <h1>Breadcrumbs</h1>
      <p>Breadcrumb navigation for showing the user's location within a hierarchy.</p>

      <h2>Basic</h2>
      <Demo code={`<Breadcrumbs\n  items={[\n    { label: 'Home', href: '/' },\n    { label: 'Products', href: '/products' },\n    { label: 'Widget' },\n  ]}\n/>`}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Widget' },
          ]}
        />
      </Demo>

      <h2>With onClick Handlers</h2>
      <Demo code={`<Breadcrumbs\n  items={[\n    { label: 'Dashboard', onClick: () => alert('Dashboard') },\n    { label: 'Settings', onClick: () => alert('Settings') },\n    { label: 'Profile' },\n  ]}\n/>`}>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', onClick: () => alert('Dashboard') },
            { label: 'Settings', onClick: () => alert('Settings') },
            { label: 'Profile' },
          ]}
        />
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'items', type: 'BreadcrumbItem[]', description: 'Array of breadcrumb items. Each has label (ReactNode), optional href (string), and optional onClick (() => void). Required.' },
          { name: 'ariaLabel', type: 'string', description: 'Accessible label for the nav element.' },
        ]}
      />
    </div>
  );
}
