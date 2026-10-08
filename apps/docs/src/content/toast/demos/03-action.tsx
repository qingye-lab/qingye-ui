import { useEffect, useId, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "操作", titleEn: "Action" };

export default function Demo() {
  const id = useId();
  const [count, setCount] = useState(0);
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex items-center gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => toastManager.add({
        id,
        title: "带操作的通知",
        actionProps: { children: "加一", onClick: () => setCount((value) => value + 1) },
      })}>显示通知</Button>
      <output aria-live="polite" className="text-body">计数：{count}</output>
    </div>
  );
}
