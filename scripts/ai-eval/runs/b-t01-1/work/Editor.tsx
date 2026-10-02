import * as React from "react";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Textarea } from "@qingye/ui/components/textarea";
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
  const [state, reactDispatch] = React.useReducer(editorReducer, document, initialEditor);
  // The reducer also advances this ref immediately, so consecutive actions do
  // not depend on React committing a render before the next click or response.
  const current = React.useRef(state);
  const sequence = React.useRef(0);
  const checking = React.useRef(false);
  const editorId = React.useId();

  function dispatch(event: EditorEvent) {
    current.current = editorReducer(current.current, event);
    reactDispatch(event);
  }

  function acceptResult(requestId: string, result: SaveResult) {
    if (current.current.pending?.requestId !== requestId) return;
    dispatch({ type: "save-result", requestId, result });
    // A known result clears pending before notifying, so duplicate or old
    // responses cannot notify again, including a response from a query.
    if (result.kind === "saved") onSaved(result.document);
  }

  async function save() {
    const before = current.current;
    if (!canSave(before)) return;
    const attempt = ++sequence.current;
    const requestId = typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `${editorId}-${Date.now()}-${attempt}-${Math.random().toString(36).slice(2)}`;
    dispatch({ type: "save-start", requestId });
    const pending = current.current.pending;
    if (!pending || pending.requestId !== requestId) return;
    let result: SaveResult;
    try {
      result = await api.save({
        id: before.base.id,
        version: before.base.version,
        draft: { ...pending.draft },
        requestId,
      });
    } catch {
      result = { kind: "unknown" };
    }
    acceptResult(requestId, result);
  }

  async function check() {
    const before = current.current;
    if (before.phase !== "unknown" || !before.pending || checking.current) return;
    const { requestId } = before.pending;
    checking.current = true;
    try {
      let result: SaveResult;
      try {
        result = await api.check(requestId);
      } catch {
        result = { kind: "unknown" };
      }
      acceptResult(requestId, result);
    } finally {
      checking.current = false;
    }
  }

  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field><FieldLabel htmlFor={`${editorId}-title`}>标题</FieldLabel><Input id={`${editorId}-title`} name="title" value={state.draft.title} onChange={(event) => dispatch({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field><FieldLabel htmlFor={`${editorId}-body`}>正文</FieldLabel><Textarea id={`${editorId}-body`} name="body" value={state.draft.body} onChange={(event) => dispatch({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "saving" && <p role="status">正在保存…</p>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "提交内容已保存，当前修改尚未保存" : "资料已保存"}</p>}
    {state.phase === "error" && <p role="alert">{state.error}</p>}
    {state.phase === "unknown" && <>
      <p role="status">结果待确认</p>
      <Button type="button" variant="outline" onClick={() => { void check(); }}>查询保存结果</Button>
    </>}
    <Button type="submit" disabled={!canSave(state)}>保存资料</Button>
    <Button type="button" variant="outline" onClick={() => {
      const work = current.current;
      onBack({ draft: { ...work.draft }, dirty: isDirty(work) });
    }}>返回列表</Button>
  </form>;
}
