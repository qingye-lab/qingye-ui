# 阅读与位置

Package: @qingye/ui@0.3.0
正文保持主轴，直接进入章节，离开后回到原来的阅读位置。

Components: button, typography, badge, separator
Methods: 布白有用, 随境取度, 展开有据
States: reading, chapter, saved-position, restored-position

Synthetic local application fixture. The application owns objects, drafts, selection, versions and outcomes. This does not verify backend protocols.

## apps/docs/src/patterns/read.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FixtureSettings, Notice, readSession, writeSession } from "./shared";

const chapters = [
  { id: "observation", title: "从观察开始", paragraphs: ["一份记录通常开始于很小的东西：一段路、一件日常使用的器物、一个尚未说清的变化。先把注意力放在对象上，暂时不急着为它寻找一个宏大的解释。名称清楚，后来的人才知道自己读到的是什么。", "观察不是把所有信息填进固定的格子。必要的线索要能找到，同时也要给新的表达留下位置。刚开始的空白有自己的用处；示例可以指引方向，却不应未经选择成为作者的内容。", "记录地点、时间与条件，是让内容可以被比较的起点。同一片河岸，在不同季节、不同天气、不同使用方式下有不同的意义。把这些条件放在相邻位置，比给每句话增加一个围框更有帮助。"] },
  { id: "relation", title: "在关系中理解", paragraphs: ["器物很少独立存在。它与手、材料、位置和使用的节奏共同形成经验。界面中的文字、输入、说明和操作也一样：单看一枚按钮，很难判断它是否合适。要看它怎样帮助人理解对象，怎样保护正在发生的工作。", "一项重要的保护操作，可能比推进操作更需要被看见。阅读时，正文应成为主轴；比较时，关键字段应同时在场；失败时，问题应该出现在能够修正的地方。显著程度来自当前任务，而不是一套固定的强弱等级。", "关系既需要相近，也需要间隔。相关字段靠近，不同任务分节，信息密集处对齐，长阅读保留合适的行长。空白不是装饰，也不意味着所有页面必须疏朗。其作用是让内容与行动得到适当的位置。"] },
  { id: "return", title: "给返回留位置", paragraphs: ["进入详情可以帮助人深入，也可能使人暂时离开原来的工作面。返回之后，原来的查询、选中对象和阅读位置仍然有价值。一个合理的返回入口，应当说明去向，不要求人重新猜测自己从哪里来。", "直接抵达同样是一种正常路径。熟悉的人不必每次经过所有层级，分享的章节也应当能够打开。缺少历史时，就提供稳定的上级入口；不能把浏览器后退当作唯一的返回方式。", "阅读可以暂停。标记一处位置，稍后继续，和一次读完同样有效。保存位置不意味着系统替人完成阅读；它只是保留继续所需的依据。界面还应该允许取消这个决定，而不把停下描述为失败。"] },
  { id: "change", title: "让变化有来处", paragraphs: ["保存之后的等待、失败之后的修正，以及结果尚不明确时的核实，都应围绕同一个对象。一次超时并不能告诉我们服务端是否已经执行。准确表达当前事实，才能决定下一步是重试、核实还是退出。", "批量处理也需要逐个看待结果。完成、失败与未知不是三个可以混用的词。已经完成的对象不应该再次处理；明确失败的对象可以进入安全重试；未知对象要先得到核实的依据。", "动效能够交代变化，但业务完成不能依赖它结束。即使关闭动画，输入、范围、状态和返回仍应成立。逻辑与位置保持连续，才使界面既容易向前，也允许体面地停下。"] },
];
export default function ReadPattern({ compact = false }: { compact?: boolean }) {
  const [params, setParams] = useSearchParams();
  const reader = useRef<HTMLDivElement>(null);
  const [savedPosition, setSavedPosition] = useState<number>(() => readSession("reading-position", 0));
  const [notice, setNotice] = useState("");
  const chapter = params.get("chapter");
  useEffect(() => {
    const container = reader.current;
    if (!container) return;
    const target = chapter ? container.querySelector<HTMLElement>(`[data-chapter="${chapters.some((item) => item.id === chapter) ? chapter : "observation"}"]`) : null;
    if (target) container.scrollTop = target.getBoundingClientRect().top - container.getBoundingClientRect().top + container.scrollTop;
    else container.scrollTop = readSession("reading-position", 0);
  }, [chapter]);
  function remember() { const position = reader.current?.scrollTop ?? 0; writeSession("reading-position", position); setSavedPosition(position); setNotice("阅读位置已保留，可以稍后继续。"); }
  return <section className="qy-task" data-pattern="read" aria-label="方法札记阅读"><header><div><p className="qy-task-kicker">方法札记 · 约 6 分钟</p><h2>给使用留下一点余地</h2></div><Button onClick={remember} variant="outline">记下阅读位置</Button></header>
    <nav aria-label="章节" className="qy-reading-nav">{chapters.map((item) => <Button aria-current={chapter === item.id ? "location" : undefined} key={item.id} onClick={() => setParams({ chapter: item.id }, { replace: true })} size="sm" variant="ghost">{item.title}</Button>)}</nav>
    <div aria-label="文章正文，可滚动阅读" className="qy-reading-scroll focus-ring" ref={reader} style={{ maxBlockSize: compact ? "26rem" : "36rem" }} tabIndex={0}><article className="qy-reading"><p>从器用出发，在关系中建立秩序，为使用留下余地。</p>{chapters.map((item) => <section data-chapter={item.id} key={item.id}><h2>{item.title}</h2>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<p className="qy-task-kicker">本文为 Qingye UI 的合成阅读示例，以正文与章节构成阅读主轴。</p></article></div>
    <div className="qy-task-actions"><Button disabled={!savedPosition} onClick={() => { if (reader.current) reader.current.scrollTop = savedPosition; setNotice("已回到保留的位置。"); }} variant="outline">继续上次阅读</Button><Button onClick={() => { remember(); if (reader.current) reader.current.scrollTop = 0; setParams({ chapter: "observation" }, { replace: true }); }} variant="ghost">返回文章开头</Button></div>
    {notice && <Notice title={notice} />}
    <FixtureSettings><p>阅读位置只在此浏览器会话保存，章节地址可直接进入。本文不使用远程媒体，也不请求内容权限。分享或持久保存位置需要应用进一步接入。</p><Button onClick={() => { writeSession("reading-position", 0); setSavedPosition(0); setNotice("已清除保留位置。"); }} size="sm" variant="outline">清除保留位置</Button></FixtureSettings>
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

