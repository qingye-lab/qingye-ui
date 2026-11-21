import { useState } from "react";
import { Button, Field, FieldLabel, Input, PendingValue } from "@qingye_lab/ui";

export class UnknownOutcomeError extends Error {}

export type NicknameFieldProps = {
  value: string;
  save: (next: string) => Promise<void>;
};

// 写入结果未知：保留对象与原值，不当失败，不自动重试（指南 pending-value.md）
export function NicknameField({ value, save }: NicknameFieldProps) {
  const [current, setCurrent] = useState(value);
  const [draft, setDraft] = useState(value);
  const [unknown, setUnknown] = useState(false);

  const onSave = async () => {
    setUnknown(false);
    try { await save(draft); setCurrent(draft); }
    catch (error) { if (error instanceof UnknownOutcomeError) setUnknown(true); }
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
