import { Button } from "@qingye/ui/components/button";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { useEffect, useState } from "react";

export const meta = { title: "动态更新", description: "value 变化时指示条平滑过渡，完成后切换为成功色。" };

export default function Demo() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || value >= 100) return;
    const timer = setTimeout(() => setValue((current) => Math.min(100, current + 12)), 400);
    return () => clearTimeout(timer);
  }, [running, value]);

  const done = value >= 100;

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <Progress className="w-full" value={value}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>{done ? "部署完成" : running ? "正在部署到生产环境" : "等待部署"}</ProgressLabel>
          <ProgressValue className="text-muted-foreground" />
        </div>
        <ProgressTrack>
          <ProgressIndicator className="data-complete:bg-success" />
        </ProgressTrack>
      </Progress>
      {done ? (
        <Button size="sm" variant="outline" onClick={() => setValue(0)}>
          重新部署
        </Button>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setRunning(!running)}>
          {running ? "暂停" : value > 0 ? "继续" : "开始部署"}
        </Button>
      )}
    </div>
  );
}
