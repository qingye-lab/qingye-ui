import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldGroup, NumberFieldInput, NumberFieldScrubArea } from "@qingye_lab/ui/components/number-field";

export const meta = { title: "拖动调值", titleEn: "Scrub to adjust" };

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-(--qy-field-group-gap) sm:grid-cols-3">
      {([["可用", {}], ["只读", { readOnly: true }], ["禁用", { disabled: true }]] as const).map(([name, state]) => (
        <NumberField key={name} defaultValue={12} min={0} max={100} {...state}>
          <Field>
            <NumberFieldScrubArea><FieldLabel>{`间距（${name}）`}</FieldLabel></NumberFieldScrubArea>
            <NumberFieldGroup><NumberFieldInput /></NumberFieldGroup>
          </Field>
        </NumberField>
      ))}
    </div>
  );
}
