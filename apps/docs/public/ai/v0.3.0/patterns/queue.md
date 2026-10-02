# 上传与处理

Package: @qingye/ui@0.3.0
区分传输、处理与结果，取消请求有等待和过晚取消分支。

Components: file-upload, progress, button, badge, alert
Methods: 名实相符, 相成相制, 进退相承
States: ready, transferring, processing, success, failure, unknown, cancelling, cancelled, too-late

Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.

## apps/docs/src/patterns/queue.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { FileUpload } from "@qingye/ui/components/file-upload";
import { Progress, ProgressLabel, ProgressTrack, ProgressIndicator } from "@qingye/ui/components/progress";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { useState } from "react";
import { queueTransition, type QueueItem, type QueueStage } from "./state";
import { FixtureSettings, Notice, StatusBadge, useTaskTimers } from "./shared";

type QueueEntry = QueueItem & { file: File };
const sampleNames = ["田野笔记.pdf", "植物目录.csv", "声音记录.wav"];
export default function QueuePattern() {
  const [items, setItems] = useState<QueueEntry[]>([]);
  const [lateCancel, setLateCancel] = useState(false);
  const later = useTaskTimers();
  const active = items.some((item) => ["transferring", "processing", "cancelling"].includes(item.stage));
  function transition(id: string, attempt: number, stage: QueueStage) { setItems((list) => list.map((item) => item.id === id && item.attempt === attempt ? queueTransition(item, stage) : item)); }
  function start(ids: string[], retry = false) {
    const next = items.filter((item) => ids.includes(item.id) && ["ready", "failure"].includes(item.stage));
    setItems((list) => list.map((item) => next.some((target) => target.id === item.id) ? { ...item, attempt: item.attempt + 1, stage: "transferring", progress: 0 } : item));
    next.forEach((item, index) => {
      const attempt = item.attempt + 1;
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "transferring" ? { ...current, progress: 65 } : current)), 350);
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "transferring" ? queueTransition(current, "processing") : current)), 850);
      later(() => setItems((list) => list.map((current) => current.id === item.id && current.attempt === attempt && current.stage === "processing" ? queueTransition(current, retry ? "success" : index % 3 === 1 ? "failure" : index % 3 === 2 ? "unknown" : "success") : current)), 1900);
    });
  }
  function cancel(item: QueueEntry) { transition(item.id, item.attempt, "cancelling"); later(() => transition(item.id, item.attempt, lateCancel ? "too-late" : "cancelled"), 1000); }
  const count = (stage: QueueStage) => items.filter((item) => item.stage === stage).length;
  return <section className="qy-task" data-pattern="queue" aria-label="资料处理队列"><header><div><p className="qy-task-kicker">田野资料 / 导入</p><h2>从文件到可用资料</h2></div><span className="qy-task-kicker">{items.length} 个文件</span></header>
    <FileUpload className="qy-task-upload" label="待处理文件" description="选择或拖入文件，再开始处理。" disabled={active || Boolean(count("unknown"))} files={items.map((item) => item.file)} onFilesChange={(files) => setItems((list) => files.map((file, index) => list.find((item) => item.file === file) ?? { id: `file-${Date.now()}-${index}`, file, name: file.name, stage: "ready", progress: 0, attempt: 0 }))} getProgress={(file) => { const item = items.find((row) => row.file === file); return item?.stage === "transferring" ? item.progress : undefined; }} getError={(file) => items.find((row) => row.file === file)?.stage === "failure" ? "处理未完成，文件与输入已保留。" : undefined} renderActions={(file) => { const item = items.find((row) => row.file === file); if (!item) return null; return <div className="qy-upload-actions"><StatusBadge value={item.stage} />{["processing", "cancelling"].includes(item.stage) && <Progress value={null}><ProgressLabel>{item.stage === "processing" ? "等待处理" : "等待取消"}</ProgressLabel><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>}{["transferring", "processing", "unknown"].includes(item.stage) && <Button onClick={() => cancel(item)} size="sm" variant="outline">请求取消<span className="sr-only">{item.name}</span></Button>}{item.stage === "unknown" && <Button onClick={() => transition(item.id, item.attempt, "success")} size="sm" variant="outline">核实结果</Button>}</div>; }} />
    {!items.length && <Notice title="队列还是空的">先选择文件，再开始传输。不会自动采用示例资料。</Notice>}
    <div className="qy-task-actions qy-task-actions-wrap"><Button disabled={active || !count("ready")} onClick={() => start(items.filter((item) => item.stage === "ready").map((item) => item.id))}>开始处理 {count("ready")} 个文件</Button><Button disabled={active || !count("failure")} onClick={() => start(items.filter((item) => item.stage === "failure").map((item) => item.id), true)} variant="outline">只重试失败文件</Button></div>
    {!!items.length && !active && <Notice title={`已完成 ${count("success") + count("too-late")}，未完成 ${count("failure")}，待核实 ${count("unknown")}，已取消 ${count("cancelled")}`}>未知结果先核实，已经完成的文件不重复处理。</Notice>}
    <FixtureSettings><Button disabled={active} onClick={() => setItems(sampleNames.map((name, index) => ({ id: `sample-${index}`, name, file: new File(["Qingye synthetic fixture"], name, { lastModified: index + 1 }), stage: "ready", progress: 0, attempt: 0 })))} size="sm" variant="outline">载入三份样例文件</Button><label className="qy-task-actions"><Checkbox checked={lateCancel} onCheckedChange={setLateCancel} />取消过晚，返回已完成</label><p>不读取或上传文件内容，只使用文件名称演示阶段。第一份成功、第二份失败、第三份结果未知。离开页面会终止夹具计时并清空本地队列；真实任务必须交给应用/后端管理。</p></FixtureSettings>
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

