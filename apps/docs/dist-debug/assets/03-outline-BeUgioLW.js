const _03Outline = 'import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@yanqing/ui";\n\nexport const meta = { title: "描边", description: "outline 把子项拼成一个整体，可用分隔线区分。" };\n\nexport default function Demo() {\n  return (\n    <ToggleGroup defaultValue={["week"]} variant="outline">\n      <ToggleGroupItem value="day">日</ToggleGroupItem>\n      <ToggleGroupSeparator />\n      <ToggleGroupItem value="week">周</ToggleGroupItem>\n      <ToggleGroupSeparator />\n      <ToggleGroupItem value="month">月</ToggleGroupItem>\n      <ToggleGroupSeparator />\n      <ToggleGroupItem value="quarter">季度</ToggleGroupItem>\n    </ToggleGroup>\n  );\n}\n';
export {
  _03Outline as default
};
