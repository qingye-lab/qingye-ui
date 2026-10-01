import { Checkbox, Label, PasswordInput } from "@yanqing/ui";
import { useState } from "react";

export const meta = {
  title: "受控",
  description: "用 visible 与 onVisibleChange 让外部控件同步显示状态，例如同时控制两个密码框。",
};

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput aria-label="新密码" onVisibleChange={setVisible} placeholder="新密码" visible={visible} />
      <PasswordInput aria-label="确认新密码" onVisibleChange={setVisible} placeholder="确认新密码" visible={visible} />
      <Label>
        <Checkbox checked={visible} onCheckedChange={setVisible} />
        显示密码
      </Label>
    </div>
  );
}
