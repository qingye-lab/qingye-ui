const _03Disabled = 'import { Field, FieldLabel, Fieldset, FieldsetLegend, Input } from "@yanqing/ui";\n\nexport const meta = { title: "禁用", description: "disabled 作用于组内所有表单项，例如审核期间锁定资料。" };\n\nexport default function Demo() {\n  return (\n    <Fieldset className="max-w-sm" disabled>\n      <FieldsetLegend>开户资料（审核中）</FieldsetLegend>\n      <Field>\n        <FieldLabel>开户银行</FieldLabel>\n        <Input defaultValue="招商银行杭州分行" />\n      </Field>\n      <Field>\n        <FieldLabel>银行账号</FieldLabel>\n        <Input className="numeric" defaultValue="5719 0012 3456 789" />\n      </Field>\n    </Fieldset>\n  );\n}\n';
export {
  _03Disabled as default
};
