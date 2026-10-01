import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = { title: "状态色", description: "进度弧取状态色，轨道保持半透明中性。" };

const items = [
  { status: "default", value: 42, label: "默认" },
  { status: "success", value: 100, label: "已完成" },
  { status: "info", value: 64, label: "同步中" },
  { status: "warning", value: 86, label: "容量偏高" },
  { status: "error", value: 97, label: "即将耗尽" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      {items.map((item) => (
        <div className="flex w-16 flex-col items-center gap-2" key={item.status}>
          <ProgressCircle aria-label={item.label} showValue size="lg" status={item.status} value={item.value} />
          <span className="text-muted-foreground text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
