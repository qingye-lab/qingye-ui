/*
 * 主题三轴的试用预设：首页的产品窗口与示例的裸框读同一份。
 * 明暗写 .light / .dark，密度写 data-density，品牌写 --qy-primary 与其前景（design.md「主题三轴不混用」）。
 * 品牌是试用的预设 [primary, primary-foreground]；「青」与本站 html[data-brand="qingye"] 同值（index.css）。
 */
export type Scheme = "light" | "dark";
export type Density = "default" | "compact";
export type Axes = { scheme: Scheme; density: Density; brand: string };
export type BrandPreset = { id: string; zh: string; en: string; light?: [string, string]; dark?: [string, string] };

export const BRANDS: BrandPreset[] = [
  { id: "ink", zh: "墨", en: "Ink" },
  { id: "qing", zh: "青", en: "Qing", light: ["oklch(0.48 0.085 200)", "oklch(0.985 0 0)"], dark: ["oklch(0.78 0.09 195)", "oklch(0.21 0.03 200)"] },
  { id: "ochre", zh: "赭", en: "Ochre", light: ["oklch(0.52 0.13 50)", "oklch(0.985 0 0)"], dark: ["oklch(0.77 0.12 65)", "oklch(0.23 0.04 55)"] },
  { id: "rose", zh: "胭", en: "Rose", light: ["oklch(0.52 0.18 12)", "oklch(0.985 0 0)"], dark: ["oklch(0.74 0.14 12)", "oklch(0.22 0.05 12)"] },
];

export const AXES_MESSAGE = "qy-axes";

/** Applies the three axes to a document root. Ink writes the library default explicitly so the site's own brand does not show through. */
export function applyAxes(root: HTMLElement, { scheme, density, brand }: Axes) {
  root.classList.toggle("dark", scheme === "dark");
  root.classList.toggle("light", scheme === "light");
  root.style.colorScheme = scheme;
  root.dataset.density = density;
  const pair = BRANDS.find((item) => item.id === brand)?.[scheme];
  root.style.setProperty("--qy-primary", pair ? pair[0] : "var(--qy-foreground)");
  root.style.setProperty("--qy-primary-foreground", pair ? pair[1] : "var(--qy-paper)");
}

export function axesFromSearch(search: string): Partial<Axes> {
  const params = new URLSearchParams(search);
  const scheme = params.get("scheme"), density = params.get("density"), brand = params.get("brand");
  return {
    ...(scheme === "light" || scheme === "dark" ? { scheme } : {}),
    ...(density === "default" || density === "compact" ? { density } : {}),
    ...(brand && BRANDS.some((item) => item.id === brand) ? { brand } : {}),
  };
}
