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
  const currentState = React.useRef(state);
  const sequence = React.useRef(0);
  const checkingRequest = React.useRef<string | null>(null);
  const editorId = React.useId();
  const titleId = `${editorId}-title`;
  const bodyId = `${editorId}-body`;

  // All events go through the same reducer immediately as well as in React,
  // so another click or response before the next render sees the latest state.
  function transition(event: EditorEvent) {
    currentState.current = editorReducer(currentState.current, event);
    dispatch(event);
  }

  function receive(requestId: string, result: SaveResult) {
    if (currentState.current.pending?.requestId !== requestId) return;
    transition({ type: "save-result", requestId, result });
    // The accepted saved transition clears pending before calling user code.
    if (result.kind === "saved") onSaved(result.document);
  }

  async function save() {
    const current = currentState.current;
    if (!canSave(current)) return;
    sequence.current += 1;
    const requestId = typeof globalThis.crypto?.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `${editorId}-${Date.now()}-${sequence.current}`;
    const draft = { ...current.draft };
    transition({ type: "save-start", requestId });
    let result: SaveResult;
    try {
      result = await api.save({ id: current.base.id, version: current.base.version, draft, requestId });
    } catch {
      result = { kind: "unknown" };
    }
    receive(requestId, result);
  }

  async function check() {
    const current = currentState.current;
    if (current.phase !== "unknown" || !current.pending || checkingRequest.current !== null) return;
    const requestId = current.pending.requestId;
    checkingRequest.current = requestId;
    let result: SaveResult;
    try {
      result = await api.check(requestId);
    } catch {
      result = { kind: "unknown" };
    } finally {
      checkingRequest.current = null;
    }
    receive(requestId, result);
  }

  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field><FieldLabel htmlFor={titleId}>标题</FieldLabel><Input id={titleId} name="title" value={state.draft.title} onChange={(event) => transition({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field><FieldLabel htmlFor={bodyId}>正文</FieldLabel><Textarea id={bodyId} name="body" value={state.draft.body} onChange={(event) => transition({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "saving" && <p role="status">正在保存…</p>}
    {state.phase === "error" && <p role="alert">{state.error}</p>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "提交的资料已保存，当前修改尚未保存" : "资料已保存"}</p>}
    {state.phase === "unknown" && <>
      <p role="status">结果待确认</p>
      <Button type="button" variant="outline" onClick={() => { void check(); }}>查询保存结果</Button>
    </>}
    <Button type="submit" disabled={!canSave(state)}>保存资料</Button>
    <Button type="button" variant="outline" onClick={() => {
      const current = currentState.current;
      onBack({ draft: { ...current.draft }, dirty: isDirty(current) });
    }}>返回列表</Button>
  </form>;
}
