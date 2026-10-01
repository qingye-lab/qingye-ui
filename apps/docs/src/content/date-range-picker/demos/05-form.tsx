import { Button, DateRangePicker, Field, FieldLabel, NativeSelect, NativeSelectOption } from "@yanqing/ui";
import { useState } from "react";

export const meta = {
  title: "筛选栏",
  description: "startName / endName 以本地 YYYY-MM-DD 提交，适合直接拼进查询参数。",
};

export default function Demo() {
  const [query, setQuery] = useState("");
  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setQuery(new URLSearchParams(data as unknown as Record<string, string>).toString());
      }}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_10rem_auto] sm:items-end">
        <Field>
          <FieldLabel>下单时间</FieldLabel>
          <DateRangePicker
            defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
            endName="to"
            startName="from"
          />
        </Field>
        <Field>
          <FieldLabel>订单状态</FieldLabel>
          <NativeSelect defaultValue="paid" name="status">
            <NativeSelectOption value="all">全部</NativeSelectOption>
            <NativeSelectOption value="paid">已支付</NativeSelectOption>
            <NativeSelectOption value="refunded">已退款</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Button type="submit" variant="outline">
          查询
        </Button>
      </div>
      {query ? <code className="truncate rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">?{query}</code> : null}
    </form>
  );
}
