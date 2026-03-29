/**
 * Animated polyhedron logo — copied from arciops brand assets.
 * Local to the docs site; not exported from the octahedron library.
 */

import { useRef, useEffect } from 'react';

type V3 = [number, number, number];

type PolyGeometry = {
  vertices: V3[];
  triFaces: [number, number, number][];
  filledFaces: Set<number>;
  edges: { a: number; b: number; adjFaces: number[] }[];
  faceNormals: V3[];
  logoAngles: { rx: number; ry: number }[];
};

function buildGeometry(rawVerts: V3[], polyFaces: number[][]): PolyGeometry {
  const vertices: V3[] = rawVerts.map(([x, y, z]) => {
    const len = Math.sqrt(x * x + y * y + z * z);
    return [x / len, y / len, z / len];
  });

  const triFaces: [number, number, number][] = [];
  const triGroupStarts: number[] = [];
  const edgeMap = new Map<string, { a: number; b: number; adjFaces: number[] }>();
  const faceNormals: V3[] = [];

  for (let fi = 0; fi < polyFaces.length; fi++) {
    const poly = polyFaces[fi];
    const start = triFaces.length;
    triGroupStarts.push(start);

    for (let i = 1; i < poly.length - 1; i++) {
      let tri: [number, number, number] = [poly[0], poly[i], poly[i + 1]];
      const [va, vb, vc] = [vertices[tri[0]], vertices[tri[1]], vertices[tri[2]]];
      const e1x = vb[0] - va[0], e1y = vb[1] - va[1], e1z = vb[2] - va[2];
      const e2x = vc[0] - va[0], e2y = vc[1] - va[1], e2z = vc[2] - va[2];
      const nx = e1y * e2z - e1z * e2y;
      const ny = e1z * e2x - e1x * e2z;
      const nz = e1x * e2y - e1y * e2x;
      const cx = (va[0] + vb[0] + vc[0]) / 3;
      const cy = (va[1] + vb[1] + vc[1]) / 3;
      const cz = (va[2] + vb[2] + vc[2]) / 3;
      if (nx * cx + ny * cy + nz * cz < 0) tri = [tri[0], tri[2], tri[1]];
      triFaces.push(tri);
    }

    let cx = 0, cy = 0, cz = 0;
    for (const vi of poly) { cx += vertices[vi][0]; cy += vertices[vi][1]; cz += vertices[vi][2]; }
    const len = Math.sqrt(cx * cx + cy * cy + cz * cz);
    faceNormals.push(len > 0 ? [cx / len, cy / len, cz / len] : [0, 0, 1]);

    for (let i = 0; i < poly.length; i++) {
      const a = Math.min(poly[i], poly[(i + 1) % poly.length]);
      const b = Math.max(poly[i], poly[(i + 1) % poly.length]);
      const key = `${a},${b}`;
      if (!edgeMap.has(key)) edgeMap.set(key, { a, b, adjFaces: [] });
      const entry = edgeMap.get(key)!;
      for (let j = start; j < triFaces.length; j++) {
        if (!entry.adjFaces.includes(j)) entry.adjFaces.push(j);
      }
    }
  }

  const dir: V3 = [1, 1.618033988749895, 0.6180339887498949];
  const filledFaces = new Set<number>();
  for (let fi = 0; fi < polyFaces.length; fi++) {
    const [nx, ny, nz] = faceNormals[fi];
    if (nx * dir[0] + ny * dir[1] + nz * dir[2] > 0) {
      const start = triGroupStarts[fi];
      const end = fi + 1 < triGroupStarts.length ? triGroupStarts[fi + 1] : triFaces.length;
      for (let j = start; j < end; j++) filledFaces.add(j);
    }
  }

  const seen = new Set<string>();
  const logoAngles: { rx: number; ry: number }[] = [];
  for (const [nx, ny, nz] of faceNormals) {
    const rx = Math.atan2(ny, Math.sqrt(nx * nx + nz * nz));
    const ry = Math.atan2(-nx, nz);
    const key = `${rx.toFixed(4)},${ry.toFixed(4)}`;
    if (!seen.has(key)) { seen.add(key); logoAngles.push({ rx, ry }); }
  }

  return { vertices, triFaces, filledFaces, edges: [...edgeMap.values()], faceNormals, logoAngles };
}

const PROJ_SCALE = 38;
const HOME_RX = -0.6154797086703873;
const HOME_RY = 2.356194490192345;
const HOVER_MAX_TILT = 0.35;
const HOVER_LERP = 0.12;
const INTRO_MS = 800;
const DRAG_SENSITIVITY = 0.01;
const SPRING_K = 150;
const SPRING_D = 25;
const SPRING_SETTLE = 0.001;

