const _03Validation = 'import { Field, FieldDescription, FieldLabel, TagInput } from "@yanqing/ui";\n\nexport const meta = {\n  title: "校验与上限",\n  description: "validate 返回文案即拒绝该标签，输入保留以便修改；max 限制数量。",\n};\n\nconst emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-md">\n      <FieldLabel>抄送成员</FieldLabel>\n      <TagInput\n        defaultValue={["lin.yue@qingyun.design"]}\n        max={5}\n        name="cc"\n        placeholder="输入邮箱，以逗号分隔"\n        validate={(tag) => (emailPattern.test(tag) ? null : `“${tag}”不是有效的邮箱地址`)}\n      />\n      <FieldDescription>最多 5 人。试试输入一个不完整的地址。</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _03Validation as default
};
