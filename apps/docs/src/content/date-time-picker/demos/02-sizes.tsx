import { DateTimePicker } from "@yanqing/ui";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <DateTimePicker size="sm" aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
      <DateTimePicker aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
      <DateTimePicker size="lg" aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
    </div>
  );
}
