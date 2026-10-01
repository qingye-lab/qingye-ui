const _01Basic = 'import { Label, Radio, RadioGroup } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法" };\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-col gap-3">\n      <span id="billing" className="font-medium text-sm">计费方式</span>\n      <RadioGroup aria-labelledby="billing" defaultValue="monthly">\n        <Label><Radio value="hourly" />按量付费</Label>\n        <Label><Radio value="monthly" />包年包月</Label>\n        <Label><Radio value="spot" disabled />抢占式实例（当前地域不可用）</Label>\n      </RadioGroup>\n    </div>\n  );\n}\n';
export {
  _01Basic as default
};
