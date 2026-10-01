const _01Basic = 'import { DateTimePicker, Label } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "基础用法", description: "先选日期，再在底部输入时间；值为本地时间字符串。" };\n\nexport default function Demo() {\n  const [value, setValue] = useState("2026-10-12T14:30");\n  return (\n    <div className="flex w-full max-w-72 flex-col gap-2">\n      <Label htmlFor="meeting-at">评审会时间</Label>\n      <DateTimePicker id="meeting-at" label="评审会" value={value} onValueChange={setValue} />\n      <p className="text-muted-foreground text-xs">\n        value = <code className="numeric text-foreground">{value || "（空）"}</code>\n      </p>\n    </div>\n  );\n}\n';
export {
  _01Basic as default
};
