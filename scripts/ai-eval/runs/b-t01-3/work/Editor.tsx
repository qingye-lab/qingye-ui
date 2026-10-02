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
  const [state, dispatch] = React.useReducer(editorReducer, document, initialEditor);
  const sequence = React.useRef(0);
  const current = React.useRef(state);
  const checking = React.useRef<string | null>(null);
  const fieldId = React.useId();

  // The same reducer owns both rendered state and the synchronous event guard.
  // This also guards two submissions before React has rendered the first one.
  function send(event: EditorEvent) {
    current.current = editorReducer(current.current, event);
    dispatch(event);
  }

  function finish(requestId: string, result: SaveResult) {
    if (current.current.pending?.requestId !== requestId) return;
    send({ type: "save-result", requestId, result });
    if (result.kind === "saved") onSaved(result.document);
  }

  async function save() {
    const before = current.current;
    if (!canSave(before)) return;
    const requestId = `save-${++sequence.current}-${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
    send({ type: "save-start", requestId });
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
    finish(requestId, result);
  }

  async function check() {
    const before = current.current;
    if (before.phase !== "unknown" || !before.pending || checking.current) return;
    const requestId = before.pending.requestId;
    checking.current = requestId;
    let result: SaveResult;
    try {
      result = await api.check(requestId);
    } catch {
      result = { kind: "unknown" };
    } finally {
      checking.current = null;
    }
    finish(requestId, result);
  }

  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field><FieldLabel htmlFor={`${fieldId}-title`}>标题</FieldLabel><Input id={`${fieldId}-title`} name="title" value={state.draft.title} onChange={(event) => send({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field><FieldLabel htmlFor={`${fieldId}-body`}>正文</FieldLabel><Textarea id={`${fieldId}-body`} name="body" value={state.draft.body} onChange={(event) => send({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "saving" && <p role="status">正在保存…</p>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "已保存提交内容，当前还有未保存修改" : "资料已保存"}</p>}
    {state.phase === "error" && <p role="alert">{state.error}</p>}
    {state.phase === "unknown" && <div>
      <p role="status">结果待确认</p>
      <Button type="button" onClick={() => { void check(); }}>查询保存结果</Button>
    </div>}
    <Button type="submit" disabled={!canSave(state)}>保存资料</Button>
    <Button type="button" variant="outline" onClick={() => onBack({ draft: { ...current.current.draft }, dirty: isDirty(current.current) })}>返回列表</Button>
  </form>;
}
