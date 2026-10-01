const _04States = 'import { Field, FieldError, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = { title: "状态", description: "无效、只读与禁用。" };\n\nexport default function Demo() {\n  return (\n    <div className="grid w-full max-w-xs gap-5">\n      <Field invalid>\n        <FieldLabel>邮箱</FieldLabel>\n        <Input defaultValue="li.na@company" type="email" />\n        <FieldError>邮箱格式不正确，例如 li.na@company.com</FieldError>\n      </Field>\n      <Field>\n        <FieldLabel>工号</FieldLabel>\n        <Input defaultValue="YQ-20481" readOnly />\n      </Field>\n      <Field disabled>\n        <FieldLabel>所属部门</FieldLabel>\n        <Input defaultValue="运维中心" />\n      </Field>\n    </div>\n  );\n}\n';
export {
  _04States as default
};
