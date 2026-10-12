import { useEffect, useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form, focusFirstInvalid } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";

export const meta = { title: "失败后落焦点", titleEn: "Focus after a failed submit" };
const roles = [{ value: "admin", label: "管理员" }, { value: "member", label: "成员" }];
type Errors = Partial<Record<"name" | "role" | "agree", string>>;
export default function Demo() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  // 校验结果是应用的事实：先让 aria-invalid 渲染出来，再落焦点。
  useEffect(() => { if (attempt > 0 && form.current) focusFirstInvalid(form.current); }, [attempt]);
  return <Form ref={form} noValidate className="w-full max-w-sm" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setErrors({ ...(String(data.get("name") ?? "").trim() ? null : { name: "请填写名称" }), ...(data.get("role") ? null : { role: "请选择角色" }), ...(data.get("agree") ? null : { agree: "需要先阅读并同意" }) });
    setAttempt(count => count + 1);
  }}><Stack gap="fields">
    <Field name="name" invalid={!!errors.name}><FieldLabel>名称</FieldLabel><Input />{errors.name && <FieldError>{errors.name}</FieldError>}</Field>
    <Field name="role" invalid={!!errors.role}><FieldLabel>角色</FieldLabel><Select items={roles}><SelectTrigger><SelectValue /></SelectTrigger><SelectPopup>{roles.map(role => <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>)}</SelectPopup></Select>{errors.role && <FieldError>{errors.role}</FieldError>}</Field>
    <Field name="agree" invalid={!!errors.agree} orientation="horizontal"><Checkbox value="yes" /><FieldContent><FieldLabel>同意使用条款</FieldLabel>{errors.agree && <FieldError>{errors.agree}</FieldError>}</FieldContent></Field>
    <Button type="submit">提交</Button>
  </Stack></Form>;
}
