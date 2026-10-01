import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "状态" };

export default function Demo() {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
      <Label><Checkbox />未选</Label>
      <Label><Checkbox defaultChecked />已选</Label>
      <Label><Checkbox indeterminate />半选</Label>
      <Label><Checkbox disabled />禁用</Label>
      <Label><Checkbox disabled defaultChecked />禁用已选</Label>
      <Label><Checkbox aria-invalid />错误</Label>
    </div>
  );
}
