import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";

export type ImportPanelProps = {
  startImport: () => Promise<void>;
};

// 错解：只有文字，没有进度条
export function ImportPanel({ startImport }: ImportPanelProps) {
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const run = async () => { setStatus("running"); await startImport(); setStatus("done"); };
  return (
    <div>
      <Button onClick={run}>导入</Button>
      {status === "running" && <p>正在导入…</p>}
      {status === "done" && <p>导入完成</p>}
    </div>
  );
}
