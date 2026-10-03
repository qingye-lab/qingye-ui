import { Field, FieldContent, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Field key={size} orientation="horizontal">
          <Switch size={size} />
          <FieldContent><FieldLabel>{size}</FieldLabel></FieldContent>
        </Field>
      ))}
    </div>
  );
}
