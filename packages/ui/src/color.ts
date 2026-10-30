/*
 * 用户数据里的颜色换算（ColorPicker / ColorSwatchPicker 用）。
 * 这里的颜色是内容，不是主题：只认 "#rrggbb"（不含透明度），小写规范形。
 * hsv 取浮点、不在内部取整，所以 hex → hsv → hex 对任何 24 位颜色都精确往返；
 * 取整只发生在最后一步写回 hex。
 */

export type Hsv = {
  /** 色相，0–360（360 与 0 同色，输出时归到 0–359.x）。 */
  h: number;
  /** 饱和度，0–100。 */
  s: number;
  /** 明度，0–100。 */
  v: number;
};

const STRICT_HEX = /^#[\da-f]{6}$/i;
const LOOSE_HEX = /^#?([\da-f]{3}|[\da-f]{6})$/i;

/** 严格形态：恰为 "#rrggbb"（大小写不限）。 */
export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && STRICT_HEX.test(value);
}

/**
 * 把人写的颜色整理成 "#rrggbb"；认不出来返回 null，由调用方呈现错误，不静默丢弃。
 * 接受：带或不带 "#"、三位简写、任意大小写、首尾空白。
 */
export function normalizeHex(input: string): string | null {
  const match = LOOSE_HEX.exec(input.trim());
  if (!match) return null;
  const digits = match[1]!.toLowerCase();
  return "#" + (digits.length === 3 ? [...digits].map((char) => char + char).join("") : digits);
}

function channels(hex: string): [number, number, number] {
  const n = Number.parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function hexToHsv(hex: string): Hsv {
  const [r, g, b] = channels(hex).map((channel) => channel / 255) as [number, number, number];
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: max === 0 ? 0 : (delta / max) * 100, v: max * 100 };
}

export function hsvToHex({ h, s, v }: Hsv): string {
  const hue = ((h % 360) + 360) % 360 / 60;
  const sat = Math.min(100, Math.max(0, s)) / 100;
  const val = Math.min(100, Math.max(0, v)) / 100;
  const f = (n: number) => {
    const k = (n + hue) % 6;
    return val - val * sat * Math.max(0, Math.min(k, 4 - k, 1));
  };
  const part = (channel: number) => Math.round(channel * 255).toString(16).padStart(2, "0");
  return "#" + part(f(5)) + part(f(3)) + part(f(1));
}

function luminance(hex: string): number {
  const [r, g, b] = channels(hex).map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * 压在这个颜色上的标记该用黑还是白：取对比度更高的一个。
 * 对任何颜色，较高者不低于约 4.58:1，所以标记与色块的对比度恒 ≥ 3:1。
 * 黑白恰好是 WCAG 对比度公式的两端，不是主题色，也不随主题变化。
 */
export function readableOn(hex: string): "#000000" | "#ffffff" {
  const l = luminance(hex);
  // 与白的对比 (1.05)/(l+0.05)，与黑的对比 (l+0.05)/0.05；相等处 l ≈ 0.179。
  return (l + 0.05) / 0.05 >= 1.05 / (l + 0.05) ? "#000000" : "#ffffff";
}
