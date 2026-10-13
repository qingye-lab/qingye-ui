import { Calendar } from "@qingye_lab/ui/components/calendar";

export default function Cover() {
  return <Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} selected={new Date(2026, 9, 3)} />;
}
