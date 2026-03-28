export type DeterministicColorMode = 'light' | 'dark';

export type DeterministicColorPair = {
  bg: string;
  fg: string;
};

export type CSSVariableProperties = {
  [key: `--${string}`]: string;
};

/** Fixed hues for values with natural color associations */
const FIXED_HUES: Record<string, number> = {
  true: 142, // green
  false: 0, // red
  yes: 142,
  no: 0,
};

function fnv1a32(value: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

export function deterministicHue(seed: string) {
  const fixed = FIXED_HUES[seed.toLowerCase()];
  if (fixed !== undefined) return fixed;
  return fnv1a32(seed) % 360;
}

export function deterministicColors(
  seed: string,
  mode: DeterministicColorMode,
): DeterministicColorPair {
  const hue = deterministicHue(seed);

  if (mode === 'dark') {
    return {
      bg: `hsla(${hue}, 82%, 70%, 0.18)`,
      fg: `hsl(${hue}, 82%, 78%)`,
    };
  }

  return {
    bg: `hsl(${hue}, 100%, 97%)`,
    fg: `hsl(${hue}, 100%, 15%)`,
  };
}

export function deterministicColorVars(seed: string): CSSVariableProperties {
  const light = deterministicColors(seed, 'light');
  const dark = deterministicColors(seed, 'dark');

  return {
    '--deterministic-color-bg': light.bg,
    '--deterministic-color-fg': light.fg,
    '--deterministic-color-bg-dark': dark.bg,
    '--deterministic-color-fg-dark': dark.fg,
  };
}

/** Generate a deterministic HSL color suitable for avatar backgrounds */
export function avatarColor(seed: string): string {
  const hue = deterministicHue(seed);
  return `hsl(${hue}, 65%, 45%)`;
}
