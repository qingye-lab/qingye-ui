import { CATEGORIES, type Category } from "./types";
import { components, type ComponentEntry } from "./registry";

export interface GuidePage {
  path: string;
  title: string;
  description: string;
  group: "开始" | "基础";
  /** File under src/pages/docs, for the edit link. */
  file: string;
  keywords?: string[];
}

export const GUIDES: GuidePage[] = [
  {
    path: "/docs",
    title: "介绍",
    description: "Qingye UI 是什么、遵循哪些原则，以及它与 coss ui、Base UI 的关系。",
    group: "开始",
    file: "introduction.tsx",
    keywords: ["intro", "about", "原则", "coss", "base ui", "许可"],
  },
  {
    path: "/docs/installation",
    title: "安装",
    description: "在 Tailwind CSS 4 或普通 React 项目中接入组件库，并挂载所需的 Provider。",
    group: "开始",
    file: "installation.tsx",
    keywords: ["install", "setup", "tailwind", "provider", "安装", "tarball", "快速开始"],
  },
  {
    path: "/docs/theming",
    title: "主题",
    description: "三层令牌、品牌色与圆角覆盖、紧凑密度，以及无闪烁的深色模式。",
    group: "基础",
    file: "theming.tsx",
    keywords: ["theme", "dark", "brand", "深色", "暗色", "品牌", "density", "密度"],
  },
  {
    path: "/docs/tokens",
    title: "设计令牌",
    description: "实时读取的颜色、字号、间距、圆角、阴影、控件高度与动效令牌。",
    group: "基础",
    file: "tokens.tsx",
    keywords: ["tokens", "color", "颜色", "色板", "spacing", "radius", "shadow", "令牌"],
  },
  {
    path: "/docs/motion",
    title: "动效",
    description: "按压反馈、浮层入场、退出快于进入、键盘即时与减少动态效果。",
    group: "基础",
    file: "motion.tsx",
    keywords: ["motion", "animation", "动画", "reduced motion", "easing", "缓动"],
  },
  {
    path: "/docs/i18n",
    title: "国际化",
    description: "UILocaleProvider、英文词条与局部覆盖内置文案。",
    group: "基础",
    file: "i18n.tsx",
    keywords: ["i18n", "locale", "english", "语言", "文案", "多语言"],
  },
  {
    path: "/docs/accessibility",
    title: "无障碍",
    description: "组件遵循的无障碍做法，以及上线前的检查清单。",
    group: "基础",
    file: "accessibility.tsx",
    keywords: ["a11y", "accessibility", "aria", "键盘", "读屏", "对比度"],
  },
];

export const OVERVIEW = {
  path: "/docs/components",
  title: "组件总览",
  description: "按类别浏览全部组件。",
};

export const componentPath = (slug: string) => `/docs/components/${slug}`;

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

export function componentsByCategory(): { category: Category | "其他"; items: ComponentEntry[] }[] {
  const known = new Set<string>(CATEGORIES);
  const groups: { category: Category | "其他"; items: ComponentEntry[] }[] = CATEGORIES.map((category) => ({
    category,
    items: components.filter((entry) => entry.category === category),
  }));
  // A typo in a meta file should still surface the page rather than hide it.
  const stray = components.filter((entry) => !known.has(entry.category));
  if (stray.length) groups.push({ category: "其他", items: stray });
  return groups.filter((group) => group.items.length > 0);
}

export function navSections(): NavSection[] {
  const guide = (group: GuidePage["group"]) =>
    GUIDES.filter((page) => page.group === group).map((page) => ({ path: page.path, title: page.title }));
  return [
    { title: "开始", items: guide("开始") },
    { title: "基础", items: guide("基础") },
    { title: "组件", items: [{ path: OVERVIEW.path, title: "总览" }] },
    ...componentsByCategory().map(({ category, items }) => ({
      title: category,
      items: items.map((entry) => {
        const { zh, en } = splitTitle(entry.title);
        return { path: componentPath(entry.slug), title: zh, ...(en ? { hint: en } : {}) };
      }),
    })),
  ];
}

/** Reading order for previous / next links. */
export function readingOrder(): NavItem[] {
  return navSections().flatMap((section) =>
    section.items.map((item) => (item.path === OVERVIEW.path ? { ...item, title: OVERVIEW.title } : item)),
  );
}

export function neighbours(path: string): { prev?: NavItem; next?: NavItem } {
  const order = readingOrder();
  const index = order.findIndex((item) => item.path === path);
  if (index < 0) return {};
  return {
    ...(index > 0 ? { prev: order[index - 1]! } : {}),
    ...(index < order.length - 1 ? { next: order[index + 1]! } : {}),
  };
}
