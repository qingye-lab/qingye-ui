import { Card, CardPanel } from "@qingye/ui/components/card";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";

export const meta = {
  title: "自定义中心内容",
  description: "中心放分数等自定义内容时，用 getAriaValueText 让读屏读到同样的信息。",
};

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" size="sm">
      <CardPanel className="flex items-center gap-4">
        <ProgressCircle
          aria-label="本周巡检任务"
          getAriaValueText={() => "已完成 18 项，共 24 项"}
          max={24}
          size="xl"
          strokeWidth={4.5}
          value={18}
        >
          <span className="flex flex-col items-center gap-1">
            <span className="font-semibold text-xl leading-none">18</span>
            <span className="font-normal text-muted-foreground text-xs leading-none">/ 24 项</span>
          </span>
        </ProgressCircle>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-medium text-sm">本周巡检任务</span>
          <span className="text-muted-foreground text-sm">还剩 6 项，主要集中在静安店的冷柜与消防设备。</span>
        </div>
      </CardPanel>
    </Card>
  );
}
