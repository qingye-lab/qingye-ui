import { DateRangePicker } from "@qingye_lab/ui/components/date-range-picker";

export default function Cover() {
  return <DateRangePicker className="shrink-0" defaultValue={{ from: new Date(2026, 9, 3), to: new Date(2026, 9, 9) }} inputProps={{ "aria-label": "起始日期" }} endInputProps={{ "aria-label": "结束日期" }} />;
}
