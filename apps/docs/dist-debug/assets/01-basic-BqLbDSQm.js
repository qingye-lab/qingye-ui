const _01Basic = 'import { Checkbox, CheckboxGroup, Label } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-col gap-3">\n      <span id="notify-title" className="font-medium text-sm">接收以下事件的通知</span>\n      <CheckboxGroup aria-labelledby="notify-title" defaultValue={["offline", "alarm"]}>\n        <Label><Checkbox value="offline" />设备离线</Label>\n        <Label><Checkbox value="alarm" />温度告警</Label>\n        <Label><Checkbox value="firmware" />固件可升级</Label>\n        <Label><Checkbox value="report" />每周运行报告</Label>\n      </CheckboxGroup>\n    </div>\n  );\n}\n';
export {
  _01Basic as default
};
