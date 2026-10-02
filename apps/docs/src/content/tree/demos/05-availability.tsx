import { Button } from "@qingye/ui/components/button";
import { Tree } from "@qingye/ui/components/tree";
import { useState } from "react";

export const meta = { title: "访问状态变化" };

export default function Demo() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Tree label="工作文件" nodes={[
        { id: "draft", label: "设计草稿" },
        { id: "report", label: "季度报告", disabled: paused },
        { id: "archive", label: "归档记录" },
      ]} />
      <Button aria-pressed={paused} onClick={() => setPaused(!paused)} size="sm" variant="outline">
        {paused ? "恢复报告访问" : "暂停报告访问"}
      </Button>
    </div>
  );
}
