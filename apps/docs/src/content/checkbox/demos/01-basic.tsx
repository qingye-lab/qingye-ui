import { Checkbox, Label } from "@yanqing/ui";

export const meta = { title: "基础用法", description: "Label 包住复选框，整段文字都可点击。" };

export default function Demo() {
  return (
    <Label>
      <Checkbox defaultChecked />
      记住此设备，30 天内免登录
    </Label>
  );
}
