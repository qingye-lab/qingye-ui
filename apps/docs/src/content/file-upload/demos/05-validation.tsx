import type { FileRejection } from "@yanqing/ui/components/file-upload";
import { FileUpload } from "@yanqing/ui/components/file-upload";
import { useState } from "react";

export const meta = {
  title: "数量与大小限制",
  description: "最多 3 个文件、单个 2 MB。拖入超出的文件试试，被拒绝的文件会逐条列出原因。",
};

export default function Demo() {
  const [rejected, setRejected] = useState<FileRejection[]>([]);
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <FileUpload
        maxFiles={3}
        maxSize={2 * 1024 * 1024}
        accept=".csv,.xlsx"
        label="导入设备台账"
        description="CSV 或 Excel，最多 3 个，单个不超过 2 MB"
        onReject={setRejected}
      />
      <p className="text-muted-foreground text-xs numeric">本次拒绝 {rejected.length} 个文件</p>
    </div>
  );
}
