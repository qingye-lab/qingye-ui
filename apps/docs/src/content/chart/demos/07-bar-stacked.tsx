import { Chart } from "@qingye/ui/components/chart";
export const meta = { title: "构成比较：堆叠柱", titleEn: "Composition comparison: stacked bars" };
const sources = [["接口推送", 412, 9], ["定时导入", 288, 21], ["数据库连接", 197, 4], ["手动上传", 96, 12]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源成功与失败" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={sources.map(([name, success, failed]) => ({ id: name, label: name, values: { success, failed } }))} />;
}
