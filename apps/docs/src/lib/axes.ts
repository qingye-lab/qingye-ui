/*
 * 示例窗口里可以试的两个轴：密度与品牌（design.md「主题三轴不混用」）。
 * 明暗不在这里：框内的 ThemeProvider 读同一份存储并跟随站点（含跨文档的 storage 事件与系统偏好），
 * 窗口与站点永远同一种明暗，不会出现「浅色页里一张深色截图」。
 * 品牌的取值只在 index.css（--qy-try-*，成对给浅深两组）；这里只写属性。本站不设品牌色，「墨」就是库的默认。
 */
export type Density = "default" | "compact";
export type Axes = { density: Density; brand: string };
export type BrandPreset = { id: string; zh: string; en: string; swatch: string };

export const BRANDS: BrandPreset[] = [
  { id: "ink", zh: "墨", en: "Ink", swatch: "var(--qy-foreground)" },
  { id: "qing", zh: "青", en: "Qing", swatch: "var(--qy-try-qing)" },
  { id: "ochre", zh: "赭", en: "Ochre", swatch: "var(--qy-try-ochre)" },
  { id: "rose", zh: "胭", en: "Rose", swatch: "var(--qy-try-rose)" },
];

export const AXES_MESSAGE = "qy-axes";

/** Writes density and the trial brand on a document root. Ink is the library default, so it clears the trial. */
export function applyAxes(root: HTMLElement, { density, brand }: Partial<Axes>) {
  if (density) root.dataset.density = density;
  if (brand === "ink") delete root.dataset.tryBrand;
  else if (brand && BRANDS.some((item) => item.id === brand)) root.dataset.tryBrand = brand;
}

export function axesFromSearch(search: string): Partial<Axes> {
  const params = new URLSearchParams(search);
  const density = params.get("density"), brand = params.get("brand");
  return {
    ...(density === "default" || density === "compact" ? { density } : {}),
    ...(brand && BRANDS.some((item) => item.id === brand) ? { brand } : {}),
  };
}
