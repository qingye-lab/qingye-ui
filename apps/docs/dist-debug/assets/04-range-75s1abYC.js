const e=`import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "范围与步长", description: "到达边界时对应按钮自动禁用；Shift + ↑ ↓ 按 largeStep 调整。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>告警阈值（°C）</FieldLabel>
      <NumberField defaultValue={38} largeStep={5} max={40} min={20} step={0.5}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>机房温度超过阈值时通知值班人员，范围 20 – 40。</FieldDescription>
    </Field>
  );
}
`;export{e as default};
