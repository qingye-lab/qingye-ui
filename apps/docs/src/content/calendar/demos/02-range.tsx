import { useState } from "react";
import { Calendar, formatLocalDate, type CalendarDateRange } from "@qingye_lab/ui/components/calendar";
export const meta = { title: "范围与禁用日期", titleEn: "Range and disabled dates" };
export default function Demo() {
  const [value, setValue] = useState<CalendarDateRange | undefined>({ from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) });
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="range" selected={value} onSelect={setValue} min={1} excludeDisabled disabled={new Date(2026, 9, 8)} defaultMonth={new Date(2026, 9, 1)} /><output className="text-support text-muted-foreground">{value?.from ? formatLocalDate(value.from) : "—"} / {value?.to ? formatLocalDate(value.to) : "—"}</output></div>;
}
