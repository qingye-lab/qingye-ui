import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from "@yanqing/ui/components/progress";

export const meta = {
  title: "不确定进度",
  description: "value={null} 时一道光带循环扫过轨道，适合还算不出总量的阶段。",
};

export default function Demo() {
  return (
    <Progress className="max-w-sm" value={null}>
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>正在准备备份</ProgressLabel>
        <span className="text-muted-foreground text-sm">计算文件数量…</span>
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  );
}
