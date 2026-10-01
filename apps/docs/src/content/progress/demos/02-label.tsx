import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@yanqing/ui";

export const meta = { title: "标签与数值", description: "标签和数值放在轨道上方的一行，两端对齐。" };

export default function Demo() {
  return (
    <Progress className="max-w-sm" value={64}>
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>导出订单数据</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
