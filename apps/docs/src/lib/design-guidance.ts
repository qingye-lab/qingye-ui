import type { ComponentDesign, ComponentMeta } from "./types";
import { localizedMeta } from "./localized-meta";
import type { DocsLocale } from "./paths";

export const METHODS = [
  { name: "名实相符", decision: "名称说明对象、动作与真实结果。", example: "保存超时后显示结果待核实，输入继续保留。", avoid: "请求发出就宣布已保存。", href: "/docs/patterns/edit" },
  { name: "相成相制", decision: "内容、操作、说明与保护共同完成任务。", example: "审核范围改变后重新确认；停止可以成为当下重点。", avoid: "把保护动作永远放在最弱的位置。", href: "/docs/patterns/review" },
  { name: "布白有用", decision: "关系间隔、工作容量与判断余地分别安排。", example: "比较字段同时保留，正文给阅读留出空间。", avoid: "为了低密度删掉比较列，或把示例自动变成输入。", href: "/docs/patterns/collection" },
  { name: "随境取度", decision: "按任务选择显著程度、持续时间和是否中断。", example: "字段错误原位出现，长阅读以正文为主。", avoid: "所有错误只用短暂通知，所有结果都弹窗。", href: "/docs/patterns/read" },
  { name: "展开有据", decision: "深入有理由，直接抵达与合理返回并存。", example: "详情保留明确对象；直达有稳定的上级入口。", avoid: "重要后果只藏在 Tooltip，返回依赖不存在的历史。", href: "/docs/patterns/detail" },
  { name: "进退相承", decision: "等待、失败、未知、取消与恢复围绕同一对象。", example: "取消请求与已取消分开，批量只重试失败项。", avoid: "关闭窗口就称为取消后台任务。", href: "/docs/patterns/queue" },
] as const;

const METHODS_EN = {
  名实相符: { name: "Name matches substance （名实相符）", decision: "Names identify the object, action, and actual outcome.", example: "After a save times out, mark the outcome as unconfirmed and keep the input.", avoid: "Announcing a successful save when the request has only been sent." },
  相成相制: { name: "Complementary roles and safeguards （相成相制）", decision: "Content, actions, explanations, and safeguards work together to complete the task.", example: "Confirm again when the review scope changes; stopping may be the primary action.", avoid: "Always giving safeguards the least emphasis." },
  布白有用: { name: "Space supports the task （布白有用）", decision: "Arrange spacing for relationships, room to work, and room to decide separately.", example: "Keep comparison fields visible together and give long text room to read.", avoid: "Removing comparison columns to reduce density, or turning examples into input automatically." },
  随境取度: { name: "Adapt to context （随境取度）", decision: "Choose emphasis, duration, and interruption to suit the task.", example: "Show field errors in place; give the body text priority during long reading.", avoid: "Putting every error in a brief notification or every result in a dialog." },
  展开有据: { name: "Purposeful progressive disclosure （展开有据）", decision: "Reveal more for a reason, with direct access and a clear way back.", example: "Keep the object clear in detail views and provide a stable parent link for direct arrivals.", avoid: "Hiding important consequences in a Tooltip or relying on browser history that may not exist." },
  进退相承: { name: "Continuity through change （进退相承）", decision: "Keep waiting, failure, uncertainty, cancellation, and recovery tied to the same object.", example: "Distinguish a cancellation request from confirmed cancellation; retry only failed items in a batch.", avoid: "Calling a background task cancelled just because its window closed." },
} as const;

/** Locale outlets for the site's method cards; the source METHODS stays Chinese. */
export function methodsFor(locale: DocsLocale = "zh") {
  return locale === "zh" ? METHODS : METHODS.map((method) => ({ ...method, ...METHODS_EN[method.name] }));
}

const categoryMethods: Record<string, string[]> = {
  通用: ["名实相符", "相成相制", "随境取度"], 表单: ["名实相符", "布白有用", "进退相承"],
  日期与时间: ["名实相符", "展开有据", "进退相承"], 数据展示: ["名实相符", "布白有用", "展开有据"],
  反馈: ["名实相符", "随境取度", "进退相承"], 浮层: ["相成相制", "展开有据", "进退相承"],
  导航: ["名实相符", "展开有据", "进退相承"], 布局: ["相成相制", "布白有用", "随境取度"],
  排版: ["名实相符", "布白有用", "随境取度"], 工具: ["相成相制", "随境取度"],
};

