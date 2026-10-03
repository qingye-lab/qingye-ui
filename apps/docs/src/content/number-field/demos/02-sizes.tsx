import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "尺寸", titleEn: "Sizes" } satisfies DemoMeta;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    {sizes.map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><NumberField size={size} defaultValue={0}><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField></Field>)}
  </FieldGroup>;
}
