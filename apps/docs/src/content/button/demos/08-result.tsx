import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { IconAlertCircle } from "@tabler/icons-react";
import * as React from "react";

export const meta = { title: "结果由提示组件表达", titleEn: "Results belong to feedback components" };

// 按钮只有忙碌一种状态；失败是另一件事实，写在就地说明里，按钮回到可用。
export default function Demo() {
  const [phase, setPhase] = React.useState<"idle" | "saving" | "failed">("idle");
  const timer = React.useRef<number | undefined>(undefined);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  const save = () => { setPhase("saving"); timer.current = window.setTimeout(() => setPhase("failed"), 900); };
  return (
    <Stack gap="fields" className="w-full max-w-md">
      {phase === "failed" && (
        <Alert tone="danger">
          <IconAlertCircle aria-hidden="true" />
          <div className="grid gap-1"><AlertTitle>保存未完成</AlertTitle><AlertDescription>连接中断，填写的内容仍在。</AlertDescription></div>
        </Alert>
      )}
      <div><Button loading={phase === "saving"} onClick={save}>保存</Button></div>
    </Stack>
  );
}
