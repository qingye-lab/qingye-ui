import { Field, FieldItem, FieldLabel } from "@qingye_lab/ui/components/field";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";

export default function Cover() {
  return <Field>
    <RadioGroup aria-label="对齐" defaultValue="center">
      {[["left", "左对齐"], ["center", "居中"], ["right", "右对齐"]].map(([value, label]) => <FieldItem key={value}><Radio value={value!} /><FieldLabel>{label}</FieldLabel></FieldItem>)}
    </RadioGroup>
  </Field>;
}
