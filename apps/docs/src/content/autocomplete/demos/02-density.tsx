import { Autocomplete, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Autocomplete items={items} defaultValue="3 号楼东侧">
              <AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl>
              <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>
            </Autocomplete>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="3 号楼东侧"><AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl></Autocomplete></Field>
    </div>
  );
}
