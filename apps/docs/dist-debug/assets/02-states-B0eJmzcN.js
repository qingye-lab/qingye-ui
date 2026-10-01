const _02States = 'import { Label, Switch } from "@yanqing/ui";\n\nexport const meta = { title: "状态" };\n\nexport default function Demo() {\n  return (\n    <div className="grid grid-cols-2 gap-x-8 gap-y-3">\n      <Label><Switch />关闭</Label>\n      <Label><Switch defaultChecked />开启</Label>\n      <Label><Switch disabled />禁用</Label>\n      <Label><Switch disabled defaultChecked />禁用开启</Label>\n    </div>\n  );\n}\n';
export {
  _02States as default
};
