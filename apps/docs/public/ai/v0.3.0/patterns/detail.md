# 详情与返回

Package: @qingye/ui@0.3.0
列表进入和直接抵达都能定位对象，返回有稳定依据。

Components: button, badge, alert, description-list
Methods: 展开有据, 进退相承
States: available, preview, direct-entry, missing, returned

Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.

## apps/docs/src/patterns/detail.tsx
```tsx
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Badge } from "@qingye/ui/components/badge";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { resources } from "./state";
import { FixtureSettings, Notice } from "./shared";

export default function DetailPattern() {
  const { objectId = "r1" } = useParams();
  const location = useLocation();
  const heading = useRef<HTMLHeadingElement>(null);
  const [removedId, setRemovedId] = useState<string | null>(null);
  const removed = removedId === objectId;
  const row = resources.find((item) => item.id === objectId);
  const source = typeof location.state?.from === "string" && /^\/docs\/patterns\/collection(?:\?|$)/.test(location.state.from) ? location.state.from : "/docs/patterns/collection";
  useEffect(() => { if (removed) heading.current?.focus(); }, [removed]);
  return <section className="qy-task" data-pattern="detail" aria-label="资料详情"><header><div><p className="qy-task-kicker">田野资料 / 详情</p><h2 ref={heading} tabIndex={-1}>{row && !removed ? row.title : "资料已不可用"}</h2></div><Link className={buttonVariants({ variant: "outline" })} to={source}>{location.state?.from ? "返回原集合" : "前往资料集合"}</Link></header>
    {!row || removed ? <Notice title="这个对象已不可用" tone="warning">可以返回集合继续工作。已不存在的对象不会被重建成旧详情。</Notice> : <div className="qy-task-columns"><article className="qy-task-fields"><Badge variant="outline">{row.type}</Badge><p>资料记下了一次日常观察。内容的价值来自所见、比较与判断，也来自暂时未作出的决定。把对象和必要背景放在同一处，可以减少来回寻找。</p><p>这份记录的作者是{row.author}。如果准备修改，应先核对正在操作的对象和版本；保留未保存的输入，再决定保存、放弃或返回。</p><div className="qy-task-actions"><Link className={buttonVariants()} to="/docs/patterns/edit">新建关联笔记</Link><Link className={buttonVariants({ variant: "outline" })} to="/docs/patterns/read?chapter=observation">阅读方法札记</Link></div></article><aside className="qy-task-aside"><h3>资料信息</h3><dl className="qy-task-dl"><dt>对象</dt><dd>{row.id}</dd><dt>作者</dt><dd>{row.author}</dd><dt>更新日期</dt><dd className="numeric">{row.date}</dd><dt>大小</dt><dd className="numeric">{row.size}</dd></dl></aside></div>}
    <FixtureSettings><p>从集合进入时，返回链接保留查询和页码；选择在会话内保存。直接打开此地址时提供稳定上级，不猜测浏览器历史。此处只包含公开合成字段，没有权限接口。</p><Button disabled={!row || removed} onClick={() => setRemovedId(objectId)} size="sm" variant="outline">重放对象消失</Button></FixtureSettings>
  </section>;
}
```

## apps/docs/src/patterns/shared.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Badge } from "@qingye/ui/components/badge";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { useEffect, useId, useRef, type ReactNode } from "react";
import type { Outcome } from "./state";
import "./patterns.css";

