const _02Sizes = 'import { DatePicker } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "sm / default / lg，与同尺寸的 Input、Select 等高。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-64 flex-col gap-3">\n      <DatePicker size="sm" aria-label="开始日期" placeholder="小尺寸" />\n      <DatePicker aria-label="开始日期" placeholder="默认尺寸" />\n      <DatePicker size="lg" aria-label="开始日期" placeholder="大尺寸" />\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
