import type { ReactNode } from 'react';

type DemoProps = {
  children: ReactNode;
  code: string;
  direction?: 'row' | 'column';
};

export function Demo({ children, code, direction = 'row' }: DemoProps) {
  return (
    <div className="docs-demo">
      <div className="docs-demo-preview" data-direction={direction}>
        {children}
      </div>
      <div className="docs-demo-code">{code}</div>
    </div>
  );
}
