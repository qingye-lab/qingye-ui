import { Chart } from "@qingye/ui/components/chart";
export const meta = { title: "一眼占比：环形", titleEn: "At-a-glance share: donut" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
