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
  const requestPrefix = React.useRef<string | null>(null);
  const checking = React.useRef<string | null>(null);

  // Apply the same pure transition synchronously to guard clicks before React
  // renders the queued update. All document state remains owned by state.ts.
  function send(event: EditorEvent) {
    current.current = editorReducer(current.current, event);
    dispatch(event);
  }

  function receive(requestId: string, result: SaveResult) {
    if (current.current.pending?.requestId !== requestId) return;
    send({ type: "save-result", requestId, result });
    if (result.kind === "saved") onSaved(result.document);
  }

  async function save() {
    const before = current.current;
    if (!canSave(before)) return;
    requestPrefix.current ??= globalThis.crypto?.randomUUID?.()
      ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    const requestId = `${requestPrefix.current}-${++sequence.current}`;
    send({ type: "save-start", requestId });
    const pending = current.current.pending;
    if (pending?.requestId !== requestId) return;
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
    receive(requestId, result);
  }

  async function check() {
    const pending = current.current.pending;
    if (current.current.phase !== "unknown" || pending === null || checking.current !== null) return;
    const requestId = pending.requestId;
    checking.current = requestId;
    let result: SaveResult;
    try {
      result = await api.check(requestId);
    } catch {
      result = { kind: "unknown" };
    } finally {
      checking.current = null;
    }
    receive(requestId, result);
  }

  return <form className="flex flex-col gap-4" onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field name="title"><FieldLabel>标题</FieldLabel><Input name="title" value={state.draft.title} onChange={(event) => send({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field name="body"><FieldLabel>正文</FieldLabel><Textarea name="body" value={state.draft.body} onChange={(event) => send({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {state.phase === "error" && <p role="alert">{state.error || "保存失败，请重试。"}</p>}
    {state.phase === "saving" && <p role="status">正在保存资料，仍可继续编辑。</p>}
    {state.phase === "unknown" && <div className="flex flex-col gap-2">
      <p role="status">结果待确认</p>
      <Button type="button" variant="outline" onClick={() => { void check(); }}>查询保存结果</Button>
    </div>}
    {state.phase === "saved" && <p role="status">{isDirty(state) ? "提交内容已保存，当前修改尚未保存。" : "资料已保存。"}</p>}
    <div className="flex flex-wrap gap-2">
      <Button type="submit" loading={state.phase === "saving"} disabled={!canSave(state)}>保存资料</Button>
      <Button type="button" variant="outline" onClick={() => {
        const work = current.current;
        onBack({ draft: { ...work.draft }, dirty: isDirty(work) });
      }}>返回列表</Button>
    </div>
  </form>;
}
