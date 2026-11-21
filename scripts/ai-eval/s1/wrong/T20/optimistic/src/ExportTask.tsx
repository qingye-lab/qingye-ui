import { useState } from "react";
import { Alert, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

export type ExportTaskProps = {
  status: "running" | "cancelled" | "done" | "failed";
  onCancel: () => void;
};

export function ExportTask({ status, onCancel }: ExportTaskProps) {
  const [cancelled, setCancelled] = useState(false);
  if (cancelled || status === "cancelled") return <Alert><AlertTitle>导出已取消</AlertTitle></Alert>;
  if (status === "done") return <Alert tone="success"><AlertTitle>导出已完成</AlertTitle></Alert>;
  if (status === "failed") return <Alert tone="danger"><AlertTitle>导出失败</AlertTitle></Alert>;
  return (
    <Inline gap="panel" align="center">
      <p>正在导出…</p>
      <Button
        onClick={() => {
          setCancelled(true);
          onCancel();
        }}
      >
        取消
      </Button>
    </Inline>
  );
}
