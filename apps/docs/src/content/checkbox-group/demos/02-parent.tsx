import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "全选与半选", description: "父复选框根据子项自动显示全选、半选或未选。" };

const permissions = [
  { value: "read", label: "查看设备" },
  { value: "control", label: "远程控制" },
  { value: "ota", label: "固件升级" },
  { value: "delete", label: "删除设备" },
];

export default function Demo() {
  const [value, setValue] = useState(["read", "control"]);
  return (
    <CheckboxGroup
      aria-label="运维角色权限"
      value={value}
      onValueChange={setValue}
      allValues={permissions.map((item) => item.value)}
    >
      <Label><Checkbox parent />运维角色 · 全部权限</Label>
      <div className="flex flex-col gap-3 ps-6">
        {permissions.map((item) => (
          <Label key={item.value}><Checkbox value={item.value} />{item.label}</Label>
        ))}
      </div>
    </CheckboxGroup>
  );
}
