import { DateRangePicker, Field, FieldError, FieldLabel } from "@yanqing/ui";

export const meta = { title: "状态", description: "占位、跨年范围、禁用与无效。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>活动周期</FieldLabel>
        <DateRangePicker placeholder="选择开始与结束日期" />
      </Field>
      <Field>
        <FieldLabel>年度盘点</FieldLabel>
        <DateRangePicker defaultValue={{ from: new Date(2025, 11, 20), to: new Date(2026, 0, 5) }} />
      </Field>
      <Field disabled>
        <FieldLabel>合同有效期</FieldLabel>
        <DateRangePicker defaultValue={{ from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) }} disabled />
      </Field>
      <Field invalid>
        <FieldLabel>请假时间</FieldLabel>
        <DateRangePicker aria-invalid required />
        <FieldError>请选择请假的起止日期</FieldError>
      </Field>
    </div>
  );
}
