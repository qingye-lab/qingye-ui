import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-40 flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <NumberField aria-label={`数量（${size}）`} defaultValue={3} key={size} size={size}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      ))}
    </div>
  );
}
