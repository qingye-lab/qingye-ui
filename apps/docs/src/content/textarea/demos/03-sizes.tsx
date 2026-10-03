import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Textarea } from "@qingye/ui/components/textarea";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Field key={size}>
          <FieldLabel>{size}</FieldLabel>
          <Textarea size={size} defaultValue={"第一行文字。\n第二行文字。"} />
        </Field>
      ))}
    </div>
  );
}
