import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";

export default function Cover() {
  return <Stack gap="field">
    <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项一</FieldLabel></Field>
    <Field orientation="horizontal"><Checkbox /><FieldLabel>选项二</FieldLabel></Field>
  </Stack>;
}
