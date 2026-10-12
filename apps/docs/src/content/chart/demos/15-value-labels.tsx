import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：柱上标值", titleEn: "Reading exact values: labels on bars" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155], ["文件监听", 0]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数" valueLabels
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
