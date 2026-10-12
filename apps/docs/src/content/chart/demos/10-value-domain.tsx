import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "量轴范围：折线取 80%–100%", titleEn: "Value domain: a line from 80% to 100%" };
const uptime = Array.from({ length: 60 }, (_, index) => Number((96.5 + 2 * Math.sin(index / 3) + 1.2 * Math.sin(index / 1.3)).toFixed(1)));
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="近 60 天在线率" categoryLabel="日期" valueLabel="在线率（%）"
    series={[{ key: "uptime", label: "在线率" }]}
    valueDomain={[80, 100]}
    references={[{ kind: "line", value: 95, label: "目标 95%" }]}
    formatValue={value => `${value}%`}
    rows={uptime.map((value, index) => ({ id: `d${index + 1}`, label: `${index + 1} 日`, values: { uptime: value } }))} />;
}
