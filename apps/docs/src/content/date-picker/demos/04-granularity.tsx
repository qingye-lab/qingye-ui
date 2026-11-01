import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

export default function Demo() {
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="week"><FieldLabel>周</FieldLabel><DatePicker granularity="week" defaultValue={new Date(2026, 9, 28)} /></Field>
        <Field name="month"><FieldLabel>月</FieldLabel><DatePicker granularity="month" defaultValue={new Date(2026, 10, 1)} /></Field>
        <Field name="quarter"><FieldLabel>季度</FieldLabel><DatePicker granularity="quarter" defaultValue={new Date(2026, 9, 1)} /></Field>
        <Field name="year"><FieldLabel>年</FieldLabel><DatePicker granularity="year" defaultValue={new Date(2026, 0, 1)} min={new Date(2020, 0, 1)} max={new Date(2030, 11, 31)} /></Field>
      </FieldGroup>
    </form>
  );
}
