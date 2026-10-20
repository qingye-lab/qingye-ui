import type { ComponentMeta } from "@/lib/types";

export default {
  title: "异步内容 AsyncContent", titleEn: "AsyncContent",
  description: "分别呈现请求状态与仍然有效的内容。", descriptionEn: "Present request status separately from content that remains valid.",
  category: "反馈", layer: "pattern", source: "local", exports: ["AsyncContent"],
  keywords: ["async", "loading", "refresh", "error", "异步", "刷新", "重试"],
  decisions: "status 是最近请求的事实，hasContent 是应用对现有内容有效性的判断。首次加载没有内容；后台刷新和刷新失败保留内容及其组件身份。只有 success 且 hasContent=false 呈现空态。权限变化若使旧内容失效，应用须同时撤下它。",
  decisionsEn: "status describes the latest request; hasContent says whether existing content is still valid. Initial loading has no content; refresh and refresh failure retain content and component identity. Only success with hasContent=false shows an empty state. Applications must remove content if a permission change invalidates it.",
  api: [{ name: "AsyncContent", description: "不发请求的内容状态组合。", descriptionEn: "A content-state composition that makes no requests.", props: [
    { name: "status", type: '"pending" | "success" | "error"', description: "应用声明请求事实，不用超时猜测失败。", descriptionEn: "Application-declared request fact; elapsed time never implies failure." },
    { name: "hasContent / children", type: "boolean / ReactNode", description: "有效内容保持挂载；不会自动禁用、清空草稿或移动焦点。", descriptionEn: "Valid content stays mounted without automatic disabling, draft clearing or focus movement." },
    { name: "emptyContent / loadingContent / errorContent", type: "ReactNode", description: "emptyContent 必填；error 状态必须提供 errorContent。加载默认读 locale。重试动作由应用提供。", descriptionEn: "emptyContent is required; error requires errorContent. Loading defaults to the locale. The app supplies retry actions." },
    { name: "render / ref / native props", type: "useRender.ComponentProps<div>", description: "实际根节点的语义与属性；默认不建立 live region。", descriptionEn: "Semantics and props for the actual root; no live region is added by default." },
  ] }],
  design: {
    methods: ["名实相符", "进退相承", "相成相制"],
    whenToUse: ["首次加载、零结果、失败和保留有效内容的刷新。"],
    avoid: ["把权限、只读或局部失败塞进互斥的整页请求状态。", "用本组件管理请求、缓存或查询竞态。"],
    composition: ["权限与只读说明放在 children 的相应部位；局部失败使用局部 AsyncContent 或 Alert。"],
    stateOwner: { library: ["反馈与内容的稳定结构，pending 时保留内容区的 aria-busy；加载提示作为它的兄弟节点，避免播报被 busy 祖先延迟。"], application: ["请求、取消、迟到结果隔离、数据有效性、权限、草稿与重试。"] },
    responsive: ["不创建滚动区；长反馈和恢复动作由所组合组件换行。"],
  },
  designEn: {
    whenToUse: ["Initial loading, confirmed empty results, failure and refresh with retained valid content."],
    avoid: ["Collapsing permission, read-only or partial failure into a mutually exclusive page request state.", "Managing requests, caches or query races here."],
    composition: ["Place permission and read-only notices next to relevant content; use a local AsyncContent or Alert for partial failures."],
    stateOwner: { library: ["Stable feedback/content structure, aria-busy on retained content while pending; loading feedback is a sibling so a busy ancestor does not defer its announcement."], application: ["Requests, cancellation, stale response isolation, validity, permissions, drafts and retries."] },
    responsive: ["Adds no scroll owner; composed feedback and recovery controls handle wrapping."],
  },
  notes: ["错误不会自动宣告。需要即时宣告时由应用在 errorContent 中提供 role=alert；避免把整块有效内容设为 live region。", "hasContent 表示当前可呈现的内容，不等同于曾经成功过；筛选范围或权限变化后，由应用判断旧内容是否仍有效。"],
  notesEn: ["Errors are not announced automatically. Supply role=alert inside errorContent when appropriate, rather than making all retained content live.", "hasContent means content is currently usable, not that a past request once succeeded. The app re-evaluates validity after scope or permission changes."],
} satisfies ComponentMeta;
