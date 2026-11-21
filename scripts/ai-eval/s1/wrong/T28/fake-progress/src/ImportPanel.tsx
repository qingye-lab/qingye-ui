import { useEffect, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from "@qingye_lab/ui/components/progress";

export type ImportPanelProps = {
  startImport: () => Promise<void>;
};

// 错解：fake-progress
export function ImportPanel({ startImport }: ImportPanelProps) {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(() => setPct(p => Math.min(90, p + 3)), 1000);
    return () => clearInterval(id);
  }, [status]);
  const run = async () => { setPct(0); setStatus("running"); await startImport(); setStatus("done"); };
  return (
    <div>
      <Button onClick={run}>导入</Button>
      {status === "running" && (
        <Progress value={pct}>
          <ProgressLabel>导入进度</ProgressLabel>
          <ProgressTrack><ProgressIndicator /></ProgressTrack>
        </Progress>
      )}
      {status === "done" && <p>导入完成</p>}
    </div>
  );
}
