import { patterns } from "../patterns/metadata";
import { CATEGORIES, type Category } from "./types";
import { components, type ComponentEntry } from "./registry";
import { localizedMeta, type LocalizedMeta } from "./localized-meta";
import { componentPath, guidePath, localePath, PATHS, routeIdentity, splitLocalePath, type DocsLocale } from "./paths";
export { componentPath } from "./paths";

export interface GuidePage extends LocalizedMeta {
  path: string;
  title: string;
  description: string;
  group: "开始" | "基础" | "任务";
  /** File under src/pages/docs, for the edit link. */
  file: string;
  keywords?: string[];
}

export const GUIDES: GuidePage[] = [
  { path: guidePath("design-philosophy"), title: "设计方法", description: "器用为本，关系为法，合宜为度；六种方法怎样参与设计判断。", group: "开始", file: "design-philosophy.tsx", keywords: ["文化", "方法", "理念", "名实", "布白"] },
  { path: guidePath("foundations"), title: "基础判断", description: "空间、密度、表面、中文排版、强调与状态。", group: "基础", file: "foundations.tsx", keywords: ["排版", "关系", "中文", "空间"] },
  { path: guidePath("ai"), title: "AI 使用", description: "同源设计指南、版本事实、主使用 Skill 与 Registry。", group: "开始", file: "ai.tsx", keywords: ["AI", "skill", "registry", "llms", "design.md"] },
  { path: guidePath("patterns"), title: "任务模式", description: "编辑、集合、详情、审核、队列与阅读。", group: "任务", file: "patterns.tsx", keywords: ["patterns", "恢复", "任务"] },
  ...patterns.map((pattern) => ({ path: pattern.href, title: pattern.title, description: pattern.description, group: "任务" as const, file: "patterns.tsx", keywords: [pattern.slug, ...pattern.methods] })),
  {
    path: PATHS.docs,
    title: "介绍",
    description: "Qingye UI 的设计依据，以及 Base UI 公共原语承担的可访问行为。",
    group: "开始",
    file: "introduction.tsx",
    keywords: ["intro", "about", "原则", "design.md", "base ui", "许可"],
  },
  {
    path: guidePath("installation"),
    title: "安装",
    description: "在 Tailwind CSS 4 或普通 React 项目中接入组件库，并挂载所需的 Provider。",
    group: "开始",
    file: "installation.tsx",
    keywords: ["install", "setup", "tailwind", "provider", "安装", "tarball", "快速开始"],
  },
  {
    path: guidePath("theming"),
    title: "主题",
    description: "三层令牌、品牌色与圆角覆盖、紧凑密度，以及无闪烁的深色模式。",
    group: "基础",
    file: "theming.tsx",
    keywords: ["theme", "dark", "brand", "深色", "暗色", "品牌", "density", "密度"],
  },
  {
    path: guidePath("tokens"),
    title: "设计令牌",
    description: "实时读取的颜色、字号、间距、圆角、阴影、控件高度与动效令牌。",
    group: "基础",
    file: "tokens.tsx",
    keywords: ["tokens", "color", "颜色", "色板", "spacing", "radius", "shadow", "令牌"],
  },
  {
    path: guidePath("motion"),
    title: "动效",
    description: "按压反馈、浮层入场、退出快于进入、键盘即时与减少动态效果。",
    group: "基础",
    file: "motion.tsx",
    keywords: ["motion", "animation", "动画", "reduced motion", "easing", "缓动"],
  },
  {
    path: guidePath("i18n"),
    title: "国际化",
    description: "UILocaleProvider、英文词条与局部覆盖内置文案。",
    group: "基础",
    file: "i18n.tsx",
    keywords: ["i18n", "locale", "english", "语言", "文案", "多语言"],
  },
  {
    path: guidePath("accessibility"),
    title: "无障碍",
    description: "组件遵循的无障碍做法，以及上线前的检查清单。",
    group: "基础",
    file: "accessibility.tsx",
    keywords: ["a11y", "accessibility", "aria", "键盘", "读屏", "对比度"],
  },
];

export const OVERVIEW: LocalizedMeta & { path: string; description: string } = {
  path: PATHS.components,
  title: "组件总览",
  description: "按类别浏览全部组件。",
};

