import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "趋势：折线", titleEn: "Trend: line" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
    series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />;
}
