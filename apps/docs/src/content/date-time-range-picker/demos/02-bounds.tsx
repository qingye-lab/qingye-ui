import { useState } from "react";
import { DateTimeRangePicker, type DateTimeRangeInvalidReason, type DateTimeRangeValue } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可选范围与无效说明", titleEn: "Bounds and the invalid note" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [value, setValue] = useState<DateTimeRangeValue | undefined>();
  const [reason, setReason] = useState<DateTimeRangeInvalidReason | null>(null);
  // 草稿无法提交时库只通知原因，说明文字由应用用 FieldError 给出。
  const note = reason === "order" ? (en ? "End is before start" : "结束早于开始") : reason === "bounds" ? (en ? "Outside the bookable window" : "不在可预订的时间内") : reason ? (en ? "Fill in both ends" : "起止都要填") : "";
  return (
    <form>
      <Field name="booking" invalid={reason !== null}>
        <FieldLabel>{en ? "Booking window" : "预订时段"}</FieldLabel>
        <DateTimeRangePicker value={value} onValueChange={next => { setValue(next); setReason(null); }} onInvalid={(_, why) => setReason(why)}
          min="2026-10-05T09:00" max="2026-10-09T18:00" calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} />
        <FieldError match={reason !== null}>{note}</FieldError>
      </Field>
    </form>
  );
}
