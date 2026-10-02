import type { Document, EditorState, EditorEvent, Draft } from "../../../tasks/t01-editor/state";
export type { Document, Draft, SaveResult } from "../../../tasks/t01-editor/state";
const same = (a: Draft, b: Draft) => a.title === b.title && a.body === b.body;
export function initialEditor(document: Document): EditorState { return { base: document, draft: { title: document.title, body: document.body }, phase: "editing", pending: null, error: null }; }
export function isDirty(state: EditorState) { return !same(state.draft, state.base); }
export function canSave(state: EditorState) { return isDirty(state) && !state.pending; }
export function editorReducer(state: EditorState, event: EditorEvent): EditorState {
  if (event.type === "edit") return { ...state, draft: { ...state.draft, [event.field]: event.value }, phase: state.pending ? state.phase : "editing", error: null };
  if (event.type === "save-start") return canSave(state) ? { ...state, phase: "saving", error: null, pending: { requestId: event.requestId, draft: { ...state.draft } } } : state;
  if (!state.pending || event.requestId !== state.pending.requestId) return state;
  if (event.result.kind === "unknown") return { ...state, phase: "unknown", error: null };
  if (event.result.kind === "error") return { ...state, phase: "error", error: event.result.message, pending: null };
  const base = event.result.document;
  const draft = same(state.draft, state.pending.draft) ? { title: base.title, body: base.body } : state.draft;
  return { ...state, base, draft, phase: same(draft, base) ? "saved" : "editing", pending: null, error: null };
}
