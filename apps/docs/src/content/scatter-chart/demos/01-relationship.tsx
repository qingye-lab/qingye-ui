import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
export const meta = { title: "记录数与失败率的关系", titleEn: "Records vs. failure rate" };
const collections = [
  { id: "devices", label: "接入设备", records: 1284, rate: 0.012 },
  { id: "roles", label: "权限与角色", records: 42, rate: 0.04 },
  { id: "regions", label: "区域与节点", records: 28, rate: 0.07 },
  { id: "webhooks", label: "回调地址", records: 6, rate: 0.18 },
  { id: "groups", label: "成员分组", records: 17, rate: 0.09 },
  { id: "tokens", label: "访问令牌", records: 3, rate: 0.21 },
  { id: "templates", label: "通知模板", records: 11, rate: 0.03 },
] as const;
export default function Demo() {
  return <ScatterChart className="w-full max-w-2xl" label="各集合记录数与失败率" xLabel="记录数" yLabel="失败率"
    series={[{ key: "all", label: "全部集合", points: collections.map(c => ({ id: c.id, label: c.label, x: c.records, y: c.rate })) }]}
    formatY={(value) => `${(value * 100).toFixed(1)}%`} />;
}
