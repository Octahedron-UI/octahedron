import { Table } from 'octahedron';

export function TokensPage() {
  return (
    <>
      <h1 className="docs-title">Design Tokens</h1>
      <p className="docs-description">
        CSS custom properties that define spacing, typography, colors, and more.
        Import <code>octahedron/tokens.css</code> to use them.
      </p>

      {/* ── Spacing ──────────────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Spacing</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--octa-space-2)' }}>
          {[
            ['--octa-space-0', '0px'],
            ['--octa-space-1', '4px'],
            ['--octa-space-2', '8px'],
            ['--octa-space-3', '12px'],
            ['--octa-space-4', '16px'],
            ['--octa-space-5', '24px'],
            ['--octa-space-6', '32px'],
          ].map(([token, value]) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 'var(--octa-space-3)' }}>
              <code style={{ width: 140, flexShrink: 0, fontSize: 12 }}>{token}</code>
              <div
                style={{
                  width: `var(${token})`,
                  height: 12,
                  background: 'var(--octa-info)',
                  borderRadius: 'var(--octa-radius-sm)',
                  minWidth: 2,
                }}
              />
              <span style={{ color: 'var(--octa-muted)', fontSize: 12 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Typography ───────────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Typography</h2>
        <TokenTable
          tokens={[
            ['--octa-font-mono', 'Monospace font stack'],
            ['--octa-font-size-sm', '11px'],
            ['--octa-font-size-body', '13px'],
            ['--octa-font-size-title', '18px'],
            ['--octa-font-weight-regular', '400'],
            ['--octa-font-weight-medium', '500'],
            ['--octa-font-weight-semibold', '600'],
          ]}
        />
      </div>

      {/* ── Colors ───────────────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Colors</h2>

        <h3 style={{ fontSize: 13, fontWeight: 'var(--octa-font-weight-medium)' as any, margin: '0 0 var(--octa-space-2)' }}>
          Core
        </h3>
        <ColorSwatches
          tokens={[
            '--octa-bg-app',
            '--octa-surface',
            '--octa-text',
            '--octa-muted',
            '--octa-border',
            '--octa-border-hover',
            '--octa-hover-bg',
            '--octa-link',
            '--octa-link-bg',
          ]}
        />

        <h3 style={{ fontSize: 13, fontWeight: 'var(--octa-font-weight-medium)' as any, margin: 'var(--octa-space-4) 0 var(--octa-space-2)' }}>
          Semantic
        </h3>
        <ColorSwatches
          tokens={[
            '--octa-success',
            '--octa-success-bg',
            '--octa-warning',
            '--octa-warning-bg',
            '--octa-danger',
            '--octa-danger-bg',
            '--octa-info',
            '--octa-info-bg',
            '--octa-accent',
            '--octa-accent-bg',
          ]}
        />

        <h3 style={{ fontSize: 13, fontWeight: 'var(--octa-font-weight-medium)' as any, margin: 'var(--octa-space-4) 0 var(--octa-space-2)' }}>
          UI
        </h3>
        <ColorSwatches
          tokens={[
            '--octa-checkbox-border',
            '--octa-checkbox-fill',
            '--octa-checkbox-icon',
            '--octa-focus-ring',
            '--octa-disabled',
            '--octa-overlay',
            '--octa-text-on-colored',
          ]}
        />
      </div>

      {/* ── Controls ─────────────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Controls</h2>
        <TokenTable
          tokens={[
            ['--octa-control-height', '28px'],
            ['--octa-control-height-compact', '18px'],
            ['--octa-control-radius', '6px'],
            ['--octa-radius-sm', '3px'],
            ['--octa-control-padding', '4px'],
            ['--octa-control-gap', '8px'],
            ['--octa-table-row-height', '38px'],
            ['--octa-icon-size', '14px'],
            ['--octa-icon-slot-size', '18px'],
          ]}
        />
      </div>

      {/* ── Duration & easing ────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Duration &amp; Easing</h2>
        <TokenTable
          tokens={[
            ['--octa-duration-instant', '0ms'],
            ['--octa-duration-fast', '75ms'],
            ['--octa-duration-moderate', '100ms'],
            ['--octa-duration-slow', '150ms'],
            ['--octa-duration-spinner', '800ms'],
            ['--octa-duration-shimmer', '1500ms'],
            ['--octa-ease-default', 'ease'],
            ['--octa-ease-out', 'ease-out'],
            ['--octa-ease-in', 'ease-in'],
          ]}
        />
      </div>

      {/* ── Z-index ──────────────────────────────────── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Z-index</h2>
        <TokenTable
          tokens={[
            ['--octa-z-base', '1'],
            ['--octa-z-sticky', '10'],
            ['--octa-z-header', '20'],
            ['--octa-z-dropdown', '30'],
            ['--octa-z-overlay', '100'],
            ['--octa-z-modal', '101'],
          ]}
        />
      </div>
    </>
  );
}

/* ── Helper components ────────────────────────────────────────────── */

function TokenTable({ tokens }: { tokens: [string, string][] }) {
  return (
    <Table columns={[{ key: 'token', header: 'Token' }, { key: 'value', header: 'Value' }]}>
      {tokens.map(([token, value]) => (
        <tr key={token}>
          <td><code>{token}</code></td>
          <td><code>{value}</code></td>
        </tr>
      ))}
    </Table>
  );
}

function ColorSwatches({ tokens }: { tokens: string[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 'var(--octa-space-2)',
      }}
    >
      {tokens.map((token) => (
        <div
          key={token}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--octa-space-2)',
            padding: 'var(--octa-space-1)',
            borderRadius: 'var(--octa-radius-sm)',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 'var(--octa-radius-sm)',
              background: `var(${token})`,
              border: '1px solid var(--octa-border)',
              flexShrink: 0,
            }}
          />
          <code style={{ fontSize: 11 }}>{token}</code>
        </div>
      ))}
    </div>
  );
}
