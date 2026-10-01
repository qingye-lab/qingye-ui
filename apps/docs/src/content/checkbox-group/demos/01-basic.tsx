import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <span id="notify-title" className="font-medium text-sm">接收以下事件的通知</span>
      <CheckboxGroup aria-labelledby="notify-title" defaultValue={["offline", "alarm"]}>
        <Label><Checkbox value="offline" />设备离线</Label>
        <Label><Checkbox value="alarm" />温度告警</Label>
        <Label><Checkbox value="firmware" />固件可升级</Label>
        <Label><Checkbox value="report" />每周运行报告</Label>
      </CheckboxGroup>
    </div>
  );
}
