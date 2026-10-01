import { Calendar } from "@qingye/ui/components/calendar";
import { useState } from "react";

export const meta = {
  title: "年月下拉",
  description: "captionLayout=\"dropdown\" 适合跨度大的日期，例如出生日期。",
};

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date(1994, 5, 18));
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      startMonth={new Date(1950, 0)}
      endMonth={new Date()}
      defaultMonth={new Date(1994, 5)}
      selected={date}
      onSelect={setDate}
    />
  );
}
