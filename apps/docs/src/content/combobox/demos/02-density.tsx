import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度、只读与禁用", titleEn: "Density, read-only, and disabled" };

const items = ["机柜 A", "机柜 B", "机柜 C"];

export default function Demo() {
  return (
    <div className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <ComboboxSelect items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" />
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读候选</FieldLabel><ComboboxSelect readOnly items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" /></Field>
      <Field><FieldLabel>禁用候选</FieldLabel><ComboboxSelect disabled items={items} itemToStringLabel={item => item} defaultValue="机柜 A" emptyContent="没有匹配的机柜" /></Field>
    </div>
  );
}
