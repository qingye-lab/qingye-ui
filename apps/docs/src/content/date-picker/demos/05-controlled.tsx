import { Button } from "@qingye/ui/components/button";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "受控与快捷日期", description: "外部按钮直接写入值，日历打开时定位到对应月份。" };

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export default function Demo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="follow-up">下次回访</Label>
      <DatePicker id="follow-up" value={date} onValueChange={setDate} disabledDates={{ before: new Date() }} />
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(1))}>明天</Button>
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(7))}>一周后</Button>
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(30))}>30 天后</Button>
      </div>
    </div>
  );
}
