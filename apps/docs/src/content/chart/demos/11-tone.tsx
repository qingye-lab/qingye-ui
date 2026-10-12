import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "状态类别：堆叠柱按类别着色", titleEn: "Status tone: stacked bars colored by category" };
const sources = [["接口推送", 148, 42, 24], ["定时导入", 96, 58, 31], ["数据库连接", 120, 18, 9], ["手动上传", 54, 12, 16]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源本周同步结果" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功", tone: "success" }, { key: "retry", label: "重试中", tone: "warning" }, { key: "failed", label: "失败", tone: "danger" }]}
    rows={sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } }))} />;
}
