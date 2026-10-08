import { useEffect, useId } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "类型", titleEn: "Types" };

const types = [
  ["info", "信息"],
  ["warning", "提醒"],
  ["waiting", "等待"],
  ["in-progress", "进行中"],
  ["unknown", "结果未知"],
  ["failed", "失败"],
  ["success", "成功"],
] as const;

export default function Demo() {
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      {types.map(([type, label]) => (
        <Button key={type} variant="bordered" onClick={() => toastManager.add({ id, type, title: label, timeout: 5000 })}>
          {label}
        </Button>
      ))}
    </div>
  );
}
