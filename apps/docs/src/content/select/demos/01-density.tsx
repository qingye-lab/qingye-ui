import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye/ui/components/select";

export const meta = { title: "密度", titleEn: "Density" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Select items={options} defaultValue="center">
              <SelectTrigger />
              <SelectPopup>
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
              </SelectPopup>
            </Select>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
