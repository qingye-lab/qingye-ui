const _03Sizes = 'import { DateRangePicker } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "与 Select、Input 同一套高度。" };\n\nconst range = { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-3">\n      <DateRangePicker aria-label="小尺寸" defaultValue={range} size="sm" />\n      <DateRangePicker aria-label="默认尺寸" defaultValue={range} />\n      <DateRangePicker aria-label="大尺寸" defaultValue={range} size="lg" />\n    </div>\n  );\n}\n';
export {
  _03Sizes as default
};
