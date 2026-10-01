const e=`import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { CircleAlertIcon, CircleCheckIcon } from "lucide-react";

export const meta = {
  title: "颜色与粗细",
  description: "用 className 修改指示条颜色和轨道高度；结果同时用文字或图标说明。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Progress value={100}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>数据库备份</ProgressLabel>
          <span className="flex items-center gap-1 text-sm text-success-foreground">
            <CircleCheckIcon aria-hidden="true" className="size-4" />
            已完成
          </span>
        </div>
        <ProgressTrack>
          <ProgressIndicator className="bg-success" />
        </ProgressTrack>
      </Progress>
      <Progress value={64}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>同步商品库存</ProgressLabel>
          <span className="flex items-center gap-1 text-destructive-foreground text-sm">
            <CircleAlertIcon aria-hidden="true" className="size-4" />
            在 64% 处中断
          </span>
        </div>
        <ProgressTrack>
          <ProgressIndicator className="bg-destructive" />
        </ProgressTrack>
      </Progress>
      <Progress value={30}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>索引重建</ProgressLabel>
          <ProgressValue className="text-muted-foreground" />
        </div>
        <ProgressTrack className="h-1">
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  );
}
`;export{e as default};
