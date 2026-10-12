import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：横向柱标值", titleEn: "Reading exact values: labels on horizontal bars" };
const sources = [["接入设备", 1284], ["权限与角色", 42], ["同步与导出", 0], ["操作记录", 90512], ["回调地址", 6]] as const;
export default function Demo() {
  return <Chart type="bar-horizontal" className="w-full max-w-2xl" label="各集合记录数" categoryLabel="集合" valueLabel="记录数" valueLabels
    series={[{ key: "records", label: "记录数" }]}
    rows={[...sources].sort((a, b) => b[1] - a[1]).map(([name, records]) => ({ id: name, label: name, values: { records } }))} />;
}
