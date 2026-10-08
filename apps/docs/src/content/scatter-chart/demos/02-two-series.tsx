import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
export const meta = { title: "两个来源的记录数与失败率", titleEn: "Two sources, records vs. failure rate" };
export default function Demo() {
  return <ScatterChart className="w-full max-w-2xl" label="设备与审计来源的记录数与失败率" xLabel="记录数" yLabel="失败率"
    series={[
      { key: "device", label: "设备来源", points: [{ id: "d1", label: "接入设备", x: 1284, y: 0.012 }, { id: "d2", label: "回调地址", x: 6, y: 0.18 }, { id: "d3", label: "访问令牌", x: 3, y: 0.21 }] },
      { key: "audit", label: "审计来源", points: [{ id: "a1", label: "操作记录", x: 90512, y: 0.002 }, { id: "a2", label: "通知模板", x: 11, y: 0.03 }, { id: "a3", label: "成员分组", x: 17, y: 0.09 }] },
    ]}
    formatY={(value) => `${(value * 100).toFixed(1)}%`} />;
}