const GEO: PolyGeometry = (() => {
  const g = buildGeometry(
    [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],
    [[0,2,4],[0,4,3],[0,3,5],[0,5,2],[1,4,2],[1,2,5],[1,3,4],[1,5,3]],
  );
  g.filledFaces = new Set([1, 3, 4, 7]);
  return g;
})();

function rotatePoint([x, y, z]: V3, rx: number, ry: number): V3 {
  const cy = Math.cos(ry), sy = Math.sin(ry);
  const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
  const cx = Math.cos(rx), sx = Math.sin(rx);
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx];
}

function angleDelta(from: number, to: number): number {
  let d = to - from;
  d -= Math.round(d / (2 * Math.PI)) * 2 * Math.PI;
  return d;
}

function easeOutCubic(t: number): number { return 1 - (1 - t) ** 3; }

function createSvgElements(svg: SVGSVGElement, strokeWidth: number) {
  const fillEls = GEO.triFaces.map((_, i) => {
    if (!GEO.filledFaces.has(i)) return null;
    const p = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    p.style.fill = 'currentColor';
    p.style.stroke = 'none';
    p.style.pointerEvents = 'none';
    svg.appendChild(p);
    return p;
  });

  const edgePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  edgePath.style.stroke = 'currentColor';
  edgePath.style.strokeWidth = String(strokeWidth);
  edgePath.style.strokeLinecap = 'round';
  edgePath.style.strokeLinejoin = 'round';
  edgePath.style.fill = 'none';
  edgePath.style.pointerEvents = 'none';
  svg.appendChild(edgePath);

  return { fillEls, edgePath };
}

function render(
  svg: SVGSVGElement,
  fillEls: (SVGPolygonElement | null)[],
  edgePath: SVGPathElement,
  rx: number, ry: number,
) {
  const rotated = GEO.vertices.map((v) => rotatePoint(v, rx, ry));
  const projected = rotated.map(([x, y]) => [50 + x * PROJ_SCALE, 50 - y * PROJ_SCALE] as [number, number]);
  const frontFacing = new Set<number>();
  const visibleFills: { idx: number; depth: number }[] = [];

  for (let i = 0; i < GEO.triFaces.length; i++) {
    const [a, b, c] = GEO.triFaces[i];
    const [ax, ay] = projected[a], [bx, by] = projected[b], [cx, cy] = projected[c];
    if ((bx - ax) * (cy - ay) - (by - ay) * (cx - ax) <= 0) continue;
    frontFacing.add(i);
    if (GEO.filledFaces.has(i)) {
      visibleFills.push({ idx: i, depth: (rotated[a][2] + rotated[b][2] + rotated[c][2]) / 3 });
    }
  }

  visibleFills.sort((a, b) => b.depth - a.depth);
  for (const el of fillEls) if (el) el.style.display = 'none';
  for (const { idx } of visibleFills) {
    const f = GEO.triFaces[idx];
    const el = fillEls[idx]!;
    el.setAttribute('points', f.map((vi) => `${projected[vi][0]},${projected[vi][1]}`).join(' '));
    el.style.display = '';
    svg.appendChild(el);
  }

  let d = '';
  for (const edge of GEO.edges) {
    if (!edge.adjFaces.some((fi) => frontFacing.has(fi))) continue;
    const [x1, y1] = projected[edge.a], [x2, y2] = projected[edge.b];
    d += `M${x1},${y1}L${x2},${y2}`;
  }
  edgePath.setAttribute('d', d || 'M0,0');
  svg.appendChild(edgePath);
}

