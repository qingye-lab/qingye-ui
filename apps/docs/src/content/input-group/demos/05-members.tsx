import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupNumberField, InputGroupSelectTrigger, InputGroupText } from "@qingye_lab/ui/components/input-group";
import { NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Select, SelectItem, SelectPopup } from "@qingye_lab/ui/components/select";

export const meta = { title: "选择与数值成员", titleEn: "Select and number members" };

const currencies = [{ value: "cny", label: "人民币" }, { value: "usd", label: "美元" }, { value: "eur", label: "欧元" }];

export default function Demo() {
  return (
    <div className="grid w-full max-w-md gap-(--qy-field-group-gap)">
      <Field name="amount">
        <FieldLabel>金额</FieldLabel>
        <InputGroup>
          <Select name="currency" items={currencies} defaultValue="cny">
            <InputGroupSelectTrigger aria-label="币种" />
            <SelectPopup>{currencies.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
          </Select>
          <InputGroupInput inputMode="decimal" />
        </InputGroup>
      </Field>
      <Field>
        <FieldLabel>数量</FieldLabel>
        <InputGroup>
          <InputGroupNumberField name="quantity" defaultValue={2} min={0} max={99}>
            <NumberFieldGroup unstyled><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
          </InputGroupNumberField>
          <InputGroupAddon><InputGroupText>件</InputGroupText></InputGroupAddon>
        </InputGroup>
      </Field>
    </div>
  );
}
