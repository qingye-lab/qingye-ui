import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field disabled><FieldLabel>禁用</FieldLabel><PasswordInput defaultValue="qingye-2026" /></Field>
      <Field invalid><FieldLabel>当前密码</FieldLabel><PasswordInput autoComplete="current-password" defaultValue="qingye" /><FieldError>密码不正确</FieldError></Field>
    </Stack>
  );
}
