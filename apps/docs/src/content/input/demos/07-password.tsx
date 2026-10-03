import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "密码", titleEn: "Password" };

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return <Field className="w-full max-w-sm"><FieldLabel>新密码</FieldLabel><Input type="password" autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>;
}
