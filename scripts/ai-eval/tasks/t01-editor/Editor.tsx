import * as React from "react";
import { Button, Field, FieldGroup, FieldLabel, Input, Textarea } from "@qingye/ui";
import { canSave, editorReducer, initialEditor, isDirty, type Document, type Draft, type SaveResult } from "./state";

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
  // TODO: call the injected API, translate rejected promises into error/unknown,
  // and notify onSaved only after a confirmed saved response.
  async function save() { void api; void onSaved; void sequence; }
  async function check() { /* TODO: resolve the existing unknown request. */ }
  return <form onSubmit={(event) => { event.preventDefault(); void save(); }}>
    <FieldGroup>
      <Field><FieldLabel>标题</FieldLabel><Input value={state.draft.title} onChange={(event) => dispatch({ type: "edit", field: "title", value: event.target.value })} /></Field>
      <Field><FieldLabel>正文</FieldLabel><Textarea value={state.draft.body} onChange={(event) => dispatch({ type: "edit", field: "body", value: event.target.value })} /></Field>
    </FieldGroup>
    {/* TODO: retain local feedback and the query action for unknown results. */}
    <Button type="submit" disabled={!canSave(state)}>保存资料</Button>
    <Button type="button" onClick={() => onBack({ draft: state.draft, dirty: isDirty(state) })}>返回列表</Button>
  </form>;
}
