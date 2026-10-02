import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "预约时间" };

export default function Demo() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="available-booking">预约时间</Label>
      <DateTimePicker
        aria-describedby="available-booking-hint"
        calendarProps={{ defaultMonth: tomorrow }}
        defaultTime="09:00"
        disabledDates={{ before: tomorrow }}
        id="available-booking"
        label="预约"
      />
      <FieldDescription id="available-booking-hint">最早可预约明天。</FieldDescription>
    </Field>
  );
}
