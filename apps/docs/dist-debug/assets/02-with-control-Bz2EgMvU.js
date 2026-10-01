const _02WithControl = 'import { Checkbox, Label, Switch } from "@yanqing/ui";\n\nexport const meta = { title: "包裹控件", description: "包裹复选框或开关时，文字也是点击区域。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-col gap-3">\n      <Label>\n        <Checkbox defaultChecked />\n        记住此设备 30 天\n      </Label>\n      <Label>\n        <Switch />\n        接收夜间告警\n      </Label>\n    </div>\n  );\n}\n';
export {
  _02WithControl as default
};
