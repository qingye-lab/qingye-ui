const _06CharacterCount = 'import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = { title: "字数提示", description: "用 maxLength 限制长度，并在说明里实时显示剩余字数。" };\n\nexport default function Demo() {\n  const max = 20;\n  const [value, setValue] = useState("杭州滨江仓");\n  return (\n    <Field className="w-full max-w-xs">\n      <FieldLabel>仓库简称</FieldLabel>\n      <Input maxLength={max} onChange={(event) => setValue(event.target.value)} value={value} />\n      <FieldDescription aria-live="polite" className="numeric">\n        还可输入 {max - value.length} 个字\n      </FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _06CharacterCount as default
};
