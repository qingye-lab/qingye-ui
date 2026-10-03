import { useId } from "react";
import { Field, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio, type RadioSize } from "@qingye/ui/components/radio-group";

export const meta = { title: "尺寸", titleEn: "Sizes" };

const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];
const textClasses: Record<RadioSize, string> = {
  xs: "text-control-xs", sm: "text-control-sm", md: "text-control-md", lg: "text-control-lg", xl: "text-control-xl",
};
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  return (
    <FieldGroup className="grid w-full grid-cols-5 items-start">
      {sizes.map(size => (
        <Field key={size}>
          <FieldTitle id={`${id}-${size}`}>{size}</FieldTitle>
          <RadioGroup aria-labelledby={`${id}-${size}`} defaultValue="center">
            {options.map(option => (
              <FieldItem key={option.value}>
                <Radio value={option.value} size={size} />
                <FieldLabel className={textClasses[size]}>{option.label}</FieldLabel>
              </FieldItem>
            ))}
          </RadioGroup>
        </Field>
      ))}
    </FieldGroup>
  );
}
