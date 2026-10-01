const _05Scrub = 'import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput, NumberFieldScrubArea } from "@yanqing/ui";\n\nexport const meta = { title: "拖动调整", description: "在标签上左右拖动即可改值，适合设计、调参类界面。" };\n\nexport default function Demo() {\n  return (\n    <NumberField className="max-w-40" defaultValue={16} max={64} min={0}>\n      <NumberFieldScrubArea label="圆角（px）" />\n      <NumberFieldGroup>\n        <NumberFieldDecrement />\n        <NumberFieldInput />\n        <NumberFieldIncrement />\n      </NumberFieldGroup>\n    </NumberField>\n  );\n}\n';
export {
  _05Scrub as default
};
