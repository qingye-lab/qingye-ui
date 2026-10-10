import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";

export const meta = { title: "密码", titleEn: "Password" };

export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>新密码</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" /></Field>;
}
