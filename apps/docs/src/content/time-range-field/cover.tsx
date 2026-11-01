import { TimeRangeField } from "@qingye_lab/ui/components/time-range-field";

export default function Cover() {
  return <TimeRangeField defaultValue={{ start: "09:00", end: "18:30" }} aria-label="营业时间" />;
}
