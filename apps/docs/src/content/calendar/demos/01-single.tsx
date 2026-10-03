import { useState } from "react";
import { Calendar, formatLocalDate } from "@qingye/ui/components/calendar";
export const meta = { title: "单日", titleEn: "Single day" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="single" selected={value} onSelect={setValue} defaultMonth={new Date(2026, 9, 1)} /><output className="text-support text-muted-foreground">{value ? formatLocalDate(value) : "—"}</output></div>;
}
