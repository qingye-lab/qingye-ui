import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
export const meta = { title: "错误列表", titleEn: "Error list" };
export default function Demo() {
  const [value, setValue] = useState("2026");
  const errors = [value.length < 8 ? {message: "至少 8 位"} : undefined, /\d/.test(value) ? undefined : {message: "至少包含 1 个数字"}, /[A-Za-z]/.test(value) ? undefined : {message: "至少包含 1 个字母"}];
  return <Field className="w-full max-w-xs" invalid={errors.some(Boolean)}><FieldLabel>设备管理密码</FieldLabel><Input value={value} onValueChange={setValue} /><FieldError errors={errors} /></Field>;
}
