const _01Basic = 'import { DateRangePicker, Field, FieldLabel } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法", description: "第一次点击定起点，第二次点击定终点；桌面端并排显示两个月。" };\n\nexport default function Demo() {\n  return (\n    <Field className="w-full max-w-xs">\n      <FieldLabel>入住日期</FieldLabel>\n      <DateRangePicker\n        defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 15) }}\n        disabledDates={{ before: new Date(2026, 9, 1) }}\n        endName="checkOut"\n        startName="checkIn"\n      />\n    </Field>\n  );\n}\n';
export {
  _01Basic as default
};
