import * as React from "react";
import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from "@qingye/ui";
import { canSave, editorReducer, initialEditor, isDirty, type Document, type Draft, type SaveResult } from "./state";
export type EditorProps = { document: Document; api: { save(input: { id: string; version: number; draft: Draft; requestId: string }): Promise<SaveResult>; check(requestId: string): Promise<SaveResult> }; onSaved(document: Document): void; onBack(work: { draft: Draft; dirty: boolean }): void };
export function Editor({ document, api, onSaved, onBack }: EditorProps) {
  const [state, dispatch] = React.useReducer(editorReducer, document, initialEditor);
  const sequence = React.useRef(0), busy = React.useRef(false), notified = React.useRef(new Set<string>());
  function finish(requestId: string, result: SaveResult) { dispatch({ type: "save-result", requestId, result }); if (result.kind === "saved" && !notified.current.has(requestId)) { notified.current.add(requestId); onSaved(result.document); } }
  async function save() {
    if (!canSave(state) || busy.current) return;
    busy.current = true; const requestId = `save-${++sequence.current}`;
    dispatch({ type: "save-start", requestId });
    try { finish(requestId, await api.save({ id: state.base.id, version: state.base.version, draft: { ...state.draft }, requestId })); }
    catch { finish(requestId, { kind: "unknown" }); } finally { busy.current = false; }
  }
  async function check() {
    if (state.phase !== "unknown" || !state.pending || busy.current) return;
    busy.current = true; const requestId = state.pending.requestId;
    try { finish(requestId, await api.check(requestId)); } catch { finish(requestId, { kind: "unknown" }); } finally { busy.current = false; }
  }
  return <form onSubmit={event => { event.preventDefault(); void save(); }}>
    <FieldGroup><Field><FieldLabel>标题</FieldLabel><Input value={state.draft.title} onChange={event => dispatch({ type: "edit", field: "title", value: event.target.value })} /></Field><Field><FieldLabel>正文</FieldLabel><Textarea value={state.draft.body} onChange={event => dispatch({ type: "edit", field: "body", value: event.target.value })} /></Field></FieldGroup>
    {state.phase === "error" && <p role="alert">{state.error}</p>}{state.phase === "unknown" && <p role="status">结果待确认</p>}{state.phase === "saving" && <p role="status">保存中</p>}
    {state.phase === "unknown" && <Button type="button" onClick={() => void check()}>查询保存结果</Button>}
    <Button type="submit" disabled={!canSave(state)}>保存资料</Button><Button type="button" onClick={() => onBack({ draft: state.draft, dirty: isDirty(state) })}>返回列表</Button>
  </form>;
}
