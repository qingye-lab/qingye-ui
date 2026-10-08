import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Checkbox /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项二</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox readOnly defaultChecked /><FieldLabel>只读</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox disabled /><FieldLabel>禁用</FieldLabel></Field>
      <Field orientation="horizontal" invalid><Checkbox /><FieldContent><FieldLabel>必选项</FieldLabel><FieldError>请选择此项。</FieldError></FieldContent></Field>
    </div>
  );
}
