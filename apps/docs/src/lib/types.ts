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

/** Consumer-side naming or usage correction (not a former Qingye name). */
export interface ComponentConfusion {
  /** Mistaken name (often a habit from other React UI libraries) or state-semantics misuse. */
  mistaken: string;
  mistakenEn?: string;
  /** Exports of this component's own module to use instead (validated against its actual exports). */
  use: string[];
  note: string;
  noteEn?: string;
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
  /** Consumer-side naming or usage corrections projected into ai/SKILL.md. */
  confusions?: ComponentConfusion[];
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
  /**
   * 样张：同一个控件的几种外观或状态并列（尺寸、变体、忙碌与禁用），名称相同是有意的。
   * 渲染为 `data-specimen`；`scripts/name-audit.mjs` 把落在其中的同名发现单列，仍计数、仍输出，页面不因此算 PASS。
   * 只在演示目的就是并列比较时使用；行内操作、表单等真实用法同名仍须改名称。
   */
  specimen?: boolean;
}

export interface DemoModule {
  default: ComponentType;
  meta: DemoMeta;
}
