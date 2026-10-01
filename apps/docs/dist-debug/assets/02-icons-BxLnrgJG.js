const t=`import { Timeline } from "@qingye/ui/components/timeline";
import { GitCommitHorizontalIcon, RocketIcon, ShieldAlertIcon, TriangleAlertIcon, UndoIcon } from "lucide-react";

export const meta = { title: "图标与状态", description: "icon 作为标记，status 标出成功、警告、失败与提示。" };

const items = [
  { id: "1", title: "v2.8.1 发布到生产环境", description: "全量发布，耗时 6 分钟", time: "16:20", status: "success" as const, icon: <RocketIcon /> },
  { id: "2", title: "回滚 v2.8.0", description: "订单服务 P99 延迟升高至 1.8s", time: "15:58", status: "error" as const, icon: <UndoIcon /> },
  { id: "3", title: "灰度 10% 流量", description: "错误率 0.4%，高于 0.1% 阈值", time: "15:41", status: "warning" as const, icon: <TriangleAlertIcon /> },
  { id: "4", title: "安全扫描完成", description: "发现 2 个低危依赖，已记录", time: "15:30", status: "info" as const, icon: <ShieldAlertIcon /> },
  { id: "5", title: "合并 #1842 优化结算页", time: "15:12", icon: <GitCommitHorizontalIcon /> },
];

export default function Demo() {
  return <Timeline className="w-full max-w-md" items={items} label="部署记录" />;
}
`;export{t as default};
