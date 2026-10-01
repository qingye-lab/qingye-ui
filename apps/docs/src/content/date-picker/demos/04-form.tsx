import { Button } from "@qingye/ui/components/button";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "表单提交", description: "通过 name 提交，值为本地日期 YYYY-MM-DD。" };

export default function Demo() {
  const [submitted, setSubmitted] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("purchasedAt")));
  };
  return (
    <form className="flex w-full max-w-64 flex-col gap-3" onSubmit={onSubmit}>
      <Label htmlFor="purchased-at">购买日期</Label>
      <DatePicker
        id="purchased-at"
        name="purchasedAt"
        disabledDates={{ after: new Date() }}
        calendarProps={{ captionLayout: "dropdown", startMonth: new Date(2015, 0), endMonth: new Date() }}
      />
      <Button type="submit" variant="outline">提交保修登记</Button>
      {submitted ? (
        <p className="text-muted-foreground text-sm">
          purchasedAt = <code className="numeric text-foreground">{submitted || "（空）"}</code>
        </p>
      ) : null}
    </form>
  );
}
