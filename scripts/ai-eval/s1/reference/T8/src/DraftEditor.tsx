import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export class ConflictError extends Error {}

export type DraftEditorProps = {
  initial: string;
  save: (text: string, options?: { force?: boolean }) => Promise<void>;
  reload: () => Promise<string>;
};

// 需要决策的失败留在工作面（指南 toast.md：字段错误、不可逆后果和需决策的失败留在工作面或确认结构）
export function DraftEditor({ initial, save, reload }: DraftEditorProps) {
  const [text, setText] = useState(initial);
  const [conflict, setConflict] = useState(false);

  async function submit(force?: boolean) {
    try {
      await (force ? save(text, { force: true }) : save(text));
      setConflict(false);
    } catch (error) {
      if (error instanceof ConflictError) setConflict(true);
    }
  }

  async function doReload() {
    setText(await reload());
    setConflict(false);
  }

  return (
    <Stack gap="panel">
      <Field>
        <FieldLabel>草稿</FieldLabel>
        <Textarea value={text} onValueChange={setText} />
      </Field>
      {conflict && (
        <Alert tone="warning" role="alert">
          <AlertTitle>保存冲突</AlertTitle>
          <AlertDescription>服务器上的草稿已被他人修改。</AlertDescription>
          <Inline gap="actions">
            <Button variant="bordered" onClick={() => submit(true)}>覆盖保存</Button>
            <Button variant="bordered" onClick={doReload}>重新载入</Button>
          </Inline>
        </Alert>
      )}
      <Inline><Button onClick={() => submit()}>保存</Button></Inline>
    </Stack>
  );
}
