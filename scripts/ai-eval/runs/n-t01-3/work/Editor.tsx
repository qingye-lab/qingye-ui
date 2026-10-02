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
  const editorId = React.useId();
  const queryRequest = React.useRef<string | null>(null);
  const [checking, setChecking] = React.useState(false);

  // Apply the same reducer immediately so a second action before React renders
  // observes the pending request and the latest draft.
  function send(event: EditorEvent) {
    currentState.current = editorReducer(currentState.current, event);
    dispatch(event);
  }

  function receive(requestId: string, result: SaveResult) {
    if (currentState.current.pending?.requestId !== requestId) return;
    send({ type: "save-result", requestId, result });
    if (result.kind === "saved") onSaved(result.document);
  }

  async function save() {
    const current = currentState.current;
    if (!canSave(current)) return;
    const requestId = globalThis.crypto?.randomUUID?.() ?? `${editorId}-${Date.now()}-${++sequence.current}`;
    const draft = { ...current.draft };
    send({ type: "save-start", requestId });
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
    if (current.phase !== "unknown" || !current.pending || queryRequest.current !== null) return;
    const requestId = current.pending.requestId;
    queryRequest.current = requestId;
    setChecking(true);
    let result: SaveResult;
    try {
      result = await api.check(requestId);
    } catch {
      result = { kind: "unknown" };
    }
    queryRequest.current = null;
    setChecking(false);
    receive(requestId, result);
  }

  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field name="title"><FieldLabel htmlFor={`${editorId}-title`}>标题</FieldLabel><Input id={`${editorId}-title`} value={state.draft.title} onChange={(event) => send({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field name="body"><FieldLabel htmlFor={`${editorId}-body`}>正文</FieldLabel><Textarea id={`${editorId}-body`} value={state.draft.body} onChange={(event) => send({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "saving" && <p role="status">正在保存资料</p>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "提交的资料已保存，当前修改尚未保存" : "资料已保存"}</p>}
    {state.phase === "error" && <p role="alert">{state.error || "保存失败，请重试"}</p>}
    {state.phase === "unknown" && <>
      <p role="status">结果待确认</p>
      <Button type="button" disabled={checking} aria-busy={checking} onClick={() => { void check(); }}>查询保存结果</Button>
    </>}
    <Button type="submit" disabled={!canSave(state)} aria-busy={state.phase === "saving"}>保存资料</Button>
    <Button type="button" variant="outline" onClick={() => {
      const current = currentState.current;
      onBack({ draft: { ...current.draft }, dirty: isDirty(current) });
    }}>返回列表</Button>
  </form>;
}
