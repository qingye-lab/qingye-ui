import { StatusDot } from "@qingye/ui/components/status-dot";

export const meta = { title: "尺寸与仅圆点", description: "不写文字时组件输出读屏文本，例如「在线」。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <StatusDot size="sm" status="online">
          小
        </StatusDot>
        <StatusDot status="online">默认</StatusDot>
        <StatusDot size="lg" status="online">
          大
        </StatusDot>
      </div>
      <div className="flex items-center gap-4">
        <StatusDot size="sm" status="online" />
        <StatusDot status="warning" />
        <StatusDot size="lg" status="error" />
        <StatusDot label="打印机缺纸" status="warning" />
      </div>
    </div>
  );
}
