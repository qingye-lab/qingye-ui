import { DatePicker, Label } from "@yanqing/ui";

export const meta = { title: "基础用法", description: "触发器与 Select 同款；选中后可点末端按钮清除。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="ship-date">发货日期</Label>
      <DatePicker id="ship-date" defaultValue={new Date()} />
    </div>
  );
}
