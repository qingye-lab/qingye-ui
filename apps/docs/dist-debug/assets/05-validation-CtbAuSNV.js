const _05Validation = 'import { FileUpload, type FileRejection } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "数量与大小限制",\n  description: "最多 3 个文件、单个 2 MB。拖入超出的文件试试，被拒绝的文件会逐条列出原因。",\n};\n\nexport default function Demo() {\n  const [rejected, setRejected] = useState<FileRejection[]>([]);\n  return (\n    <div className="flex w-full max-w-md flex-col gap-2">\n      <FileUpload\n        maxFiles={3}\n        maxSize={2 * 1024 * 1024}\n        accept=".csv,.xlsx"\n        label="导入设备台账"\n        description="CSV 或 Excel，最多 3 个，单个不超过 2 MB"\n        onReject={setRejected}\n      />\n      <p className="text-muted-foreground text-xs numeric">本次拒绝 {rejected.length} 个文件</p>\n    </div>\n  );\n}\n';
export {
  _05Validation as default
};
