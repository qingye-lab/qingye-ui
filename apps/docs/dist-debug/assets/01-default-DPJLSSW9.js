const _01Default = 'import { Field, FieldDescription, FieldLabel, Fieldset, FieldsetLegend, Input } from "@yanqing/ui";\n\nexport const meta = { title: "默认" };\n\nexport default function Demo() {\n  return (\n    <Fieldset className="max-w-sm">\n      <FieldsetLegend>发票信息</FieldsetLegend>\n      <Field>\n        <FieldLabel>发票抬头</FieldLabel>\n        <Input defaultValue="杭州言青科技有限公司" />\n      </Field>\n      <Field>\n        <FieldLabel>纳税人识别号</FieldLabel>\n        <Input className="numeric" placeholder="18 位统一社会信用代码" />\n        <FieldDescription>可在营业执照上找到。</FieldDescription>\n      </Field>\n    </Fieldset>\n  );\n}\n';
export {
  _01Default as default
};
