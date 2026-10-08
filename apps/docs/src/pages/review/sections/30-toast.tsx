import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ToastProvider, ToastPrimitive } from "@qingye_lab/ui/components/toast";

const states = [
  ["waiting", "等待"],
  ["in-progress", "进行中"],
  ["unknown", "结果未知"],
  ["failed", "失败"],
  ["success", "成功"],
] as const;

export default function ToastReview() {
  const [manager] = useState(() => ToastPrimitive.createToastManager());
  return (
    <section id="toast-review" className="border-t border-border py-(--qy-section-gap)">
      <h2 className="text-heading">Toast · 状态</h2>
      <ToastProvider toastManager={manager}>
        <div className="mt-(--qy-field-group-gap) flex gap-(--qy-action-gap)">
          {states.map(([type, label]) => <Button key={type} variant="bordered" onClick={() => manager.add({ id: "review-toast", type, title: label, timeout: 0 })}>{label}</Button>)}
          <Button variant="quiet" onClick={() => manager.close("review-toast")}>关闭</Button>
        </div>
      </ToastProvider>
    </section>
  );
}
