import { Combobox, ComboboxControl, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["机柜 A", "机柜 B", "机柜 C"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Combobox items={items} defaultValue="机柜 A">
              <ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl>
              <ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
            </Combobox>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读候选</FieldLabel><Combobox readOnly items={items} defaultValue="机柜 A"><ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl></Combobox></Field>
    </div>
  );
}
