import { Timeline } from "@yanqing/ui";

export const meta = { title: "基础用法", description: "items 快速生成；没有图标时标记为圆点。" };

const items = [
  { id: "sign", title: "已签收", description: "本人签收，感谢使用顺丰速运", time: "10-01 14:32", dateTime: "2026-10-01T14:32", status: "success" as const },
  { id: "deliver", title: "派送中", description: "快递员 王师傅 正在派送，电话 138****2041", time: "10-01 09:05", dateTime: "2026-10-01T09:05" },
  { id: "arrive", title: "到达上海徐汇营业部", time: "09-30 22:47", dateTime: "2026-09-30T22:47" },
  { id: "ship", title: "已发货", description: "杭州转运中心", time: "09-30 08:16", dateTime: "2026-09-30T08:16" },
];

export default function Demo() {
  return <Timeline className="w-full max-w-md" items={items} label="物流轨迹" />;
}
