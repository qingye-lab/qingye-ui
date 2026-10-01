const e=`import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>补货数量</FieldLabel>
        <NumberField defaultValue={0}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldError>补货数量至少为 1。</FieldError>
      </Field>
      <Field>
        <FieldLabel>当前库存</FieldLabel>
        <NumberField defaultValue={326} readOnly>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
      <Field disabled>
        <FieldLabel>安全库存</FieldLabel>
        <NumberField defaultValue={50}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  );
}
`;export{e as default};
