const _02States = 'import { Checkbox, Label } from "@yanqing/ui";\n\nexport const meta = { title: "状态" };\n\nexport default function Demo() {\n  return (\n    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">\n      <Label><Checkbox />未选</Label>\n      <Label><Checkbox defaultChecked />已选</Label>\n      <Label><Checkbox indeterminate />半选</Label>\n      <Label><Checkbox disabled />禁用</Label>\n      <Label><Checkbox disabled defaultChecked />禁用已选</Label>\n      <Label><Checkbox aria-invalid />错误</Label>\n    </div>\n  );\n}\n';
export {
  _02States as default
};
