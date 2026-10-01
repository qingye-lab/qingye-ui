import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "关联输入框", description: "htmlFor 指向控件 id，点击标签即可聚焦。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="label-project">项目名称</Label>
      <Input id="label-project" placeholder="例如：滨江仓储改造" />
    </div>
  );
}
