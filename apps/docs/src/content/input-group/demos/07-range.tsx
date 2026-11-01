import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupNumberField, InputGroupText } from "@qingye_lab/ui/components/input-group";
import { NumberFieldGroup, NumberFieldInput } from "@qingye_lab/ui/components/number-field";

export const meta = { title: "数值区间", titleEn: "Number range" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm" name="price" role="group" aria-labelledby="price-range-label">
      <FieldLabel id="price-range-label" nativeLabel={false} render={<span />}>价格</FieldLabel>
      <InputGroup>
        <InputGroupNumberField name="priceMin" defaultValue={100} min={0}>
          <NumberFieldGroup unstyled><NumberFieldInput aria-label="最低价" /></NumberFieldGroup>
        </InputGroupNumberField>
        <InputGroupAddon><InputGroupText>至</InputGroupText></InputGroupAddon>
        <InputGroupNumberField name="priceMax" defaultValue={500} min={0}>
          <NumberFieldGroup unstyled><NumberFieldInput aria-label="最高价" /></NumberFieldGroup>
        </InputGroupNumberField>
      </InputGroup>
    </Field>
  );
}
