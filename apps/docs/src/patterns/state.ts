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
