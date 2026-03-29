export function GettingStartedPage() {
  return (
    <>
      <h1 className="docs-title">Getting Started</h1>
      <p className="docs-description">
        Install Octahedron and start using components in your React app.
      </p>

      <div className="docs-section">
        <h2 className="docs-section-title">Installation</h2>
        <pre className="docs-code-block">npm install octahedron</pre>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Import tokens</h2>
        <p style={{ marginBottom: 'var(--octa-space-3)' }}>
          Import the design tokens stylesheet at the root of your app (e.g.{' '}
          <code>main.tsx</code> or <code>layout.tsx</code>).
        </p>
        <pre className="docs-code-block">{`import 'octahedron/tokens.css';`}</pre>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Brand customization</h2>
        <p style={{ marginBottom: 'var(--octa-space-3)' }}>
          Override the brand tokens in your own <code>brand.css</code> to change
          accent colors and font stacks. These are loaded before all other
          tokens.
        </p>
        <pre className="docs-code-block">{`:root {\n  --octa-brand: #6366f1;\n  --octa-brand-hover: #818cf8;\n  --octa-font-body: 'Inter', sans-serif;\n}`}</pre>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Basic usage</h2>
        <pre className="docs-code-block">{`import { Button } from 'octahedron';\n\n<Button color="primary">Save</Button>`}</pre>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">Dark mode</h2>
        <p style={{ marginBottom: 'var(--octa-space-3)' }}>
          Set <code>data-theme="dark"</code> on the root element. All token
          colors swap automatically. If no <code>data-theme</code> attribute is
          set, the system <code>prefers-color-scheme</code> preference is used.
        </p>
        <pre className="docs-code-block">{`document.documentElement.setAttribute('data-theme', 'dark');`}</pre>
      </div>
    </>
  );
}
