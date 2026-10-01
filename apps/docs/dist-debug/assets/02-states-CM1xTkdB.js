const e=`import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "状态" };

export default function Demo() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
      <Label><Switch />关闭</Label>
      <Label><Switch defaultChecked />开启</Label>
      <Label><Switch disabled />禁用</Label>
      <Label><Switch disabled defaultChecked />禁用开启</Label>
    </div>
  );
}
`;export{e as default};
