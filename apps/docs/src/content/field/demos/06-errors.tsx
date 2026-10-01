import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "表单库错误",
  description: "errors 接收 react-hook-form、TanStack Form 等给出的错误数组：自动去重，多条时显示为列表。",
};

function check(value: string) {
  return [
    value.length < 8 ? { message: "至少 8 位" } : undefined,
    /\d/.test(value) ? undefined : { message: "至少包含 1 个数字" },
    /[A-Za-z]/.test(value) ? undefined : { message: "至少包含 1 个字母" },
  ].filter(Boolean);
}

export default function Demo() {
  const [value, setValue] = useState("2026");
  const errors = check(value);
  return (
    <Field className="w-full max-w-xs" invalid={errors.length > 0}>
      <FieldLabel>设备管理密码</FieldLabel>
      <Input onChange={(event) => setValue(event.target.value)} value={value} />
      <FieldError errors={errors} />
    </Field>
  );
}
