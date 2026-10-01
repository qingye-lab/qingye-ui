const e=`import { Field, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "格式化", description: "format 接受 Intl.NumberFormat 选项：货币、百分比、单位。" };

const fields = [
  { label: "单价", defaultValue: 1280, format: { style: "currency", currency: "CNY" }, step: 10 },
  { label: "折扣", defaultValue: 0.85, format: { style: "percent" }, step: 0.05, min: 0, max: 1 },
  { label: "库容上限", defaultValue: 2400, format: { style: "unit", unit: "kilogram" }, step: 100 },
] as const;

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      {fields.map(({ label, ...props }) => (
        <Field key={label}>
          <FieldLabel>{label}</FieldLabel>
          <NumberField {...props}>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </Field>
      ))}
    </div>
  );
}
`;export{e as default};
