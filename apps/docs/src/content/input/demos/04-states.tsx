import { Field, FieldError, FieldLabel } from "@yanqing/ui/components/field";
import { Input } from "@yanqing/ui/components/input";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>邮箱</FieldLabel>
        <Input defaultValue="li.na@company" type="email" />
        <FieldError>邮箱格式不正确，例如 li.na@company.com</FieldError>
      </Field>
      <Field>
        <FieldLabel>工号</FieldLabel>
        <Input defaultValue="YQ-20481" readOnly />
      </Field>
      <Field disabled>
        <FieldLabel>所属部门</FieldLabel>
        <Input defaultValue="运维中心" />
      </Field>
    </div>
  );
}
