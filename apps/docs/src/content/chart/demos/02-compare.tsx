import { Chart } from "@qingye/ui/components/chart";
export const meta = { title: "比较：柱状，单一系列用墨", titleEn: "Comparison: bars, one series in ink" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数"
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
