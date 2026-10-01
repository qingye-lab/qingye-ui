import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldDescription, FieldError } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "状态", description: "不可选日期、错误、禁用与不可清除。" };

export default function Demo() {
  const today = new Date();
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field>
        <Label htmlFor="visit-date">预约上门</Label>
        <DatePicker id="visit-date" disabledDates={[{ before: today }, { dayOfWeek: [0] }]} />
        <FieldDescription>周日不上门，今天之前不可选。</FieldDescription>
      </Field>
      <Field>
        <Label htmlFor="expire-date">合同到期日</Label>
        <DatePicker id="expire-date" aria-invalid aria-describedby="expire-error" />
        <FieldError id="expire-error">请选择合同到期日</FieldError>
      </Field>
      <Field>
        <Label htmlFor="signed-date">签订日期</Label>
        <DatePicker id="signed-date" defaultValue={new Date(2026, 3, 8)} disabled />
      </Field>
      <Field>
        <Label htmlFor="entry-date">入职日期</Label>
        <DatePicker id="entry-date" defaultValue={new Date(2026, 8, 1)} clearable={false} />
        <FieldDescription>必填字段不提供清除。</FieldDescription>
      </Field>
    </div>
  );
}
