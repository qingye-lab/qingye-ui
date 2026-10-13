import { Heatmap } from "@qingye_lab/ui/components/heatmap";

const days = [{ key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" }, { key: "thu", label: "周四" }];
const counts: Record<string, number[]> = { mon: [2, 18, 42], tue: [1, 20, 46], wed: [3, 16, 38], thu: [2, 22, 50] };

// 台里只放得下格子本身：标题栏（图名与「查看数据」）收成仅读屏可见。
export default function Cover() {
  return <Heatmap className="w-full border-0 p-0 [&_[data-slot=chart-header]]:sr-only" label="同步次数" rowLabel="时段" columnLabel="星期" valueLabel="次数"
    columns={days}
    rows={["00 时", "12 时", "18 时"].map((hour, index) => ({ id: hour, label: hour, values: Object.fromEntries(days.map(day => [day.key, counts[day.key]![index]!])) }))} />;
}
