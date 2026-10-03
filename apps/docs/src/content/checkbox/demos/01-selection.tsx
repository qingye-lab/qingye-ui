import { useState } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";

export const meta = { title: "部分选中", titleEn: "Partial selection" };

export default function Demo() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  return (
    <Fieldset>
      <FieldsetLegend>选项</FieldsetLegend>
      <Field orientation="horizontal">
        <Checkbox checked={first && second} indeterminate={first !== second} onCheckedChange={(checked) => { setFirst(checked); setSecond(checked); }} />
        <FieldLabel>全选</FieldLabel>
      </Field>
      <Field orientation="horizontal"><Checkbox checked={first} onCheckedChange={setFirst} /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox checked={second} onCheckedChange={setSecond} /><FieldLabel>选项二</FieldLabel></Field>
    </Fieldset>
  );
}
