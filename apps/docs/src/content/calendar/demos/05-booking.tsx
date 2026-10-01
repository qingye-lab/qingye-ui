import { Button } from "@qingye/ui/components/button";
import { Calendar } from "@qingye/ui/components/calendar";
import { type DateRange } from "@qingye/ui";
import { useState } from "react";

export const meta = { title: "组合：会议室预订", description: "日历放进卡片，下方汇总所选天数。", flush: true };

const format = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" });

export default function Demo() {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  });
  const nights =
    range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1 : 0;

  return (
    <div className="mx-auto flex w-fit flex-col rounded-2xl border bg-card shadow-xs/5">
      <div className="p-2">
        <Calendar mode="range" selected={range} onSelect={setRange} disabled={{ before: today }} />
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="font-medium text-sm">3 号会议室 · 12 人</span>
          <span className="truncate text-muted-foreground text-xs">
            {range?.from ? format.format(range.from) : "未选择"}
            {range?.to ? ` – ${format.format(range.to)}` : ""}
          </span>
        </div>
        <Button size="sm" disabled={!nights} className="numeric">
          {`预订 ${nights} 天`}
        </Button>
      </div>
    </div>
  );
}
