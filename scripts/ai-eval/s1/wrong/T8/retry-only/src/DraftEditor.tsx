import { useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export class ConflictError extends Error {}

export type DraftEditorProps = {
  initial: string;
  save: (text: string, options?: { force?: boolean }) => Promise<void>;
  reload: () => Promise<string>;
};

// 只说明冲突并提供“重试”，没有两项决定
export function DraftEditor({ initial, save }: DraftEditorProps) {
  const [text, setText] = useState(initial);
  const [conflict, setConflict] = useState(false);

  async function submit() {
    try {
      await save(text);
      setConflict(false);
    } catch (error) {
      if (error instanceof ConflictError) setConflict(true);
    }
  }

  return (
    <Stack gap="panel">
      <Field>
        <FieldLabel>草稿</FieldLabel>
        <Textarea value={text} onValueChange={setText} />
      </Field>
      {conflict && (
        <Alert tone="warning" role="alert">
          <AlertDescription>服务器上的草稿已被他人修改。</AlertDescription>
          <Button variant="bordered" onClick={submit}>重试</Button>
        </Alert>
      )}
      <Button onClick={submit}>保存</Button>
    </Stack>
  );
}
