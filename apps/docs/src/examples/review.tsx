import * as React from "react";
import {
  IconCheck,
  IconFileCode,
  IconFilter,
  IconGitBranch,
  IconLayoutSidebarRight,
  IconMessagePlus,
  IconRefresh,
  IconRotateClockwise,
  IconX,
} from "@tabler/icons-react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle } from "@qingye_lab/ui/components/alert-dialog";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Chip } from "@qingye_lab/ui/components/chip";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Composer, ComposerInput, ComposerSubmit, ComposerToolbar, composerValueToText, type ComposerSegment, type ComposerTrigger } from "@qingye_lab/ui/components/composer";
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuSeparator, ContextMenuTrigger } from "@qingye_lab/ui/components/context-menu";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerPopup, DrawerTitle } from "@qingye_lab/ui/components/drawer";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { FilterBar, FilterBarActions, FilterBarApplied, FilterBarApply, FilterBarCancel, FilterBarClear, FilterBarFields, FilterBarStatus } from "@qingye_lab/ui/components/filter-bar";
import { Input } from "@qingye_lab/ui/components/input";
import { Item } from "@qingye_lab/ui/components/item";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@qingye_lab/ui/components/resizable";
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Toggle } from "@qingye_lab/ui/components/toggle";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { useExampleEmbedded } from "./embedding";
import "./review.css";

/*
 * 变更审阅台（Linear + Vercel 三栏空间工作台）。
 * - 左栏（清墨底面）：快捷视图过滤（全部 / 待审 / 阻断）+ FilterBar 细筛 + 队列右键菜单 + j/k 键盘切项；
 * - 中栏（素纸主舞台）：语法分层的多文件代码 Diff，支持悬停任意代码行点击「+」就地发表行内审阅评论，下方自然衔接讨论流与 Composer；
 * - 右栏（Linear 属性检查器 + Vercel 门禁流水线）：直接修改状态/影响级别、逐项串行推进的自动化门禁与可展开日志、改动占比与文件速跳。
 */

type ReviewDecision = "待审阅" | "已批准" | "需修改";
type ImpactLevel = 1 | 2 | 3;

type DiffLine = {
  oldNo?: number;
  newNo?: number;
  kind: "ctx" | "add" | "del";
  text: string;
};

type DiffFile = {
  path: string;
  added: number;
  removed: number;
  lines: DiffLine[];
};

type CheckState = "pass" | "fail" | "running";

type CheckItem = {
  id: string;
  name: string;
  state: CheckState;
  duration: string;
  log: string;
  /** 重跑后的确定结果：只有确属偶发失败的一项为 pass；缺省表示重跑后结果不变。 */
  rerun?: "pass" | "fail";
};

type InlineNote = {
  id: string;
  filePath: string;
  lineIndex: number;
  author: string;
  time: string;
  body: string;
};

type ChangeRequest = {
  id: string;
  code: string;
  title: string;
  scope: string;
  branch: string;
  commit: string;
  author: string;
  reviewers: string[];
  impact: ImpactLevel;
  status: ReviewDecision;
  updatedAt: string;
  summary: string;
  files: DiffFile[];
  checks: CheckItem[];
};

type CommentItem = {
  id: string;
  author: string;
  at: string;
  time: string;
  body: string;
  kind?: "comment" | "decision" | "inline";
  ref?: string;
};

const REFERENCE_NOW = new Date("2026-10-07T15:00:00+08:00").getTime();

