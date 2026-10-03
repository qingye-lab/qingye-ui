import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger, type SelectSize } from "@qingye/ui/components/select";

export const meta = { title: "尺寸", titleEn: "Sizes" };

const sizes: SelectSize[] = ["xs", "sm", "md", "lg", "xl"];
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-5 items-start">
      {sizes.map(size => (
        <Field key={size}>
          <FieldLabel>{size}</FieldLabel>
          <Select items={options} defaultValue="center">
            <SelectTrigger size={size} />
            <SelectPopup>
              {options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
    </FieldGroup>
  );
}
