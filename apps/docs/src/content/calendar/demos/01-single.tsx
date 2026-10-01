import { Calendar } from "@qingye/ui/components/calendar";
import { useState } from "react";

export const meta = { title: "单选", description: "今天以小圆点标出；补位的相邻月份日期也可点选。" };

export default function Demo() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  );
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}
