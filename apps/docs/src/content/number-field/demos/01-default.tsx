import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "默认", description: "点击按钮、按 ↑ ↓ 或直接输入。" };

export default function Demo() {
  return (
    <NumberField aria-label="采购数量" className="max-w-40" defaultValue={12} min={1}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
