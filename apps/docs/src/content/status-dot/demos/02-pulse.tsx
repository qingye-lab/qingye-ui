import { StatusDot } from "@yanqing/ui/components/status-dot";

export const meta = {
  title: "实时光环",
  description: "pulse 用于正在发生的状态；减少动态效果时只保留圆点。",
};

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
      <StatusDot pulse status="online">
        直播中
      </StatusDot>
      <StatusDot pulse status="info">
        正在同步
      </StatusDot>
      <StatusDot pulse status="error">
        告警未处理
      </StatusDot>
    </div>
  );
}
