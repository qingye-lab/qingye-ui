import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "横向组合", titleEn: "Horizontal composition" };

export default function Demo() {
  return <Field orientation="horizontal" className="w-full max-w-md"><Checkbox defaultChecked /><FieldContent><FieldLabel>附加备注</FieldLabel><FieldDescription>可选。</FieldDescription></FieldContent></Field>;
}
