# 编辑与恢复

Package: @qingye/ui@0.3.0
围绕同一份草稿，保存、失败、核实与放弃各有明确后果。

Components: field, input, textarea, button, alert, dialog
Methods: 名实相符, 布白有用, 进退相承
States: editing, saving, success, failure, unknown, restored

Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.

## apps/docs/src/patterns/edit.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Textarea } from "@qingye/ui/components/textarea";
import { Dialog, DialogPopup, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@qingye/ui/components/dialog";
import { useEffect, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { editReducer, initialEdit, resumeEditState, type EditState, type Outcome } from "./state";
import { FixtureSettings, Notice, OutcomeChoice, readSession, writeSession, useTaskTimers } from "./shared";

function resumeEdit(): EditState {
  return resumeEditState(readSession<EditState>("edit", initialEdit));
}
export default function EditPattern({ compact = false }: { compact?: boolean }) {
  const [state, dispatch] = useReducer(editReducer, undefined, resumeEdit);
  const [outcome, setOutcome] = useState<Outcome>("success");
  const [undoOutcome, setUndoOutcome] = useState<"success" | "failure">("success");
  const [mode, setMode] = useState<"save" | "publish">("save");
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  const [recovery, setRecovery] = useState<{ objectId: string; draft: EditState["draft"] } | null>(() => { const item = readSession<{ objectId: string; draft: EditState["draft"] } | null>("edit-recovery", null); return item?.draft && item.objectId ? item : null; });
  const requestId = useRef(Date.now());
  const later = useTaskTimers();
  const dirty = state.draft.title !== state.saved.title || state.draft.body !== state.saved.body;
  const undoUnresolved = ["pending", "unknown"].includes(state.undoStatus);
  useEffect(() => { writeSession("edit", state); }, [state]);
  useEffect(() => {
    if (!state.undo || !["available", "failure"].includes(state.undoStatus)) return;
    const timer = setTimeout(() => dispatch({ type: "undo-expire" }), Math.max(0, state.undo.expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [state.undo, state.undoStatus]);
  function undo() {
    if (!state.undo || !["available", "failure"].includes(state.undoStatus)) return;
    const { requestId, attempt } = state.undo;
    dispatch({ type: "undo-request", at: Date.now() });
    later(() => dispatch({ type: "undo-result", requestId, attempt: attempt + 1, outcome: undoOutcome }), 750);
  }
  function verifyUndo() {
    if (!state.undo || state.undoStatus !== "unknown") return;
    dispatch({ type: "undo-verify", requestId: state.undo.requestId, attempt: state.undo.attempt, outcome: undoOutcome, at: Date.now() });
  }
  function submit() {
    const id = ++requestId.current;
    dispatch({ type: "submit", id, action: mode });
    if (state.draft.title.trim() && !["saving", "unknown"].includes(state.status) && !undoUnresolved) later(() => dispatch({ type: "result", id, outcome }), 1100);
  }
  function discard() {
    const snapshot = { objectId: state.objectId, draft: state.draft }; writeSession("edit-recovery", snapshot); setRecovery(snapshot);
    dispatch({ type: "discard" }); setConfirmDiscard(false);
  }
  return <section className="qy-task" data-pattern="edit" aria-label="资料编辑">
    <header><div><p className="qy-task-kicker">田野资料 / {state.objectId === "field-note-01" ? "资料 A" : "资料 B"}</p><h2>写下这次观察</h2></div><span className="qy-task-kicker">{dirty ? "有未保存修改" : "与已保存版本一致"}</span></header>
    <div className="qy-task-columns"><form onSubmit={(event) => { event.preventDefault(); submit(); }} className="qy-task-fields">
      <FieldGroup>
        <Field name="title" invalid={Boolean(state.error && !state.draft.title.trim())}><FieldLabel>资料名称</FieldLabel><Input disabled={state.status === "unknown" || undoUnresolved} onValueChange={(value) => dispatch({ type: "change", key: "title", value })} value={state.draft.title} /><FieldDescription>用能辨认这份资料的名称。</FieldDescription>{!state.draft.title.trim() && state.error && <FieldError>{state.error}</FieldError>}</Field>
        <Field name="body"><FieldLabel>观察正文</FieldLabel><Textarea disabled={state.status === "unknown" || undoUnresolved} onChange={(event) => dispatch({ type: "change", key: "body", value: event.target.value })} placeholder="从你注意到的一件事开始。" rows={compact ? 5 : 8} value={state.draft.body} /><FieldDescription>示例只作参考，采用前不会进入正文。</FieldDescription></Field>
      </FieldGroup>
      {state.status === "saving" && <Notice title={state.request?.action === "publish" ? "正在发布" : "正在保存草稿"}>现在可以继续编辑；新输入不会被过期响应覆盖。</Notice>}
      {state.status === "success" && state.undoStatus !== "success" && <Notice title="本次操作已完成" tone="success">已保存版本与当前对象对应。</Notice>}
      {state.status === "failure" && state.draft.title.trim() && <Notice title="保存未完成" tone="error">{state.error}</Notice>}
      {state.status === "unknown" && <Notice title="结果待核实" tone="warning">{state.error}</Notice>}
      {state.status === "restored" && <Notice title="已恢复草稿">草稿仍未保存，可继续编辑。</Notice>}
      <div className="qy-task-actions"><Button disabled={state.status === "unknown" || undoUnresolved} loading={state.status === "saving"} type="submit">{mode === "publish" ? "发布资料" : "保存草稿"}</Button>{state.status === "unknown" && <Button onClick={() => dispatch({ type: "verify" })}>核实原操作</Button>}<Button disabled={!dirty || ["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => setConfirmDiscard(true)} variant="outline">放弃这次修改</Button><Link className={buttonVariants({ variant: "ghost" })} to="/docs/patterns/collection">返回资料集合</Link></div>
      {state.undo && <div className="qy-task-fields">{state.undoStatus === "available" && <p className="qy-task-kicker">这次已保存操作可在 15 秒内撤销。</p>}{state.undoStatus === "pending" && <Notice title="正在撤销已保存操作">等待撤销结果，关闭对话框不会代替这个操作。</Notice>}{state.undoStatus === "unknown" && <Notice title="撤销结果待核实" tone="warning">离开时撤销仍在等待结果。草稿与已保存版本已保留，请先核实这次撤销。</Notice>}{state.undoStatus === "success" && <Notice title="撤销已完成" tone="success">已保存版本回到操作前；随后尚未保存的输入仍保留。</Notice>}{state.undoStatus === "failure" && <Notice title="撤销未完成" tone="error">已保存结果保持不变。期限内可以重试撤销。</Notice>}{state.undoStatus === "expired" && <Notice title="撤销期限已过">这次保存保持有效；可以继续编辑，但不能宣称它已撤销。</Notice>}<div className="qy-task-actions"><Button disabled={!["available", "failure"].includes(state.undoStatus)} loading={state.undoStatus === "pending"} onClick={undo} variant="outline">{state.undo.action === "publish" ? "撤销这次发布" : "撤销这次保存"}</Button>{state.undoStatus === "unknown" && <Button onClick={verifyUndo}>核实撤销结果</Button>}</div></div>}
      {mode === "publish" && <p className="qy-task-kicker">发布会使资料进入可阅读状态；本示例只在当前浏览器模拟此结果。</p>}
    </form><aside className="qy-task-aside"><div><h3>从一件小事开始</h3><p>可以记录位置、变化和自己的判断。不需要照着固定提纲填写。</p></div><div><p className="qy-task-kicker">可忽略的写作示例</p><p>河岸的草木开始转黄，一条新踩出的路径穿过旧石阶。</p><Button onClick={() => { dispatch({ type: "change", key: "body", value: "河岸的草木开始转黄，一条新踩出的路径穿过旧石阶。" }); }} disabled={state.status === "unknown" || undoUnresolved} size="sm" variant="outline">采用这段示例</Button></div>{recovery && recovery.objectId === state.objectId && <div><h3>保留的上一份草稿</h3><p>{recovery.draft.title || "尚未命名"}</p><Button disabled={["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => dispatch({ type: "restore", draft: recovery.draft })} variant="outline">恢复草稿</Button></div>}</aside></div>
    <Dialog onOpenChange={setConfirmDiscard} open={confirmDiscard}><DialogPopup><DialogHeader><DialogTitle>放弃这次修改？</DialogTitle><DialogDescription>当前输入会回到已保存版本。本示例会在当前浏览器会话保留一份可恢复草稿。</DialogDescription></DialogHeader><DialogFooter><Button onClick={() => setConfirmDiscard(false)} variant="outline">继续编辑</Button><Button onClick={discard}>放弃并保留草稿</Button></DialogFooter></DialogPopup></Dialog>
    <FixtureSettings><div className="qy-task-fields"><Label htmlFor="edit-object">当前编辑对象</Label><NativeSelect disabled={state.undoStatus === "pending"} id="edit-object" onChange={(event) => dispatch({ type: "switch", objectId: event.target.value })} value={state.objectId}><NativeSelectOption value="field-note-01">资料 A</NativeSelectOption><NativeSelectOption value="field-note-02">资料 B</NativeSelectOption></NativeSelect><Label htmlFor="undo-outcome">撤销响应</Label><NativeSelect id="undo-outcome" onChange={(event) => setUndoOutcome(event.target.value as "success" | "failure")} value={undoOutcome}><NativeSelectOption value="success">撤销成功</NativeSelectOption><NativeSelectOption value="failure">撤销失败</NativeSelectOption></NativeSelect><Button disabled={!state.undo || undoUnresolved} onClick={() => dispatch({ type: "undo-expire" })} size="sm" variant="outline">重放撤销过期</Button></div><OutcomeChoice onChange={setOutcome} value={outcome} /><div className="qy-task-actions"><Button disabled={["saving", "unknown"].includes(state.status) || undoUnresolved} onClick={() => setMode(mode === "save" ? "publish" : "save")} size="sm" variant="outline">切换为{mode === "save" ? "发布" : "保存草稿"}</Button></div><p>草稿保留在此浏览器会话；关闭会话可能清除。已忽略的过期响应：{state.ignoredResponses}。保存核实由本地夹具返回原操作成功；撤销核实使用所选撤销响应。真实系统需由后端提供原请求的核实协议。</p></FixtureSettings>
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

