import { useId, useState } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";

export const meta = { title: "集合", titleEn: "Collection" };
const options = [{ value: "alpha", label: "甲" }, { value: "beta", label: "乙" }, { value: "gamma", label: "丙" }];

export default function Demo() {
  const id = useId(); const [value, setValue] = useState(["alpha"]);
  return <Field name="choices"><FieldTitle id={id}>可选项</FieldTitle>
    <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={options.map(option => option.value)}>
      <FieldItem><Checkbox parent /><FieldLabel>全部</FieldLabel></FieldItem>
      {options.map(option => <FieldItem key={option.value}><Checkbox value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
    </CheckboxGroup>
    <output className="text-support text-foreground" aria-live="polite">{value.length} 项</output>
  </Field>;
}
