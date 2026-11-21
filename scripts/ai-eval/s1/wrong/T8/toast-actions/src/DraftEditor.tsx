import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { ToastProvider, toastManager } from "@qingye_lab/ui/components/toast";

export class ConflictError extends Error {}

export type DraftEditorProps = {
  initial: string;
  save: (text: string, options?: { force?: boolean }) => Promise<void>;
  reload: () => Promise<string>;
};

// DN 自然解：冲突用带动作的 Toast 呈现
export function DraftEditor({ initial, save, reload }: DraftEditorProps) {
  const [text, setText] = useState(initial);

  async function submit(value: string, force?: boolean) {
    try {
      await (force ? save(value, { force: true }) : save(value));
    } catch (error) {
      if (error instanceof ConflictError) {
        toastManager.add({
          type: "warning",
          priority: "high",
          title: "服务器上的草稿已被他人修改",
          description: (
            <span>
              <Button size="sm" onClick={() => void submit(value, true)}>覆盖保存</Button>
              <Button size="sm" onClick={async () => setText(await reload())}>重新载入</Button>
            </span>
          ),
        });
      }
    }
  }

  return (
    <ToastProvider>
      <Stack gap="panel">
        <Field>
          <FieldLabel>草稿</FieldLabel>
          <Textarea value={text} onValueChange={setText} />
        </Field>
        <Button onClick={() => submit(text)}>保存</Button>
      </Stack>
    </ToastProvider>
  );
}
