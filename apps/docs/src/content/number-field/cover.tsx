import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";

export default function Cover() {
  return <NumberField defaultValue={12} min={0} max={20} className="w-full">
    <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput aria-label="数量" /><NumberFieldIncrement /></NumberFieldGroup>
  </NumberField>;
}
