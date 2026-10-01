const _01Basic = 'import { DatePicker, Label } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法", description: "触发器与 Select 同款；选中后可点末端按钮清除。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full max-w-64 flex-col gap-2">\n      <Label htmlFor="ship-date">发货日期</Label>\n      <DatePicker id="ship-date" defaultValue={new Date()} />\n    </div>\n  );\n}\n';
export {
  _01Basic as default
};
