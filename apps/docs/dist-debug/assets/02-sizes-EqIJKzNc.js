const _02Sizes = 'import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-40 flex-col gap-3">\n      {(["sm", "default", "lg"] as const).map((size) => (\n        <NumberField aria-label={`数量（${size}）`} defaultValue={3} key={size} size={size}>\n          <NumberFieldGroup>\n            <NumberFieldDecrement />\n            <NumberFieldInput />\n            <NumberFieldIncrement />\n          </NumberFieldGroup>\n        </NumberField>\n      ))}\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
