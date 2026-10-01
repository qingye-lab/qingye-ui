const _03WithLabel = 'import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = { title: "配合标签", description: "放在 Field 中，标签、说明与输入框自动关联。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs">\n      <FieldLabel>\n        联系电话 <span className="text-destructive-foreground">*</span>\n      </FieldLabel>\n      <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" required type="tel" />\n      <FieldDescription>仅用于工单进度通知。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _03WithLabel as default
};
