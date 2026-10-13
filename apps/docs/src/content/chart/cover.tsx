import { Chart } from "@qingye_lab/ui/components/chart";

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const counts = [42, 48, 45, 51, 58, 31, 28];

// 台里只放得下图形本身：标题栏（图名与「查看数据」）收成仅读屏可见，图高取材分。
export default function Cover() {
  return <Chart type="line" label="同步次数" categoryLabel="日期" valueLabel="次数"
    className="w-full border-0 p-0 [&_[data-slot=chart-header]]:sr-only"
    style={{ "--qy-chart-plot-height": "calc(3 * var(--qy-cai))" }}
    series={[{ key: "ok", label: "成功" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { ok: counts[index]! } }))} />;
}
