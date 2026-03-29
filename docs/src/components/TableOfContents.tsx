import { useEffect, useState } from 'react';

type Heading = { id: string; text: string };

export function TableOfContents({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');

  // Scan for h2 headings whenever the container content changes
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scan = () => {
      const h2s = container.querySelectorAll('h2');
      const items: Heading[] = [];
      h2s.forEach((h2, i) => {
        if (!h2.id) h2.id = `heading-${i}`;
        items.push({ id: h2.id, text: h2.textContent ?? '' });
      });
      setHeadings(items);
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(container, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [containerRef]);

  // Track active heading on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || headings.length === 0) return;

    const onScroll = () => {
      const scrollTop = container.scrollTop;
      let active = headings[0].id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - container.offsetTop <= scrollTop + 1) {
          active = id;
        }
      }
      setActiveId(active);
    };

    onScroll();
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [headings, containerRef]);

  if (headings.length < 2) return null;

  return (
    <nav className="docs-toc" aria-label="On this page">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className="docs-toc-item"
          data-active={activeId === h.id || undefined}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}
