import { DateTimeRangePicker } from "@qingye_lab/ui/components/date-time-range-picker";

export default function Cover() {
  return <DateTimeRangePicker className="shrink-0" defaultValue={{ from: "2026-10-03T09:30", to: "2026-10-05T17:00" }} inputProps={{ "aria-label": "开始" }} endInputProps={{ "aria-label": "结束" }} />;
}
