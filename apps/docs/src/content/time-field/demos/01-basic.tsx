import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeField } from "@qingye_lab/ui/components/time-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "起止时间", titleEn: "Start and end" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [start, setStart] = useState<string | null>("09:00");
  const [end, setEnd] = useState<string | null>("08:30");
  // 结束早于开始是应用才知道的规则：min 只把分段标为无效并拦下提交，说明文字由 FieldError 承担。
  const reversed = start !== null && end !== null && end < start;
  return (
    <form>
      <FieldGroup className="flex-row flex-wrap items-start">
        <Field name="start">
          <FieldLabel>{en ? "Start" : "开始"}</FieldLabel>
          <TimeField value={start} onValueChange={setStart} />
        </Field>
        <Field name="end" invalid={reversed}>
          <FieldLabel>{en ? "End" : "结束"}</FieldLabel>
          <TimeField value={end} onValueChange={setEnd} {...(start ? { min: start } : {})} />
          <FieldError>{en ? "End is before start" : "结束早于开始"}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
