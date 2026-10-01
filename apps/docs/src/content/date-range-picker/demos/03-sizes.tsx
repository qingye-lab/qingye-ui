import { DateRangePicker } from "@yanqing/ui";

export const meta = { title: "尺寸", description: "与 Select、Input 同一套高度。" };

const range = { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <DateRangePicker aria-label="小尺寸" defaultValue={range} size="sm" />
      <DateRangePicker aria-label="默认尺寸" defaultValue={range} />
      <DateRangePicker aria-label="大尺寸" defaultValue={range} size="lg" />
    </div>
  );
}
