import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成占比：占比柱", titleEn: "Composition share: share bars" };
const sources = [["接口推送", 412, 36, 9], ["定时导入", 288, 52, 21], ["数据库连接", 197, 8, 4], ["手动上传", 96, 18, 12]] as const;
export default function Demo() {
  return <Chart type="bar-share" className="w-full max-w-2xl" label="各来源本周同步结果占比" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "retry", label: "重试" }, { key: "failed", label: "失败" }]}
    rows={[
      ...sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } })),
      { id: "文件监听", label: "文件监听", values: { success: 64, retry: { state: "unknown" as const, label: "尚未统计" }, failed: 3 } },
    ]} />;
}
