import { Button } from "@qingye/ui/components/button";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { useEffect, useState } from "react";

export const meta = { title: "不确定进度与动态更新", description: "value 为 null 时旋转；数值变化时进度弧平滑过渡。" };

export default function Demo() {
  const [value, setValue] = useState(24);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(100, current + 9);
        if (next === 100) setRunning(false);
        return next;
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <div className="flex items-center gap-3">
        <ProgressCircle aria-label="正在准备导出" size="sm" value={null} />
        <span className="text-muted-foreground text-sm">正在准备导出…</span>
      </div>
      <div className="flex items-center gap-4">
        <ProgressCircle aria-label="固件升级进度" showValue size="lg" status={value === 100 ? "success" : "default"} value={value} />
        <div className="flex gap-2">
          <Button disabled={running || value === 100} onClick={() => setRunning(true)} size="sm" variant="outline">
            开始升级
          </Button>
          <Button onClick={() => { setRunning(false); setValue(0); }} size="sm" variant="ghost">
            重置
          </Button>
        </div>
      </div>
    </div>
  );
}
