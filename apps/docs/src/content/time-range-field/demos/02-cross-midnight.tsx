import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField, type TimeRangeValue } from "@qingye_lab/ui/components/time-range-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "跨零点与顺序", titleEn: "Crossing midnight and order" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [day, setDay] = useState<TimeRangeValue>({ start: "18:00", end: "09:00" });
  const [night, setNight] = useState<TimeRangeValue>({ start: "22:00", end: "06:00" });
  // 结束早于开始时，组件把整组标为无效并拦下提交；说明文字由应用用 FieldError 给出。
  const reversed = day.start !== null && day.end !== null && day.end < day.start;
  return (
    <form>
      <FieldGroup>
        <Field name="day" invalid={reversed}>
          <FieldLabel>{en ? "Opening hours" : "营业时间"}</FieldLabel>
          <TimeRangeField value={day} onValueChange={setDay} />
          <FieldError>{en ? "End is before start" : "结束早于开始"}</FieldError>
        </Field>
        <Field name="night">
          <FieldLabel>{en ? "Night shift (ends the next day)" : "夜班（结束在次日）"}</FieldLabel>
          <TimeRangeField value={night} onValueChange={setNight} allowCrossMidnight />
        </Field>
      </FieldGroup>
    </form>
  );
}
