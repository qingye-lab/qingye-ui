import { useState } from "react";
import { Chart } from "@qingye_lab/ui/components/chart";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
export const meta = { title: "切换时间范围", titleEn: "Switching the time range" };
const days = Array.from({ length: 30 }, (_, index) => { const date = new Date(2026, 8, 13 + index); return { id: `d${index}`, label: `${date.getMonth() + 1}/${date.getDate()}`, count: 40 + Math.round(12 * Math.sin(index / 2.3)) - (index % 7 < 2 ? 14 : 0) }; });
export default function Demo() {
  const [range, setRange] = useState<"7" | "30">("7");
  const shown = days.slice(-Number(range));
  return <div className="grid w-full max-w-2xl justify-items-start gap-(--qy-field-group-gap)">
    <SegmentedControl aria-label="时间范围" value={range} onValueChange={value => setRange(value as "7" | "30")}>
      <SegmentedControlItem value="7">近 7 日</SegmentedControlItem>
      <SegmentedControlItem value="30">近 30 日</SegmentedControlItem>
    </SegmentedControl>
    <Chart type="line" className="w-full" label="每日同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "count", label: "同步次数" }]}
      rows={shown.map(day => ({ id: day.id, label: day.label, values: { count: day.count } }))} />
  </div>;
}