/** The site and catalog consume this; an omitted locale preserves Chinese output. */
export function designFor(meta: ComponentMeta, slug: string, locale: DocsLocale = "zh"): ComponentDesign {
  const en = locale === "en";
  const content = localizedMeta(meta, locale);
  const isInput = ["表单", "日期与时间"].includes(meta.category);
  const isOverlay = meta.category === "浮层";
  const design: ComponentDesign = {
    methods: categoryMethods[meta.category] ?? ["名实相符"],
    whenToUse: [content.description],
    avoid: [isInput
      ? en ? "Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it." : "不能仅用 placeholder 代替名称；失败后不要无故清空输入。"
      : isOverlay
        ? en ? "Do not put the only explanation of a critical consequence in a temporary popup; support both direct access and return navigation." : "不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。"
        : en ? "Do not substitute styling for semantics; distinguish empty, unknown, and zero values." : "不要让样式替代语义；空值、未知与零分别表达。"],
    composition: content.api.map((part) => `${part.name}${en ? ": " : "："}${part.description}`),
    stateOwner: {
      library: [en ? "Basic interactions, accessible semantics, and styling defined by the current exports and props." : "当前导出和属性定义的基础交互、可访问语义与样式。"],
      application: [isInput
        ? en ? "The object, draft, business validation rules, version, and save outcome." : "对象、草稿、校验业务规则、版本与保存结果。"
        : en ? "Data, permissions, action scope, asynchronous outcomes, and persistence." : "数据、权限、动作范围、异步结果与持久化。"],
    },
    responsive: [en ? "Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes." : "窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。"],
    customization: [en ? "Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library." : "先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。", en ? "Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies." : "品牌、明暗和密度分别配置，主题不改变权限或保存策略。"],
  };
  if (slug === "button") {
    design.whenToUse = [en ? "Perform an action with a clear name. The primary action may be save, stop, or return." : "执行名称明确的动作。当前最重要的动作可以是保存，也可以是停止或返回。"];
    design.avoid = [en ? "Do not label every action Confirm; visual styling cannot grant permission or determine risk." : "不要把所有操作都叫确定；视觉样式不能隐式授权或决定风险。"];
  }
  if (slug === "table" || slug === "data-table") design.avoid = [en ? "Keep key comparison columns on narrow screens; preserve their two-dimensional relationships and make horizontal reading discoverable." : "比较任务不应在窄屏直接删除关键列；保留二维关系，并给横向阅读清楚入口。"];
  if (slug === "toast") design.avoid = [en ? "Do not put an error that needs correction or the only action entry point solely in a disappearing notification." : "不要只在会消失的通知里表达需要修正的错误或唯一操作入口。"];
  if (slug === "theme-provider") design.stateOwner.application = [en ? "The host configures document-level theme preferences and storage; use data-brand for brand and data-density for density." : "文档级主题偏好与保存位置由宿主配置；品牌写 data-brand，密度写 data-density。"];
  // Component decisions are authoritative; category and legacy slug rules only
  // fill gaps for components that have not supplied a specific decision yet.
  const result = { ...design, ...meta.design };
  if (en) result.methods = result.methods.map((name) => METHODS_EN[name as keyof typeof METHODS_EN]?.name ?? name);
  return result;
}

/**
 * The component page's one decision paragraph, or an empty string.
 *
 * Deliberately not routed through `designFor`. That function synthesises every
 * omitted field, so a page reading it can never be empty: it would print the
 * category's `avoid` line and the library-wide `responsive`/`customization`
 * strings on all 88 pages whether or not they say anything about the
 * component. Filling is right for the catalog — a machine consumer wants the
 * default written out — and wrong for a page, where the whole point is that a
 * component with nothing component-specific to say renders nothing. So this
 * reads the authored fields directly and never falls back to a default.
 *
 * The source is `decisions` when a component has been given one, and otherwise
 * its own authored `avoid` plus the `application` half of `stateOwner` — the
 * one thing a demo cannot show, namely what the library leaves to the host.
 * Measured across all 88 metas: every authored `avoid` is component-specific
 * (0/88 match the category default, avg 39 chars) and 88/88 author an
 * `application`, so the derived paragraph averages ~64 characters and carries
 * a real prohibition rather than filler. That is why the fallback exists: an
 * all-empty opt-in would drop Button's "loading 只表示正在等待，不能当成保存成功"
 * and Command's empty-vs-loading-vs-failed distinction from the page entirely
 * until a later copy pass, which is the one loss the restructure may not take.
 *
 * Returns "" only when a component has none of the three authored. `whenToUse`,
 * `composition`, `stateOwner.library`, `responsive` and `customization` are
 * never read here: they stay in `design{}` for `gen-catalog.mjs`, which keeps
 * projecting them into ai/v<version>/components/<name>.md for machine consumers.
 * Pass a locale for raw metadata. ComponentPage already passes the entry from
 * `localizedMeta(found, locale)`, so its decision has been selected upstream.
 */
export function pageDecisionsFor(meta: ComponentMeta, locale: DocsLocale = "zh"): string {
  const authored = localizedMeta(meta, locale).decisions?.trim();
  if (authored) return authored;
  const parts = [...(meta.design?.avoid ?? []), ...(meta.design?.stateOwner?.application ?? [])]
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.join(" ");
}
