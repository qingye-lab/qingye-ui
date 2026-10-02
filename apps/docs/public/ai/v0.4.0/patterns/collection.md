# 集合与比较

Package: @qingye/ui@0.4.0
查询、跨页选择和逐项结果保持可辨，失败项才进入安全重试。

Components: input, table, checkbox, button, badge
Methods: 名实相符, 布白有用, 进退相承
States: querying, selected, stale-response, partial-success, failure, unknown

Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.

## apps/docs/src/patterns/collection.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Input } from "@qingye/ui/components/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { Dialog, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogPanel } from "@qingye/ui/components/dialog";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { resources, batchResults, retryFailed, type ItemResult } from "./state";
import { FixtureSettings, Notice, StatusBadge, readSession, writeSession, useTaskTimers } from "./shared";

export default function CollectionPattern() {
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [appliedQuery, setAppliedQuery] = useState(query);
  const [page, setPage] = useState(Math.max(1, Number(params.get("page") || 1)));
  const [selected, setSelected] = useState<string[]>(() => readSession("collection-selection", []));
  const [results, setResults] = useState<Record<string, ItemResult>>({});
  const [busy, setBusy] = useState(false);
  const [queryBusy, setQueryBusy] = useState(false);
  const [compact, setCompact] = useState(false);
  const [preview, setPreview] = useState<(typeof resources)[number] | null>(null);
  const [collectionState, setCollectionState] = useState<"populated" | "empty" | "no-results" | "forbidden" | "failure">("populated");
  const [accessRequested, setAccessRequested] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [previewMissing, setPreviewMissing] = useState(false);
  const collectionHeading = useRef<HTMLHeadingElement>(null);
  const [ignored, setIgnored] = useState(0);
  const [retried, setRetried] = useState<string[]>([]);
  const generation = useRef(0);
  const later = useTaskTimers();
  const filtered = (collectionState === "populated" ? resources.filter((row) => !deletedIds.includes(row.id)) : []).filter((row) => `${row.title} ${row.author} ${row.type}`.includes(appliedQuery));
  const pages = Math.max(1, Math.ceil(filtered.length / 3));
  const rows = filtered.slice((Math.min(page, pages) - 1) * 3, Math.min(page, pages) * 3);
  const counts = Object.values(results);
  useEffect(() => { writeSession("collection-selection", selected); }, [selected]);
  function search(value: string, slow = false) {
    if (collectionState === "no-results") setCollectionState("populated");
    setQuery(value); setQueryBusy(true);
    const id = ++generation.current;
    later(() => {
      if (id !== generation.current) { setIgnored((count) => count + 1); return; }
      setAppliedQuery(value); setPage(1); setQueryBusy(false); setParams({ ...(value ? { q: value } : {}), page: "1" }, { replace: true });
    }, slow ? 1700 : 350);
  }
  function toggle(id: string, checked: boolean) { setSelected((ids) => checked ? [...new Set([...ids, id])] : ids.filter((value) => value !== id)); }
  function process() { const scope = [...selected]; setBusy(true); later(() => { setResults(batchResults(scope)); setBusy(false); }); }
  const origin = `${location.pathname}?${params.toString()}`;
  return <section className="qy-task" data-pattern="collection" aria-label="资料集合"><header><div><p className="qy-task-kicker">田野资料</p><h2 ref={collectionHeading} tabIndex={-1}>查找与比较</h2></div>{collectionState !== "forbidden" && <Link className={buttonVariants()} to="/docs/patterns/edit">新建资料</Link>}</header>
    <div className="qy-task-fields"><Label htmlFor="resource-search">搜索名称、作者或类型</Label><Input id="resource-search" onValueChange={(value) => search(value)} type="search" value={query} /></div>
    <div className="qy-task-actions"><span>{selected.length} 项已选（包含其他页）</span><Button disabled={busy || collectionState !== "populated"} onClick={() => setSelected([...new Set([...selected, ...rows.map((row) => row.id)])])} size="sm" variant="outline">选择当前页</Button><Button disabled={busy || !selected.length || collectionState !== "populated"} onClick={() => setSelected([])} size="sm" variant="ghost">清空选择</Button><Button disabled={!selected.length || collectionState !== "populated"} loading={busy} onClick={process}>处理所选 {selected.length} 项</Button></div>
    {queryBusy && <p role="status">正在更新查询，原有结果仍可阅读。</p>}
    <Table className="qy-task-table" density={compact ? "compact" : "default"}><caption className="sr-only">资料名称、类型、大小、作者、更新时间及处理结果</caption><TableHeader><TableRow><TableHead>选择</TableHead><TableHead>资料</TableHead><TableHead>类型</TableHead><TableHead>大小</TableHead><TableHead>作者</TableHead><TableHead>更新日期</TableHead><TableHead>结果</TableHead><TableHead>预览</TableHead></TableRow></TableHeader><TableBody>{rows.map((row) => <TableRow key={row.id}><TableCell><Checkbox aria-label={`选择${row.title}`} checked={selected.includes(row.id)} disabled={busy} onCheckedChange={(checked) => toggle(row.id, checked)} /></TableCell><TableCell><Link className="focus-ring underline underline-offset-4" state={{ from: origin }} to={`/docs/patterns/detail/${row.id}`}>{row.title}</Link></TableCell><TableCell>{row.type}</TableCell><TableCell className="numeric">{row.size}</TableCell><TableCell>{row.author}</TableCell><TableCell className="numeric">{row.date}</TableCell><TableCell><StatusBadge value={results[row.id] ?? "ready"} /></TableCell><TableCell><Button onClick={() => { setPreview(row); setPreviewMissing(false); }} size="sm" variant="ghost">预览<span className="sr-only">{row.title}</span></Button></TableCell></TableRow>)}</TableBody></Table>
    {collectionState === "empty" && <Notice title="还没有资料"><Link className={buttonVariants({ variant: "outline" })} to="/docs/patterns/edit">创建第一份资料</Link></Notice>}
    {(collectionState === "no-results" || (collectionState === "populated" && !rows.length)) && <Notice title="没有符合当前查询的资料">已选对象不会自动清除。<Button onClick={() => { setCollectionState("populated"); search(""); }} variant="outline">清除查询并重新查找</Button></Notice>}
    {collectionState === "forbidden" && <Notice title="当前没有访问权限" tone="warning">资料不会被取回或隐藏在 DOM 中。<Button disabled={accessRequested} onClick={() => setAccessRequested(true)} variant="outline">申请资料访问</Button>{accessRequested && <p role="status">访问申请等待回复，尚未获得权限。</p>}</Notice>}
    {collectionState === "failure" && <Notice title="资料载入未完成" tone="error">原查询和选择仍保留。<Button onClick={() => setCollectionState("populated")} variant="outline">重试载入资料</Button></Notice>}
    <div className="qy-task-actions"><Button disabled={page <= 1} onClick={() => { setPage(page - 1); setParams({ ...(query ? { q: query } : {}), page: String(page - 1) }, { replace: true }); }} variant="outline">上一页</Button><span className="numeric">第 {Math.min(page, pages)} / {pages} 页</span><Button disabled={page >= pages} onClick={() => { setPage(page + 1); setParams({ ...(query ? { q: query } : {}), page: String(page + 1) }, { replace: true }); }} variant="outline">下一页</Button></div>
    {!!counts.length && <Notice title={`已完成 ${counts.filter((value) => value === "success").length} 项，未完成 ${counts.filter((value) => value === "failure").length} 项，待核实 ${counts.filter((value) => value === "unknown").length} 项`}><div className="qy-task-actions"><Button disabled={!counts.includes("failure")} onClick={() => { const retry = retryFailed(results); setResults(retry.results); setRetried(retry.ids); }} variant="outline">只重试失败项</Button><Button disabled={!counts.includes("unknown")} onClick={() => setResults(Object.fromEntries(Object.entries(results).map(([id, result]) => [id, result === "unknown" ? "success" : result])))} variant="outline">核实未知项</Button></div></Notice>}
    <Dialog open={Boolean(preview)} onOpenChange={(open) => { if (!open) setPreview(null); }}><DialogPopup finalFocus={previewMissing ? collectionHeading : undefined}><DialogHeader><DialogTitle>{previewMissing ? "资料已不可用" : preview?.title ?? "资料预览"}</DialogTitle><DialogDescription>先看摘要，再决定是否进入详情。</DialogDescription></DialogHeader><DialogPanel>{previewMissing ? <Notice title="这个对象已从集合移除" tone="warning">关闭预览后回到集合标题继续工作。</Notice> : <p>{preview?.type} · {preview?.author} · {preview?.size}</p>}{preview && !previewMissing && <Link className={buttonVariants()} state={{ from: origin }} to={`/docs/patterns/detail/${preview.id}`}>打开完整详情</Link>}<Collapsible className="qy-fixture-settings"><CollapsibleTrigger render={<Button size="sm" variant="ghost" />}>预览状态演示</CollapsibleTrigger><CollapsiblePanel keepMounted><Button disabled={!preview || previewMissing} onClick={() => { if (preview) { setDeletedIds((ids) => [...ids, preview.id]); setSelected((ids) => ids.filter((id) => id !== preview.id)); setPreviewMissing(true); } }} size="sm" variant="outline">重放预览对象消失</Button></CollapsiblePanel></Collapsible></DialogPanel></DialogPopup></Dialog>
    <FixtureSettings><div className="qy-task-fields"><Label htmlFor="collection-state">集合事实状态</Label><NativeSelect id="collection-state" onChange={(event) => { setCollectionState(event.target.value as typeof collectionState); setAccessRequested(false); }} value={collectionState}><NativeSelectOption value="populated">已有资料</NativeSelectOption><NativeSelectOption value="empty">初始空集合</NativeSelectOption><NativeSelectOption value="no-results">查询无结果</NativeSelectOption><NativeSelectOption value="forbidden">无访问权限</NativeSelectOption><NativeSelectOption value="failure">载入失败</NativeSelectOption></NativeSelect><p>集合、预览和详情只使用 Node 夹具白名单生成的同一授权 DTO；原始受限字段不会进入浏览器或公开响应。访问申请也只记录本地夹具事件，不是完整鉴权审计。</p></div><div className="qy-task-actions"><Button onClick={() => setCompact(!compact)} size="sm" variant="outline">{compact ? "标准" : "紧凑"}密度</Button><Button onClick={() => { search("林川", true); later(() => search("陈禾"), 50); }} size="sm" variant="outline">重放过期查询</Button><Button onClick={() => setSelected(resources.map((row) => row.id))} size="sm" variant="outline">选择全部五份夹具</Button></div><p>五项批量响应：三成功、一失败、一未知。最近安全重试 ID：{retried.join(", ") || "无"}；已忽略旧查询：{ignored}。选择在当前会话保留，刷新后的批量结果不作为真实保存记录。</p></FixtureSettings>
  </section>;
}
```

## apps/docs/src/patterns/shared.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
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
  return <Collapsible className="qy-fixture-settings"><CollapsibleTrigger render={<Button size="sm" variant="ghost" />}>演示与状态</CollapsibleTrigger><CollapsiblePanel keepMounted><p>使用合成资料和本地事件，可在这里重放异常；刷新或离开后的保留边界由各示例说明。</p><div className="qy-task-fields">{children}</div></CollapsiblePanel></Collapsible>;
}
export function OutcomeChoice({ value, onChange }: { value: Outcome; onChange: (value: Outcome) => void }) {
  const id = useId();
  return <div className="qy-task-fields"><Label htmlFor={id}>下次模拟响应</Label><NativeSelect id={id} onChange={(event) => onChange(event.target.value as Outcome)} value={value}><NativeSelectOption value="success">成功</NativeSelectOption><NativeSelectOption value="failure">明确失败</NativeSelectOption><NativeSelectOption value="unknown">超时，结果未知</NativeSelectOption></NativeSelect></div>;
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
.qy-fixture-settings [data-slot="collapsible-trigger"] { width:fit-content; }
.qy-fixture-settings [data-slot="collapsible-panel"] > p { margin-block:var(--qy-space-3); }
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