export function useTaskTimers() {
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  useEffect(() => () => { timers.current.forEach(clearTimeout); timers.current.clear(); }, []);
  return (callback: () => void, delay = 700) => { const timer = setTimeout(() => { timers.current.delete(timer); callback(); }, delay); timers.current.add(timer); };
}
export function FixtureSettings({ children }: { children: ReactNode }) {
  return <details className="qy-fixture-settings"><summary className="focus-ring">演示与状态</summary><p>使用合成资料和本地事件，可在这里重放异常；刷新或离开后的保留边界由各示例说明。</p><div className="qy-task-fields">{children}</div></details>;
}
export function OutcomeChoice({ value, onChange }: { value: Outcome; onChange: (value: Outcome) => void }) {
  const id = useId();
  return <div className="qy-task-fields"><label htmlFor={id}>下次模拟响应</label><NativeSelect id={id} onChange={(event) => onChange(event.target.value as Outcome)} value={value}><NativeSelectOption value="success">成功</NativeSelectOption><NativeSelectOption value="failure">明确失败</NativeSelectOption><NativeSelectOption value="unknown">超时，结果未知</NativeSelectOption></NativeSelect></div>;
}
export function Notice({ title, children, tone = "info" }: { title: string; children?: ReactNode; tone?: "info" | "success" | "warning" | "error" }) {
  return <Alert role={tone === "error" ? "alert" : "status"} variant={tone}><AlertTitle>{title}</AlertTitle>{children && <AlertDescription>{children}</AlertDescription>}</Alert>;
}
export function StatusBadge({ value }: { value: string }) {
  const labels: Record<string, string> = { ready: "等待开始", transferring: "传输中", processing: "处理中", success: "已完成", failure: "未完成", unknown: "待核实", cancelling: "取消中", cancelled: "已取消", "too-late": "取消过晚，已完成" };
  return <Badge variant="outline">{labels[value] ?? value}</Badge>;
}
export function readSession<T>(key: string, fallback: T): T {
  try { const value = sessionStorage.getItem(`qingye-task:${key}`); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
}
export function writeSession(key: string, value: unknown) {
  try { sessionStorage.setItem(`qingye-task:${key}`, JSON.stringify(value)); } catch { /* Example remains usable without browser storage. */ }
}
```

## apps/docs/src/patterns/state.ts
```tsx
import publicResourceData from "./authorized-resources.json";
/** Application fixtures. No request, backend permission or durable storage is implied. */
export type Outcome = "success" | "failure" | "unknown";
export interface EditState {
  objectId: string;
  draft: { title: string; body: string };
  saved: { title: string; body: string };
  revision: number;
  status: "editing" | "saving" | Outcome | "restored";
  request: { id: number; objectId: string; revision: number; draft: EditState["draft"]; action: "save" | "publish" } | null;
  error: string;
  ignoredResponses: number;
  objectDrafts: Record<string, Pick<EditState, "draft" | "saved" | "revision" | "status" | "request" | "error" | "undo" | "undoStatus">>;
  undo: { objectId: string; before: EditState["saved"]; after: EditState["saved"]; expiresAt: number; requestId: number; attempt: number; action: "save" | "publish" } | null;
  undoStatus: "none" | "available" | "pending" | "unknown" | "success" | "failure" | "expired";
}
export const initialEdit: EditState = { objectId: "field-note-01", draft: { title: "", body: "" }, saved: { title: "", body: "" }, revision: 1, status: "editing", request: null, error: "", ignoredResponses: 0, objectDrafts: {}, undo: null, undoStatus: "none" };
/** Local timers do not survive leaving this page. Their unfinished writes need verification. */
export function resumeEditState(saved: EditState): EditState {
  if (!saved.draft || typeof saved.draft.title !== "string" || typeof saved.draft.body !== "string") return initialEdit;
  function resumeWork(work: Pick<EditState, "status" | "error" | "undo" | "undoStatus">) {
    return {
      ...work,
      ...(work.status === "saving" ? { status: "unknown" as const, error: "离开期间的结果待核实。草稿仍在，请核实原操作。" } : {}),
      undo: work.undo ? { ...work.undo, attempt: work.undo.attempt ?? 0 } : null,
      undoStatus: work.undoStatus === "pending" ? "unknown" as const : work.undoStatus,
    };
  }
  const resumed = { ...initialEdit, ...saved };
  return {
    ...resumed,
    ...resumeWork(resumed),
    objectDrafts: Object.fromEntries(Object.entries(resumed.objectDrafts).map(([id, work]) => [id, { ...work, ...resumeWork(work) }])),
  };
}
export type EditEvent =
  | { type: "change"; key: "title" | "body"; value: string }
  | { type: "submit"; id: number; action: "save" | "publish" }
  | { type: "result"; id: number; outcome: Outcome; at?: number }
  | { type: "switch"; objectId: string }
  | { type: "undo-request"; at: number }
  | { type: "undo-result"; requestId: number; attempt: number; outcome: "success" | "failure"; at?: number }
  | { type: "undo-verify"; requestId: number; attempt: number; outcome: "success" | "failure"; at: number }
  | { type: "undo-expire" }
  | { type: "verify"; at?: number }
  | { type: "discard" }
  | { type: "restore"; draft: EditState["draft"] };
export function editReducer(state: EditState, event: EditEvent): EditState {
  if (state.undoStatus === "pending" && ["switch", "change", "submit", "discard", "restore"].includes(event.type)) return state;
  if (state.undoStatus === "unknown" && ["change", "submit", "discard", "restore"].includes(event.type)) return state;
  if (event.type === "switch") {
    if (event.objectId === state.objectId) return state;
    // Switching does not cancel a submitted write. A result for an inactive
    // object is ignored by this local fixture; its original identity remains
    // available for verification when the user returns to that object.
    const objectDrafts = { ...state.objectDrafts, [state.objectId]: { draft: state.draft, saved: state.saved, revision: state.revision, status: state.status === "saving" ? "unknown" as const : state.status, request: state.request, error: state.status === "saving" ? "切离期间的保存结果待核实。请核实原操作，避免重复写入。" : state.error, undo: state.undo, undoStatus: state.undoStatus } };
    const work = { draft: { title: "", body: "" }, saved: { title: "", body: "" }, revision: 1, status: "editing" as const, request: null, error: "", undo: null, undoStatus: "none" as const, ...objectDrafts[event.objectId] };
    return { ...state, ...work, objectId: event.objectId, objectDrafts };
  }
  if (event.type === "undo-request") {
    if (!state.undo || !["available", "failure"].includes(state.undoStatus)) return state;
    if (event.at >= state.undo.expiresAt) return { ...state, undoStatus: "expired" };
    return { ...state, undo: { ...state.undo, attempt: state.undo.attempt + 1 }, undoStatus: "pending" };
  }
  if (event.type === "undo-result" || event.type === "undo-verify") {
    const expectedStatus = event.type === "undo-result" ? "pending" : "unknown";
    if (!state.undo || state.undoStatus !== expectedStatus || state.undo.requestId !== event.requestId || state.undo.attempt !== event.attempt || state.undo.objectId !== state.objectId) return { ...state, ignoredResponses: state.ignoredResponses + 1 };
    if (event.outcome === "failure") return { ...state, undoStatus: (event.at ?? Date.now()) >= state.undo.expiresAt ? "expired" : "failure" };
    const matchesSaved = state.draft.title === state.undo.after.title && state.draft.body === state.undo.after.body;
    return { ...state, saved: { ...state.undo.before }, ...(matchesSaved ? { draft: { ...state.undo.before } } : {}), undoStatus: "success", revision: state.revision + 1 };
  }
  if (event.type === "undo-expire") return state.undo && ["available", "failure"].includes(state.undoStatus) ? { ...state, undoStatus: "expired" } : state;

  if (event.type === "change") {
    if (state.status === "unknown") return state;
    return { ...state, draft: { ...state.draft, [event.key]: event.value }, revision: state.revision + 1, status: state.status === "saving" ? "saving" : "editing", request: state.status === "saving" ? state.request : null, error: "" };
  }
  if (event.type === "submit") {
    if (state.status === "saving" || state.status === "unknown") return state;
    if (!state.draft.title.trim()) return { ...state, error: "请填写资料名称。", status: "failure" };
    return { ...state, status: "saving", error: "", undo: null, undoStatus: "none", request: { id: event.id, objectId: state.objectId, revision: state.revision, draft: { ...state.draft }, action: event.action } };
  }
  if (event.type === "result") {
    // Draft revision may advance while this exact request is pending. The
    // immutable submitted snapshot owns the saved result; the current draft
    // is never replaced by that response.
    if (!state.request || state.request.id !== event.id || state.request.objectId !== state.objectId) return { ...state, ignoredResponses: state.ignoredResponses + 1 };
    if (event.outcome === "success") return { ...state, saved: state.request.draft, status: "success", request: null, error: "", undo: { objectId: state.objectId, before: { ...state.saved }, after: { ...state.request.draft }, requestId: state.request.id, attempt: 0, action: state.request.action, expiresAt: (event.at ?? Date.now()) + 15000 }, undoStatus: "available" };
    return { ...state, status: event.outcome, request: event.outcome === "failure" ? null : state.request, error: event.outcome === "failure" ? "保存未完成，输入已保留。可以修正后重试。" : "结果待核实，请先核实这次操作，避免重复写入。" };
  }
  if (event.type === "verify") {
    if (state.status !== "unknown" || !state.request) return state;
    return { ...state, saved: state.request.draft, status: "success", request: null, error: "", undo: { objectId: state.objectId, before: { ...state.saved }, after: { ...state.request.draft }, requestId: state.request.id, attempt: 0, action: state.request.action, expiresAt: (event.at ?? Date.now()) + 15000 }, undoStatus: "available" };
  }
  if (["saving", "unknown"].includes(state.status) && ["discard", "restore"].includes(event.type)) return state;
  if (event.type === "discard") return { ...state, draft: { ...state.saved }, revision: state.revision + 1, status: "editing", request: null, error: "" };
  return { ...state, draft: { ...event.draft }, revision: state.revision + 1, status: "restored", request: null, error: "" };
}
export const resources = publicResourceData.rows;
export type ItemResult = "ready" | Outcome;
export function batchResults(ids: readonly string[]): Record<string, ItemResult> {
  return Object.fromEntries(ids.map((id, index) => [id, index === 3 ? "failure" : index === 4 ? "unknown" : "success"]));
}
export function retryFailed(results: Record<string, ItemResult>): { ids: string[]; results: Record<string, ItemResult> } {
  const ids = Object.keys(results).filter((id) => results[id] === "failure");
  return { ids, results: { ...results, ...Object.fromEntries(ids.map((id) => [id, "success"])) } };
}
export function scopeKey(version: number, ids: readonly string[]) { return `${version}:${[...ids].sort().join(",")}`; }
export type QueueStage = "ready" | "transferring" | "processing" | Outcome | "cancelling" | "cancelled" | "too-late";
export interface QueueItem { id: string; name: string; stage: QueueStage; progress: number; attempt: number }
export function queueTransition<T extends QueueItem>(item: T, stage: QueueStage): T {
  if (stage === "cancelling" && !["transferring", "processing", "unknown"].includes(item.stage)) return item;
  if (["cancelled", "too-late"].includes(stage) && item.stage !== "cancelling") return item;
  return { ...item, stage, progress: ["success", "too-late"].includes(stage) ? 100 : stage === "processing" ? 100 : item.progress };
}
```

## apps/docs/src/patterns/patterns.css
```css
/* Project recipes: relations are centralized; shared controls remain package imports. */
.qy-task { display:flex; flex-direction:column; gap:var(--qy-section-gap); min-width:0; padding:var(--qy-space-6); background:var(--qy-background); color:var(--qy-foreground); }
.qy-task header { display:flex; flex-wrap:wrap; align-items:start; justify-content:space-between; gap:var(--qy-space-4); }
.qy-task h2 { font-size:var(--qy-text-title-size); font-weight:600; line-height:1.5; }
.qy-task h3 { font-size:var(--qy-text-heading-size); font-weight:600; line-height:1.5; }
.qy-task p { line-height:1.75; }
.qy-task-kicker { color:var(--qy-foreground-muted); font-size:var(--qy-text-caption-size); }
.qy-task-fields { display:flex; flex-direction:column; gap:var(--qy-field-gap); }
.qy-task-actions { display:flex; flex-wrap:wrap; align-items:center; gap:var(--qy-action-gap); }
/* Long task names remain readable when the user enlarges text. The controls
   retain the package's minimum size while content determines extra height. */
.qy-task-actions-wrap > :is([data-slot="button"], a) { max-inline-size:100%; block-size:auto; min-block-size:calc(var(--qy-control-md) + var(--qy-control-mobile-extra)); white-space:normal; overflow-wrap:anywhere; padding-block:var(--qy-space-2); }
.qy-task-columns { display:grid; grid-template-columns:minmax(0,2fr) minmax(0,1fr); gap:var(--qy-section-gap); }
.qy-task-aside { display:flex; flex-direction:column; gap:var(--qy-space-4); border-inline-start:1px solid var(--qy-border); padding-inline-start:var(--qy-space-6); }
.qy-task-dl { display:grid; grid-template-columns:auto minmax(0,1fr); gap:var(--qy-space-3) var(--qy-space-5); }
.qy-task-dl dt { color:var(--qy-foreground-muted); }
.qy-task-dl dd { overflow-wrap:anywhere; }
.qy-task-table { min-width:36em; }
/* Review has four short fields. Size those columns from content instead of
   doubling an artificial table minimum when text size doubles. */
[data-pattern="review"] .qy-task-table { width:max-content; min-width:100%; }
.qy-task-row { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:var(--qy-space-4); padding-block:var(--qy-space-4); border-block-end:1px solid var(--qy-border); }
.qy-fixture-settings { margin-block-start:var(--qy-space-5); padding:var(--qy-space-4); border-block-start:1px solid var(--qy-border); color:var(--qy-foreground-muted); font-size:var(--qy-text-caption-size); }
.qy-fixture-settings summary { cursor:pointer; width:fit-content; }
.qy-fixture-settings > p { margin-block:var(--qy-space-3); }
.qy-reading { max-width:36em; margin-inline:auto; font-size:var(--qy-text-body-size); line-height:2; }
.qy-reading h2 { font-size:var(--qy-text-title-size); margin-block:var(--qy-section-gap) var(--qy-space-4); }
.qy-reading p { margin-block:var(--qy-space-5); line-height:2; }
.qy-reading a { overflow-wrap:anywhere; }
.qy-reading-nav { display:flex; flex-wrap:wrap; gap:var(--qy-action-gap); }
.qy-pattern-frame { border:1px solid var(--qy-border); border-radius:var(--qy-radius-panel); overflow:clip; }
.qy-pattern-list { display:grid; gap:var(--qy-section-gap); }
.qy-pattern-list > a { display:block; padding-block:var(--qy-space-4); border-block-end:1px solid var(--qy-border); }
@media(max-width:640px) { .qy-task { padding:var(--qy-space-4); } .qy-task-columns { grid-template-columns:minmax(0,1fr); } .qy-task-aside { border-inline-start:0; border-block-start:1px solid var(--qy-border); padding-inline-start:0; padding-block-start:var(--qy-space-5); } }
@media(min-width:640px) { .qy-task-actions-wrap > :is([data-slot="button"], a) { min-block-size:var(--qy-control-md); } }
.qy-reading-scroll { overflow:auto; overscroll-behavior:contain; position:relative; scroll-padding:var(--qy-space-5); padding-inline:var(--qy-space-2); }
.qy-upload-actions { display:flex; flex-direction:column; align-items:start; gap:var(--qy-action-gap); flex-shrink:0; }
/* FileUpload owns file picking, names and removal. This queue composition
   reserves a complete information row before its application-owned actions. */
.qy-task-upload [data-slot="file-upload-item"] { display:grid; grid-template-columns:auto minmax(0,1fr) auto; align-items:start; row-gap:var(--qy-action-gap); }
.qy-task-upload [data-slot="file-upload-item"] > span:not([data-slot]) { grid-column:2; grid-row:1; }
.qy-task-upload [data-slot="file-upload-remove"] { grid-column:3; grid-row:1; }
.qy-task-upload [data-slot="file-upload-item"] > .qy-upload-actions { grid-column:2 / -1; grid-row:2; min-inline-size:0; max-inline-size:100%; }
.qy-task-upload [data-slot="file-upload-item"] span[title], .qy-task-upload [data-slot="file-upload-item-size"] { white-space:normal; overflow:visible; overflow-wrap:anywhere; text-overflow:clip; }
```

## apps/docs/src/patterns/authorized-resources.json
```tsx
{
  "visibility": "public-projection",
  "rows": [
    {
      "id": "r1",
      "title": "秋日田野笔记",
      "type": "笔记",
      "size": "2.4 MB",
      "author": "林川",
      "date": "2026-09-28"
    },
    {
      "id": "r2",
      "title": "城南步行观察",
      "type": "记录",
      "size": "1.2 MB",
      "author": "陈禾",
      "date": "2026-09-29"
    },
    {
      "id": "r3",
      "title": "河岸植物目录",
      "type": "目录",
      "size": "4.8 MB",
      "author": "林川",
      "date": "2026-09-30"
    },
    {
      "id": "r4",
      "title": "木器使用与修复",
      "type": "笔记",
      "size": "3.1 MB",
      "author": "周宁",
      "date": "2026-10-01"
    },
    {
      "id": "r5",
      "title": "巷口的声音",
      "type": "记录",
      "size": "0.8 MB",
      "author": "陈禾",
      "date": "2026-10-02"
    }
  ]
}
```

