import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一条线的区间：均值与最低最高", titleEn: "A line with its spread: mean with minimum and maximum" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const mean = [24.1, 24.8, 25.6, 26.2, 25.4, 24.6, 23.9];
const low = [22.0, 22.9, 23.4, 24.1, 23.2, 22.5, 21.8];
const high = [26.3, 27.1, 28.0, 28.6, 27.9, 26.8, 26.0];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室日温" categoryLabel="日期" valueLabel="温度（℃）"
    series={[{ key: "mean", label: "日均温", range: { min: "low", max: "high" } }]}
    valueDomain={[20, 30]} formatValue={value => `${value} ℃`}
    rows={days.map((day, index) => ({ id: day, label: day, values: { mean: mean[index]!, low: low[index]!, high: high[index]! } }))} />;
}
