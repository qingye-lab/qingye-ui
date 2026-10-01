import { Checkbox } from "@yanqing/ui/components/checkbox";
import { Label } from "@yanqing/ui/components/label";
import { Switch } from "@yanqing/ui/components/switch";

export const meta = { title: "包裹控件", description: "包裹复选框或开关时，文字也是点击区域。" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox defaultChecked />
        记住此设备 30 天
      </Label>
      <Label>
        <Switch />
        接收夜间告警
      </Label>
    </div>
  );
}
