const _02Validation = 'import { Field, FieldError, FieldLabel, Input } from "@yanqing/ui";\n\nexport const meta = {\n  title: "校验",\n  description: "validationMode=\\"onBlur\\" 在离开输入框时校验；match 让每条文案只对应一种错误。试着留空或输入不完整的邮箱。",\n};\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs" validationMode="onBlur">\n      <FieldLabel>\n        工作邮箱 <span aria-hidden="true" className="text-destructive-foreground">*</span>\n      </FieldLabel>\n      <Input placeholder="name@company.com" required type="email" />\n      <FieldError match="valueMissing">请填写工作邮箱。</FieldError>\n      <FieldError match="typeMismatch">邮箱格式不正确，例如 lin.xiao@company.com。</FieldError>\n    </Field>\n  );\n}\n';
export {
  _02Validation as default
};
