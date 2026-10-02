import type { ComponentType } from "react";

/** Navigation groups, in display order. */
export const CATEGORIES = [
  "通用",
  "表单",
  "日期与时间",
  "数据展示",
  "反馈",
  "浮层",
  "导航",
  "布局",
  "排版",
  "工具",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface ApiProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ApiPart {
  /** Exported component name, e.g. `SelectTrigger`. */
  name: string;
  description: string;
  props?: ApiProp[];
}

export interface KeyboardRow {
  keys: string;
  description: string;
}

/** Public design guidance; APIs remain in the source and api metadata. */
export interface ComponentDesign {
  methods: string[];
  whenToUse: string[];
  avoid: string[];
  composition: string[];
  stateOwner: { library: string[]; application: string[] };
  responsive: string[];
  customization: string[];
}

/**
 * Written once per component at `src/content/<slug>/meta.ts`.
 * `<slug>` must match the library file name in packages/ui/src/components.
 */
export interface ComponentMeta {
  /** Display title, Chinese first: `按钮 Button`. */
  title: string;
  /** One or two sentences: what it is and when to use it. */
  description: string;
  category: Category;
  /** `coss` when adapted from coss ui; `local` when authored here. */
  source: "coss" | "local";
  /** Names imported in the usage snippet. */
  exports: string[];
  api: ApiPart[];
  keyboard?: KeyboardRow[];
  /** Short guidance bullets: do / don't, accessibility, composition. */
  notes?: string[];
  /** Search aliases, e.g. ["下拉", "dropdown"]. */
  keywords?: string[];
  design?: Partial<ComponentDesign>;
}

/**
 * Each demo lives at `src/content/<slug>/demos/<NN>-<name>.tsx` with a default
 * export component and a named `meta`. Files sort by name, so prefix with 01, 02…
 */
export interface DemoMeta {
  title: string;
  description?: string;
  /** Render the preview without padding, e.g. for full-width tables. */
  flush?: boolean;
}

export interface DemoModule {
  default: ComponentType;
  meta: DemoMeta;
}
