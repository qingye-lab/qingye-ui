import { Calendar } from "@yanqing/ui/components/calendar";
import { type DateRange } from "@yanqing/ui";
import { useState } from "react";

export const meta = {
  title: "范围与双月",
  description: "mode=\"range\" 选择起止日期，numberOfMonths 并排显示两个月；今天之前不可选。",
};

export default function Demo() {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
  });
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      disabled={{ before: today }}
    />
  );
}
