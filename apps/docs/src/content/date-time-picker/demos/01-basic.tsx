import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "基础用法", description: "先选日期，再在底部输入时间；值为本地时间字符串。" };

export default function Demo() {
  const [value, setValue] = useState("2026-10-12T14:30");
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <Label htmlFor="meeting-at">评审会时间</Label>
      <DateTimePicker id="meeting-at" label="评审会" value={value} onValueChange={setValue} />
      <p className="text-muted-foreground text-xs">
        value = <code className="numeric text-foreground">{value || "（空）"}</code>
      </p>
    </div>
  );
}
