import { DatePicker } from "@qingye_lab/ui/components/date-picker";

export default function Cover() {
  return <DatePicker className="w-full" defaultValue={new Date(2026, 9, 3)} inputProps={{ "aria-label": "日期" }} />;
}
