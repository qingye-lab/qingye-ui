export type Document = { id: string; title: string; body: string; version: number };
export type Draft = Pick<Document, "title" | "body">;
export type SaveResult =
  | { kind: "saved"; document: Document }
  | { kind: "error"; message: string }
  | { kind: "unknown" };
export type EditorState = {
  base: Document;
  draft: Draft;
  phase: "editing" | "saving" | "saved" | "error" | "unknown";
  pending: { requestId: string; draft: Draft } | null;
  error: string | null;
};
export type EditorEvent =
  | { type: "edit"; field: keyof Draft; value: string }
  | { type: "save-start"; requestId: string }
  | { type: "save-result"; requestId: string; result: SaveResult };

export function initialEditor(document: Document): EditorState {
  return { base: document, draft: { title: document.title, body: document.body }, phase: "editing", pending: null, error: null };
}
export function isDirty(state: EditorState): boolean {
  // TODO: implement the draft/base relationship.
  return false;
}
export function canSave(state: EditorState): boolean {
  // TODO: no duplicate write while saving or while the result is unknown.
  return false;
}
export function editorReducer(state: EditorState, event: EditorEvent): EditorState {
  // TODO: implement immutable transitions; the UI and tests share this owner.
  return state;
}
