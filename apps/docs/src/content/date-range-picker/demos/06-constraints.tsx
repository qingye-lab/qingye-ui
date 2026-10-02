import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "受限范围" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="analysis-window">分析窗口</Label>
      <DateRangePicker
        aria-describedby="analysis-window-limits"
        calendarProps={{ defaultMonth: new Date(2026, 8, 1), min: 2, max: 7, excludeDisabled: true }}
        disabledDates={new Date(2026, 8, 12)}
        id="analysis-window"
        presets={[
          { label: "9月4日—7日", value: { from: new Date(2026, 8, 4), to: new Date(2026, 8, 7) } },
          { label: "9月10日—15日", value: { from: new Date(2026, 8, 10), to: new Date(2026, 8, 15) } },
          { label: "整个9月", value: { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) } },
        ]}
      />
      <FieldDescription id="analysis-window-limits">跨度 2—7 天；9 月 12 日暂停采集。</FieldDescription>
    </Field>
  );
}
