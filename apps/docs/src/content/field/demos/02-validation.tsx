import { Field, FieldError, FieldLabel, Input } from "@yanqing/ui";

export const meta = {
  title: "校验",
  description: "validationMode=\"onBlur\" 在离开输入框时校验；match 让每条文案只对应一种错误。试着留空或输入不完整的邮箱。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-xs" validationMode="onBlur">
      <FieldLabel>
        工作邮箱 <span aria-hidden="true" className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input placeholder="name@company.com" required type="email" />
      <FieldError match="valueMissing">请填写工作邮箱。</FieldError>
      <FieldError match="typeMismatch">邮箱格式不正确，例如 lin.xiao@company.com。</FieldError>
    </Field>
  );
}
