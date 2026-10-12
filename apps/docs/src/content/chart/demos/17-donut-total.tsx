import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一眼占比：环形带其余", titleEn: "At-a-glance share: donut with a remainder" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数" total={5000}
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
