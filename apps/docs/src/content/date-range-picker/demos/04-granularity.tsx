import { useState } from "react";
import { DateRangePicker, type DateRangePreset, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

const thisQuarter = (): DateRangeValue => {
  const now = new Date();
  const first = Math.floor(now.getMonth() / 3) * 3;
  return { from: new Date(now.getFullYear(), first, 1), to: new Date(now.getFullYear(), first + 3, 0) };
};
const quarters: DateRangePreset[] = [{ label: "本季度", value: thisQuarter }];

export default function Demo() {
  const [months, setMonths] = useState<DateRangeValue | undefined>({ from: new Date(2026, 1, 1), to: new Date(2026, 3, 30) });
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="weeks"><FieldLabel>周</FieldLabel><DateRangePicker granularity="week" defaultValue={{ from: new Date(2026, 9, 26), to: new Date(2026, 10, 8) }} /></Field>
        <Field name="months"><FieldLabel>月</FieldLabel><DateRangePicker granularity="month" value={months} onValueChange={setMonths} /></Field>
        <Field name="quarters"><FieldLabel>季度</FieldLabel><DateRangePicker granularity="quarter" presets={quarters} /></Field>
        <Field name="years"><FieldLabel>年</FieldLabel><DateRangePicker granularity="year" defaultValue={{ from: new Date(2024, 0, 1), to: new Date(2026, 11, 31) }} /></Field>
      </FieldGroup>
    </form>
  );
}
