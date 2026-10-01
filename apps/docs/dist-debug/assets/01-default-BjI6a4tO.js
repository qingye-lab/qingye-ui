const _01Default = 'import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = { title: "默认", description: "标签、控件、说明自上而下排列。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs">\n      <FieldLabel>显示名称</FieldLabel>\n      <Input defaultValue="林晓" />\n      <FieldDescription>同事在评论与提及中看到的名字。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _01Default as default
};
