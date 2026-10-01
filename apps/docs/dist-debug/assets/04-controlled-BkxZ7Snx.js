const _04Controlled = 'import { Checkbox, Label, PasswordInput } from "@yanqing/ui";\nimport { useState } from "react";\n\nexport const meta = {\n  title: "受控",\n  description: "用 visible 与 onVisibleChange 让外部控件同步显示状态，例如同时控制两个密码框。",\n};\n\nexport default function Demo() {\n  const [visible, setVisible] = useState(false);\n  return (\n    <div className="flex w-full max-w-xs flex-col gap-3">\n      <PasswordInput aria-label="新密码" onVisibleChange={setVisible} placeholder="新密码" visible={visible} />\n      <PasswordInput aria-label="确认新密码" onVisibleChange={setVisible} placeholder="确认新密码" visible={visible} />\n      <Label>\n        <Checkbox checked={visible} onCheckedChange={setVisible} />\n        显示密码\n      </Label>\n    </div>\n  );\n}\n';
export {
  _04Controlled as default
};
