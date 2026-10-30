import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeField } from "@qingye_lab/ui/components/time-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "秒与十二小时制", titleEn: "Seconds and 12-hour" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  return (
    <FieldGroup className="flex-row flex-wrap items-start">
      <Field>
        <FieldLabel>{en ? "To the second" : "精确到秒"}</FieldLabel>
        <TimeField granularity="second" defaultValue="09:30:15" />
      </Field>
      <Field>
        <FieldLabel>{en ? "12-hour" : "十二小时制"}</FieldLabel>
        <TimeField hourCycle={12} defaultValue="14:05" />
      </Field>
    </FieldGroup>
  );
}
