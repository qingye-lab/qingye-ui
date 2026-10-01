const _07Disabled = 'import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = { title: "禁用", description: "Field 的 disabled 同时作用于标签与控件。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs" disabled>\n      <FieldLabel>组织 ID</FieldLabel>\n      <Input defaultValue="org_7f3a92c1" />\n      <FieldDescription>创建后不可修改。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _07Disabled as default
};
