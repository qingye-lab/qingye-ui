const a=`import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <span id="billing" className="font-medium text-sm">计费方式</span>
      <RadioGroup aria-labelledby="billing" defaultValue="monthly">
        <Label><Radio value="hourly" />按量付费</Label>
        <Label><Radio value="monthly" />包年包月</Label>
        <Label><Radio value="spot" disabled />抢占式实例（当前地域不可用）</Label>
      </RadioGroup>
    </div>
  );
}
`;export{a as default};