export function Octahedron({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const { fillEls, edgePath } = createSvgElements(svg, 7);

    type Mode = 'idle' | 'hover' | 'drag' | 'spring' | 'tween';
    let mode: Mode = 'idle';
    let rx = HOME_RX, ry = HOME_RY + Math.PI;
    let targetRx = HOME_RX, targetRy = HOME_RY;
    let pointerOver = false;
    let fromRx = 0, fromRy = 0, toRx = 0, toRy = 0;
    let tweenStart = 0, tweenDur = INTRO_MS;
    let dragStartX = 0, dragStartY = 0, dragBaseRx = 0, dragBaseRy = 0;
    let rafId = 0, loopRunning = false;
    let prevRx = rx, prevRy = ry, prevTime = performance.now();
    let velRx = 0, velRy = 0;

    function ensureLoop() {
      if (!loopRunning) { loopRunning = true; rafId = requestAnimationFrame(tick); }
    }

    function tick() {
      loopRunning = false;
      const now = performance.now();

      if (mode === 'drag') {
        const dt = (now - prevTime) * 0.001;
        if (dt > 0) { velRx = (rx - prevRx) / dt; velRy = (ry - prevRy) / dt; }
        prevRx = rx; prevRy = ry; prevTime = now;
      } else if (mode === 'hover') {
        rx += angleDelta(rx, targetRx) * HOVER_LERP;
        ry += angleDelta(ry, targetRy) * HOVER_LERP;
      } else if (mode === 'spring') {
        const dt = Math.min((now - prevTime) * 0.001, 0.05);
        prevTime = now;
        const dRx = angleDelta(rx, HOME_RX), dRy = angleDelta(ry, HOME_RY);
        velRx += (SPRING_K * dRx - SPRING_D * velRx) * dt;
        velRy += (SPRING_K * dRy - SPRING_D * velRy) * dt;
        rx += velRx * dt; ry += velRy * dt;
        if (Math.abs(dRx) + Math.abs(dRy) + Math.abs(velRx) + Math.abs(velRy) < SPRING_SETTLE) {
          rx = HOME_RX; ry = HOME_RY; velRx = velRy = 0;
          mode = pointerOver ? 'hover' : 'idle';
          if (mode === 'hover') { targetRx = HOME_RX; targetRy = HOME_RY; }
        }
      } else if (mode === 'tween') {
        const t = Math.min((now - tweenStart) / tweenDur, 1);
        const e = easeOutCubic(t);
        rx = fromRx + (toRx - fromRx) * e; ry = fromRy + (toRy - fromRy) * e;
        if (t >= 1) {
          rx = HOME_RX; ry = HOME_RY;
          mode = pointerOver ? 'hover' : 'idle';
          if (mode === 'hover') { targetRx = HOME_RX; targetRy = HOME_RY; }
        }
      }

      render(svg, fillEls, edgePath, rx, ry);
      if (mode !== 'idle') { loopRunning = true; rafId = requestAnimationFrame(tick); }
    }

    function enterSpring(vx = 0, vy = 0) {
      mode = 'spring'; velRx = vx; velRy = vy; prevTime = performance.now(); ensureLoop();
    }

    const onPointerEnter = () => {
      pointerOver = true;
      if (mode === 'idle') { mode = 'hover'; targetRx = HOME_RX; targetRy = HOME_RY; ensureLoop(); }
    };
    const onPointerLeave = () => { pointerOver = false; if (mode === 'hover') enterSpring(); };
    const onPointerDown = (e: PointerEvent) => {
      svg.setPointerCapture(e.pointerId);
      mode = 'drag'; dragStartX = e.clientX; dragStartY = e.clientY;
      dragBaseRx = rx; dragBaseRy = ry; ensureLoop();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (mode === 'drag') {
        rx = dragBaseRx - (e.clientY - dragStartY) * DRAG_SENSITIVITY;
        ry = dragBaseRy - (e.clientX - dragStartX) * DRAG_SENSITIVITY;
      } else if (mode === 'hover') {
        const rect = svg.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        targetRy = HOME_RY - nx * HOVER_MAX_TILT;
        targetRx = HOME_RX - ny * HOVER_MAX_TILT;
      }
    };
    const onPointerUp = () => { if (mode === 'drag') enterSpring(velRx, velRy); };

    svg.addEventListener('pointerenter', onPointerEnter);
    svg.addEventListener('pointerleave', onPointerLeave);
    svg.addEventListener('pointerdown', onPointerDown);
    svg.addEventListener('pointermove', onPointerMove);
    svg.addEventListener('pointerup', onPointerUp);

    render(svg, fillEls, edgePath, rx, ry);
    mode = 'tween'; fromRx = rx; fromRy = ry; toRx = HOME_RX; toRy = HOME_RY;
    tweenStart = performance.now(); ensureLoop();

    return () => {
      cancelAnimationFrame(rafId);
      svg.removeEventListener('pointerenter', onPointerEnter);
      svg.removeEventListener('pointerleave', onPointerLeave);
      svg.removeEventListener('pointerdown', onPointerDown);
      svg.removeEventListener('pointermove', onPointerMove);
      svg.removeEventListener('pointerup', onPointerUp);
      for (const el of fillEls) el?.remove();
      edgePath.remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      style={{ touchAction: 'none', cursor: 'grab' }}
    />
  );
}
