import { CATEGORIES, type Category } from "./types";
import { components, type ComponentEntry } from "./registry";
import { localizedMeta, type LocalizedMeta } from "./localized-meta";
import { componentPath, guidePath, localePath, PATHS, routeIdentity, splitLocalePath, type DocsLocale } from "./paths";
export { componentPath } from "./paths";

export interface GuidePage extends LocalizedMeta {
  path: string;
  title: string;
  description: string;
  group: "开始" | "理念与法度" | "指南" | "组件";
  /** File under src/pages/docs, for the edit link. */
  file: string;
  keywords?: string[];
}

export const GUIDES: GuidePage[] = [
  {
    path: PATHS.docs,
    title: "介绍", titleEn: "Introduction", descriptionEn: "What the library is built on, what stays in your application, and its design basis.",
    description: "组件库的构成、职责边界与设计依据。",
    group: "开始",
    file: "introduction.tsx",
    keywords: ["intro", "about", "原则", "design.md", "base ui", "许可"],
  },
  {
    path: guidePath("installation"),
    title: "安装", titleEn: "Installation", descriptionEn: "Package, optional peers, style entry and root providers.",
    description: "安装包、可选依赖、样式入口与根部 Provider。",
    group: "开始",
    file: "installation.tsx",
    keywords: ["install", "setup", "tailwind", "provider", "安装", "tarball", "快速开始"],
  },
  { path: guidePath("ai"), title: "AI 使用", titleEn: "Using AI", descriptionEn: "Shared design guidance, version facts, skills and registry.", description: "同源设计指南、版本事实、主使用 Skill 与 Registry。", group: "开始", file: "ai.tsx", keywords: ["AI", "skill", "registry", "llms", "design.md"] },
  { path: guidePath("design-philosophy"), title: "设计理念", titleEn: "Design philosophy", descriptionEn: "Purpose first, relations as method, fitness as measure: fifteen methods and their sources.", description: "器用为本，关系为法，合宜为度：十五条方法及其出处。", group: "理念与法度", file: "design-philosophy.tsx", keywords: ["文化", "方法", "理念", "名实", "布白"] },
  { path: guidePath("foundations"), title: "基础判断", titleEn: "Design judgments", descriptionEn: "Grouping, boundaries, emphasis, density, type and alignment, truthful state.", description: "分组、边界、强调、密度、文字与对齐、真实状态。", group: "理念与法度", file: "foundations.tsx", keywords: ["排版", "关系", "中文", "空间"] },
  {
    path: guidePath("tokens"),
    title: "设计令牌", titleEn: "Design tokens", descriptionEn: "Every value with its measured result, relation and source; filter by source.",
    description: "每个值的实测结果、关系与来源，可按来源筛选。",
    group: "理念与法度",
    file: "tokens.tsx",
    keywords: ["tokens", "color", "颜色", "色板", "spacing", "radius", "shadow", "令牌"],
  },
  {
    path: guidePath("theming"),
    title: "主题", titleEn: "Theming", descriptionEn: "Brand, light/dark and density on separate attributes; overriding radius and other roles.",
    description: "品牌、明暗与密度三个设置，以及圆角等角色的覆盖。",
    group: "指南",
    file: "theming.tsx",
    keywords: ["theme", "dark", "brand", "深色", "暗色", "品牌", "density", "密度"],
  },
  {
    path: guidePath("motion"),
    title: "动效", titleEn: "Motion", descriptionEn: "Press feedback, popup entry and exit, keyboard input and reduced motion.",
    description: "按压反馈、浮层进出、键盘输入与减少动态效果。",
    group: "指南",
    file: "motion.tsx",
    keywords: ["motion", "animation", "动画", "reduced motion", "easing", "缓动"],
  },
  {
    path: guidePath("i18n"),
    title: "国际化", titleEn: "Internationalization", descriptionEn: "Locale providers and built-in messages.",
    description: "UILocaleProvider、英文词条与局部覆盖内置文案。",
    group: "指南",
    file: "i18n.tsx",
    keywords: ["i18n", "locale", "english", "语言", "文案", "多语言"],
  },
  {
    path: guidePath("accessibility"),
    title: "无障碍", titleEn: "Accessibility", descriptionEn: "What components and applications each provide, contrast and targets, and a checklist.",
    description: "组件与应用各自提供的部分、对比度与命中区、检查清单。",
    group: "指南",
    file: "accessibility.tsx",
    keywords: ["a11y", "accessibility", "aria", "键盘", "读屏", "对比度"],
  },
  { path: guidePath("patterns"), title: "组件组合", description: "以真实组件组合表达应用事实。", titleEn: "Composition", descriptionEn: "Compose current components around application-owned facts.", group: "组件", file: "patterns.tsx", keywords: ["patterns", "恢复", "任务"] },
];

