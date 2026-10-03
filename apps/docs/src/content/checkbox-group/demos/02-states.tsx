import { useId } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-disabled`}>禁用集合</FieldTitle><CheckboxGroup disabled defaultValue={["alpha"]} aria-labelledby={`${id}-disabled`}><FieldItem><Checkbox value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field><FieldTitle id={`${id}-readonly`}>只读项</FieldTitle><CheckboxGroup defaultValue={["alpha"]} aria-labelledby={`${id}-readonly`}><FieldItem><Checkbox readOnly value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field invalid><FieldTitle id={`${id}-invalid`}>受限范围</FieldTitle><CheckboxGroup aria-labelledby={`${id}-invalid`}><FieldItem><Checkbox value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup><FieldError>至少选择一项</FieldError></Field>
  </FieldGroup>;
}
