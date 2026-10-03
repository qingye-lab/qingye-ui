import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";

export const meta = { title: "标签档", titleEn: "Label legend" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm"><FieldsetLegend variant="label">选项</FieldsetLegend><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项一</FieldLabel></Field><Field orientation="horizontal"><Checkbox /><FieldLabel>选项二</FieldLabel></Field></Fieldset>;
}
