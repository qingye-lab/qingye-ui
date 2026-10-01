import { Label } from "@yanqing/ui/components/label";
import { Switch } from "@yanqing/ui/components/switch";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <Label>
      <Switch defaultChecked />
      夜间免打扰
    </Label>
  );
}
