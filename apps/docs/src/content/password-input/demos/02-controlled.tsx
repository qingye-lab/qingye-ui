import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";
import { useState } from "react";

export const meta = { title: "两处共用一个可见性", titleEn: "One visibility for two fields" };

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field><FieldLabel>新密码</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>
      <Field><FieldLabel>再输入一次</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>
    </Stack>
  );
}
