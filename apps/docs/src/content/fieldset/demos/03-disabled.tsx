import { Field, FieldLabel, Fieldset, FieldsetLegend, Input } from "@yanqing/ui";

export const meta = { title: "禁用", description: "disabled 作用于组内所有表单项，例如审核期间锁定资料。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm" disabled>
      <FieldsetLegend>开户资料（审核中）</FieldsetLegend>
      <Field>
        <FieldLabel>开户银行</FieldLabel>
        <Input defaultValue="招商银行杭州分行" />
      </Field>
      <Field>
        <FieldLabel>银行账号</FieldLabel>
        <Input className="numeric" defaultValue="5719 0012 3456 789" />
      </Field>
    </Fieldset>
  );
}
