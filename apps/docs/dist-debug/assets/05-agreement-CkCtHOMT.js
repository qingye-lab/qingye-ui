const _05Agreement = 'import { Button, Checkbox, Label } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "组合：提交前确认", description: "未勾选时禁用提交按钮。" };\n\nexport default function Demo() {\n  const [agreed, setAgreed] = useState(false);\n  return (\n    <div className="flex w-full max-w-sm flex-col gap-4">\n      <Label className="items-start font-normal leading-5">\n        <Checkbox checked={agreed} onCheckedChange={setAgreed} className="mt-0.5" />\n        <span>\n          我已阅读并同意<a className="font-medium underline underline-offset-2" href="#terms">《数据处理协议》</a>，并确认上传的设备数据不含个人敏感信息。\n        </span>\n      </Label>\n      <Button disabled={!agreed} className="self-start">开始导入</Button>\n    </div>\n  );\n}\n';
export {
  _05Agreement as default
};
