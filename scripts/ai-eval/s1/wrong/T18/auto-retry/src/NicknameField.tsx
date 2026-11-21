import { useState } from "react";
import { Button, Field, FieldLabel, Input, PendingValue } from "@qingye_lab/ui";

export class UnknownOutcomeError extends Error {}

export type NicknameFieldProps = {
  value: string;
  save: (next: string) => Promise<void>;
};

// 用了 PendingValue，但结果未知时自动重试一次
export function NicknameField({ value, save }: NicknameFieldProps) {
  const [current, setCurrent] = useState(value);
  const [draft, setDraft] = useState(value);
  const [unknown, setUnknown] = useState(false);

  const onSave = async () => {
    setUnknown(false);
    try { await save(draft); setCurrent(draft); }
    catch (error) {
      if (!(error instanceof UnknownOutcomeError)) return;
      try { await save(draft); setCurrent(draft); }
      catch (again) { if (again instanceof UnknownOutcomeError) setUnknown(true); }
    }
  };

  return (
    <div>
      {unknown ? <PendingValue label="昵称">{current}</PendingValue> : <p>{current}</p>}
      <Field>
        <FieldLabel>昵称</FieldLabel>
        <Input value={draft} onChange={e => setDraft(e.target.value)} />
      </Field>
      <Button type="button" onClick={onSave}>保存</Button>
    </div>
  );
}
