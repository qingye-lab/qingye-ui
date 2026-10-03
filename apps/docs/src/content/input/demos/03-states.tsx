import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段状态", titleEn: "Field states" };

export default function Demo() {
  return <div className="grid w-full max-w-xs gap-(--qy-field-group-gap)"><Field invalid><FieldLabel>邮箱</FieldLabel><Input defaultValue="li.na@" type="email" /><FieldError>邮箱地址不完整。</FieldError></Field><Field><FieldLabel>工号</FieldLabel><Input defaultValue="QY-20481" readOnly /></Field><Field disabled><FieldLabel>所属部门</FieldLabel><Input defaultValue="运维中心" /></Field></div>;
}
