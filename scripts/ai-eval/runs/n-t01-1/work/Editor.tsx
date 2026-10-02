import * as React from "react";
import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from "@qingye/ui";
import { canSave, editorReducer, initialEditor, isDirty, type Document, type Draft, type EditorEvent, type SaveResult } from "./state";

export type EditorProps = {
  document: Document;
  api: {
    save(input: { id: string; version: number; draft: Draft; requestId: string }): Promise<SaveResult>;
    check(requestId: string): Promise<SaveResult>;
  };
  onSaved(document: Document): void;
  onBack(work: { draft: Draft; dirty: boolean }): void;
};
export function Editor({ document, api, onSaved, onBack }: EditorProps) {
  const [state, dispatch] = React.useReducer(editorReducer, document, initialEditor);
  const sequence = React.useRef(0);
  const current = React.useRef(state);
  const querying = React.useRef(false);
  const [checking, setChecking] = React.useState(false);
  const fieldId = React.useId();

  // Advance through the same reducer synchronously, so a second event before
  // React renders cannot submit a second write or use an older draft.
  function apply(event: EditorEvent) {
    current.current = editorReducer(current.current, event);
    dispatch(event);
    return current.current;
  }
  function acceptResult(requestId: string, result: SaveResult) {
    if (current.current.pending?.requestId !== requestId) return;
    apply({ type: "save-result", requestId, result });
    // A known result cleared pending synchronously; repeated responses cannot
    // notify again. Callback failures are not transport failures.
    if (result.kind === "saved") onSaved(result.document);
  }
  async function save() {
    const before = current.current;
    if (!canSave(before)) return;
    sequence.current += 1;
    const requestId = globalThis.crypto?.randomUUID?.()
      ?? `${before.base.id}:${Date.now()}:${Math.random().toString(36).slice(2)}:${sequence.current}`;
    const started = apply({ type: "save-start", requestId });
    if (!started.pending) return;
    let result: SaveResult;
    try {
      result = await api.save({
        id: before.base.id,
        version: before.base.version,
        draft: { ...started.pending.draft },
        requestId,
      });
    } catch {
      result = { kind: "unknown" };
    }
    acceptResult(requestId, result);
  }
  async function check() {
    const pending = current.current.pending;
    if (current.current.phase !== "unknown" || !pending || querying.current) return;
    querying.current = true;
    setChecking(true);
    let result: SaveResult;
    try {
      result = await api.check(pending.requestId);
    } catch {
      result = { kind: "unknown" };
    } finally {
      querying.current = false;
      setChecking(false);
    }
    acceptResult(pending.requestId, result);
  }
  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field name="title"><FieldLabel htmlFor={`${fieldId}-title`}>标题</FieldLabel><Input id={`${fieldId}-title`} name="title" value={state.draft.title} onChange={(event) => apply({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field name="body"><FieldLabel htmlFor={`${fieldId}-body`}>正文</FieldLabel><Textarea id={`${fieldId}-body`} name="body" value={state.draft.body} onChange={(event) => apply({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "saving" && <p role="status">正在保存…</p>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "本次提交已保存，仍有未保存修改。" : "已保存"}</p>}
    {state.phase === "error" && <p role="alert">{state.error || "保存失败，请重试。"}</p>}
    {state.phase === "unknown" && <p role="status">结果待确认</p>}
    <Button type="submit" loading={state.phase === "saving"} disabled={!canSave(state)}>保存资料</Button>
    {state.phase === "unknown" && <Button type="button" loading={checking} onClick={() => { void check(); }}>查询保存结果</Button>}
    <Button type="button" variant="outline" onClick={() => {
      const work = current.current;
      onBack({ draft: { ...work.draft }, dirty: isDirty(work) });
    }}>返回列表</Button>
  </form>;
}
