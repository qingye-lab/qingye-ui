import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "范围与非受控", titleEn: "Bounds and uncontrolled" };

export default function Demo() {
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="checkin">
          <FieldLabel>入住</FieldLabel>
          <DatePicker defaultValue={new Date(2026, 9, 12)} min={new Date(2026, 9, 5)} max={new Date(2026, 10, 30)} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} />
          <FieldDescription>10 月 5 日至 11 月 30 日</FieldDescription>
        </Field>
        <Field name="birthday">
          <FieldLabel>生日</FieldLabel>
          <DatePicker calendarProps={{ captionLayout: "dropdown", startMonth: new Date(1920, 0), endMonth: new Date(2026, 11), defaultMonth: new Date(1990, 0) }} />
        </Field>
      </FieldGroup>
    </form>
  );
}
