import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";

export default function Cover() {
  return <DateTimePicker className="w-full" defaultValue="2026-10-03T09:30" inputProps={{ "aria-label": "日期与时间" }} />;
}
