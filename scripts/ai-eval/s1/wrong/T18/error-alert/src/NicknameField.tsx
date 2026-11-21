import { useState } from "react";
import { Alert, Button, Field, FieldLabel, Input } from "@qingye_lab/ui";

export class UnknownOutcomeError extends Error {}

export type NicknameFieldProps = {
  value: string;
  save: (next: string) => Promise<void>;
};

// DN 自然解：任何 reject 都当失败
export function NicknameField({ value, save }: NicknameFieldProps) {
  const [current, setCurrent] = useState(value);
  const [draft, setDraft] = useState(value);
  const [failed, setFailed] = useState(false);

  const onSave = async () => {
    setFailed(false);
    try { await save(draft); setCurrent(draft); }
    catch { setFailed(true); }
  };

  return (
    <div>
      <p>{current}</p>
      <Field>
        <FieldLabel>昵称</FieldLabel>
        <Input value={draft} onChange={e => setDraft(e.target.value)} />
      </Field>
      {failed && <Alert tone="danger" role="alert">保存失败，请重试。</Alert>}
      <Button type="button" onClick={onSave}>保存</Button>
    </div>
  );
}
