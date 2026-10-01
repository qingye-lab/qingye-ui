const _01Basic = 'import { Field, FieldLabel, Slider, SliderValue } from "@yanqing/ui";\n\nexport const meta = { title: "标签与数值", description: "Field 提供标签，SliderValue 显示当前值。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-sm">\n      <Slider defaultValue={68} format={{ style: "unit", unit: "percent" }}>\n        <div className="mb-3 flex items-center justify-between gap-2">\n          <FieldLabel>屏幕亮度</FieldLabel>\n          <SliderValue className="text-muted-foreground numeric" />\n        </div>\n      </Slider>\n    </Field>\n  );\n}\n';
export {
  _01Basic as default
};
