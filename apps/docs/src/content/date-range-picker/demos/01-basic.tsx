import { DateRangePicker, Field, FieldLabel } from "@yanqing/ui";

export const meta = { title: "基础用法", description: "第一次点击定起点，第二次点击定终点；桌面端并排显示两个月。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>入住日期</FieldLabel>
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 15) }}
        disabledDates={{ before: new Date(2026, 9, 1) }}
        endName="checkOut"
        startName="checkIn"
      />
    </Field>
  );
}