const INITIAL_CHANGES: ChangeRequest[] = [
  {
    id: "cr-408",
    code: "CR-408",
    title: "浮层弹窗统一焦点归还与嵌套层级",
    scope: "Dialog / Drawer",
    branch: "fix/floating-layer-focus",
    commit: "8a3f92d",
    author: "陈致远",
    reviewers: ["李一鸣", "林晚"],
    impact: 3,
    status: "待审阅",
    updatedAt: new Date(REFERENCE_NOW - 14 * 60_000).toISOString(),
    summary: "将 Dialog 与 Drawer 的弹出层级统一接入 floating-layer，关闭时焦点精确归还触发元素；修复 Popover 内嵌 ConfirmAction 时滚动锁未释放。",
    files: [
      {
        path: "packages/ui/src/components/dialog.tsx",
        added: 4,
        removed: 2,
        lines: [
          { oldNo: 52, newNo: 52, kind: "ctx", text: "export function DialogPopup({ finalFocus, style, ...props }: DialogPopupProps) {" },
          { oldNo: 53, kind: "del", text: "  const layerZ = 30;" },
          { newNo: 53, kind: "add", text: "  const layer = useFloatingLayer(\"modal\");" },
          { oldNo: 54, newNo: 54, kind: "ctx", text: "  return (" },
          { oldNo: 55, newNo: 55, kind: "ctx", text: "    <DialogPrimitive.Popup" },
          { oldNo: 56, kind: "del", text: "      style={{ zIndex: layerZ, ...style }}" },
          { newNo: 56, kind: "add", text: "      style={{ ...layer, ...style }}" },
          { newNo: 57, kind: "add", text: "      finalFocus={finalFocus ?? true}" },
          { oldNo: 57, newNo: 58, kind: "ctx", text: "      {...props}" },
          { oldNo: 58, newNo: 59, kind: "ctx", text: "    />" },
          { oldNo: 59, newNo: 60, kind: "ctx", text: "  );" },
          { oldNo: 60, newNo: 61, kind: "ctx", text: "}" },
        ],
      },
      {
        path: "packages/ui/src/components/drawer.tsx",
        added: 2,
        removed: 1,
        lines: [
          { oldNo: 84, newNo: 84, kind: "ctx", text: "export function DrawerFooter({ className, ...props }: DrawerFooterProps) {" },
          { oldNo: 85, kind: "del", text: "  return <div className={cn(\"flex items-center justify-end gap-(--qy-action-gap)\", className)} {...props} />;" },
          { newNo: 85, kind: "add", text: "  return <div className={cn(\"flex flex-wrap items-center justify-end gap-(--qy-action-gap)\", className)} {...props} />;" },
          { oldNo: 86, newNo: 86, kind: "ctx", text: "}" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.8s", log: "tsc --noEmit · packages/ui & apps/docs\n0 errors across 312 source files." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "4.2s", log: "axe-core · light & dark · 24 overlay states\n0 violations (focus-return verified)." },
      { id: "geom", name: "390px 几何溢出审计", state: "fail", duration: "3.1s", log: "FAIL /playground/drawer (390x900 dark)\nDrawerFooter 3-button row overflows by 6px.\nFix landed in 8a3f92d — re-run checks to verify.", rerun: "pass" },
    ],
  },
  {
    id: "cr-411",
    code: "CR-411",
    title: "DataTable 吸顶表头改用 1px 清墨线",
    scope: "DataTable",
    branch: "refactor/table-sticky-border",
    commit: "3d10c4b",
    author: "林晚",
    reviewers: ["陈致远", "王一帆"],
    impact: 2,
    status: "待审阅",
    updatedAt: new Date(REFERENCE_NOW - 48 * 60_000).toISOString(),
    summary: "移除吸顶列双层投影，改用 1px 清墨分隔线区隔滚动边界，并停止每次重渲染重复测量列宽。",
    files: [
      {
        path: "packages/ui/tokens/components.css",
        added: 2,
        removed: 2,
        lines: [
          { oldNo: 214, newNo: 214, kind: "ctx", text: "[data-slot=\"table-container\"][data-scrolled-x=\"true\"] th[data-sticky] {" },
          { oldNo: 215, kind: "del", text: "  box-shadow: 4px 0 12px rgb(0 0 0 / 0.12);" },
          { newNo: 215, kind: "add", text: "  border-inline-end: 1px solid var(--qy-border-strong);" },
          { oldNo: 216, newNo: 216, kind: "ctx", text: "  background: var(--qy-surface);" },
          { oldNo: 217, newNo: 217, kind: "ctx", text: "}" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.7s", log: "0 errors." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "3.5s", log: "0 violations." },
      { id: "geom", name: "390px 几何溢出审计", state: "pass", duration: "2.9s", log: "TableContainer owns horizontal scroll (page overflow 0px)." },
    ],
  },
  {
    id: "cr-415",
    code: "CR-415",
    title: "DateRangePicker 窄屏自动收拢单月视图",
    scope: "DateRangePicker",
    branch: "feat/date-range-narrow",
    commit: "c7b841e",
    author: "王一帆",
    reviewers: ["陈致远", "赵子纯"],
    impact: 1,
    status: "已批准",
    updatedAt: new Date(REFERENCE_NOW - 190 * 60_000).toISOString(),
    summary: "视口窄于 48rem 时自动切换单月日历并保留起止草稿，紧凑密度下维持 44px 粗指针命中区。",
    files: [
      {
        path: "packages/ui/src/components/date-range-picker.tsx",
        added: 3,
        removed: 1,
        lines: [
          { oldNo: 108, newNo: 108, kind: "ctx", text: "const isNarrow = useMediaQuery(\"(width < 48rem)\");" },
          { oldNo: 109, kind: "del", text: "const months = numberOfMonths;" },
          { newNo: 109, kind: "add", text: "const months = isNarrow ? 1 : numberOfMonths;" },
          { oldNo: 110, newNo: 110, kind: "ctx", text: "return <Calendar mode=\"range\" numberOfMonths={months} selected={draft} onSelect={setDraft} />;" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.6s", log: "0 errors." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "3.8s", log: "Month navigation group labeled; 0 violations." },
      { id: "geom", name: "390px 几何溢出审计", state: "pass", duration: "2.6s", log: "0px overflow on 390px light & dark." },
    ],
  },
  {
    id: "cr-417",
    code: "CR-417",
    title: "全局滚动条统一 4px 悬浮细条",
    scope: "ScrollArea / styles.css",
    branch: "feat/unified-thin-scrollbar",
    commit: "90e1a2c",
    author: "陈致远",
    reviewers: ["林晚"],
    impact: 2,
    status: "待审阅",
    updatedAt: new Date(REFERENCE_NOW - 240 * 60_000).toISOString(),
    summary: "在 styles.css base 层统一原生滚动条至 2 分轨道与 1 分圆角浮条，强制颜色模式保留系统行为。",
    files: [
      {
        path: "packages/ui/styles.css",
        added: 6,
        removed: 0,
        lines: [
          { newNo: 138, kind: "add", text: "@media (forced-colors: none) {" },
          { newNo: 139, kind: "add", text: "  *:not([data-slot=\"scroll-area-viewport\"])::-webkit-scrollbar {" },
          { newNo: 140, kind: "add", text: "    width: calc(2 * var(--qy-fen));" },
          { newNo: 141, kind: "add", text: "    height: calc(2 * var(--qy-fen));" },
          { newNo: 142, kind: "add", text: "  }" },
          { newNo: 143, kind: "add", text: "}" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.5s", log: "0 errors." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "3.2s", log: "0 violations." },
      { id: "geom", name: "390px 几何溢出审计", state: "pass", duration: "2.4s", log: "0px overflow." },
    ],
  },
  {
    id: "cr-419",
    code: "CR-419",
    title: "CommandEmpty 状态区移出 listbox",
    scope: "Command",
    branch: "fix/command-empty-portal",
    commit: "e214f80",
    author: "李一鸣",
    reviewers: ["陈致远", "周禾"],
    impact: 2,
    status: "已批准",
    updatedAt: new Date(REFERENCE_NOW - 420 * 60_000).toISOString(),
    summary: "将无匹配结果的 role=\"status\" 播报经 Portal 移出 listbox，视觉文案留在列表内且只渲染一次。",
    files: [
      {
        path: "packages/ui/src/components/command.tsx",
        added: 3,
        removed: 1,
        lines: [
          { oldNo: 142, newNo: 142, kind: "ctx", text: "export function CommandEmpty({ children }: CommandEmptyProps) {" },
          { oldNo: 143, kind: "del", text: "  return <div role=\"status\" className=\"py-6 text-center text-muted-foreground\">{children}</div>;" },
          { newNo: 143, kind: "add", text: "  return <>" },
          { newNo: 144, kind: "add", text: "    <div aria-hidden=\"true\" className=\"py-6 text-center text-muted-foreground\">{children}</div>" },
          { newNo: 145, kind: "add", text: "    <CommandStatusPortal>{children}</CommandStatusPortal></>;" },
          { oldNo: 144, newNo: 146, kind: "ctx", text: "}" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.6s", log: "0 errors." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "3.4s", log: "aria-required-children resolved." },
      { id: "geom", name: "390px 几何溢出审计", state: "pass", duration: "2.5s", log: "0px overflow." },
    ],
  },
  {
    id: "cr-422",
    code: "CR-422",
    title: "CodeBlock 无标题滚动区按首行命名",
    scope: "CodeBlock",
    branch: "fix/code-block-region-name",
    commit: "5b79c11",
    author: "周禾",
    reviewers: ["李一鸣"],
    impact: 1,
    status: "需修改",
    updatedAt: new Date(REFERENCE_NOW - 680 * 60_000).toISOString(),
    summary: "新增 codeRegionNamed 语料键，避免同一页面多个代码块在读屏地标列表里重名。",
    files: [
      {
        path: "packages/ui/src/components/code-block.tsx",
        added: 2,
        removed: 1,
        lines: [
          { oldNo: 64, newNo: 64, kind: "ctx", text: "const firstLine = code.trim().split(\"\\n\")[0]?.slice(0, 40) ?? \"\";" },
          { oldNo: 65, kind: "del", text: "const regionName = title ?? language ?? messages.codeRegion;" },
          { newNo: 65, kind: "add", text: "const regionName = title ?? messages.codeRegionNamed(language ?? messages.codeRegion, firstLine);" },
        ],
      },
    ],
    checks: [
      { id: "ts", name: "TypeScript 严格类型", state: "pass", duration: "1.5s", log: "0 errors." },
      { id: "a11y", name: "WCAG 2.2 AA 扫描", state: "pass", duration: "3.1s", log: "0 violations." },
      { id: "i18n", name: "en-US 语料同步校验", state: "fail", duration: "1.1s", log: "MISSING KEY: codeRegionNamed in packages/ui/src/locales/en-US.ts" },
    ],
  },
];

const INITIAL_INLINE_NOTES: Record<string, InlineNote[]> = {
  "cr-408": [
    {
      id: "in-1",
      filePath: "packages/ui/src/components/dialog.tsx",
      lineIndex: 2,
      author: "李一鸣",
      time: "14:25",
      body: "Popover 内嵌 ConfirmAction 实测通过，关闭后焦点能准确归还触发按钮。",
    },
  ],
};

const INITIAL_COMMENTS: Record<string, CommentItem[]> = {
  "cr-408": [
    { id: "c1", author: "李一鸣", at: new Date(REFERENCE_NOW - 35 * 60_000).toISOString(), time: "14:25", body: "桌面端连续打开 Popover → ConfirmAction 后焦点归还准确，已复测 Safari 与 Chrome。" },
    { id: "c2", author: "林晚", at: new Date(REFERENCE_NOW - 18 * 60_000).toISOString(), time: "14:42", body: "DrawerFooter 已补 flex-wrap，在右侧门禁流水线点击「重跑验证」即可确认 390px 转绿。" },
  ],
  "cr-411": [
    { id: "c3", author: "陈致远", at: new Date(REFERENCE_NOW - 40 * 60_000).toISOString(), time: "14:20", body: "去掉投影改用 1px 清墨线后与设计基调完全一致，长表排序无额外列宽重测。" },
  ],
  "cr-415": [
    { id: "c4", author: "赵子纯", at: new Date(REFERENCE_NOW - 150 * 60_000).toISOString(), time: "12:30", body: "已批准 CR-415：390px 窄屏与深色对比度均通过。", kind: "decision" },
  ],
  "cr-422": [
    { id: "c5", author: "李一鸣", at: new Date(REFERENCE_NOW - 620 * 60_000).toISOString(), time: "04:40", body: "请在 en-US.ts 同步补上 codeRegionNamed 键后再提交重审。", kind: "decision" },
  ],
};

/** 极克制的轻量语法分段（零外部高亮包，只用库官方语义与墨阶令牌区分关键字、字符串与注释）。 */
function renderCodeTokens(line: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\/\/.*$|"(?:\\.|[^"\\])*"|\b(?:export|function|const|return|true|false|null|undefined)\b)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
    const token = match[0];
    const cls = token.startsWith("//") ? "review-tok-cm" : token.startsWith("\"") ? "review-tok-str" : "review-tok-kw";
    parts.push(<span key={key++} className={cls}>{token}</span>);
    lastIndex = match.index + token.length;
  }
  if (lastIndex < line.length) parts.push(line.slice(lastIndex));
  return parts.length ? parts : line;
}

function queueDotStatus(item: ChangeRequest): StatusDotStatus {
  if (item.checks.some((c) => c.state === "running")) return "in-progress";
  if (item.status === "已批准") return "online";
  if (item.status === "需修改" || item.checks.some((c) => c.state === "fail")) return "error";
  return "in-progress";
}

function queueDotLabel(item: ChangeRequest): string {
  if (item.checks.some((c) => c.state === "running")) return "验证中";
  if (item.status === "已批准") return "已批准";
  if (item.status === "需修改") return "需修改";
  if (item.checks.some((c) => c.state === "fail")) return "门禁阻断";
  return "待审阅";
}

function diffTotals(files: readonly DiffFile[]) {
  return files.reduce((acc, f) => ({ added: acc.added + f.added, removed: acc.removed + f.removed }), { added: 0, removed: 0 });
}

function filePlainCode(file: DiffFile) {
  return file.lines.filter((line) => line.kind !== "del").map((line) => line.text).join("\n");
}

function Main({ className, children }: { className: string; children: React.ReactNode }) {
  return useExampleEmbedded() ? <div className={className}>{children}</div> : <main className={className} id="main" tabIndex={-1}>{children}</main>;
}

export default function ReviewApp() {
  const [changes, setChanges] = React.useState<ChangeRequest[]>(() => INITIAL_CHANGES);
  const [activeId, setActiveId] = React.useState<string>(INITIAL_CHANGES[0]!.id);
  const [comments, setComments] = React.useState<Record<string, CommentItem[]>>(() => INITIAL_COMMENTS);
  const [inlineNotes, setInlineNotes] = React.useState<Record<string, InlineNote[]>>(() => INITIAL_INLINE_NOTES);
  const [composingLine, setComposingLine] = React.useState<{ filePath: string; lineIndex: number } | null>(null);
  const [inlineDraft, setInlineDraft] = React.useState("");

  // 快捷视图 + FilterBar 细筛
  const [quickTab, setQuickTab] = React.useState<"all" | "pending" | "blocking">("all");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [draftQuery, setDraftQuery] = React.useState("");
  const [draftStatus, setDraftStatus] = React.useState<"全部" | ReviewDecision>("全部");
  const [applied, setApplied] = React.useState<{ query: string; status: "全部" | ReviewDecision }>({ query: "", status: "全部" });

  // 右侧门禁日志展开与串行重跑进度
  const [expandedCheckId, setExpandedCheckId] = React.useState<string | null>("geom");
  const [recheckProgress, setRecheckProgress] = React.useState<Record<string, number>>({});
  const [approveRequestId, setApproveRequestId] = React.useState<string | null>(null);

  // 中/窄屏面板切换与抽屉
  const [mobilePane, setMobilePane] = React.useState<"queue" | "stage" | "inspector">("stage");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isNarrow, setIsNarrow] = React.useState(() => (typeof window !== "undefined" ? window.matchMedia("(width < 64rem)").matches : false));

  const fileRefs = React.useRef<Record<string, HTMLElement | null>>({});
  const timers = React.useRef<number[]>([]);
  React.useEffect(() => () => { timers.current.forEach((id) => window.clearTimeout(id)); }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(width < 64rem)");
    const sync = () => setIsNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const blockingTotal = React.useMemo(() => changes.filter((c) => c.checks.some((k) => k.state === "fail")).length, [changes]);
  const pendingTotal = React.useMemo(() => changes.filter((c) => c.status === "待审阅").length, [changes]);

  const filtered = React.useMemo(() => {
    const q = applied.query.trim().toLowerCase();
    return changes.filter((item) => {
      if (quickTab === "pending" && item.status !== "待审阅") return false;
      if (quickTab === "blocking" && !item.checks.some((c) => c.state === "fail")) return false;
      if (q && !item.title.toLowerCase().includes(q) && !item.scope.toLowerCase().includes(q) && !item.code.toLowerCase().includes(q)) return false;
      if (applied.status !== "全部" && item.status !== applied.status) return false;
      return true;
    });
  }, [changes, quickTab, applied]);

  const active = changes.find((item) => item.id === activeId) ?? changes[0]!;
  const blockingChecks = active.checks.filter((c) => c.state === "fail");
  const hasBlocking = blockingChecks.length > 0;
  const activeProgress = recheckProgress[active.id];
  const isRunning = active.checks.some((c) => c.state === "running") || activeProgress !== undefined;
  const totals = diffTotals(active.files);
  const approveRequest = approveRequestId ? changes.find((c) => c.id === approveRequestId) ?? null : null;
  const approveFailed = approveRequest?.checks.filter((c) => c.state === "fail") ?? [];
  const activeInlineNotes = inlineNotes[active.id] ?? [];

  const selectChange = React.useCallback((id: string) => {
    setActiveId(id);
    setComposingLine(null);
    setInlineDraft("");
    const target = changes.find((c) => c.id === id);
    const failed = target?.checks.find((k) => k.state === "fail");
    setExpandedCheckId(failed?.id ?? null);
  }, [changes]);

  // 键盘 j / k 快捷切项
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target || target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "j" && event.key !== "k") return;
      const idx = filtered.findIndex((item) => item.id === active.id);
      if (idx === -1) return;
      const next = event.key === "j" ? filtered[idx + 1] : filtered[idx - 1];
      if (next) {
        event.preventDefault();
        selectChange(next.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, active.id, selectChange]);

  const appendComment = React.useCallback((targetId: string, body: string, kind: CommentItem["kind"] = "comment", ref?: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setComments((prev) => ({
      ...prev,
      [targetId]: [
        ...(prev[targetId] ?? []),
        { id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, author: "陈致远", at: now.toISOString(), time, body, kind, ...(ref ? { ref } : {}) },
      ],
    }));
  }, []);

  const setDecision = React.useCallback((target: ChangeRequest, decision: ReviewDecision) => {
    setChanges((prev) => prev.map((item) => (item.id === target.id ? { ...item, status: decision } : item)));
    const note =
      decision === "已批准"
        ? `已批准 ${target.code}，允许合入主干。`
        : decision === "需修改"
          ? `已将 ${target.code} 标为「需修改」，请修复阻断项后再审。`
          : `已撤销 ${target.code} 裁决，恢复待审阅。`;
    appendComment(target.id, note, "decision");
    toastManager.add({ title: `${target.code} · ${decision}`, type: decision === "已批准" ? "success" : "info" });
  }, [appendComment]);

  const setImpact = React.useCallback((targetId: string, impact: ImpactLevel) => {
    setChanges((prev) => prev.map((item) => (item.id === targetId ? { ...item, impact } : item)));
  }, []);

  // 批准的唯一入口：存在阻断门禁时先经强制批准确认，其余入口都走这里。
  const requestApprove = React.useCallback((target: ChangeRequest) => {
    if (target.checks.some((c) => c.state === "fail")) setApproveRequestId(target.id);
    else setDecision(target, "已批准");
  }, [setDecision]);

  // 重跑失败门禁：结果由各项的 rerun 数据决定，不改写未声明的项；日志只追加真实记录。
  const rerunChecks = React.useCallback((targetId: string) => {
    if (recheckProgress[targetId] !== undefined) return;
    const target = changes.find((item) => item.id === targetId);
    const failed = target?.checks.filter((c) => c.state === "fail") ?? [];
    if (failed.length === 0) return;
    const stillFailing = failed.filter((c) => c.rerun !== "pass").length;
    setRecheckProgress((prev) => ({ ...prev, [targetId]: 22 }));
    setChanges((prev) =>
      prev.map((item) =>
        item.id === targetId
          ? { ...item, checks: item.checks.map((c) => (c.state === "fail" ? { ...c, state: "running" } : c)) }
          : item,
      ),
    );
    toastManager.add({ title: "正在重跑失败门禁", type: "info" });

    const t1 = window.setTimeout(() => setRecheckProgress((prev) => (targetId in prev ? { ...prev, [targetId]: 72 } : prev)), 380);
    const t2 = window.setTimeout(() => {
      setRecheckProgress((prev) => {
        const { [targetId]: _done, ...rest } = prev;
        return rest;
      });
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setChanges((prev) =>
        prev.map((item) =>
          item.id === targetId
            ? {
                ...item,
                checks: item.checks.map((c) => {
                  if (c.state !== "running") return c;
                  const passed = c.rerun === "pass";
                  return { ...c, state: passed ? "pass" : "fail", log: `${c.log}\n重跑于 ${hhmm}：${passed ? "已通过" : "仍失败"}` };
                }),
              }
            : item,
        ),
      );
      toastManager.add(
        stillFailing === 0
          ? { title: "全部门禁已通过，可以批准合入", type: "success" }
          : { title: `重跑完成，仍有 ${stillFailing} 项门禁失败`, type: "warning" },
      );
    }, 900);
    timers.current.push(t1, t2);
  }, [recheckProgress, changes]);

  const submitInlineNote = () => {
    if (!composingLine || !inlineDraft.trim()) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    const body = inlineDraft.trim();
    const targetFile = active.files.find((f) => f.path === composingLine.filePath);
    const lineObj = targetFile?.lines[composingLine.lineIndex];
    const lineLabel = `${composingLine.filePath.split("/").pop()}:${lineObj?.newNo ?? lineObj?.oldNo ?? composingLine.lineIndex + 1}`;
    setInlineNotes((prev) => ({
      ...prev,
      [active.id]: [
        ...(prev[active.id] ?? []),
        { id: `in-${Date.now()}`, filePath: composingLine.filePath, lineIndex: composingLine.lineIndex, author: "陈致远", time, body },
      ],
    }));
    appendComment(active.id, body, "inline", lineLabel);
    setComposingLine(null);
    setInlineDraft("");
    toastManager.add({ title: `已在 ${lineLabel} 添加行内评论`, type: "success" });
  };

  const composerTriggers = React.useMemo<readonly ComposerTrigger[]>(
    () => [
      {
        char: "@",
        label: "提及评审人",
        getItems: (q) =>
          ["陈致远", "李一鸣", "王一帆", "林晚", "赵子纯", "周禾"]
            .filter((name) => name.includes(q))
            .map((name) => ({ id: name, label: name, description: "评审人" })),
      },
      {
        char: "/",
        startOnly: true,
        select: "action",
        label: "快捷命令",
        getItems: (q) =>
          [
            { id: "recheck", label: "重跑验证", description: "重新执行阻断门禁" },
            { id: "approve", label: "批准变更", description: `将 ${active.code} 标为已批准` },
          ].filter((item) => item.label.includes(q) || item.id.includes(q.toLowerCase())),
        onSelect: (item) => {
          if (item.id === "recheck") rerunChecks(active.id);
          if (item.id === "approve") requestApprove(active);
        },
      },
    ],
    [active, rerunChecks, requestApprove],
  );

  const filterDirty = draftQuery !== applied.query || draftStatus !== applied.status;
  const hasFilter = Boolean(applied.query || applied.status !== "全部" || draftQuery || draftStatus !== "全部");
  const appliedSummary = [
    applied.query ? `关键词「${applied.query}」` : null,
    applied.status !== "全部" ? `状态「${applied.status}」` : null,
  ].filter(Boolean).join(" · ") || "全部变更";

  /* ─── 1. 左栏：变更队列 ───────────────────────────────── */
  const queuePane = (
    <section aria-label="变更队列" className="review-pane review-pane-queue">
      <div className="review-queue-head">
        <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
          <div className="review-queue-head-row">
            <Inline gap="field">
              <span className="text-body-strong">变更队列</span>
              <span className="numeric text-support text-muted-foreground">{filtered.length}</span>
            </Inline>
            <Toggle size="xs" pressed={filterOpen} onPressedChange={setFilterOpen}>
              <IconFilter aria-hidden="true" />{applied.query || applied.status !== "全部" ? `筛选 · ${[applied.query, applied.status !== "全部"].filter(Boolean).length}` : "筛选"}
            </Toggle>
          </div>

          <div className="review-queue-pills mt-(--qy-field-gap)">
            <SegmentedControl aria-label="快捷队列筛选" size="sm" value={quickTab} onValueChange={(v) => setQuickTab(v as "all" | "pending" | "blocking")} className="w-full">
              <SegmentedControlItem value="all">全部 {changes.length}</SegmentedControlItem>
              <SegmentedControlItem value="pending">待审 {pendingTotal}</SegmentedControlItem>
              <SegmentedControlItem value="blocking">阻断 {blockingTotal}</SegmentedControlItem>
            </SegmentedControl>
          </div>

          <CollapsiblePanel className="mt-(--qy-field-gap)">
            <FilterBar
              dirty={filterDirty}
              appliedSummary={`已应用：${appliedSummary}`}
              canClear={hasFilter}
              onApply={() => setApplied({ query: draftQuery, status: draftStatus })}
              onCancel={() => { setDraftQuery(applied.query); setDraftStatus(applied.status); }}
              onClear={() => { setDraftQuery(""); setDraftStatus("全部"); setApplied({ query: "", status: "全部" }); }}
            >
              <FilterBarFields>
                <Field><FieldLabel>关键词</FieldLabel><Input placeholder="编号、标题或模块" value={draftQuery} onChange={(e) => setDraftQuery(e.target.value)} /></Field>
                <Field>
                  <FieldLabel>审阅状态</FieldLabel>
                  <Select<"全部" | ReviewDecision>
                    items={(["全部", "待审阅", "已批准", "需修改"] as const).map((v) => ({ value: v, label: v }))}
                    value={draftStatus}
                    onValueChange={(v) => v && setDraftStatus(v)}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectPopup>
                      {(["全部", "待审阅", "已批准", "需修改"] as const).map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectPopup>
                  </Select>
                </Field>
              </FilterBarFields>
              <FilterBarApplied />
              <FilterBarStatus />
              <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
            </FilterBar>
          </CollapsiblePanel>
        </Collapsible>

        {(applied.query || applied.status !== "全部") && (
          <Inline gap="field" className="flex-wrap">
            {applied.query && (
              <Chip onRemove={() => { setDraftQuery(""); setApplied((prev) => ({ ...prev, query: "" })); }}>
                {`关键词：${applied.query}`}
              </Chip>
            )}
            {applied.status !== "全部" && (
              <Chip onRemove={() => { setDraftStatus("全部"); setApplied((prev) => ({ ...prev, status: "全部" })); }}>
                {`状态：${applied.status}`}
              </Chip>
            )}
          </Inline>
        )}
      </div>

      <ScrollAreaRoot className="min-h-0 h-full">
        <ScrollAreaViewport className="h-full" fade tabIndex={-1}>
          {filtered.length > 0 ? (
            <ul className="review-queue-list">
              {filtered.map((item) => {
                const selected = item.id === active.id;
                const stat = diffTotals(item.files);
                return (
                  <li key={item.id}>
                    <ContextMenu>
                      <ContextMenuTrigger>
                        <Item
                          render={
                            <button
                              type="button"
                              className="review-queue-btn"
                              aria-current={selected ? "true" : undefined}
                              onClick={() => {
                                selectChange(item.id);
                                setMobilePane("stage");
                              }}
                            />
                          }
                        >
                          <div className="review-queue-top">
                            <StatusDot status={queueDotStatus(item)} label={queueDotLabel(item)} className="shrink-0 [&>span:last-child]:sr-only" />
                            <span className="review-queue-title">{item.title}</span>
                          </div>
                          <div className="review-queue-meta">
                            <code className="font-mono">{item.code}</code>
                            <span className="truncate">{item.scope}</span>
                            <span className="review-diff-stat ms-auto shrink-0">
                              <span className="review-stat-add">+{stat.added}</span>
                              <span className="review-stat-del">-{stat.removed}</span>
                            </span>
                          </div>
                        </Item>
                      </ContextMenuTrigger>
                      <ContextMenuPortal>
                        <ContextMenuPositioner>
                          <ContextMenuPopup>
                            <ContextMenuItem onClick={() => selectChange(item.id)}>打开审阅</ContextMenuItem>
                            <ContextMenuItem onClick={() => rerunChecks(item.id)}>重跑门禁</ContextMenuItem>
                            <ContextMenuSeparator />
                            <ContextMenuItem onClick={() => requestApprove(item)}>标记已批准</ContextMenuItem>
                            <ContextMenuItem onClick={() => setDecision(item, "需修改")}>标记需修改</ContextMenuItem>
                          </ContextMenuPopup>
                        </ContextMenuPositioner>
                      </ContextMenuPortal>
                    </ContextMenu>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-(--qy-panel-padding)">
              <Empty state="empty">
                <EmptyTitle level={2}>没有符合条件的变更</EmptyTitle>
                <EmptyActions>
                  <Button size="sm" variant="bordered" onClick={() => { setQuickTab("all"); setDraftQuery(""); setDraftStatus("全部"); setApplied({ query: "", status: "全部" }); }}>
                    重置筛选
                  </Button>
                </EmptyActions>
              </Empty>
            </div>
          )}
        </ScrollAreaViewport>
        <ScrollAreaScrollbar />
      </ScrollAreaRoot>

      <div className="review-queue-foot max-lg:hidden">
        <span>快捷键切项</span>
        <Inline gap="field"><Kbd>J</Kbd><Kbd>K</Kbd></Inline>
      </div>
    </section>
  );

  /* ─── 3. 右栏：Linear 属性检查器 + Vercel 门禁流水线 ──── */
  const inspectorContent = (
    <div className="review-pane review-pane-detail bg-transparent">
      <div className="review-inspector-actions">
        <Inline gap="field" className="w-full">
          <Button className="flex-1" size="sm" variant="solid" disabled={active.status === "已批准" || isRunning} onClick={() => requestApprove(active)}>
            <IconCheck aria-hidden="true" />{active.status === "已批准" ? "已批准合入" : "批准变更"}
          </Button>
          <Button size="sm" variant="bordered" disabled={active.status === "需修改"} onClick={() => setDecision(active, "需修改")}>
            <IconX aria-hidden="true" />需修改
          </Button>
        </Inline>

        {active.status !== "待审阅" && (
          <Button size="xs" variant="quiet" className="justify-start" onClick={() => setDecision(active, "待审阅")}>
            <IconRotateClockwise aria-hidden="true" />撤销当前裁决
          </Button>
        )}
      </div>

      <ScrollAreaRoot className="min-h-0 h-full">
        <ScrollAreaViewport className="h-full" fade tabIndex={-1}>
          <div className="review-inspector-body" data-density="compact">
            {/* Linear 式交互属性面板 */}
            <section aria-label="变更属性" className="review-inspector-section">
              <h2 className="review-inspector-label">属性</h2>
              <div className="review-prop-row">
                <span className="review-prop-key">状态</span>
                <Select<ReviewDecision>
                  items={(["待审阅", "已批准", "需修改"] as const).map((v) => ({ value: v, label: v }))}
                  value={active.status}
                  onValueChange={(v) => { if (!v) return; if (v === "已批准") requestApprove(active); else setDecision(active, v); }}
                >
                  <SelectTrigger aria-label="变更状态"><SelectValue /></SelectTrigger>
                  <SelectPopup>
                    {(["待审阅", "已批准", "需修改"] as const).map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                  </SelectPopup>
                </Select>
              </div>
              <div className="review-prop-row">
                <span className="review-prop-key">影响面</span>
                <Select<string>
                  items={[{ value: "3", label: "高影响" }, { value: "2", label: "中影响" }, { value: "1", label: "低影响" }]}
                  value={String(active.impact)}
                  onValueChange={(v) => v && setImpact(active.id, Number(v) as ImpactLevel)}
                >
                  <SelectTrigger aria-label="影响级别">
                    <SeverityMark
                      level={active.impact}
                      tone={active.impact === 3 ? "danger" : active.impact === 2 ? "warning" : "info"}
                      label={active.impact === 3 ? "高影响" : active.impact === 2 ? "中影响" : "低影响"}
                    />
                  </SelectTrigger>
                  <SelectPopup>
                    <SelectItem value="3">高影响</SelectItem>
                    <SelectItem value="2">中影响</SelectItem>
                    <SelectItem value="1">低影响</SelectItem>
                  </SelectPopup>
                </Select>
              </div>
              <div className="review-prop-row">
                <span className="review-prop-key">提交人</span>
                <span className="truncate text-foreground">{active.author}</span>
              </div>
              <div className="review-prop-row">
                <span className="review-prop-key">评审人</span>
                <span className="truncate text-foreground">{active.reviewers.join("、")}</span>
              </div>
              <div className="review-prop-row">
                <span className="review-prop-key">分支</span>
                <Inline gap="field" className="min-w-0 flex-nowrap">
                  <IconGitBranch aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
                  <code className="truncate font-mono text-foreground">{active.branch}</code>
                  <CopyButton aria-label={`复制分支名 ${active.branch}`} shape="icon" size="xs" variant="quiet" value={active.branch} />
                </Inline>
              </div>
            </section>

            {/* Vercel 风格自动化门禁流水线 */}
            <section aria-label="自动化门禁" className="review-inspector-section">
              <Inline gap="field" className="items-center justify-between">
                <h2 className="review-inspector-label">自动化门禁</h2>
                <Button size="xs" variant="quiet" disabled={isRunning || !hasBlocking} onClick={() => rerunChecks(active.id)}>
                  <IconRefresh aria-hidden="true" />{isRunning ? "验证中" : "重跑阻断门禁"}
                </Button>
              </Inline>

              {activeProgress !== undefined && (
                <Progress aria-label="自动化门禁执行进度" value={activeProgress}>
                  <ProgressTrack><ProgressIndicator /></ProgressTrack>
                </Progress>
              )}

              <ul className="review-check-list">
                {active.checks.map((check) => {
                  const open = expandedCheckId === check.id;
                  const dot: StatusDotStatus = check.state === "pass" ? "online" : check.state === "running" ? "in-progress" : "error";
                  return (
                    <li key={check.id} className="review-check-card" data-state={check.state}>
                      <Collapsible open={open} onOpenChange={(next) => setExpandedCheckId(next ? check.id : null)}>
                        <div className="flex items-center justify-between gap-(--qy-field-gap)">
                          <StatusDot status={dot} label={check.name} className="min-w-0 truncate text-support" />
                          <Inline gap="field" className="shrink-0">
                            <span className="numeric text-support text-muted-foreground">{check.duration}</span>
                            <CollapsibleTrigger render={<Button aria-label={`${open ? "收起" : "展开"} ${check.name} 日志`} size="xs" variant="quiet" />}>
                              {open ? "收起" : "日志"}
                            </CollapsibleTrigger>
                          </Inline>
                        </div>
                        <CollapsiblePanel className="mt-(--qy-field-gap)">
                          <pre className="review-check-log">{check.log}</pre>
                        </CollapsiblePanel>
                      </Collapsible>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* 改动占比 + 文件速跳 */}
            <section aria-label="改动文件" className="review-inspector-section">
              <Inline gap="field" className="items-center justify-between">
                <h2 className="review-inspector-label">改动文件（{active.files.length}）</h2>
                <span className="review-diff-stat">
                  <span className="review-stat-add">+{totals.added}</span>
                  <span className="review-stat-del">-{totals.removed}</span>
                </span>
              </Inline>
              <ul className="review-file-jump-list">
                {active.files.map((file) => (
                  <li key={file.path}>
                    <Item
                      render={
                        <button
                          type="button"
                          className="review-file-jump"
                          onClick={() => {
                            setDrawerOpen(false);
                            setMobilePane("stage");
                            fileRefs.current[file.path]?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }}
                        />
                      }
                    >
                      <span className="truncate">{file.path.split("/").pop()}</span>
                      <span className="review-diff-stat shrink-0">
                        <span className="review-stat-add">+{file.added}</span>
                        <span className="review-stat-del">-{file.removed}</span>
                      </span>
                    </Item>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar />
      </ScrollAreaRoot>
    </div>
  );

  /* ─── 2. 中栏：素纸主舞台（代码 Diff + 行内评论 + 审阅流） ─ */
  const stagePane = (
    <div className="review-stage-wrap">
      <section aria-label="变更内容" className="review-stage">
        <div className="review-stage-bar">
          <div className="review-stage-crumb">
            <code className="font-mono text-foreground">{active.code}</code>
            <CopyButton aria-label={`复制编号 ${active.code}`} shape="icon" size="xs" variant="quiet" value={active.code} />
            <span className="truncate">{active.scope}</span>
            <span>·</span>
            <code className="font-mono">{active.commit}</code>
            <span>·</span>
            <RelativeTime now={REFERENCE_NOW} value={active.updatedAt} />
          </div>

          <Inline gap="field" className="shrink-0">
            <StatusDot status={queueDotStatus(active)} label={queueDotLabel(active)} className="text-support" />
            <Button
              aria-label="打开属性与门禁面板"
              className="hidden max-xl:inline-flex max-lg:hidden"
              size="xs"
              variant="bordered"
              onClick={() => setDrawerOpen(true)}
            >
              <IconLayoutSidebarRight aria-hidden="true" />属性与门禁
            </Button>
          </Inline>
        </div>

        <ScrollAreaRoot className="min-h-0 h-full">
          <ScrollAreaViewport className="h-full" fade tabIndex={-1}>
            <div className="review-stage-scroll">
              <div className="review-stage-intro">
                <h1 className="review-title">{active.title}</h1>
                <p className="review-summary">{active.summary}</p>
              </div>

              {/* 多文件 Diff：悬停任意行点击 + 即可就地行内评论 */}
              {active.files.map((file) => (
                <article
                  key={file.path}
                  ref={(node) => { fileRefs.current[file.path] = node; }}
                  className="review-diff-file"
                >
                  <header className="review-diff-file-head">
                    <span className="review-diff-path">
                      <IconFileCode aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
                      <span className="truncate">{file.path}</span>
                    </span>
                    <CopyButton aria-label={`复制 ${file.path} 改动后代码`} shape="icon" size="xs" variant="quiet" value={filePlainCode(file)} />
                  </header>

                  <ScrollAreaRoot>
                  <ScrollAreaViewport aria-label={`${file.path} 代码改动`} className="review-diff-scroll" role="region" tabIndex={0}>
                  <pre className="review-diff-code">
                    <code>
                      {file.lines.map((line, index) => {
                        const notesHere = activeInlineNotes.filter((n) => n.filePath === file.path && n.lineIndex === index);
                        const isComposingHere = composingLine?.filePath === file.path && composingLine.lineIndex === index;
                        const lineNum = line.newNo ?? line.oldNo ?? index + 1;
                        const fileShort = file.path.split("/").pop() ?? file.path;
                        const lineKindLabel = line.kind === "del" ? "原" : line.kind === "add" ? "新" : "";
                        const lineTargetLabel = `${fileShort} ${lineKindLabel}第 ${lineNum} 行`;
                        return (
                          <React.Fragment key={index}>
                            <div className="review-diff-line" data-kind={line.kind} data-commented={notesHere.length > 0 || isComposingHere || undefined}>
                              <span className="review-diff-comment-trigger">
                                <Tooltip>
                                  <TooltipTrigger
                                    render={
                                      <Button
                                        aria-label={`在 ${lineTargetLabel} 添加审阅意见`}
                                        size="xs"
                                        shape="icon"
                                        variant="quiet"
                                        onClick={() => {
                                          setComposingLine(isComposingHere ? null : { filePath: file.path, lineIndex: index });
                                          setInlineDraft("");
                                        }}
                                      />
                                    }
                                  >
                                    <IconMessagePlus aria-hidden="true" />
                                  </TooltipTrigger>
                                  <TooltipPopup>行内评论</TooltipPopup>
                                </Tooltip>
                              </span>
                              <span className="review-diff-ln" aria-hidden="true">{line.oldNo ?? ""}</span>
                              <span className="review-diff-ln" aria-hidden="true">{line.newNo ?? ""}</span>
                              <span className="review-diff-sig" aria-hidden="true">{line.kind === "add" ? "+" : line.kind === "del" ? "-" : " "}</span>
                              <span>{renderCodeTokens(line.text)}</span>
                            </div>

                            {(notesHere.length > 0 || isComposingHere) && (
                              <div className="review-inline-thread">
                                {notesHere.map((note) => (
                                  <div key={note.id} className="review-inline-note">
                                    <Inline gap="field" className="text-support">
                                      <span className="font-medium text-foreground">{note.author}</span>
                                      <span className="text-muted-foreground">今天 {note.time}</span>
                                    </Inline>
                                    <p className="m-0 text-body text-foreground">{note.body}</p>
                                  </div>
                                ))}

                                {isComposingHere && (
                                  <div className="grid gap-(--qy-field-gap)">
                                    <Textarea
                                      aria-label={`${lineTargetLabel} 评论内容`}
                                      placeholder="写下针对这一行的修改建议…"
                                      value={inlineDraft}
                                      onValueChange={setInlineDraft}
                                    />
                                    <Inline gap="field" className="justify-end">
                                      <Button size="xs" variant="quiet" onClick={() => { setComposingLine(null); setInlineDraft(""); }}>取消</Button>
                                      <Button size="xs" disabled={!inlineDraft.trim()} onClick={submitInlineNote}>发表行内评论</Button>
                                    </Inline>
                                  </div>
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </code>
                  </pre>
                  </ScrollAreaViewport>
                  <ScrollAreaScrollbar orientation="horizontal" />
                  </ScrollAreaRoot>
                </article>
              ))}

              {/* 审阅动态流 + 底部 Composer（直接承接在 Diff 之下，零跳转） */}
              <section aria-label="审阅讨论" className="review-activity">
                <Inline gap="field" className="items-center justify-between">
                  <h2 className="m-0 text-body-strong">审阅动态（{(comments[active.id] ?? []).length}）</h2>
                  <span className="text-support text-muted-foreground">
                    {activeInlineNotes.length > 0 ? `${activeInlineNotes.length} 条行内评论` : `${active.files.length} 个改动文件`}
                  </span>
                </Inline>

                {(comments[active.id] ?? []).length > 0 && (
                  <Timeline>
                    {(comments[active.id] ?? []).map((entry) => (
                      <TimelineItem key={entry.id}>
                        <TimelineTime dateTime={entry.at}>今天 {entry.time}</TimelineTime>
                        <TimelineTitle>
                          <Inline gap="field">
                            <span>{entry.author}</span>
                            {entry.kind === "decision" && <Badge tone="info">评审裁决</Badge>}
                            {entry.ref && <code className="font-mono text-support text-muted-foreground">{entry.ref}</code>}
                          </Inline>
                        </TimelineTitle>
                        <TimelineDescription>{entry.body}</TimelineDescription>
                      </TimelineItem>
                    ))}
                  </Timeline>
                )}

                <Composer
                  onSubmit={(value: ComposerSegment[], { clear }) => {
                    const text = composerValueToText(value).trim();
                    if (!text) return;
                    appendComment(active.id, text);
                    clear();
                    toastManager.add({ title: "已发表审阅意见", type: "success" });
                  }}
                >
                  <ComposerInput aria-label="输入审阅意见" triggers={composerTriggers} placeholder="发表评审意见，键入 @ 提及同事，或 / 执行快捷命令" />
                  <ComposerToolbar>
                    <span className="me-auto text-support text-muted-foreground">@ 提及 · / 命令</span>
                    <ComposerSubmit aria-label="发表意见" />
                  </ComposerToolbar>
                </Composer>
              </section>
            </div>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar />
        </ScrollAreaRoot>
      </section>

      <aside aria-label="属性与自动化门禁" className="review-inspector">
        {inspectorContent}
      </aside>
    </div>
  );

  return (
    <div className="review">
      <div className="review-mobile-bar">
        <SegmentedControl aria-label="切换队列、改动与属性" size="sm" value={mobilePane} onValueChange={(v) => setMobilePane(v as "queue" | "stage" | "inspector")} className="w-full">
          <SegmentedControlItem value="queue">队列 {filtered.length}</SegmentedControlItem>
          <SegmentedControlItem value="stage">改动</SegmentedControlItem>
          <SegmentedControlItem value="inspector">门禁{hasBlocking ? ` (${blockingChecks.length})` : ""}</SegmentedControlItem>
        </SegmentedControl>
      </div>

      <Main className="review-body">
        {isNarrow ? (
          mobilePane === "queue" ? queuePane : mobilePane === "inspector" ? <aside aria-label="属性与自动化门禁" className="review-inspector h-full">{inspectorContent}</aside> : stagePane
        ) : (
          <ResizablePanelGroup className="h-full" orientation="horizontal">
            <ResizablePanel id="review-queue" defaultSize={22} minSize="230px" maxSize={32}>
              {queuePane}
            </ResizablePanel>
            <ResizableHandle aria-label="调整变更队列与主审阅区宽度" />
            <ResizablePanel id="review-stage" defaultSize={78} minSize="520px">
              {stagePane}
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </Main>

      <AlertDialog open={approveRequest !== null} onOpenChange={(next) => { if (!next) setApproveRequestId(null); }}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>{approveRequest ? `强制批准 ${approveRequest.code}` : "强制批准"}</AlertDialogTitle>
            <AlertDialogDescription>
              {approveRequest ? `「${approveRequest.title}」仍有 ${approveFailed.length} 项门禁未通过：${approveFailed.map((c) => c.name).join("、")}。批准后变更将带着阻断项合入主干。` : ""}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              tone="danger"
              onClick={() => {
                if (approveRequest) setDecision(approveRequest, "已批准");
                setApproveRequestId(null);
              }}
            >
              确认强制批准
            </Button>
            <AlertDialogClose render={<Button variant="quiet" />}>返回</AlertDialogClose>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} swipeDirection="right">
        <DrawerPopup className="w-[min(22rem,100vw)] p-0">
          <DrawerHeader className="flex flex-row items-center justify-between px-(--qy-panel-padding-sm) py-(--qy-field-gap)">
            <DrawerTitle>属性与门禁</DrawerTitle>
            <DrawerClose />
          </DrawerHeader>
          <DrawerContent className="p-0">{inspectorContent}</DrawerContent>
        </DrawerPopup>
      </Drawer>
    </div>
  );
}