export const OVERVIEW: LocalizedMeta & { path: string; description: string } = {
  path: PATHS.components,
  title: "组件总览", titleEn: "Components", descriptionEn: "Browse the current components by category.",
  description: "按类别浏览全部组件。",
};

/** Shell labels use the same optional parallel-field contract as content. */
const labels: Record<string, string> = {"通用": "General", "表单": "Forms", "日期与时间": "Date and time", "数据展示": "Data display", "反馈": "Feedback", "浮层": "Overlays", "导航": "Navigation", "布局": "Layout", "排版": "Typography", "工具": "Utilities", "其他": "Other", "开始": "Getting started", "理念与法度": "Philosophy and foundations", "组件": "Components", "总览": "Overview", "文档": "Docs", "指南": "Guides", "示例": "Examples"};
export const NAV_LABELS: Record<string, LocalizedMeta> = Object.fromEntries(Object.entries(labels).map(([title, titleEn]) => [title, { title, titleEn }]));
export const navLabel = (title: string, locale: DocsLocale) => localizedMeta(NAV_LABELS[title] ?? { title }, locale).title;

export interface NavItem {
  path: string;
  title: string;
  /** Secondary label, e.g. the English component name. */
  hint?: string;
}

export interface NavSection {
  title: string;
  /** A component category: its entries fold under the title. */
  collapsible?: boolean;
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

/*
 * 文档区只有一棵导航树，每个页面里内容与位置都相同；先读什么、后读什么就是它的顺序：
 * 开始 → 理念与法度 → 指南 → 组件。理念与法度都在文档里，页头只有文档、组件、示例三个入口，
 * 当前页点亮它所属的那一处（navScope）。
 */
export type NavScope = "docs" | "components";
export function navScope(path: string): NavScope {
  const identity = routeIdentity(path);
  if (identity === PATHS.components || identity.startsWith(`${PATHS.components}/`)) return "components";
  return GUIDES.find((page) => routeIdentity(page.path) === identity)?.group === "组件" ? "components" : "docs";
}

export function navSections(locale: DocsLocale = "zh"): NavSection[] {
  const guide = (group: GuidePage["group"]) =>
    GUIDES.filter((page) => page.group === group).map((page) => ({ path: localePath(page.path, locale), title: localizedMeta(page, locale).title }));
  const sections: NavSection[] = [
    { title: "开始", items: guide("开始") },
    { title: "理念与法度", items: guide("理念与法度") },
    { title: "指南", items: guide("指南") },
    { title: "组件", items: [{ path: localePath(OVERVIEW.path, locale), title: navLabel("总览", locale) }, ...guide("组件")] },
    // The categories are the component list: collapsible, so the tree keeps one short shape.
    ...componentsByCategory().map(({ category, items }) => ({
      title: category,
      collapsible: true,
      items: items.map((entry) => {
        return { path: componentPath(entry.slug, locale), ...componentLabel(entry, locale) };
      }),
    })),
  ];
  return sections.map((section) => ({ ...section, title: navLabel(section.title, locale) }));
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
