import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel } from "@qingye_lab/ui/components/field";

const options = [{ value: "alpha", label: "甲" }, { value: "beta", label: "乙" }, { value: "gamma", label: "丙" }];

export default function Cover() {
  return <Field name="choices">
    <CheckboxGroup aria-label="可选项" defaultValue={["alpha"]}>
      {options.map(option => <FieldItem key={option.value}><Checkbox value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
    </CheckboxGroup>
  </Field>;
}
