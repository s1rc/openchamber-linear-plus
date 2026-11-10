// Contrast checks, so a state's own color stays visible on the current theme.

export type Rgb = [number, number, number];

/** `#rgb`, `#rrggbb`, `rgb(r, g, b)` and `rgb(r g b)`; anything else is null. */
export const parseColor = (value: string): Rgb | null => {
  const text = value.trim().toLowerCase();
  const hex = text.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (hex) {
    const h = hex[1]!.length === 3 ? hex[1]!.split('').map((c) => c + c).join('') : hex[1]!;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const rgb = text.match(/^rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)/);
  return rgb ? [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])] : null;
};

export const luminance = ([r, g, b]: Rgb): number => {
  const channel = (v: number) => { const c = v / 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const contrast = (a: Rgb, b: Rgb): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
};

/** Below this a glyph is hard to see; Linear's Todo grey (#e2e2e2) on a light theme is the case. */
export const MIN_CONTRAST = 1.8;

/**
 * The color to draw: the state's own, or when it nearly matches the background, the state's color
 * mixed toward the text color. Unreadable inputs come back unchanged.
 */
export const legibleColor = (color: string, background: string): string => {
  const c = parseColor(color);
  const bg = parseColor(background);
  if (!c || !bg || contrast(c, bg) >= MIN_CONTRAST) return color;
  return `color-mix(in srgb, ${color} 45%, var(--oc-fg))`;
};
