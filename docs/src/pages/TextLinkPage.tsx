import { TextLink } from 'octahedron';
import { Demo } from '../components/Demo';
import { PropsTable } from '../components/PropsTable';

export function TextLinkPage() {
  return (
    <div>
      <h1>TextLink</h1>
      <p>Styled anchor link for inline and standalone text navigation.</p>

      <h2>Basic</h2>
      <Demo code={`<TextLink href="https://example.com">Example link</TextLink>`}>
        <TextLink href="https://example.com">Example link</TextLink>
      </Demo>

      <h2>External Link</h2>
      <Demo code={`<TextLink href="https://example.com" target="_blank" rel="noopener noreferrer">Opens in new tab</TextLink>`}>
        <TextLink href="https://example.com" target="_blank" rel="noopener noreferrer">Opens in new tab</TextLink>
      </Demo>

      <h2>Props</h2>
      <PropsTable
        props={[
          { name: 'children', type: 'ReactNode', description: 'Link content.' },
          { name: 'href', type: 'string', description: 'URL the link points to.' },
          { name: '...rest', type: 'AnchorHTMLAttributes', description: 'All standard anchor attributes (target, rel, etc.).' },
        ]}
      />
    </div>
  );
}
