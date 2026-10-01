import { Calendar } from "@yanqing/ui/components/calendar";
import { useState } from "react";

export const meta = { title: "多选", description: "最多选择 5 个值班日；周末不可选。" };

export default function Demo() {
  const today = new Date();
  const [days, setDays] = useState<Date[] | undefined>([]);
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        mode="multiple"
        max={5}
        selected={days}
        onSelect={setDays}
        disabled={{ dayOfWeek: [0, 6] }}
        defaultMonth={today}
      />
      <p className="text-muted-foreground text-sm numeric">已选 {days?.length ?? 0} / 5 天</p>
    </div>
  );
}
