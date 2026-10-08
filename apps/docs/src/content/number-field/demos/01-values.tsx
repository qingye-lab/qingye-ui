import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "值与范围", titleEn: "Values and bounds" } satisfies DemoMeta;
const parts = <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>数量</FieldLabel><NumberField name="quantity" defaultValue={0} min={0} max={20}>{parts}</NumberField><FieldDescription>0–20，步长 1</FieldDescription></Field>
    <Field><FieldLabel>偏移</FieldLabel><NumberField name="offset" step={0.25}>{parts}</NumberField><FieldDescription>可为空，步长 0.25</FieldDescription></Field>
    <Field invalid><FieldLabel>宽度</FieldLabel><NumberField name="width" defaultValue={12} min={0} max={10}>{parts}</NumberField><FieldError>宽度需要在 0–10 之间。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><NumberField defaultValue={8} readOnly>{parts}</NumberField></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><NumberField defaultValue={8}>{parts}</NumberField></Field>
  </FieldGroup>;
}
