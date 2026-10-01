import { Button } from "@qingye/ui/components/button";
import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "组合：预约上门安装", description: "只能约今天以后的工作日，默认时间 09:00，通过 name 提交。" };

export default function Demo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("visitAt")));
  };
  return (
    <form className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs/5" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm">空调安装预约</h3>
        <p className="text-muted-foreground text-xs">订单 2026100388 · 格力云佳 1.5 匹</p>
      </div>
      <Field>
        <Label htmlFor="visit-at">上门时间</Label>
        <DateTimePicker
          id="visit-at"
          name="visitAt"
          label="上门"
          defaultTime="09:00"
          disabledDates={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
        />
        <FieldDescription>师傅会在约定时间前 30 分钟电话联系。</FieldDescription>
      </Field>
      <Button type="submit">确认预约</Button>
      {submitted !== null ? (
        <p className="text-muted-foreground text-xs">
          visitAt = <code className="numeric text-foreground">{submitted || "（空）"}</code>
        </p>
      ) : null}
    </form>
  );
}
