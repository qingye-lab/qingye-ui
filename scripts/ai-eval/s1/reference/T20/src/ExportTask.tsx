import { useState } from "react";
import { Alert, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";

export type ExportTaskProps = {
  status: "running" | "cancelled" | "done" | "failed";
  onCancel: () => void;
};

// 取消请求发出不等于取消已经完成（指南：请求取消后台任务与已取消分别定义后果）。
// 本地只记“已请求”，最终文案只由 status 决定。
export function ExportTask({ status, onCancel }: ExportTaskProps) {
  const [requested, setRequested] = useState(false);
  if (status === "cancelled") return <Alert><AlertTitle>导出已取消</AlertTitle></Alert>;
  if (status === "done") return <Alert tone="success"><AlertTitle>导出已完成</AlertTitle></Alert>;
  if (status === "failed") return <Alert tone="danger"><AlertTitle>导出失败</AlertTitle></Alert>;
  return (
    <Inline gap="panel" align="center">
      <p>{requested ? "正在取消…" : "正在导出…"}</p>
      <Button
        disabled={requested}
        onClick={() => {
          setRequested(true);
          onCancel();
        }}
      >
        取消
      </Button>
    </Inline>
  );
}
