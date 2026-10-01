import { Field, FieldDescription, FieldError, FieldLabel } from "@yanqing/ui/components/field";
import { PasswordInput } from "@yanqing/ui/components/password-input";

export const meta = { title: "配合 Field", description: "标签、规则说明与校验信息。提交后未满足 minLength 时显示错误。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field>
        <FieldLabel>新密码</FieldLabel>
        <PasswordInput autoComplete="new-password" minLength={8} required />
        <FieldDescription>至少 8 位，建议包含字母与数字。</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel>确认密码</FieldLabel>
        <PasswordInput autoComplete="new-password" defaultValue="hangzhou" />
        <FieldError>两次输入的密码不一致。</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>当前密码</FieldLabel>
        <PasswordInput defaultValue="unchanged" />
      </Field>
    </div>
  );
}
