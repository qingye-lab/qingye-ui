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
  return { base: { ...document }, draft: { title: document.title, body: document.body }, phase: "editing", pending: null, error: null };
}
export function isDirty(state: EditorState): boolean {
  return !sameDraft(state.draft, state.base);
}
export function canSave(state: EditorState): boolean {
  return isDirty(state) && state.phase !== "saving" && state.phase !== "unknown";
}
export function editorReducer(state: EditorState, event: EditorEvent): EditorState {
  switch (event.type) {
    case "edit": {
      const unresolved = state.phase === "saving" || state.phase === "unknown";
      return {
        ...state,
        draft: { ...state.draft, [event.field]: event.value },
        phase: unresolved ? state.phase : "editing",
        error: unresolved ? state.error : null,
      };
    }
    case "save-start":
      if (!canSave(state)) return state;
      return {
        ...state,
        phase: "saving",
        pending: { requestId: event.requestId, draft: { ...state.draft } },
        error: null,
      };
    case "save-result": {
      if (!state.pending || state.pending.requestId !== event.requestId) return state;
      switch (event.result.kind) {
        case "unknown":
          return { ...state, phase: "unknown", error: null };
        case "error":
          return { ...state, phase: "error", pending: null, error: event.result.message };
        case "saved": {
          const base = { ...event.result.document };
          const draft = sameDraft(state.draft, state.pending.draft)
            ? { title: base.title, body: base.body }
            : state.draft;
          return { ...state, base, draft, phase: "saved", pending: null, error: null };
        }
      }
    }
  }
}

function sameDraft(left: Draft, right: Draft): boolean {
  return left.title === right.title && left.body === right.body;
}
