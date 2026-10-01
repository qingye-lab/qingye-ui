const _03Field = 'import { Field, FieldDescription, FieldLabel, Textarea } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "配合标签与字数", description: "放在 Field 中，并用 maxLength 提示剩余字数。" };\n\nexport default function Demo() {\n  const max = 200;\n  const [value, setValue] = useState("");\n  return (\n    <Field className="w-full max-w-sm">\n      <FieldLabel>问题描述</FieldLabel>\n      <Textarea\n        maxLength={max}\n        onChange={(event) => setValue(event.target.value)}\n        placeholder="请描述故障现象、出现时间和影响范围"\n        value={value}\n      />\n      <FieldDescription aria-live="polite" className="numeric self-end">\n        {value.length} / {max}\n      </FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _03Field as default
};
