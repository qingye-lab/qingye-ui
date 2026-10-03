import type { ComponentType } from "react";
import type { LocalizedMeta } from "./localized-meta";

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
  /** Translate descriptive labels; actual property identifiers stay unchanged. */
  nameEn?: string;
  type: string;
  typeEn?: string;
  default?: string;
  defaultEn?: string;
  description: string;
  descriptionEn?: string;
}

export interface ApiPart {
  /** Exported component name, e.g. `SelectTrigger`. */
  name: string;
  description: string;
  descriptionEn?: string;
  props?: ApiProp[];
}

export interface KeyboardRow {
  keys: string;
  keysEn?: string;
  description: string;
  descriptionEn?: string;
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

/** Parallel authored sections; omitted or blank entries retain the source. */
export type ComponentDesignTranslation = Partial<Omit<ComponentDesign, "methods" | "stateOwner">> & {
  stateOwner?: Partial<ComponentDesign["stateOwner"]>;
};

/**
 * Written once per component at `src/content/<slug>/meta.ts`.
 * `<slug>` must match the library file name in packages/ui/src/components.
 */
export interface ComponentMeta extends LocalizedMeta {
  /** Display title, Chinese first: `按钮 Button`. */
  title: string;
  /** One or two sentences: what it is and when to use it. */
  description: string;
  category: Category;
  /** 分层文档是归属依据；未完成重写的组件不推断层级。 */
  layer?: "foundation" | "primitive" | "pattern";
  /** Current library authorship classification; not independent provenance proof. */
  source: "local";
  /** Names imported in the usage snippet. */
  exports: string[];
  api: ApiPart[];
  keyboard?: KeyboardRow[];
  /** Short guidance bullets: do / don't, accessibility, composition. */
  notes?: string[];
  /** Parallel to notes: missing or blank entries fall back at the same index. */
  notesEn?: string[];
  /** Search aliases, e.g. ["下拉", "dropdown"]. */
  keywords?: string[];
  design?: Partial<ComponentDesign>;
  designEn?: ComponentDesignTranslation;
  /**
   * What a reader would get wrong about *this* component, in one place.
   *
   * Distinct from `description`, which says what the component is, and from
   * `notes`, which is a list of shorter do/don't bullets. Written as prose, not
   * as labelled fields: the page renders it as a plain paragraph, so it needs a
   * subject and a consequence, e.g. Button's "loading 只表示正在等待，不能当成
   * 保存成功".
   *
   * Optional on purpose. Absent means the page renders no slot at all — the
   * page must be able to say "this component has nothing extra to warn about"
   * without filler, which is why it is not read through `designFor()`.
   */
  decisions?: string;
}

/**
 * Each demo lives at `src/content/<slug>/demos/<NN>-<name>.tsx` with a default
 * export component and a named `meta`. Files sort by name, so prefix with 01, 02…
 */
export interface DemoMeta extends LocalizedMeta {
  /** Render the preview without padding, e.g. for full-width tables. */
  flush?: boolean;
}

export interface DemoModule {
  default: ComponentType;
  meta: DemoMeta;
}
