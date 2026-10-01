import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput, NumberFieldScrubArea } from "@qingye/ui/components/number-field";

export const meta = { title: "拖动调整", description: "在标签上左右拖动即可改值，适合设计、调参类界面。" };

export default function Demo() {
  return (
    <NumberField className="max-w-40" defaultValue={16} max={64} min={0}>
      <NumberFieldScrubArea label="圆角（px）" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
