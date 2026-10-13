import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";

const points = [
  { id: "a", label: "回调地址", x: 6, y: 0.18 },
  { id: "b", label: "成员分组", x: 17, y: 0.16 },
  { id: "c", label: "区域与节点", x: 28, y: 0.17 },
  { id: "d", label: "通知模板", x: 42, y: 0.12 },
  { id: "e", label: "权限与角色", x: 61, y: 0.14 },
  { id: "f", label: "接入设备", x: 84, y: 0.05 },
];

// 与图表那一格同一写法：台里只放得下图形本身，标题栏收成仅读屏可见，图高取材分。
export default function Cover() {
  return <ScatterChart className="w-full border-0 p-0 [&_[data-slot=chart-header]]:sr-only" label="失败率" xLabel="记录数" yLabel="失败率"
    series={[{ key: "all", label: "全部", points }]} formatY={value => `${(value * 100).toFixed(0)}%`}
    style={{ "--qy-chart-plot-height": "calc(3 * var(--qy-cai))" }} />;
}
