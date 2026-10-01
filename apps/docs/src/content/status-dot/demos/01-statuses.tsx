import { StatusDot } from "@yanqing/ui/components/status-dot";

export const meta = { title: "状态", description: "离线为空心圆，与中性灰在形状上也能区分。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <StatusDot status="online">在线</StatusDot>
      <StatusDot status="offline">离线</StatusDot>
      <StatusDot status="warning">电量低</StatusDot>
      <StatusDot status="error">连接异常</StatusDot>
      <StatusDot status="info">升级中</StatusDot>
      <StatusDot status="neutral">未激活</StatusDot>
    </div>
  );
}
