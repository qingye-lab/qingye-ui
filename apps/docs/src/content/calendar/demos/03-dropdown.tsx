import { useState } from "react";
import { Calendar, formatLocalDate } from "@qingye_lab/ui/components/calendar";
export const meta = { title: "年月下拉", titleEn: "Year and month dropdowns" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(1994, 4, 18));
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="single" selected={value} onSelect={setValue} defaultMonth={new Date(1994, 4, 1)} captionLayout="dropdown" startMonth={new Date(1920, 0)} endMonth={new Date(2026, 11)} /><output className="text-support text-muted-foreground">{value ? formatLocalDate(value) : "—"}</output></div>;
}
