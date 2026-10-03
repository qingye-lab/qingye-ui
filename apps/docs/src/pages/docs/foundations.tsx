import { A, H2, P, PageHeader } from "@/components/prose";
import { useDocsLocale } from "@/lib/docs-locale";
export default function FoundationsPage() {
  const en = useDocsLocale() === "en";
  const sections = en ? [
    ["space", "Space and density", "Group related fields, separate different tasks, and retain comparison columns. Choose a reading width for the content. Compact density changes relationships without replacing readable text or usable hit areas.", "layout", "Layout"],
    ["surface", "Boundaries", "Use a boundary for an independent object. Titles, alignment, and spacing can organize one task without adding a box to every paragraph. InputGroup gives related controls a shared boundary.", "input-group", "InputGroup"],
    ["type", "Typography", "Check long names, mixed scripts, punctuation, and real numeric values. Align data for comparison. Give long text room to wrap instead of reducing every label to a small font.", "typography", "Typography"],
    ["state", "Truthful states", "Separate a draft from an applied condition, pending work from a confirmed result, and unknown from empty. A failure should preserve the work needed to recover.", "filter-bar", "FilterBar"],
  ] : [
    ["space", "空间与密度", "相关字段放在同组，不同任务用章节分开，比较列同时保留。阅读宽度随内容确定；紧凑密度调整关系间隔，不替代可读文字与可用命中区域。", "layout", "Layout"],
    ["surface", "表面与轮廓", "独立对象需要边界；同一任务用标题、对齐和间距组织，不必给每段文字加框。相关控件可用 InputGroup 共用边界。", "input-group", "InputGroup"],
    ["type", "排版", "检查长名称、中英混排、标点与真实数值。比较数据按列对齐，长文字留出换行容量，不把所有标签缩成小字。", "typography", "Typography"],
    ["state", "真实状态", "草稿与已应用条件、处理中与已确认结果、未知与空值分别表达。失败后保留恢复操作需要的已有工作。", "filter-bar", "FilterBar"],
  ];
  return <article><PageHeader title={en ? "Foundations" : "基础"} />{sections.map(([id,title,text,slug,label]) => <section key={id}><H2 id={id!}>{title}</H2><P>{text} <A href={`/docs/components/${slug}`}>{label}</A></P></section>)}<P><A href="/docs/tokens">{en ? "Current tokens" : "当前令牌"}</A> · <A href="/docs/theming">{en ? "Theme axes" : "主题三轴"}</A> · <A href="/docs/accessibility">{en ? "Accessibility" : "无障碍"}</A></P></article>;
}
