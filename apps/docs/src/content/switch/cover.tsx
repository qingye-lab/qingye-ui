import { Field, FieldContent, FieldLabel } from "@qingye_lab/ui/components/field";
import { Switch } from "@qingye_lab/ui/components/switch";

export default function Cover() {
  return <Field orientation="horizontal">
    <Switch defaultChecked />
    <FieldContent><FieldLabel>显示网格</FieldLabel></FieldContent>
  </Field>;
}
