import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from "@qingye_lab/ui/components/progress";

export type ImportPanelProps = {
  startImport: () => Promise<void>;
};

// 服务端不报告进度：value={null}（不定进度），不用时间推断（progress.md）
export function ImportPanel({ startImport }: ImportPanelProps) {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const run = async () => {
    setStatus("running");
    await startImport();
    setStatus("done");
  };
  return (
    <Stack>
      <Button disabled={status === "running"} onClick={run}>导入</Button>
      {status === "running" && (
        <Progress value={null}>
          <ProgressLabel>导入进度</ProgressLabel>
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      )}
      {status === "done" && <p>导入完成</p>}
    </Stack>
  );
}
