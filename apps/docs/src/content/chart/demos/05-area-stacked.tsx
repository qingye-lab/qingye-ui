import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "随时间的构成：堆叠面积", titleEn: "Composition over time: stacked area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const api = [612, 640, 700, 680, 820, 440, 360];
const scheduled = [200, 260, 240, 220, 260, 150, 140];
const manual = [40, 30, 44, 36, 50, 20, 18];
export default function Demo() {
  return <Chart type="area-stacked" className="w-full max-w-2xl" label="本周各来源记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { api: api[index]!, scheduled: scheduled[index]!, manual: manual[index]! } }))} />;
}
