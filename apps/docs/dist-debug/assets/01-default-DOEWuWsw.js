const _01Default = 'import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@yanqing/ui";\n\nexport const meta = { title: "默认", description: "点击按钮、按 ↑ ↓ 或直接输入。" };\n\nexport default function Demo() {\n  return (\n    <NumberField aria-label="采购数量" className="max-w-40" defaultValue={12} min={1}>\n      <NumberFieldGroup>\n        <NumberFieldDecrement />\n        <NumberFieldInput />\n        <NumberFieldIncrement />\n      </NumberFieldGroup>\n    </NumberField>\n  );\n}\n';
export {
  _01Default as default
};