/** Shell labels use the same optional parallel-field contract as content. */
export const NAV_LABELS: Record<string, LocalizedMeta> = Object.fromEntries(
  [...CATEGORIES, "其他", "开始", "基础", "任务", "组件", "总览", "文档", "指南", "示例"].map((title) => [title, { title }]),
);
export const navLabel = (title: string, locale: DocsLocale) => localizedMeta(NAV_LABELS[title] ?? { title }, locale).title;

export interface NavItem {
  path: string;
  title: string;
  /** Secondary label, e.g. the English component name. */
  hint?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

/** Splits `按钮 Button` into its Chinese and English parts. */
export function splitTitle(title: string): { zh: string; en: string | null } {
  const match = title.match(/^(.*?[^\x00-\x7F].*?)\s+([A-Za-z][\w .-]*)$/);
  if (!match) return { zh: title, en: null };
  return { zh: match[1]!.trim(), en: match[2]!.trim() };
}

export function componentLabel(entry: ComponentEntry, locale: DocsLocale): { title: string; hint?: string } {
  if (locale === "en" && entry.titleEn?.trim()) return { title: entry.titleEn };
  const { zh, en } = splitTitle(entry.title);
  return { title: zh, ...(en ? { hint: en } : {}) };
}

export function componentsByCategory(locale: DocsLocale = "zh"): { category: Category | "其他"; items: ComponentEntry[] }[] {
  const known = new Set<string>(CATEGORIES);
  const groups: { category: Category | "其他"; items: ComponentEntry[] }[] = CATEGORIES.map((category) => ({
    category,
    items: components.filter((entry) => entry.category === category).map((entry) => localizedMeta(entry, locale)),
  }));
  // A typo in a meta file should still surface the page rather than hide it.
  const stray = components.filter((entry) => !known.has(entry.category)).map((entry) => localizedMeta(entry, locale));
  if (stray.length) groups.push({ category: "其他", items: stray });
  return groups.filter((group) => group.items.length > 0);
}

export function navSections(locale: DocsLocale = "zh"): NavSection[] {
  const guide = (group: GuidePage["group"]) =>
    GUIDES.filter((page) => page.group === group).map((page) => ({ path: localePath(page.path, locale), title: localizedMeta(page, locale).title }));
  return [
    { title: "开始", items: guide("开始") },
    { title: "基础", items: guide("基础") },
    { title: "任务", items: guide("任务") },
    { title: "组件", items: [{ path: localePath(OVERVIEW.path, locale), title: navLabel("总览", locale) }] },
    ...componentsByCategory().map(({ category, items }) => ({
      title: category,
      items: items.map((entry) => {
        return { path: componentPath(entry.slug, locale), ...componentLabel(entry, locale) };
      }),
    })),
  ].map((section) => ({ ...section, title: navLabel(section.title, locale) }));
}

/** Reading order for previous / next links. */
export function readingOrder(locale: DocsLocale = "zh"): NavItem[] {
  return navSections(locale).flatMap((section) =>
    section.items.map((item) => (routeIdentity(item.path) === OVERVIEW.path ? { ...item, title: localizedMeta(OVERVIEW, locale).title } : item)),
  );
}

export function neighbours(path: string, locale: DocsLocale = splitLocalePath(path).locale): { prev?: NavItem; next?: NavItem } {
  const order = readingOrder(locale);
  const index = order.findIndex((item) => routeIdentity(item.path) === routeIdentity(path));
  if (index < 0) return {};
  return {
    ...(index > 0 ? { prev: order[index - 1]! } : {}),
    ...(index < order.length - 1 ? { next: order[index + 1]! } : {}),
  };
}

export function breadcrumbs(path: string, locale: DocsLocale = splitLocalePath(path).locale): NavItem[] {
  const identity = routeIdentity(path);
  const introduction = GUIDES.find((page) => page.path === PATHS.docs)!;
  const root = { path: localePath(PATHS.docs, locale), title: localizedMeta(introduction, locale).title };
  if (identity === PATHS.docs) return [root];
  if (identity === PATHS.components) return [root, { path: localePath(OVERVIEW.path, locale), title: localizedMeta(OVERVIEW, locale).title }];
  const component = components.find((entry) => componentPath(entry.slug) === identity);
  if (component) return [...breadcrumbs(PATHS.components, locale), { path: componentPath(component.slug, locale), title: localizedMeta(component, locale).title }];
  const guide = GUIDES.find((page) => routeIdentity(page.path) === identity);
  return guide ? [root, { path: localePath(guide.path, locale), title: localizedMeta(guide, locale).title }] : [];
}
