import { useId, useState } from "react";
import { Field, FieldGroup, FieldTitle } from "@qingye/ui/components/field";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";

export const meta = { title: "单选与多选", titleEn: "Single and multiple" };
export default function Demo() {
  const id = useId(); const [single, setSingle] = useState(["alpha"]); const [multiple, setMultiple] = useState(["alpha"]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Field><FieldTitle id={`${id}-single`}>单选按压</FieldTitle><ToggleGroup aria-labelledby={`${id}-single`} value={single} onValueChange={setSingle}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{single.length} 项</output></Field>
    <Field><FieldTitle id={`${id}-multiple`}>多选按压</FieldTitle><ToggleGroup multiple aria-labelledby={`${id}-multiple`} value={multiple} onValueChange={setMultiple}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{multiple.length} 项</output></Field>
  </FieldGroup>;
}
